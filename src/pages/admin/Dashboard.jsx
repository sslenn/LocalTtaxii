import { useApp } from '../../context/AppContext';
import { Link } from 'react-router-dom';

const STATUS_STYLE = {
  confirmed: { background: 'rgba(80,160,80,0.15)', color: '#6abf6a', border: '1px solid rgba(80,160,80,0.35)' },
  pending:   { background: 'rgba(201,168,76,0.12)', color: '#c9a84c', border: '1px solid rgba(201,168,76,0.35)' },
  completed: { background: 'rgba(100,130,180,0.12)', color: '#8aaad4', border: '1px solid rgba(100,130,180,0.35)' },
  cancelled: { background: 'rgba(180,60,60,0.12)',  color: '#d47a7a', border: '1px solid rgba(180,60,60,0.35)'  },
};

export default function AdminDashboard() {
  const { stats, bookings, vehicles, users } = useApp();

  const recent = [...bookings]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 10);

  const activeVehicles = vehicles.filter(v => v.available !== false).length;
  const totalCustomers = users.filter(u => u.role !== 'admin').length;

  const fmtDate = d => d
    ? new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })
    : '—';

  const getRef = (index) => `#BK-${String(index + 1).padStart(3, '0')}`;

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0900',
      color: '#e8e0c8',
      fontFamily: 'Georgia, serif',
      padding: '40px 40px 80px',
    }}>

      {/* ── Header ── */}
      <div style={{ marginBottom: 36 }}>
        <p style={{ fontSize: 10, letterSpacing: '3px', color: '#7a7055', textTransform: 'uppercase', fontFamily: 'Arial,sans-serif', margin: '0 0 10px' }}>
          OVERVIEW
        </p>
        <div style={{ width: 28, height: 2, background: '#c9a84c', marginBottom: 14 }} />
        <h1 style={{ fontSize: 38, fontWeight: 'normal', color: '#e8e0c8', margin: 0, fontFamily: 'Georgia,serif', letterSpacing: 0.5 }}>
          Dashboard
        </h1>
      </div>

      {/* ── Stat cards ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 36 }}>
        {[
          { label: 'TOTAL REVENUE',    value: `$${stats.totalRevenue?.toLocaleString() ?? 0}`, sub: 'This month' },
          { label: 'TOTAL BOOKINGS',   value: stats.totalBookings ?? 0,                         sub: 'All time'   },
          { label: 'ACTIVE VEHICLES',  value: activeVehicles,                                   sub: 'Fleet size' },
          { label: 'REGISTERED USERS', value: totalCustomers,                                   sub: 'Customers'  },
        ].map(card => (
          <div key={card.label} style={{ background: '#111008', border: '1px solid #1e1c08', padding: '24px 22px' }}>
            <p style={{ fontSize: 9, letterSpacing: '2.5px', color: '#5a5535', textTransform: 'uppercase', fontFamily: 'Arial,sans-serif', margin: '0 0 14px' }}>
              {card.label}
            </p>
            <p style={{ fontSize: 32, color: '#e8e0c8', margin: '0 0 6px', fontFamily: 'Georgia,serif', fontWeight: 'normal' }}>
              {card.value}
            </p>
            <p style={{ fontSize: 11, color: '#5a5535', fontFamily: 'Arial,sans-serif', margin: 0 }}>
              {card.sub}
            </p>
          </div>
        ))}
      </div>

      {/* ── Recent Bookings table ── */}
      <div style={{ background: '#111008', border: '1px solid #1e1c08', overflow: 'hidden' }}>

        {/* Table title bar */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #1a1900', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontSize: 10, letterSpacing: '2.5px', color: '#7a7055', textTransform: 'uppercase', fontFamily: 'Arial,sans-serif', margin: 0 }}>
            RECENT BOOKINGS
          </p>
          <Link to="/admin/bookings" style={{ fontSize: 11, letterSpacing: '1px', color: '#c9a84c', textTransform: 'uppercase', textDecoration: 'none', fontFamily: 'Arial,sans-serif' }}>
            VIEW ALL →
          </Link>
        </div>

        {/* Column headers */}
        <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr 1fr 100px 90px 80px 120px', padding: '10px 20px', background: '#0e0d06', borderBottom: '1px solid #1a1900' }}>
          {['ID', 'CUSTOMER', 'ROUTE', 'VEHICLE', 'DATE', 'AMOUNT', 'STATUS'].map(h => (
            <span key={h} style={{ fontSize: 9, letterSpacing: '2px', color: '#5a5535', textTransform: 'uppercase', fontFamily: 'Arial,sans-serif' }}>
              {h}
            </span>
          ))}
        </div>

        {/* Rows */}
        {recent.length === 0 ? (
          <div style={{ padding: '40px 20px', textAlign: 'center', color: '#5a5535', fontFamily: 'Arial,sans-serif', fontSize: 13 }}>
            No bookings yet.
          </div>
        ) : (
          recent.map((b, i) => {
            const status = (b.status || 'pending').toLowerCase();
            const st = STATUS_STYLE[status] || STATUS_STYLE.pending;
            const fromShort = b.from ? b.from.split(' ').map(w => w[0]).join('') : '?';
            return (
              <div
                key={b.id}
                style={{ display: 'grid', gridTemplateColumns: '120px 1fr 1fr 100px 90px 80px 120px', padding: '14px 20px', borderBottom: '1px solid #161505', alignItems: 'center', transition: 'background 0.15s', cursor: 'default' }}
                onMouseEnter={e => e.currentTarget.style.background = '#141200'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <span style={{ fontSize: 12, color: '#c9a84c', fontFamily: 'Arial,sans-serif', letterSpacing: '0.5px' }}>
                  {getRef(bookings.length - 1 - i)}
                </span>
                <span style={{ fontSize: 13, color: '#e8e0c8', fontFamily: 'Georgia,serif' }}>
                  {b.customerName || b.userName || '—'}
                </span>
                <span style={{ fontSize: 13, color: '#c8c0a8', fontFamily: 'Georgia,serif' }}>
                  {b.from && b.to
                    ? <>{fromShort} <span style={{ color: '#5a5535', margin: '0 4px' }}>→</span> {b.to}</>
                    : b.routeLabel || '—'
                  }
                </span>
                <span style={{ fontSize: 12, color: '#9a9070', fontFamily: 'Arial,sans-serif' }}>
                  {b.vehicleName || '—'}
                </span>
                <span style={{ fontSize: 12, color: '#9a9070', fontFamily: 'Arial,sans-serif' }}>
                  {fmtDate(b.date)}
                </span>
                <span style={{ fontSize: 13, color: '#e8e0c8', fontFamily: 'Arial,sans-serif' }}>
                  ${b.price ?? '—'}
                </span>
                <span style={{ fontSize: 10, fontFamily: 'Arial,sans-serif', letterSpacing: '1px', padding: '3px 10px', textTransform: 'uppercase', display: 'inline-block', ...st }}>
                  {status}
                </span>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}