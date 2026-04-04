import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('tt_current_user')
    if (saved) setUser(JSON.parse(saved))
    setLoading(false)
  }, [])

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('tt_users')) || []
    const found = users.find(u => u.email === email && u.password === password)
    if (!found) return { success: false, message: 'Invalid email or password.' }
    localStorage.setItem('tt_current_user', JSON.stringify(found))
    setUser(found)
    return { success: true, user: found }
  }

  const register = (data) => {
    const users = JSON.parse(localStorage.getItem('tt_users')) || []
    if (users.find(u => u.email === data.email)) {
      return { success: false, message: 'Email already registered.' }
    }
    const newUser = {
      id: 'u' + Date.now(),
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone || '',
      role: 'customer',
      createdAt: new Date().toISOString(),
    }
    localStorage.setItem('tt_users', JSON.stringify([...users, newUser]))
    localStorage.setItem('tt_current_user', JSON.stringify(newUser))
    setUser(newUser)
    return { success: true, user: newUser }
  }

  const logout = () => {
    localStorage.removeItem('tt_current_user')
    setUser(null)
  }

  const updateProfile = (data) => {
    const users = JSON.parse(localStorage.getItem('tt_users')) || []
    const updated = { ...user, ...data }
    const newUsers = users.map(u => u.id === user.id ? updated : u)
    localStorage.setItem('tt_users', JSON.stringify(newUsers))
    localStorage.setItem('tt_current_user', JSON.stringify(updated))
    setUser(updated)
    return { success: true }
  }

  const value = { user, loading, login, register, logout, updateProfile }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)