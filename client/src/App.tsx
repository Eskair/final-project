import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// pages
import HomePage from './pages/home';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import ClassroomPage from './pages/classroom';
import SprintPage from './pages/sprint';

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
            <Route path='/sprint/:sprintId' element={<SprintPage />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
