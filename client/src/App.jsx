import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Login from './Auth/Login'
import Register from './Auth/Register';
import { Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Nav from './Components/Nav';
import AboutUs from './Pages/user/AboutUs';
import UpdateProfile from './Pages/user/UpdateProfile';

const App = () => {
  const { isAuthenticated } = useAuth()
  return (
    <Router>
      <Routes>
        <Route path='/' element={!isAuthenticated ? <Dashboard /> : <Navigate to="/dashboard" />} /> 
        <Route path="/login" element={!isAuthenticated ? <Login/> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!isAuthenticated ? <Register/> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Dashboard />} />
        <Route path="/profile" element={isAuthenticated ? <UpdateProfile/> : <Navigate to="/dashboard" />} />
        <Route path="/about" element={<AboutUs />} />


      </Routes>
    </Router>
  );
};

export default App;
