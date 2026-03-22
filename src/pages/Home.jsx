import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import Footer from '../components/Footer'

export default function Home() {
  const { vehicles } = useApp()

  return (
    <div style={{ background: '#0A0908', minHeight: '100vh' }}>

      {/* ── Hero ── */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '100px 40px 80px',
        textAlign: 'center',
      }}>
        <div style={{
          fontSize: 11, letterSpacing: '3px', textTransform: 'uppercase',
          color: '#C9A84C', marginBottom: '20px',
        }}>
          Premium Private Transfers · Cambodia
        </div>
        <h1 style={{
          fontSize: 'clamp(36px, 6vw, 72px)',
          fontWeight: 300,
          color: '#F0EBE0',
          lineHeight: 1.1,
          marginBottom: '24px',
          letterSpacing: '-1px',
        }}>
          Travel Cambodia<br />
          <span style={{ color: '#C9A84C' }}>in Comfort</span>
        </h1>
        <p style={{
          fontSize: 16, color: '#8A8070',
          maxWidth: '480px', margin: '0 auto 40px',
          lineHeight: 1.7,
        }}>
          Fixed prices, premium vehicles and reliable service across 11 routes nationwide.
        </p>
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/book" style={{
            padding: '14px 36px',
            background: '#C9A84C',
            color: '#000', fontWeight: 700,
            fontSize: 13, letterSpacing: '1.5px',
            textTransform: 'uppercase',
            textDecoration: 'none',
            borderRadius: '4px',
          }}>
            Book Now
          </Link>
          <Link to="/routes" style={{
            padding: '14px 36px',
            background: 'transparent',
            border: '1px solid #2A2720',
            color: '#F0EBE0',
            fontSize: 13, letterSpacing: '1.5px',
            textTransform: 'uppercase',
            textDecoration: 'none',
            borderRadius: '4px',
          }}>
            View Routes
          </Link>
        </div>
      </section>

      {/* ── Highlights ── */}
      <section style={{
        borderTop: '1px solid #2A2720',
        borderBottom: '1px solid #2A2720',
        padding: '40px',
      }}>
        <div style={{
          maxWidth: '1200px', margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '32px',
        }}>
          {[
            { icon: '💰', title: 'Fixed Pricing',    sub: 'No hidden fees or surprises' },
            { icon: '🛡️', title: 'Safe & Verified',  sub: 'Professional licensed drivers' },
            { icon: '🚗', title: '5 Vehicle Classes', sub: 'SUV to VIP Alphard' },
            { icon: '🕐', title: '24/7 Service',      sub: 'Available any time, any day' },
          ].map((item, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: '10px' }}>{item.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#F0EBE0', marginBottom: '6px' }}>
                {item.title}
              </div>
              <div style={{ fontSize: 12, color: '#8A8070' }}>{item.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Fleet Preview ── */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{
            fontSize: 10, letterSpacing: '3px', textTransform: 'uppercase',
            color: '#C9A84C', marginBottom: '12px',
          }}>
            Our Fleet
          </div>
          <h2 style={{ fontSize: 36, fontWeight: 300, color: '#F0EBE0' }}>
            Choose Your Vehicle
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          marginBottom: '40px',
        }}>
          {vehicles.slice(0, 4).map(v => (
            <div key={v.id} style={{
              background: '#141210',
              border: '1px solid #2A2720',
              borderRadius: '6px',
              padding: '24px',
              transition: 'border-color 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#C9A84C'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#2A2720'}
            >
              <div style={{ fontSize: 36, marginBottom: '12px' }}>{v.emoji}</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#F0EBE0', marginBottom: '4px' }}>
                {v.name}
              </div>
              <div style={{ fontSize: 12, color: '#8A8070', marginBottom: '12px' }}>
                {v.model}
              </div>
              <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                <span style={{ fontSize: 11, color: '#8A8070' }}>👥 {v.seats} seats</span>
                <span style={{ fontSize: 11, color: '#8A8070' }}>🧳 {v.luggage} bags</span>
              </div>
              <div style={{ fontSize: 13, color: '#C9A84C', fontWeight: 600 }}>
                From {v.price_tag}
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <Link to="/fleet" style={{
            fontSize: 13, color: '#C9A84C',
            textDecoration: 'none', letterSpacing: '1px',
            borderBottom: '1px solid #C9A84C', paddingBottom: '2px',
          }}>
            View All Vehicles →
          </Link>
        </div>
      </section>

      {/* ── CTA Strip ── */}
      <section style={{
        background: '#141210',
        borderTop: '1px solid #2A2720',
        borderBottom: '1px solid #2A2720',
        padding: '60px 40px',
        textAlign: 'center',
      }}>
        <h2 style={{ fontSize: 32, fontWeight: 300, color: '#F0EBE0', marginBottom: '12px' }}>
          Ready to Travel?
        </h2>
        <p style={{ fontSize: 14, color: '#8A8070', marginBottom: '28px' }}>
          Book your private transfer in minutes. Fixed price, no surprises.
        </p>
        <Link to="/book" style={{
          padding: '14px 40px',
          background: '#C9A84C',
          color: '#000', fontWeight: 700,
          fontSize: 13, letterSpacing: '1.5px',
          textTransform: 'uppercase',
          textDecoration: 'none',
          borderRadius: '4px',
        }}>
          Book Now
        </Link>
      </section>

    
    </div>
  )
}