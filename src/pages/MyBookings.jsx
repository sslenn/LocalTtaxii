import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const STATUS_STYLES = {
  confirmed: { background: 'rgba(80,160,80,0.15)', color: '#6abf6a', border: '1px solid rgba(80,160,80,0.3)', label: 'CONFIRMED' },
  pending:   { background: 'rgba(201,168,76,0.12)', color: '#c9a84c', border: '1px solid rgba(201,168,76,0.3)', label: 'PENDING' },
  completed: { background: 'rgba(100,130,180,0.12)', color: '#8aaad4', border: '1px solid rgba(100,130,180,0.3)', label: 'COMPLETED' },
  cancelled: { background: 'rgba(180,60,60,0.12)', color: '#d47a7a', border: '1px solid rgba(180,60,60,0.3)', label: 'CANCELLED' },
};

export default function MyBookings() {
  const { currentUser, myBookings, cancelBooking } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) navigate('/login', { state: { from: '/my-bookings' } });
  }, [currentUser]);

  if (!currentUser) return null;

  // Sort newest first
  const sorted = [...myBookings].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const fmtDate = d => d
    ? new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    : '—';

  // Generate short booking ref like #BK-001
  const getRef = (booking, index) =>
    booking.id?.startsWith('#') ? booking.id : `#BK-${String(index + 1).padStart(3, '0')}`;

  return (
    <div style={{ minHeight: '100vh', background: '#0e0d07', color: '#e8e0c8', fontFamily: 'Georgia, serif' }}>

      {/* ── Header ── */}
      <section style={{ padding: '3.5rem 2rem 2.5rem', borderBottom: '1px solid #1a1a0a' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <p style={{ fontSize: 10, letterSpacing: '3px', color: '#7a7055', textTransform: 'uppercase', fontFamily: 'Arial,sans-serif', margin: '0 0 12px' }}>
            YOUR TRANSFERS
          </p>
          <div style={{ width: 28, height: 2, background: '#c9a84c', marginBottom: 16 }} />
          <h1 style={{ fontSize: 34, fontWeight: 'normal', color: '#e8e0c8', margin: 0, letterSpacing: 0.5 }}>
            My Bookings
          </h1>
        </div>
      </section>

      {/* ── Bookings list ── */}
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '28px 2rem 80px' }}>

        {sorted.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#5a5535', fontFamily: 'Arial,sans-serif', fontSize: 14 }}>
            <p style={{ fontSize: 32, marginBottom: 16 }}>🚗</p>
            <p style={{ marginBottom: 8 }}>No bookings yet.</p>
            <button
              onClick={() => navigate('/book')}
              style={{ marginTop: 16, background: '#c9a84c', border: 'none', color: '#0e0d07', padding: '11px 28px', fontSize: 11, fontWeight: 'bold', letterSpacing: '1.5px', cursor: 'pointer', fontFamily: 'Arial,sans-serif', textTransform: 'uppercase' }}
            >
              Book a Transfer
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {sorted.map((booking, index) => {
              const status  = (booking.status || 'pending').toLowerCase();
              const st      = STATUS_STYLES[status] || STATUS_STYLES.pending;
              const ref     = getRef(booking, index);
              const canCancel = status === 'pending' || status === 'confirmed';

              return (
                <div
                  key={booking.id}
                  style={{ background: '#131208', border: '1px solid #1e1c0a', padding: '18px 24px', display: 'flex', alignItems: 'center', gap: 20, transition: 'background 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#181608'}
                  onMouseLeave={e => e.currentTarget.style.background = '#131208'}
                >

                  {/* Ref number */}
                  <span style={{ fontSize: 11, color: '#c9a84c', fontFamily: 'Arial,sans-serif', letterSpacing: '1px', minWidth: 68, fontWeight: 'bold' }}>
                    {ref}
                  </span>

                  {/* Route */}
                  <span style={{ fontSize: 14, color: '#e8e0c8', flex: 1, fontFamily: 'Georgia,serif' }}>
                    {booking.from} <span style={{ color: '#7a7055', margin: '0 4px' }}>→</span> {booking.to}
                  </span>

                  {/* Meta: date · vehicle · pax */}
                  <span style={{ fontSize: 12, color: '#7a7055', fontFamily: 'Arial,sans-serif', whiteSpace: 'nowrap' }}>
                    {fmtDate(booking.date)}
                    {booking.vehicleName && <span> · {booking.vehicleName}</span>}
                    {booking.passengers  && <span> · {booking.passengers} pax</span>}
                  </span>

                  {/* Status badge */}
                  <span style={{ fontSize: 10, fontFamily: 'Arial,sans-serif', letterSpacing: '1px', padding: '3px 10px', background: st.background, color: st.color, border: st.border, whiteSpace: 'nowrap' }}>
                    {st.label}
                  </span>

                  {/* Price */}
                  <span style={{ fontSize: 15, color: '#e8e0c8', fontFamily: 'Arial,sans-serif', fontWeight: 'bold', minWidth: 48, textAlign: 'right' }}>
                    ${booking.price ?? '—'}
                  </span>

                  {/* Cancel button — only for pending/confirmed */}
                  {canCancel && (
                    <button
                      onClick={() => {
                        if (window.confirm('Cancel this booking?')) cancelBooking(booking.id);
                      }}
                      style={{ background: 'transparent', border: '1px solid #2e2a10', color: '#7a7055', fontSize: 10, padding: '4px 10px', cursor: 'pointer', fontFamily: 'Arial,sans-serif', letterSpacing: '1px', textTransform: 'uppercase', whiteSpace: 'nowrap' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = '#c97050'; e.currentTarget.style.color = '#c97050'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = '#2e2a10'; e.currentTarget.style.color = '#7a7055'; }}
                    >
                      Cancel
                    </button>
                  )}

                </div>
              );
            })}
          </div>
        )}

        {/* Book another */}
        {sorted.length > 0 && (
          <div style={{ marginTop: 32, borderTop: '1px solid #1a1a0a', paddingTop: 24 }}>
            <button
              onClick={() => navigate('/booking')}
              style={{ background: '#c9a84c', border: 'none', color: '#0e0d07', padding: '11px 28px', fontSize: 11, fontWeight: 'bold', letterSpacing: '1.5px', cursor: 'pointer', fontFamily: 'Arial,sans-serif', textTransform: 'uppercase' }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              + Book Another Transfer
            </button>
          </div>
        )}

      </div>
    </div>
  );
}