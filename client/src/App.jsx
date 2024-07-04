import React from 'react';
import'./App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Login from './Auth/Login';
import Register from './Auth/Register'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Register />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
