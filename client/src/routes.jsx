import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './components/RootLayout';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './routes/ProtectedRoute'; // Ensure this file exists in src/routes/

import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateEvent from './pages/CreateEvent';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    // Custom Error Boundary for the "Cosmic" feel
    errorElement: (
      <div className="min-h-screen bg-[#050511] flex flex-col items-center justify-center text-center p-4 font-orbitron">
        <h1 className="text-6xl text-neon-red mb-4">404</h1>
        <h2 className="text-2xl text-white mb-2">SYSTEM MALFUNCTION</h2>
        <p className="text-gray-400">The requested coordinates do not exist in this galaxy.</p>
        <a href="/" className="mt-6 text-neon-cyan hover:underline">Return to Base</a>
      </div>
    ),
    children: [
      // Public Routes
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },

      // Protected Routes (Require Auth)
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
  path: 'admin',
  element: (
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  ),
},
      {
        path: 'create-event',
        element: (
          <ProtectedRoute>
            <CreateEvent />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);