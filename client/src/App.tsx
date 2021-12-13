import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// pages
import HomePage from './pages/home';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import ClassroomPage from './pages/classroom';
import SprintPage from './pages/sprint';
import ProjectionPage from './pages/projection';

// auth provider
import { AuthProvider } from './hooks/useAuth';

//component
import { MainLayout } from './components';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/classroom' element={<ClassroomPage />} />
            <Route path='/sprints/:sprintId' element={<SprintPage />} />
            <Route
              path='/sprints/:sprintId/projections/:projectionId'
              element={<ProjectionPage />}
            />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
