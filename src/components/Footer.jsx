import { Link } from 'react-router-dom'

export default function Footer() {
  const servicesLinks = [
    { label: 'Fleet', to: '/fleet' },
    { label: 'Routes', to: '/routes' },
    { label: 'Book Now', to: '/book' },
  ]

  const accountLinks = [
    { label: 'My Bookings', to: '/my-bookings' },
    { label: 'Profile', to: '/profile' },
    { label: 'Login', to: '/login' },
    { label: 'Register', to: '/register' },
  ]

  return (
    <footer className="bg-[#0A0908] border-t border-[#2A2720] mt-auto pt-12 pb-6 px-10">
      <div className="max-w-300 mx-auto">

        {/* Top Row */}
        <div className="flex flex-wrap justify-between items-start gap-8 mb-10">

          {/* Brand */}
          <div className="flex-1 min-w-60">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-[#C9A84C] rounded-sm flex items-center justify-center font-bold text-lg text-black">
                T
              </div>
              <span className="text-xl font-semibold text-[#F0EBE0] tracking-wide">
                LocalT<span className="text-[#C9A84C]">taxi</span>
              </span>
            </div>
            <p className="text-[13px] text-[#8A8070] leading-relaxed">
              Premium private transfers across Cambodia. Safe, comfortable and on time.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-16">
            <div>
              <h4 className="text-[10px] tracking-widest uppercase text-[#C9A84C] mb-4 font-semibold">
                Services
              </h4>
              {servicesLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block text-[13px] text-[#8A8070] mb-2 hover:text-[#F0EBE0] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div>
              <h4 className="text-[10px] tracking-widest uppercase text-[#C9A84C] mb-4 font-semibold">
                Account
              </h4>
              {accountLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block text-[13px] text-[#8A8070] mb-2 hover:text-[#F0EBE0] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="border-t border-[#2A2720] pt-6 flex flex-wrap justify-between items-center gap-3 text-[12px] text-[#4A4438]">
          <p>© 2025 LocalTTaxi. All rights reserved.</p>
          <p>CADT Y2T2 — Web Design Project</p>
        </div>

      </div>
    </footer>
  )
}