import React, { useEffect, useState } from 'react';
import './Home.css';
import Layout from "../../layouts/Layout";
import Header from '../../layouts/Header';
import { CartesianGrid, LineChart, XAxis, YAxis, Line as ReLine, ResponsiveContainer, Tooltip } from 'recharts';
import { supabase } from '../../config/Supabase';

const createLast30Days = () => {
  const firstDay = new Date();
  firstDay.setUTCHours(0, 0, 0, 0);
  firstDay.setUTCDate(firstDay.getUTCDate() - 29);

  return Array.from({ length: 30 }, (_, index) => {
    const date = new Date(firstDay);
    date.setUTCDate(firstDay.getUTCDate() + index);
    return {
      date: date.toISOString().slice(0, 10),
      name: date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', timeZone: 'UTC' }),
      cvDownloads: 0,
      projectViews: 0
    };
  });
};

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reloadKey, setReloadKey] = useState(0);
  const [stats, setStats] = useState(null);
  const [trafficData, setTrafficData] = useState([]);
  const [popularProjects, setPopularProjects] = useState([]);

  useEffect(() => {
    let active = true;

    async function loadDashboard() {
      setLoading(true);
      setError('');
      try {
        const since = new Date();
        since.setUTCDate(since.getUTCDate() - 29);
        since.setUTCHours(0, 0, 0, 0);

        const [cvResult, projectViewsResult, projectsResult, inboxResult, recentEventsResult] = await Promise.all([
          supabase.from('portfolio_analytics').select('id', { count: 'exact', head: true }).eq('event_type', 'cv_download'),
          supabase.from('portfolio_analytics').select('id', { count: 'exact', head: true }).eq('event_type', 'project_view'),
          supabase.from('Projects').select('id', { count: 'exact', head: true }).eq('status', 'published'),
          supabase.from('contact_messages').select('id', { count: 'exact', head: true }).is('read_at', null),
          supabase
            .from('portfolio_analytics')
            .select('event_type, project_id, created_at')
            .gte('created_at', since.toISOString())
            .order('created_at', { ascending: true })
        ]);

        const failedQuery = [cvResult, projectViewsResult, projectsResult, inboxResult, recentEventsResult]
          .find((result) => result.error);
        if (failedQuery) throw failedQuery.error;

        const chartByDate = new Map(createLast30Days().map((day) => [day.date, day]));
        const projectViewCounts = new Map();
        (recentEventsResult.data || []).forEach((event) => {
          const day = chartByDate.get(event.created_at.slice(0, 10));
          if (day && event.event_type === 'cv_download') day.cvDownloads += 1;
          if (day && event.event_type === 'project_view') day.projectViews += 1;
          if (event.event_type === 'project_view' && event.project_id != null) {
            const projectId = String(event.project_id);
            projectViewCounts.set(projectId, (projectViewCounts.get(projectId) || 0) + 1);
          }
        });

        const topProjectIds = [...projectViewCounts.entries()]
          .sort((left, right) => right[1] - left[1])
          .slice(0, 3);
        let projectDetails = [];
        if (topProjectIds.length) {
          const { data, error: projectDetailsError } = await supabase
            .from('Projects')
            .select('id, project_name_EN, category_outside, cover_image')
            .in('id', topProjectIds.map(([id]) => id))
            .eq('status', 'published');
          if (projectDetailsError) throw projectDetailsError;
          projectDetails = topProjectIds
            .map(([id, views]) => {
              const project = data.find((item) => String(item.id) === id);
              return project ? { ...project, views } : null;
            })
            .filter(Boolean);
        }

        if (active) {
          setStats({
            cvDownloads: cvResult.count || 0,
            projectViews: projectViewsResult.count || 0,
            publishedProjects: projectsResult.count || 0,
            unreadMessages: inboxResult.count || 0
          });
          setTrafficData([...chartByDate.values()]);
          setPopularProjects(projectDetails);
        }
      } catch (loadError) {
        console.error('Unable to load dashboard analytics:', loadError);
        if (active) setError(loadError.message || 'Unable to load dashboard analytics.');
      } finally {
        if (active) setLoading(false);
      }
    }

    loadDashboard();
    return () => { active = false; };
  }, [reloadKey]);

  const displayValue = (value) => (loading ? '…' : (value ?? '—'));

  return (
    <div className="home-page dashboard-layout">
      <Layout />

      <main className="main-content">
        <Header title="Pages/ Dashboard" />

        <section className="welcome-banner">
          <div className="banner-content">
            <p className="sub-text">Welcome back,</p>
            <h1>Mariam Farid</h1>
            <p className="desc">Here's an overview of your latest activities</p>
          </div>
        </section>

        <section className="overview-section">
          <h2>Overview <span className="date-tag">Live totals</span></h2>
          {error && (
            <div className="dashboard-data-state" role="alert">
              <span>{error}</span>
              <button type="button" onClick={() => setReloadKey((key) => key + 1)}>Retry</button>
            </div>
          )}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="icon-box yellow">⬇</div>
              <div className="stat-info">
                <h3>CV DOWNLOADS</h3>
                <p><span className="highlight-yellow">{displayValue(stats?.cvDownloads)}</span> recorded downloads</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="icon-box green">📦</div>
              <div className="stat-info">
                <h3>PUBLISHED PROJECTS</h3>
                <p><span className="highlight-green">{displayValue(stats?.publishedProjects)}</span> currently on your portfolio</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="icon-box blue">👁</div>
              <div className="stat-info">
                <h3>PROJECT VIEWS</h3>
                <p><span className="highlight-blue">{displayValue(stats?.projectViews)}</span> recorded detail-page visits</p>
              </div>
            </div>
          </div>

          <div className="inbox-alert">
            <div className="icon-box pink">✉</div>
            <div className="stat-info">
              <h3>INBOX MESSAGES</h3>
              <p><span className="highlight-pink">{displayValue(stats?.unreadMessages)} unread messages</span> from contact form</p>
            </div>
          </div>
        </section>

        <section className="traffic-section">
          <div className="section-header">
            <h2>Portfolio activity · last 30 days</h2>
            <div className="chart-legend">
              <span className="dot yellow"></span> CV downloads
              <span className="dot blue"></span> Project views
            </div>
          </div>
          {!loading && !error && trafficData.every((day) => day.cvDownloads === 0 && day.projectViews === 0) ? (
            <p className="dashboard-data-state">Activity will appear here after visitors download the CV or open project details.</p>
          ) : (
            <div className="analytics-chart">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trafficData}>
                  <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                  <XAxis dataKey="name" interval={4} />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <ReLine type="monotone" dataKey="cvDownloads" name="CV downloads" stroke="#facc15" />
                  <ReLine type="monotone" dataKey="projectViews" name="Project views" stroke="#60a5fa" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </section>

        <section className="projects-section">
          <h2>Most Viewed Projects <span className="date-tag">Last 30 days</span></h2>
          {loading ? (
            <p className="dashboard-data-state">Loading project views…</p>
          ) : popularProjects.length ? (
            <div className="projects-grid">
              {popularProjects.map((project, index) => (
                <article className={`project-card ${index === 0 ? 'purple-light' : 'purple-medium'}`} key={project.id}>
                  <div className="card-header">
                    <span className="badge">{project.category_outside || 'Project'}</span>
                    <span className="date">{project.views} views</span>
                  </div>
                  <h4>{project.project_name_EN}</h4>
                  {project.cover_image && (
                    <div className="card-images">
                      <img src={project.cover_image} alt={project.project_name_EN} className="img-placeholder" />
                    </div>
                  )}
                  <div className="card-footer">Project detail visits</div>
                </article>
              ))}
            </div>
          ) : (
            <p className="dashboard-data-state">No project detail visits recorded in the last 30 days.</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default Home;
