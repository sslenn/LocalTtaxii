import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function Navbar() {
  const { currentUser, logout } = useApp()
  const navigate = useNavigate()
  const location = useLocation()
  const [open, setOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
    setOpen(false)
  }

  const isAdmin = currentUser?.role === 'admin'

  const navLinks = [
    { label: 'Fleet',    to: '/fleet' },
    { label: 'Routes',   to: '/routes' },
    { label: 'Book Now', to: '/book', gold: true },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: '#0A0908',
      borderBottom: '1px solid #2A2720',
      height: '64px',
      display: 'flex',
      alignItems: 'center',
      padding: '0 40px',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>

        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{
            width: 32, height: 32,
            background: '#C9A84C',
            borderRadius: '2px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, fontWeight: 700, color: '#000',
          }}>T</div>
          <span style={{ fontSize: 20, fontWeight: 600, color: '#F0EBE0', letterSpacing: 1 }}>
            LocalT<span style={{ color: '#C9A84C' }}>taxi</span>
          </span>
        </Link>

        {/* Nav Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          {navLinks.map(link => (
            <Link key={link.to} to={link.to} style={{
              fontSize: 12,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              fontWeight: 500,
              textDecoration: 'none',
              color: link.gold ? '#C9A84C' : isActive(link.to) ? '#F0EBE0' : '#8A8070',
              borderBottom: isActive(link.to) ? '1px solid #C9A84C' : 'none',
              paddingBottom: '2px',
              transition: 'color 0.2s',
            }}>
              {link.label}
            </Link>
          ))}

          {/* Logged in */}
          {currentUser ? (
            <div style={{ position: 'relative' }}>
              <button onClick={() => setOpen(!open)} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: '#1A1714',
                border: '1px solid #2A2720',
                borderRadius: '4px',
                padding: '8px 14px',
                cursor: 'pointer',
                color: '#F0EBE0',
              }}>
                <div style={{
                  width: 24, height: 24, borderRadius: '50%',
                  background: '#C9A84C',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 600, color: '#000',
                }}>
                  {currentUser.name?.[0]?.toUpperCase()}
                </div>
                <span style={{ fontSize: 13 }}>{currentUser.name}</span>
                <span style={{ fontSize: 10, color: '#8A8070' }}>▾</span>
              </button>

              {/* Dropdown */}
              {open && (
                <div style={{
                  position: 'absolute', top: '110%', right: 0,
                  background: '#1A1714',
                  border: '1px solid #2A2720',
                  borderRadius: '4px',
                  minWidth: 160,
                  padding: '8px 0',
                  zIndex: 1000,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                }}>
                  {isAdmin && (
                    <DropItem label="Admin Panel" to="/admin" onClick={() => setOpen(false)} />
                  )}
                  <DropItem label="My Bookings" to="/my-bookings" onClick={() => setOpen(false)} />
                  <DropItem label="Profile"     to="/profile"     onClick={() => setOpen(false)} />
                  <div style={{ borderTop: '1px solid #2A2720', margin: '8px 0' }} />
                  <button onClick={handleLogout} style={{
                    width: '100%', background: 'none', border: 'none',
                    padding: '10px 20px', textAlign: 'left',
                    fontSize: 13, color: '#C0392B', cursor: 'pointer',
                  }}>
                    Log Out
                  </button>
                </div>
              )}
            </div>

          ) : (
            // Not logged in
            <div style={{ display: 'flex', gap: '10px' }}>
              <Link to="/login" style={{
                fontSize: 13, color: '#8A8070', textDecoration: 'none',
                padding: '8px 16px',
                border: '1px solid #2A2720',
                borderRadius: '4px',
              }}>
                Log In
              </Link>
              <Link to="/register" style={{
                fontSize: 13, color: '#000', textDecoration: 'none',
                padding: '8px 16px',
                background: '#C9A84C',
                borderRadius: '4px',
                fontWeight: 600,
              }}>
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

function DropItem({ label, to, onClick }) {
  return (
    <Link to={to} onClick={onClick} style={{
      display: 'block',
      padding: '10px 20px',
      fontSize: 13,
      color: '#F0EBE0',
      textDecoration: 'none',
    }}
      onMouseEnter={e => e.target.style.background = '#2A2720'}
      onMouseLeave={e => e.target.style.background = 'transparent'}
    >
      {label}
    </Link>
  )
}