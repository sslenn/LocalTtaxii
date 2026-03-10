import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{
      background: '#0A0908',
      borderTop: '1px solid #2A2720',
      padding: '48px 40px 24px',
      marginTop: 'auto',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
      }}>

        {/* Top row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '40px',
          flexWrap: 'wrap',
          gap: '32px',
        }}>

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
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
            </div>
            <p style={{ fontSize: 13, color: '#8A8070', maxWidth: '240px', lineHeight: 1.6 }}>
              Premium private transfers across Cambodia. Safe, comfortable and on time.
            </p>
          </div>

          {/* Links */}
          <div style={{ display: 'flex', gap: '60px', flexWrap: 'wrap' }}>
            <div>
              <div style={{
                fontSize: 10, letterSpacing: '2px', textTransform: 'uppercase',
                color: '#C9A84C', marginBottom: '16px', fontWeight: 600,
              }}>
                Services
              </div>
              {[
                { label: 'Fleet',    to: '/fleet' },
                { label: 'Routes',   to: '/routes' },
                { label: 'Book Now', to: '/book' },
              ].map(link => (
                <Link key={link.to} to={link.to} style={{
                  display: 'block', fontSize: 13, color: '#8A8070',
                  textDecoration: 'none', marginBottom: '10px',
                }}
                  onMouseEnter={e => e.target.style.color = '#F0EBE0'}
                  onMouseLeave={e => e.target.style.color = '#8A8070'}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div>
              <div style={{
                fontSize: 10, letterSpacing: '2px', textTransform: 'uppercase',
                color: '#C9A84C', marginBottom: '16px', fontWeight: 600,
              }}>
                Account
              </div>
              {[
                { label: 'My Bookings', to: '/my-bookings' },
                { label: 'Profile',     to: '/profile' },
                { label: 'Login',       to: '/login' },
                { label: 'Register',    to: '/register' },
              ].map(link => (
                <Link key={link.to} to={link.to} style={{
                  display: 'block', fontSize: 13, color: '#8A8070',
                  textDecoration: 'none', marginBottom: '10px',
                }}
                  onMouseEnter={e => e.target.style.color = '#F0EBE0'}
                  onMouseLeave={e => e.target.style.color = '#8A8070'}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div style={{
          borderTop: '1px solid #2A2720',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}>
          <p style={{ fontSize: 12, color: '#4A4438' }}>
            © 2025 LocalTTaxi. All rights reserved.
          </p>
          <p style={{ fontSize: 12, color: '#4A4438' }}>
            CADT Y2T2 — Web Design Project
          </p>
        </div>

      </div>
    </footer>
  )
}