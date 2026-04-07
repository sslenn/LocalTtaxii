import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

import { AppProvider } from "./context/AppContext";
import Toast from "./components/Toast";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminSidebar from "./components/AdminSidebar";
import { RequireAuth, RequireAdmin } from "./components/ProtectedRoute";

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

// ── Layouts ──────────────────────────────────────────────────────────────────
function ClientLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}

function AdminLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <AdminSidebar />
      <div style={{ marginLeft: 240, flex: 1 }}>
        <Outlet />
      </div>
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Toast />

      {/* client layout with public and protected routes */}
        <Routes>
          <Route element={<ClientLayout />}>
            <Route index element={<Home />} />
            <Route path="fleet" element={<Fleet />} />
            <Route path="routes" element={<RoutesPage />} />
            <Route path="book" element={<Booking />} />

            <Route
              element={
                <RequireAuth>
                  <Outlet />
                </RequireAuth>
              }
            >
              <Route path="my-bookings" element={<MyBookings />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Route>

          {/* // Auth routes */}

          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          <Route
            path="admin"
            element={
              <RequireAdmin>
                <AdminLayout />
              </RequireAdmin>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="bookings" element={<AdminBookings />} />
            <Route path="vehicles" element={<AdminVehicles />} />
            <Route path="users" element={<AdminUsers />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
      </AppProvider>
    </BrowserRouter>
  );
}