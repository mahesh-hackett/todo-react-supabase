import { useState } from 'react'
import './App.css'
import Todos from './components/home/todos.jsx'
import AddTodo from './components/home/addTodo.jsx'
import Auth from './components/auth/auth.jsx'
import MainLayout from './components/layouts/mainLayout.jsx'
import { useSelector } from 'react-redux'
import { useEffect } from 'react';
import { supabase } from './api/supabase-client';
import { useDispatch } from 'react-redux';
import { _signIn } from './store/api.helpers/auth';
import Home from './components/home/home.jsx'

function App() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {

    // 1️⃣ Check the current session once
    supabase.auth.getSession().then(({ data }) => {
      if (data?.session?.user) {
        dispatch({ type: 'auth/signIn/fulfilled', payload: data.session.user });
      }
    });

    // 2️⃣ Listen for any future changes in session state
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        dispatch({ type: 'auth/signIn/fulfilled', payload: session.user });
      }
      else if (event === 'SIGNED_OUT') {
        dispatch({ type: 'auth/signOut/fulfilled' });
      }
      else if (event === 'TOKEN_REFRESHED') {
        dispatch({ type: 'auth/signIn/fulfilled', payload: session.user });
      }
    });

    // 3️⃣ Cleanup when component unmounts
    return () => {
      listener.subscription.unsubscribe();
    };
  }, [dispatch]);

  return (
    <MainLayout>
      {user ? (
        <div>
          <Home />
        </div>
      ) : (
        <Auth />
      )}
    </MainLayout>
  );
}

export default App
