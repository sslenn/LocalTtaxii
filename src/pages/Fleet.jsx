import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import Footer from '../components/Footer'

export default function Fleet() {
  const { vehicles } = useApp()
  const navigate = useNavigate()

  return (
    <div style={{ background: '#0A0908', minHeight: '100vh' }}>

      {/* ── Header ── */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '64px 40px 48px',
      }}>
        <div style={{
          fontSize: 10, letterSpacing: '3px', textTransform: 'uppercase',
          color: '#C9A84C', marginBottom: '12px',
        }}>
          Our Fleet
        </div>
        <h1 style={{
          fontSize: 42, fontWeight: 300,
          color: '#F0EBE0', marginBottom: '12px',
        }}>
          Choose Your Vehicle
        </h1>
        <p style={{ fontSize: 14, color: '#8A8070', maxWidth: '480px', lineHeight: 1.7 }}>
          From budget-friendly SUVs to ultra-luxury VIP transfers — we have the perfect vehicle for every journey.
        </p>
      </section>

      {/* ── Vehicle Grid ── */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 40px 80px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '16px',
      }}>
        {vehicles.map(v => (
          <div key={v.id} style={{
            background: '#141210',
            border: '1px solid #2A2720',
            borderRadius: '6px',
            overflow: 'hidden',
            transition: 'border-color 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor = '#C9A84C'}
            onMouseLeave={e => e.currentTarget.style.borderColor = '#2A2720'}
          >
            {/* Vehicle emoji banner */}
            <div style={{
              background: '#1A1714',
              padding: '32px',
              textAlign: 'center',
              fontSize: 64,
              borderBottom: '1px solid #2A2720',
            }}>
              {v.emoji}
            </div>

            {/* Info */}
            <div style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 600, color: '#F0EBE0' }}>
                    {v.name}
                  </div>
                  <div style={{ fontSize: 12, color: '#8A8070', marginTop: '2px' }}>
                    {v.model}
                  </div>
                </div>
                <div style={{
                  fontSize: 11,
                  padding: '4px 10px',
                  background: '#0A0908',
                  border: '1px solid #2A2720',
                  borderRadius: '20px',
                  color: '#C9A84C',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                }}>
                  {v.type}
                </div>
              </div>

              <p style={{
                fontSize: 13, color: '#8A8070',
                lineHeight: 1.6, marginBottom: '20px',
              }}>
                {v.description}
              </p>

              {/* Specs */}
              <div style={{
                display: 'flex', gap: '20px',
                padding: '16px 0',
                borderTop: '1px solid #2A2720',
                borderBottom: '1px solid #2A2720',
                marginBottom: '20px',
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 18, marginBottom: '4px' }}>👥</div>
                  <div style={{ fontSize: 12, color: '#F0EBE0', fontWeight: 600 }}>{v.seats}</div>
                  <div style={{ fontSize: 10, color: '#8A8070' }}>Seats</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 18, marginBottom: '4px' }}>🧳</div>
                  <div style={{ fontSize: 12, color: '#F0EBE0', fontWeight: 600 }}>{v.luggage}</div>
                  <div style={{ fontSize: 10, color: '#8A8070' }}>Bags</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 18, marginBottom: '4px' }}>✅</div>
                  <div style={{ fontSize: 12, color: v.available ? '#27AE60' : '#C0392B', fontWeight: 600 }}>
                    {v.available ? 'Yes' : 'No'}
                  </div>
                  <div style={{ fontSize: 10, color: '#8A8070' }}>Available</div>
                </div>
                <div style={{ textAlign: 'center', marginLeft: 'auto' }}>
                  <div style={{ fontSize: 20, color: '#C9A84C', fontWeight: 700 }}>
                    {v.price_tag}
                  </div>
                  <div style={{ fontSize: 10, color: '#8A8070' }}>Starting from</div>
                </div>
              </div>

              {/* Book button */}
              <button
                onClick={() => navigate('/book', { state: { vehicleId: v.id } })}
                disabled={!v.available}
                style={{
                  width: '100%', padding: '12px',
                  background: v.available ? '#C9A84C' : '#2A2720',
                  border: 'none', borderRadius: '4px',
                  color: v.available ? '#000' : '#4A4438',
                  fontSize: 13, fontWeight: 700,
                  letterSpacing: '1px', textTransform: 'uppercase',
                  cursor: v.available ? 'pointer' : 'not-allowed',
                }}
              >
                {v.available ? 'Book This Vehicle' : 'Unavailable'}
              </button>
            </div>
          </div>
        ))}
      </section>

    </div>
  )
}