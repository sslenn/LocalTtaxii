import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext'

const navItems = [
  { label: 'Dashboard', to: '/admin',           icon: '📊' },
  { label: 'Bookings',  to: '/admin/bookings',  icon: '📋' },
  { label: 'Vehicles',  to: '/admin/vehicles',  icon: '🚖' },
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
    <div className="w-60 min-h-screen bg-[#0D0C0A] border-r border-[#2A2720] flex flex-col fixed top-0 left-0">

      {/* Logo */}
      <div className="p-6 border-b border-[#2A2720]">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-[#C9A84C] rounded-sm flex items-center justify-center font-bold text-[16px] text-black">
            T
          </div>
          <span className="text-[16px] font-semibold text-[#F0EBE0]">
            LocalT<span className="text-[#C9A84C]">taxi</span>
          </span>
        </Link>
        <div className="mt-2 text-[10px] tracking-widest uppercase text-[#C9A84C]">
          Admin Panel
        </div>
      </div>

      {/* User info */}
      <div className="p-4 border-b border-[#2A2720] flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full bg-[#C9A84C] flex items-center justify-center font-bold text-[13px] text-black">
          {currentUser?.name?.[0]?.toUpperCase()}
        </div>
        <div>
          <div className="text-[13px] font-medium text-[#F0EBE0]">
            {currentUser?.name}
          </div>
          <div className="text-[10px] text-[#8A8070] tracking-[1px] uppercase">
            Administrator
          </div>
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 py-3">
        {navItems.map(item => {
          const active = location.pathname === item.to
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-5 py-3 text-[13px] transition-all
                ${active ? 'text-[#F0EBE0] bg-[#1A1714] border-l-2 border-[#C9A84C]' : 'text-[#8A8070] border-l-2 border-transparent'}
                hover:bg-[#141210]`}
            >
              <span className="text-[16px]">{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-[#2A2720]">
        <button
          onClick={handleLogout}
          className="w-full px-3 py-2 border border-[#2A2720] rounded text-[#C0392B] text-[13px] transition-all hover:bg-[#1A0A0A]"
        >
          Log Out
        </button>
      </div>

    </div>
  )
}