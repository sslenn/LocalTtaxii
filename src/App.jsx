import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Toast from './components/Toast'
import Navbar from './components/Navbar'
import AdminSidebar from './components/AdminSidebar'
import { RequireAuth, RequireAdmin } from './components/ProtectedRoute'

import Home from './pages/Home'
import Fleet from './pages/Fleet'
import RoutesPage from './pages/Routes'
import Booking from './pages/Booking'
import MyBookings from './pages/MyBookings'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'

<<<<<<< HEAD
import Dashboard from './pages/admin/Dashboard'
import AdminBookings from './pages/admin/AdminBookings'
import AdminVehicles from './pages/admin/AdminVehicles'
import AdminUsers from './pages/admin/AdminUsers'
=======
import Home from "./pages/Home";
import Fleet from "./pages/Fleet";
import RoutesPage from "./pages/Routes";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from './pages/NotFound'

import Dashboard from "./pages/admin/Dashboard";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminVehicles from "./pages/admin/AdminVehicles";
import AdminUsers from "./pages/admin/AdminUsers";
>>>>>>> feature/ratana-Routes

// ── Layouts ──────────────────────────────────────────────────────────────────
function ClientLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  )
}

function AdminLayout({ children }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <AdminSidebar />
      <div style={{ marginLeft: 240, flex: 1, padding: '48px 32px' }}>
        {children}
      </div>
    </div>
  )
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Toast />
        <Routes>
          {/* Client */}
          <Route path="/" element={<ClientLayout><Home /></ClientLayout>} />
          <Route path="/fleet" element={<ClientLayout><Fleet /></ClientLayout>} />
          <Route path="/routes" element={<ClientLayout><RoutesPage /></ClientLayout>} />
          <Route path="/book" element={<ClientLayout><Booking /></ClientLayout>} />

          {/* Protected Client */}
          <Route path="/my-bookings" element={
            <RequireAuth><ClientLayout><MyBookings /></ClientLayout></RequireAuth>
          } />
          <Route path="/profile" element={
            <RequireAuth><ClientLayout><Profile /></ClientLayout></RequireAuth>
          } />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Admin */}
          <Route path="/admin" element={
            <RequireAdmin><AdminLayout><Dashboard /></AdminLayout></RequireAdmin>
          } />
          <Route path="/admin/bookings" element={
            <RequireAdmin><AdminLayout><AdminBookings /></AdminLayout></RequireAdmin>
          } />
          <Route path="/admin/vehicles" element={
            <RequireAdmin><AdminLayout><AdminVehicles /></AdminLayout></RequireAdmin>
          } />
          <Route path="/admin/users" element={
            <RequireAdmin><AdminLayout><AdminUsers /></AdminLayout></RequireAdmin>
          } />

<<<<<<< HEAD
          {/* 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
=======
          <Route path="*" element={<NotFound />} />
>>>>>>> feature/ratana-Routes
        </Routes>
      </AppProvider>
    </BrowserRouter>
<<<<<<< HEAD
  )
=======
  );
>>>>>>> feature/ratana-Routes
}