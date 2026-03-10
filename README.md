# LocalTTaxi

> Premium Private Transfer Booking Platform for Cambodia

LocalTTaxi is a full-stack web application that allows customers to browse vehicles, view routes and pricing, and book private transfers across Cambodia. It includes a complete admin dashboard for managing bookings, vehicles, and users.

---

##  Live Demo

> Coming soon — deploying to Netlify

**Demo Credentials**

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@localttaxi.com | admin123 |
| Customer | (register a new account) | — |

---

##  Features

### Customer
-  Landing page with fleet preview and CTAs
-  Browse 5 vehicle classes (SUV, Starex, Alphard, Business, VIP)
-  View 11 routes with fixed transparent pricing
-  3-step booking form with live price summary
-  My Bookings — view and cancel bookings
-  Profile — edit personal details

### Admin
-  Dashboard with stats (revenue, bookings, users, vehicles)
-  Bookings management — filter, search, update status
-  Vehicles management — full CRUD (add, edit, delete, toggle availability)
-  Users management — view all customers and booking counts

### System
-  Role-based access control (Customer / Admin)
-  localStorage persistence — no backend needed
-  Toast notifications
-  Responsive design

---

##  Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| React | 18.2 | UI Framework |
| Vite | 5.1 | Build Tool |
| Tailwind CSS | 4.x | Styling |
| React Router DOM | 6.22 | Client-side Routing |
| Lucide React | 0.263 | Icons |
| localStorage | — | Data Persistence |

---

##  Getting Started

### Prerequisites
- Node.js 18+
- npm 9+
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/sslenn/LocalTtaxii.git
cd LocalTtaxii

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will run at **http://localhost:5173**

### Build for Production

```bash
npm run build
npm run preview
```

---

##  Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Top navigation bar
│   ├── Footer.jsx          # Site footer
│   ├── AdminSidebar.jsx    # Admin panel sidebar
│   ├── Toast.jsx           # Notification toasts
│   └── ProtectedRoute.jsx  # Auth route guards
├── context/
│   ├── AppContext.jsx       # Global state (vehicles, bookings, auth)
│   └── AuthContext.jsx      # Authentication logic
├── pages/
│   ├── Home.jsx            # Landing page
│   ├── Fleet.jsx           # Vehicle listing
│   ├── Routes.jsx          # Routes & pricing table
│   ├── Booking.jsx         # 3-step booking form
│   ├── MyBookings.jsx      # Customer booking history
│   ├── Profile.jsx         # User profile edit
│   ├── Login.jsx           # Login page
│   ├── Register.jsx        # Register page
│   └── admin/
│       ├── Dashboard.jsx       # Admin overview stats
│       ├── AdminBookings.jsx   # Manage all bookings
│       ├── AdminVehicles.jsx   # Vehicle CRUD
│       └── AdminUsers.jsx      # User management
└── utils/
    ├── initialData.js      # Seed data (vehicles, routes, users)
    └── storage.js          # localStorage helper functions
```

---

##  Routes

| Path | Page | Access |
|------|------|--------|
| `/` | Home | Public |
| `/fleet` | Fleet | Public |
| `/routes` | Routes & Pricing | Public |
| `/book` | Booking Form | Public |
| `/my-bookings` | My Bookings | Customer only |
| `/profile` | Profile | Customer only |
| `/login` | Login | Public |
| `/register` | Register | Public |
| `/admin` | Admin Dashboard | Admin only |
| `/admin/bookings` | Admin Bookings | Admin only |
| `/admin/vehicles` | Admin Vehicles | Admin only |
| `/admin/users` | Admin Users | Admin only |

---

##  Data Storage

All data is stored in **localStorage** under these keys:

| Key | Description |
|-----|-------------|
| `tt_vehicles` | Vehicle list (5 vehicles) |
| `tt_routes` | Route list with prices (11 routes) |
| `tt_users` | Registered users |
| `tt_bookings` | All bookings |
| `tt_current_user` | Logged in user session |

Data is seeded automatically on first load via `seed()` in AppContext.

---

##  Team

| Member | Role | Responsibilities |
|--------|------|-----------------|
| **Sreylenn** | Lead · Auth & Client Core | Project setup, AuthContext, Navbar, Footer, Home, Fleet, Login, Register, App.jsx routing, Netlify |
| **Ratana** | Client Features & State | AppContext, Toast, Routes page, Booking form, MyBookings, Profile |
| **Thearth** | Admin Panel | ProtectedRoute, AdminSidebar, Admin Dashboard, Admin Bookings, Admin Vehicles, Admin Users |

---

##  Branch Strategy

```
main                        ← Production (final deploy)
└── dev                     ← Integration (team merges here)
      ├── feature/sreylenn-auth
      ├── feature/ratana-booking
      └── feature/thearth-admin
```

**Workflow:**
1. Work on your `feature/*` branch
2. Push and open a Pull Request → `dev`
3. Team reviews and merges
4. When all features done → merge `dev` → `main`

**Commit format:**
```
feat: add login page
fix: booking form validation
style: navbar responsive layout
chore: update README
```

---

## 📋 GitHub Issues

All tasks are tracked as GitHub Issues and assigned to each team member. Each issue corresponds to one file or feature. Close issues using commit messages:

```bash
git commit -m "feat: build Navbar component, closes #2"
```

---

## 🚀 Deployment

This project is configured for **Netlify** deployment.

1. Push `main` branch to GitHub
2. Connect repo to Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`

Add a `netlify.toml` file in the root:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

This ensures React Router works correctly on page refresh.

---

##  License

This project is for educational purposes — CADT Y2T2 Web Design subject.

© 2025 LocalTTaxi — Sreylenn  Ratana  Thearth