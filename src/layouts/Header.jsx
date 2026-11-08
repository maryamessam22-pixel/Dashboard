import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchImg from "../assets/search.png";
import BellImg from "../assets/bell.png";
import "./Header.css";
import Title from '../components/common/Title';
import { supabase } from '../config/Supabase';

const Header = (props) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notificationError, setNotificationError] = useState('');
  const [notifications, setNotifications] = useState({
    unreadMessages: 0,
    newActivity: 0,
    items: []
  });
  const [lastSeen, setLastSeen] = useState(() => {
    const storageKey = 'dashboard.notifications.lastSeen';
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (saved) return saved;
      const now = new Date().toISOString();
      window.localStorage.setItem(storageKey, now);
      return now;
    } catch (error) {
      console.error('Unable to restore notification read time:', error);
      return new Date().toISOString();
    }
  });
  const searchRequest = useRef(0);

  useEffect(() => {
    const query = searchTerm.trim().replace(/[,%()_*]/g, ' ').trim();
    const requestId = ++searchRequest.current;
    if (!query) {
      setSearchResults([]);
      setSearchError('');
      setSearchLoading(false);
      return undefined;
    }

    let active = true;
    const timeoutId = window.setTimeout(async () => {
      setSearchLoading(true);
      setSearchError('');
      const pattern = `%${query}%`;
      const [projectsResult, blogsResult, messagesResult] = await Promise.all([
        supabase
          .from('Projects')
          .select('id, project_name_EN, category_outside')
          .or(`project_name_EN.ilike.${pattern},category_outside.ilike.${pattern}`)
          .limit(5),
        supabase
          .from('Blogs')
          .select('id, blog_title, category')
          .or(`blog_title.ilike.${pattern},category.ilike.${pattern}`)
          .limit(5),
        supabase
          .from('contact_messages')
          .select('id, name, email, message')
          .or(`name.ilike.${pattern},email.ilike.${pattern},message.ilike.${pattern}`)
          .limit(5)
      ]);

      if (!active || requestId !== searchRequest.current) return;

      const failedResult = [projectsResult, blogsResult, messagesResult].find((result) => result.error);
      if (failedResult) {
        console.error('Unable to search dashboard records:', failedResult.error);
        setSearchError('Search could not load all results. Check your connection and try again.');
        setSearchResults([]);
      } else {
        setSearchResults([
          ...(projectsResult.data || []).map((project) => ({
            id: `project-${project.id}`,
            title: project.project_name_EN || 'Untitled project',
            detail: project.category_outside || 'Project',
            path: `/edit/${project.id}`
          })),
          ...(blogsResult.data || []).map((blog) => ({
            id: `blog-${blog.id}`,
            title: blog.blog_title || 'Untitled blog',
            detail: blog.category || 'Blog',
            path: `/edit-blog/${blog.id}`
          })),
          ...(messagesResult.data || []).map((message) => ({
            id: `message-${message.id}`,
            title: message.name || message.email || 'Contact message',
            detail: message.email || message.message || 'Message',
            path: '/messages'
          }))
        ]);
      }
      setSearchLoading(false);
    }, 300);

    return () => {
      active = false;
      window.clearTimeout(timeoutId);
    };
  }, [searchTerm]);

  useEffect(() => {
    let active = true;

    const loadNotifications = async () => {
      const [unreadResult, unreadItemsResult, activityCountResult, activityItemsResult] = await Promise.all([
        supabase
          .from('contact_messages')
          .select('id', { count: 'exact', head: true })
          .is('read_at', null),
        supabase
          .from('contact_messages')
          .select('id, name, email, created_at')
          .is('read_at', null)
          .order('created_at', { ascending: false })
          .limit(5),
        supabase
          .from('portfolio_analytics')
          .select('id', { count: 'exact', head: true })
          .gt('created_at', lastSeen),
        supabase
          .from('portfolio_analytics')
          .select('id, event_type, project_id, created_at')
          .gt('created_at', lastSeen)
          .order('created_at', { ascending: false })
          .limit(5)
      ]);

      if (!active) return;
      const failedResult = [unreadResult, unreadItemsResult, activityCountResult, activityItemsResult]
        .find((result) => result.error);
      if (failedResult) {
        console.error('Unable to load dashboard notifications:', failedResult.error);
        setNotificationError('Notifications could not be loaded.');
        return;
      }

      const messageItems = (unreadItemsResult.data || []).map((message) => ({
        id: `message-${message.id}`,
        kind: 'message',
        title: message.name || message.email || 'New contact message',
        detail: message.email || 'Unread message',
        createdAt: message.created_at,
        path: '/messages'
      }));
      const activityItems = (activityItemsResult.data || []).map((event) => ({
        id: `activity-${event.id}`,
        kind: event.event_type,
        title: event.event_type === 'cv_download' ? 'CV download recorded' : 'Project view recorded',
        detail: event.project_id ? `Project #${event.project_id}` : 'Portfolio activity',
        createdAt: event.created_at,
        path: event.event_type === 'cv_download' ? '/home' : '/projects'
      }));

      setNotifications({
        unreadMessages: unreadResult.count || 0,
        newActivity: activityCountResult.count || 0,
        items: [...messageItems, ...activityItems]
          .sort((left, right) => new Date(right.createdAt) - new Date(left.createdAt))
          .slice(0, 7)
      });
      setNotificationError('');
    };

    loadNotifications();
    const intervalId = window.setInterval(loadNotifications, 15000);
    return () => {
      active = false;
      window.clearInterval(intervalId);
    };
  }, [lastSeen]);

  const handleNotificationClick = () => {
    if (!notificationsOpen) {
      const now = new Date().toISOString();
      try {
        window.localStorage.setItem('dashboard.notifications.lastSeen', now);
      } catch (error) {
        console.error('Unable to save notification read time:', error);
      }
      setLastSeen(now);
      setNotifications((current) => ({ ...current, newActivity: 0 }));
    }
    setNotificationsOpen((open) => !open);
    setSearchOpen(false);
  };

  const openResult = (path) => {
    setSearchOpen(false);
    setSearchTerm('');
    navigate(path);
  };

  const openNotification = (path) => {
    setNotificationsOpen(false);
    navigate(path);
  };

  const notificationCount = notifications.unreadMessages + notifications.newActivity;

  return (
    <>
      <header className="top-header">
        <Title title={props.title} />

        <div className="header-actions">
          <div className="header-search">
            <div className="search-bar">
            <img src={SearchImg} alt="search icon" style={{ width: "16px", height: "16px" }} />
              <input
                type="search"
                placeholder="Search projects, blogs, messages"
                value={searchTerm}
                aria-label="Search projects, blogs, and messages"
                onFocus={() => {
                  setSearchOpen(true);
                  setNotificationsOpen(false);
                }}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>
            {searchOpen && searchTerm.trim() && (
              <div className="header-popover search-results" role="listbox" aria-label="Search results">
                {searchLoading ? (
                  <p className="popover-state">Searching...</p>
                ) : searchError ? (
                  <p className="popover-state" role="alert">{searchError}</p>
                ) : searchResults.length ? (
                  searchResults.map((result) => (
                    <button
                      type="button"
                      className="popover-item"
                      key={result.id}
                      onClick={() => openResult(result.path)}
                    >
                      <span>{result.title}</span>
                      <small>{result.detail}</small>
                    </button>
                  ))
                ) : (
                  <p className="popover-state">No matching records found.</p>
                )}
              </div>
            )}
          </div>

          <div className="notification-wrapper">
            <button
              type="button"
              className="notification-icon"
              aria-label={`Notifications: ${notificationCount} unread`}
              aria-expanded={notificationsOpen}
              onClick={handleNotificationClick}
            >
            <img src={BellImg} alt="bell icon" style={{ width: "20px", height: "20px" }} />
              {notificationCount > 0 && (
                <span className="notification-count">
                  {notificationCount > 99 ? '99+' : notificationCount}
                </span>
              )}
            </button>
            {notificationsOpen && (
              <div className="header-popover notification-list" role="region" aria-label="Notifications">
                <h3>Notifications</h3>
                {notificationError ? (
                  <p className="popover-state" role="alert">{notificationError}</p>
                ) : notifications.items.length ? (
                  notifications.items.map((item) => (
                    <button
                      type="button"
                      className="popover-item"
                      key={item.id}
                      onClick={() => openNotification(item.path)}
                    >
                      <span>{item.title}</span>
                      <small>
                        {item.detail} · {new Date(item.createdAt).toLocaleString()}
                      </small>
                    </button>
                  ))
                ) : (
                  <p className="popover-state">No new notifications.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;