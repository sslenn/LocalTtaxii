export const initialVehicles = [
  {id: "v1", name: "SUV",              model: "Toyota Fortuner",     seats: 7,  luggage: 3, type: "Standard", image: "/src/assets/SUV.png",         price_tag: "$79+",  available: true, description: "Reliable and spacious SUV perfect for group travel across Cambodia.",},
  {id: "v2", name: "Starex",           model: "Hyundai Starex",      seats: 10, luggage: 5, type: "Van",      image: "/src/assets/starex.png",      price_tag: "$89+",  available: true, description: "Large capacity van ideal for families and groups with lots of luggage.",},
  {id: "v3", name: "Alphard",          model: "Toyota Alphard",      seats: 7,  luggage: 4, type: "Premium",  image: "/src/assets/alphard.png",     price_tag: "$99+",  available: true, description: "Premium MPV delivering first-class comfort for executive transfers.",},
  {id: "v4", name: "Alphard 2012",     model: "Toyota Alphard 2012", seats: 7,  luggage: 4, type: "Business", image: "/src/assets/alphard2012.png", price_tag: "$109+", available: true, description: "Business class travel with refined comfort and ample space.",},
  {id: "v5", name: "VIP Alphard 2020", model: "Toyota Alphard 2020", seats: 7,  luggage: 4, type: "VIP",      image: "/src/assets/alphard2020.png", price_tag: "$189+", available: true, description: "Our flagship VIP vehicle with ultra-luxury interior and privacy screens.",},
]

export const initialRoutes = [
  { id: 'r1',  from: 'Phnom Penh',    to: 'Sihanoukville',     prices: { v1: 79,  v2: 109, v3: 99,  v4: 109, v5: 219 } },
  { id: 'r2',  from: 'Phnom Penh',    to: 'Siem Reap',         prices: { v1: 79,  v2: 109, v3: 109, v4: 139, v5: 349 } },
  { id: 'r3',  from: 'Phnom Penh',    to: 'Battambang',        prices: { v1: 89,  v2: 119, v3: 119, v4: 149, v5: 349 } },
  { id: 'r4',  from: 'Phnom Penh',    to: 'Kampot / Kep',      prices: { v1: 59,  v2: 89,  v3: 89,  v4: 109, v5: 189 } },
  { id: 'r5',  from: 'Phnom Penh',    to: 'Poipet',            prices: { v1: 109, v2: 149, v3: 149, v4: 199, v5: 419 } },
  { id: 'r6',  from: 'Phnom Penh',    to: 'Bavet',             prices: { v1: 59,  v2: 89,  v3: 89,  v4: 109, v5: 179 } },
  { id: 'r7',  from: 'Phnom Penh',    to: 'ChreyThom',         prices: { v1: 49,  v2: 79,  v3: 79,  v4: 89,  v5: 179 } },
  { id: 'r8',  from: 'Poipet',        to: 'Siem Reap Airport', prices: { v1: 69,  v2: 89,  v3: 89,  v4: 199, v5: 249 } },
  { id: 'r9',  from: 'Sihanoukville', to: 'Poipet',            prices: { v1: 169, v2: 249, v3: 249, v4: 279, v5: 599 } },
  { id: 'r10', from: 'Sihanoukville', to: 'Bavet',             prices: { v1: 129, v2: 189, v3: 189, v4: 209, v5: 309 } },
  { id: 'r11', from: 'Siem Reap',     to: 'Sihanoukville',     prices: { v1: 149, v2: 209, v3: 209, v4: 229, v5: 549 } },
]

export const initialUsers = [
  { id: 'admin1', name: 'Admin', email: 'admin@localttaxi.com', password: 'admin123',    phone: '+855 12 000 000', role: 'admin',    createdAt: new Date('2024-01-01').toISOString() },
  { id: 'u1',     name: 'User1', email: 'user1@example.com',    password: 'password123', phone: '+855 17 234 567', role: 'customer', createdAt: new Date('2024-03-10').toISOString() },
  { id: 'u2',     name: 'User2', email: 'user2@example.com',    password: 'password123', phone: '+855 89 526 951', role: 'customer', createdAt: new Date('2024-04-05').toISOString() },
  { id: 'u3',     name: 'User3', email: 'user3@example.com',    password: 'password123', phone: '+855 77 312 456', role: 'customer', createdAt: new Date('2024-03-01').toISOString() },
  { id: 'u4',     name: 'User4', email: 'user4@example.com',    password: 'password123', phone: '+855 96 145 788', role: 'customer', createdAt: new Date('2024-02-20').toISOString() },
  { id: 'u5',     name: 'User5', email: 'user5@example.com',    password: 'password123', phone: '+855 11 987 654', role: 'customer', createdAt: new Date('2024-04-15').toISOString() },
]

export const initialBookings = []