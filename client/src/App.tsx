import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// pages
import HomePage from './pages/home';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import ClassroomPage from './pages/classroom';
import SprintPage from './pages/sprint';
import ProjectionPage from './pages/projection';
import SettingsPage from './pages/settings';

// auth provider
import { useAuth } from './hooks/useAuth';

//component
import { MainLayout, Loader } from './components';

function App() {
  const { admin, client, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route
            path='/register'
            element={admin ? <Navigate to='/' /> : <RegisterPage />}
          />
          <Route
            path='/settings'
            element={admin ? <SettingsPage /> : <Navigate to='/register' />}
          />
          <Route path='/' element={<HomePage />} />
          <Route
            path='/classroom'
            element={client ? <ClassroomPage /> : <Navigate to='/' />}
          />
          <Route
            path='/sprints/:sprintId'
            element={client ? <SprintPage /> : <Navigate to='/' />}
          />
          <Route
            path='/sprints/:sprintId/projections/:projectionId'
            element={client ? <ProjectionPage /> : <Navigate to='/' />}
          />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
