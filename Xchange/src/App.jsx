import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import Sell from './pages/Sell';
import Home from './pages/Home';
import BookDetail from './pages/BookDetail';
import { useEffect, useState } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedAuth = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(storedAuth);
  }, []);

  const handleLogin = () => {
    localStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <div className="app-shell">
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/sell" element={isLoggedIn ? <Sell /> : <Navigate to="/login" replace />} />
          <Route path="/book/:id" element={isLoggedIn ? <BookDetail /> : <Navigate to="/login" replace />} />
          <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to={isLoggedIn ? '/' : '/login'} replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
