import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const AppContext = createContext(null);

// ── Seed Data ────────────────────────────────────────────────────────────────
const SEED_VEHICLES = [
  {id: "v1", name: "SUV",              model: "Toyota Fortuner",     seats: 7,  luggage: 3, type: "Standard", image: "/src/assets/SUV.png",         price_tag: "$79+",  available: true, description: "Reliable and spacious SUV perfect for group travel across Cambodia.",},
  {id: "v2", name: "Starex",           model: "Hyundai Starex",      seats: 10, luggage: 5, type: "Van",      image: "/src/assets/starex.png",      price_tag: "$89+",  available: true, description: "Large capacity van ideal for families and groups with lots of luggage.",},
  {id: "v3", name: "Alphard",          model: "Toyota Alphard",      seats: 7,  luggage: 4, type: "Premium",  image: "/src/assets/alphard.png",     price_tag: "$99+",  available: true, description: "Premium MPV delivering first-class comfort for executive transfers.",},
  {id: "v4", name: "Alphard 2012",     model: "Toyota Alphard 2012", seats: 7,  luggage: 4, type: "Business", image: "/src/assets/alphard2012.png", price_tag: "$109+", available: true, description: "Business class travel with refined comfort and ample space.",},
  {id: "v5", name: "VIP Alphard 2020", model: "Toyota Alphard 2020", seats: 7,  luggage: 4, type: "VIP",      image: "/src/assets/alphard2020.png", price_tag: "$189+", available: true, description: "Our flagship VIP vehicle with ultra-luxury interior and privacy screens.",},
];

const SEED_ROUTES = [
  { id: "r1",  from: "Phnom Penh",    to: "Sihanoukville",     prices: { v1: 79,  v2: 109, v3: 99,  v4: 109, v5: 219 } },
  { id: "r2",  from: "Phnom Penh",    to: "Siem Reap",         prices: { v1: 79,  v2: 109, v3: 109, v4: 139, v5: 349 } },
  { id: "r3",  from: "Phnom Penh",    to: "Battambang",        prices: { v1: 89,  v2: 119, v3: 119, v4: 149, v5: 349 } },
  { id: "r4",  from: "Phnom Penh",    to: "Kampot / Kep",      prices: { v1: 59,  v2: 89,  v3: 89,  v4: 109, v5: 189 } },
  { id: "r5",  from: "Phnom Penh",    to: "Poipet",            prices: { v1: 109, v2: 149, v3: 149, v4: 199, v5: 419 } },
  { id: "r6",  from: "Phnom Penh",    to: "Bavet",             prices: { v1: 59,  v2: 89,  v3: 89,  v4: 109, v5: 179 } },
  { id: "r7",  from:"Phnom Penh",    to: "ChreyThom",         prices: { v1: 49,  v2: 79,  v3: 79,  v4: 89,  v5: 179 } },
  { id: "r8",  from: "Poipet",        to: "Siem Reap Airport", prices: { v1: 69,  v2: 89,  v3: 89,  v4: 199, v5: 249 } },
  { id: "r9",  from: "Sihanoukville", to: "Poipet",            prices: { v1: 169, v2: 249, v3: 249, v4: 279, v5: 599 } },
  { id: "r10", from: "Sihanoukville", to: "Bavet",             prices: { v1: 129, v2: 189, v3: 189, v4: 209, v5: 309 } },
  { id: "r11", from: "Siem Reap",     to: "Sihanoukville",     prices: { v1: 149, v2: 209, v3: 209, v4: 229, v5: 549 } },
];

// ── Seed Users ────────────────────────────────────────────────────────────────
const SEED_USERS = [
  { id: 'admin1', name: 'Admin', email: 'admin@localttaxi.com', password: 'admin123',    phone: '+855 12 000 000', role: 'admin',    createdAt: new Date('2024-01-01').toISOString() },
  { id: 'u1',     name: 'User1', email: 'user1@example.com',    password: 'password123', phone: '+855 17 234 567', role: 'customer', createdAt: new Date('2024-03-10').toISOString() },
  { id: 'u2',     name: 'User2', email: 'user2@example.com',    password: 'password123', phone: '+855 89 526 951', role: 'customer', createdAt: new Date('2024-04-05').toISOString() },
  { id: 'u3',     name: 'User3', email: 'user3@example.com',    password: 'password123', phone: '+855 77 312 456', role: 'customer', createdAt: new Date('2024-03-01').toISOString() },
  { id: 'u4',     name: 'User4', email: 'user4@example.com',    password: 'password123', phone: '+855 96 145 788', role: 'customer', createdAt: new Date('2024-02-20').toISOString() },
  { id: 'u5',     name: 'User5', email: 'user5@example.com',    password: 'password123', phone: '+855 11 987 654', role: 'customer', createdAt: new Date('2024-04-15').toISOString() },
];

// ── localStorage helpers ─────────────────────────────────────────────────────
const ls = {
  get: (key, fallback = null) => {
    try {
      const v = localStorage.getItem(key);
      return v ? JSON.parse(v) : fallback;
    } catch {
      return fallback;
    }
  },
  set: (key, val) => {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch {}
  },
};

// ── Seed on first load ───────────────────────────────────────────────────────
const seed = () => {
  if (!ls.get("tt_vehicles")) ls.set("tt_vehicles", SEED_VEHICLES);
  if (!ls.get("tt_routes")) ls.set("tt_routes", SEED_ROUTES);
  if (!ls.get('tt_users')) ls.set('tt_users', SEED_USERS);
  if (!ls.get("tt_bookings")) ls.set("tt_bookings", []);
};

// ── Provider ─────────────────────────────────────────────────────────────────
export function AppProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() =>
    ls.get("tt_current_user"),
  );
  const [users, setUsers] = useState(() => {
    seed();
    return ls.get("tt_users", []);
  });
  const [vehicles, setVehicles] = useState(() =>
    ls.get("tt_vehicles", SEED_VEHICLES),
  );
  const [routes] = useState(() => ls.get("tt_routes", SEED_ROUTES));
  const [bookings, setBookings] = useState(() => ls.get("tt_bookings", []));
  const [toasts, setToasts] = useState([]);

  // ── Persist to localStorage ──────────────────────────────────────────────
  useEffect(() => {
    ls.set("tt_users", users);
  }, [users]);
  useEffect(() => {
    ls.set("tt_vehicles", vehicles);
  }, [vehicles]);
  useEffect(() => {
    ls.set("tt_bookings", bookings);
  }, [bookings]);
  useEffect(() => {
    ls.set("tt_current_user", currentUser);
  }, [currentUser]);

  // ── Toast ────────────────────────────────────────────────────────────────
  const toast = useCallback((msg, type = "info") => {
    const id = Date.now();
    setToasts((t) => [...t, { id, msg, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3500);
  }, []);

  // ── Auth ─────────────────────────────────────────────────────────────────
  const login = (email, password) => {
    const u = users.find((u) => u.email === email && u.password === password);
    if (!u) return false;
    setCurrentUser(u);
    return true;
  };

  const register = (name, email, password, phone) => {
    if (users.find((u) => u.email === email)) return false;
    const u = {
      id: "u" + Date.now(),
      name,
      email,
      password,
      phone: phone || "",
      role: "customer",
      createdAt: new Date().toISOString(),
    };
    setUsers((prev) => [...prev, u]);
    setCurrentUser(u);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("tt_current_user");
  };

  const updateProfile = (data) => {
    const updated = { ...currentUser, ...data };
    setCurrentUser(updated);
    setUsers((prev) =>
      prev.map((u) => (u.id === currentUser.id ? updated : u)),
    );
  };

  // ── Bookings ─────────────────────────────────────────────────────────────
  const createBooking = (data) => {
    const b = {
      ...data,
      id: "b" + Date.now(),
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    setBookings((prev) => [...prev, b]);
    return b;
  };

  const updateBookingStatus = (id, status) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b)),
    );
  };

  const cancelBooking = (id) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id && b.userId === currentUser?.id
          ? { ...b, status: "cancelled" }
          : b,
      ),
    );
  };

  // ── Vehicles ─────────────────────────────────────────────────────────────
  const addVehicle = (data) => {
    const v = { ...data, id: "v" + Date.now() };
    setVehicles((prev) => [...prev, v]);
  };

  const updateVehicle = (id, data) => {
    setVehicles((prev) =>
      prev.map((v) => (v.id === id ? { ...v, ...data } : v)),
    );
  };

  const deleteVehicle = (id) => {
    setVehicles((prev) => prev.filter((v) => v.id !== id));
  };

  // ── Derived ──────────────────────────────────────────────────────────────
  const myBookings = currentUser
    ? bookings.filter((b) => b.userId === currentUser.id)
    : [];

  const stats = {
    totalBookings: bookings.length,
    pendingBookings: bookings.filter((b) => b.status === "pending").length,
    confirmedBookings: bookings.filter((b) => b.status === "confirmed").length,
    completedBookings: bookings.filter((b) => b.status === "completed").length,
    totalRevenue: bookings
      .filter((b) => b.status !== "cancelled")
      .reduce((s, b) => s + (b.price || 0), 0),
    totalUsers: users.filter((u) => u.role !== "admin").length,
  };


  const value = {
    currentUser,
    login,
    register,
    logout,
    updateProfile,
    users,
    vehicles,
    routes,
    bookings,
    myBookings,
    stats,
    createBooking,
    updateBookingStatus,
    cancelBooking,
    addVehicle,
    updateVehicle,
    deleteVehicle,
    toast,
    toasts
  };

  return (
    <AppContext.Provider
      value={value}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
