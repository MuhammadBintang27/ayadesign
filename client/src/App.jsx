import React from 'react';
import'./App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Login from './Auth/Login'
import Register from './Auth/Register';
import { Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

const App = () => {
  const { isAuthenticated } = useAuth()
  return (
    <Router>
      <Routes>
        <Route path='/' element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />} /> 
        <Route path="/login" element={!isAuthenticated ? <Login/> : <Dashboard />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Login />} />
      </Routes>
    </Router>
  );
};

export default App;
