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
    <nav className="sticky top-0 z-50 bg-[#0A0908] border-b border-[#2A2720] h-16 flex items-center px-10">
      <div className="w-full max-w-[1200px] mx-auto flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 no-underline">
          <div className="w-8 h-8 bg-[#C9A84C] rounded-sm flex items-center justify-center font-bold text-lg text-black">
            T
          </div>
          <span className="text-xl font-semibold text-[#F0EBE0] tracking-wide">
            LocalT<span className="text-[#C9A84C]">taxi</span>
          </span>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-8">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-xs font-medium uppercase tracking-wide transition-colors pb-0.5
                ${link.gold ? 'text-[#C9A84C]' : isActive(link.to) ? 'text-[#F0EBE0] border-b border-[#C9A84C]' : 'text-[#8A8070]'}
              `}
            >
              {link.label}
            </Link>
          ))}

          {/* Logged in */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 bg-[#1A1714] border border-[#2A2720] rounded px-3 py-1.5 text-[#F0EBE0] cursor-pointer"
              >
                {/* Avatar */}
                <div className="w-7 h-7 rounded-full bg-[#C9A84C] flex items-center justify-center text-[11px] font-semibold text-black overflow-hidden shrink-0">
                  {currentUser.avatar
                    ? <img src={currentUser.avatar} alt="avatar" className="w-full h-full object-cover" />
                    : currentUser.name?.[0]?.toUpperCase()
                  }
                </div>
                <span className="text-sm">{currentUser.name}</span>
                <span className="text-[10px] text-[#8A8070]">▾</span>
              </button>

              {/* Dropdown */}
              {open && (
                <div className="absolute top-[110%] right-0 bg-[#1A1714] border border-[#2A2720] rounded min-w-[160px] py-2 shadow-lg z-50">
                  {isAdmin && <DropItem label="Admin Panel" to="/admin" onClick={() => setOpen(false)} />}
                  <DropItem label="My Bookings" to="/my-bookings" onClick={() => setOpen(false)} />
                  <DropItem label="Profile" to="/profile" onClick={() => setOpen(false)} />
                  <div className="border-t border-[#2A2720] my-2" />
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-5 py-2 text-sm text-red-600 cursor-pointer hover:bg-[#2A2720]"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-2">
              <Link
                to="/login"
                className="text-sm text-[#8A8070] border border-[#2A2720] rounded px-4 py-2 hover:bg-[#2A2720] transition"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="text-sm text-black bg-[#C9A84C] rounded px-4 py-2 font-semibold hover:brightness-105 transition"
              >
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
    <Link
      to={to}
      onClick={onClick}
      className="block px-5 py-2 text-sm text-[#F0EBE0] hover:bg-[#2A2720] transition-colors"
    >
      {label}
    </Link>
  )
}