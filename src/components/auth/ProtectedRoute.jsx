import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { supabase } from '../../config/Supabase';

const ProtectedRoute = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState('');
  const location = useLocation();

  useEffect(() => {
    let active = true;
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (active) setSession(nextSession);
    });

    const loadSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (!active) return;
        if (error) throw error;
        setSession(data.session);
      } catch (error) {
        if (!active) return;
        console.error('Unable to verify dashboard session:', error);
        setAuthError('Unable to verify your session. Refresh the page and try again.');
      } finally {
        if (active) setLoading(false);
      }
    };

    loadSession();

    return () => {
      active = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  if (loading) return <div className="loading-center">Checking your session...</div>;
  if (authError) return <div role="alert" className="loading-center">{authError}</div>;
  if (!session) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
