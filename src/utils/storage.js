import { initialVehicles, initialRoutes, initialUsers, initialBookings } from './initialData'

const KEYS = {
  vehicles: 'tt_vehicles',
  routes:   'tt_routes',
  users:    'tt_users',
  bookings: 'tt_bookings',
}

export function seedData() {
  if (!localStorage.getItem(KEYS.vehicles)) localStorage.setItem(KEYS.vehicles, JSON.stringify(initialVehicles))
  if (!localStorage.getItem(KEYS.routes))   localStorage.setItem(KEYS.routes,   JSON.stringify(initialRoutes))
  if (!localStorage.getItem(KEYS.users))    localStorage.setItem(KEYS.users,    JSON.stringify(initialUsers))
  if (!localStorage.getItem(KEYS.bookings)) localStorage.setItem(KEYS.bookings, JSON.stringify(initialBookings))
}

export const getVehicles  = ()  => JSON.parse(localStorage.getItem(KEYS.vehicles)) || []
export const saveVehicles = (v) => localStorage.setItem(KEYS.vehicles, JSON.stringify(v))

export const getRoutes    = ()  => JSON.parse(localStorage.getItem(KEYS.routes))   || []
export const saveRoutes   = (r) => localStorage.setItem(KEYS.routes,   JSON.stringify(r))

export const getUsers     = ()  => JSON.parse(localStorage.getItem(KEYS.users))    || []
export const saveUsers    = (u) => localStorage.setItem(KEYS.users,    JSON.stringify(u))

export const getBookings  = ()  => JSON.parse(localStorage.getItem(KEYS.bookings)) || []
export const saveBookings = (b) => localStorage.setItem(KEYS.bookings, JSON.stringify(b))