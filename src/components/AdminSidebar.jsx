import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext'

const navItems = [
  { label: 'Dashboard', to: '/admin',           icon: '📊' },
  { label: 'Bookings',  to: '/admin/bookings',  icon: '📋' },
  { label: 'Vehicles',  to: '/admin/vehicles',  icon: '🚗' },
  { label: 'Users',     to: '/admin/users',     icon: '👥' },
]

export default function AdminSidebar() {
  const { currentUser, logout } = useApp()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div style={{
      width: '240px',
      minHeight: '100vh',
      background: '#0D0C0A',
      borderRight: '1px solid #2A2720',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      top: 0,
      left: 0,
    }}>

      {/* Logo */}
      <div style={{
        padding: '24px 20px',
        borderBottom: '1px solid #2A2720',
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{
            width: 30, height: 30,
            background: '#C9A84C',
            borderRadius: '2px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, fontWeight: 700, color: '#000',
          }}>T</div>
          <span style={{ fontSize: 16, fontWeight: 600, color: '#F0EBE0' }}>
            LocalT<span style={{ color: '#C9A84C' }}>taxi</span>
          </span>
        </Link>
        <div style={{
          marginTop: '8px',
          fontSize: 10,
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: '#C9A84C',
        }}>
          Admin Panel
        </div>
      </div>

      {/* User info */}
      <div style={{
        padding: '16px 20px',
        borderBottom: '1px solid #2A2720',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}>
        <div style={{
          width: 32, height: 32,
          borderRadius: '50%',
          background: '#C9A84C',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 13, fontWeight: 700, color: '#000',
        }}>
          {currentUser?.name?.[0]?.toUpperCase()}
        </div>
        <div>
          <div style={{ fontSize: 13, color: '#F0EBE0', fontWeight: 500 }}>
            {currentUser?.name}
          </div>
          <div style={{ fontSize: 10, color: '#8A8070', letterSpacing: '1px', textTransform: 'uppercase' }}>
            Administrator
          </div>
        </div>
      </div>

      {/* Nav Items */}
      <nav style={{ flex: 1, padding: '12px 0' }}>
        {navItems.map(item => {
          const active = location.pathname === item.to
          return (
            <Link key={item.to} to={item.to} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 20px',
              textDecoration: 'none',
              fontSize: 13,
              color: active ? '#F0EBE0' : '#8A8070',
              background: active ? '#1A1714' : 'transparent',
              borderLeft: active ? '2px solid #C9A84C' : '2px solid transparent',
              transition: 'all 0.15s',
            }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.background = '#141210' }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent' }}
            >
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div style={{ padding: '16px 20px', borderTop: '1px solid #2A2720' }}>
        <button onClick={handleLogout} style={{
          width: '100%',
          padding: '10px',
          background: 'transparent',
          border: '1px solid #2A2720',
          borderRadius: '4px',
          color: '#C0392B',
          fontSize: 13,
          cursor: 'pointer',
          transition: 'all 0.15s',
        }}
          onMouseEnter={e => e.currentTarget.style.background = '#1A0A0A'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          Log Out
        </button>
      </div>

    </div>
  )
}