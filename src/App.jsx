// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Global Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Public Pages
import AdminDashboard from './pages/AdminDashboard'; // ✅ Should be imported
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Events from './pages/Events';
import BookEvent from './pages/BookEvent';
import NotFound from './pages/NotFound';

// Protected Pages
import Dashboard from './pages/Dashboard';
import MyBookings from './pages/MyBookings';

// Admin Pages
import AdminEvents from './pages/AdminEvents';
import CreateEvent from './pages/CreateEvent';
import EditEvent from './pages/EditEvent';

// Route Guards
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <Router>
      {/* ✅ Consistent Layout */}
      <Navbar />

      <main className="min-h-screen">
        <Routes>
          {/* 🌐 Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/events" element={<Events />} />
          <Route path="/book/:id" element={<BookEvent />} />

          {/* 🔒 Protected User Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/bookings"
            element={
              <ProtectedRoute>
                <MyBookings />
              </ProtectedRoute>
            }
          />

          {/* 🛡️ Admin Routes */}
<Route
  path="/admin"
  element={
    <AdminRoute>
      <AdminDashboard />
    </AdminRoute>
  }
/>
          <Route
            path="/admin/create-event"
            element={
              <AdminRoute>
                <CreateEvent />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/edit-event/:id"
            element={
              <AdminRoute>
                <EditEvent />
              </AdminRoute>
            }
          />

          {/* 🚫 Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}

export default App;
