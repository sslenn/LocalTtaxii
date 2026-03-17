import { useState } from 'react';
import { useApp } from '../../context/AppContext';

const STATUS_STYLE = {
  confirmed: { background: 'rgba(80,160,80,0.15)', color: '#6abf6a', border: '1px solid rgba(80,160,80,0.35)' },
  pending:   { background: 'rgba(201,168,76,0.12)', color: '#c9a84c', border: '1px solid rgba(201,168,76,0.35)' },
  completed: { background: 'rgba(100,130,180,0.12)', color: '#8aaad4', border: '1px solid rgba(100,130,180,0.35)' },
  cancelled: { background: 'rgba(180,60,60,0.12)',  color: '#d47a7a', border: '1px solid rgba(180,60,60,0.35)'  },
};

export default function AdminBookings() {
  const { bookings, updateBookingStatus } = useApp();

  const [statusFilter, setStatusFilter] = useState('all');
  const [search,       setSearch]       = useState('');

  const sorted = [...bookings].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const filtered = sorted.filter(b => {
    const matchStatus = statusFilter === 'all' || b.status === statusFilter;
    const q = search.toLowerCase();
    const matchSearch = !q
      || (b.customerName || b.userName || '').toLowerCase().includes(q)
      || (b.from || '').toLowerCase().includes(q)
      || (b.to   || '').toLowerCase().includes(q)
      || (b.vehicleName || '').toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  const fmtDate = d => d
    ? new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })
    : '—';

  const getRef = (i) => `#BK-${String(i + 1).padStart(3, '0')}`;

  const fromShort = from => from ? from.split(' ').map(w => w[0]).join('') : '?';

  return (
    <div style={{ minHeight: '100vh', background: '#0a0900', color: '#e8e0c8', fontFamily: 'Georgia, serif', padding: '40px 40px 80px' }}>

      {/* ── Header ── */}
      <div style={{ marginBottom: 36 }}>
        <p style={{ fontSize: 10, letterSpacing: '3px', color: '#7a7055', textTransform: 'uppercase', fontFamily: 'Arial,sans-serif', margin: '0 0 10px' }}>
          MANAGEMENT
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <div style={{ width: 28, height: 2, background: '#c9a84c', marginBottom: 14 }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <h1 style={{ fontSize: 38, fontWeight: 'normal', color: '#e8e0c8', margin: 0, fontFamily: 'Georgia,serif', letterSpacing: 0.5 }}>
            All Bookings
          </h1>
          {/* Filters */}
          <div style={{ display: 'flex', gap: 10 }}>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              style={{ background: '#111008', border: '1px solid #2a2810', color: '#e8e0c8', fontSize: 12, padding: '8px 14px', outline: 'none', fontFamily: 'Arial,sans-serif', cursor: 'pointer', appearance: 'none', WebkitAppearance: 'none' }}
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ background: '#111008', border: '1px solid #2a2810', color: '#e8e0c8', fontSize: 12, padding: '8px 14px', outline: 'none', fontFamily: 'Arial,sans-serif', width: 180 }}
            />
          </div>
        </div>
      </div>

      {/* ── Table ── */}
      <div style={{ border: '1px solid #1e1c08', overflow: 'hidden' }}>

        {/* Column headers */}
        <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr 1fr 90px 80px 60px 75px 110px 100px', padding: '12px 20px', background: '#111008', borderBottom: '1px solid #1a1900' }}>
          {['ID', 'CUSTOMER', 'ROUTE', 'VEHICLE', 'DATE', 'PAX', 'AMOUNT', 'STATUS', 'ACTION'].map(h => (
            <span key={h} style={{ fontSize: 9, letterSpacing: '2px', color: '#5a5535', textTransform: 'uppercase', fontFamily: 'Arial,sans-serif' }}>
              {h}
            </span>
          ))}
        </div>

        {/* Rows */}
        {filtered.length === 0 ? (
          <div style={{ padding: '40px 20px', textAlign: 'center', color: '#5a5535', fontFamily: 'Arial,sans-serif', fontSize: 13 }}>
            No bookings found.
          </div>
        ) : (
          filtered.map((b, i) => {
            const status = (b.status || 'pending').toLowerCase();
            const st = STATUS_STYLE[status] || STATUS_STYLE.pending;
            const canConfirm  = status === 'pending';
            const canComplete = status === 'confirmed';
            const canCancel   = status === 'pending' || status === 'confirmed';

            return (
              <div
                key={b.id}
                style={{ display: 'grid', gridTemplateColumns: '100px 1fr 1fr 90px 80px 60px 75px 110px 100px', padding: '14px 20px', borderBottom: '1px solid #161505', alignItems: 'center', transition: 'background 0.15s', cursor: 'default' }}
                onMouseEnter={e => e.currentTarget.style.background = '#111008'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                {/* ID */}
                <span style={{ fontSize: 12, color: '#c9a84c', fontFamily: 'Arial,sans-serif', letterSpacing: '0.5px' }}>
                  {getRef(sorted.length - 1 - i)}
                </span>

                {/* Customer */}
                <span style={{ fontSize: 13, color: '#e8e0c8', fontFamily: 'Georgia,serif' }}>
                  {b.customerName || b.userName || '—'}
                </span>

                {/* Route */}
                <span style={{ fontSize: 13, color: '#c8c0a8', fontFamily: 'Georgia,serif' }}>
                  {b.from && b.to
                    ? <>{fromShort(b.from)} <span style={{ color: '#5a5535', margin: '0 3px' }}>→</span> {b.to}</>
                    : b.routeLabel || '—'
                  }
                </span>

                {/* Vehicle */}
                <span style={{ fontSize: 12, color: '#9a9070', fontFamily: 'Arial,sans-serif' }}>
                  {b.vehicleName || '—'}
                </span>

                {/* Date */}
                <span style={{ fontSize: 12, color: '#9a9070', fontFamily: 'Arial,sans-serif' }}>
                  {fmtDate(b.date)}
                </span>

                {/* Pax */}
                <span style={{ fontSize: 12, color: '#9a9070', fontFamily: 'Arial,sans-serif' }}>
                  {b.passengers ?? '—'}
                </span>

                {/* Amount */}
                <span style={{ fontSize: 13, color: '#e8e0c8', fontFamily: 'Arial,sans-serif' }}>
                  ${b.price ?? '—'}
                </span>

                {/* Status badge */}
                <span style={{ fontSize: 10, fontFamily: 'Arial,sans-serif', letterSpacing: '1px', padding: '3px 10px', textTransform: 'uppercase', display: 'inline-block', ...st }}>
                  {status}
                </span>

                {/* Action */}
                <div style={{ display: 'flex', gap: 6 }}>
                  {canConfirm && (
                    <button
                      onClick={() => updateBookingStatus(b.id, 'confirmed')}
                      style={{ background: 'transparent', border: '1px solid #2a2810', color: '#c9a84c', fontSize: 10, padding: '4px 10px', cursor: 'pointer', fontFamily: 'Arial,sans-serif', letterSpacing: '1px', textTransform: 'uppercase' }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.1)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                    >
                      Confirm
                    </button>
                  )}
                  {canComplete && (
                    <button
                      onClick={() => updateBookingStatus(b.id, 'completed')}
                      style={{ background: 'transparent', border: '1px solid #2a2810', color: '#8aaad4', fontSize: 10, padding: '4px 10px', cursor: 'pointer', fontFamily: 'Arial,sans-serif', letterSpacing: '1px', textTransform: 'uppercase' }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(100,130,180,0.1)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                    >
                      Complete
                    </button>
                  )}
                  {canCancel && (
                    <button
                      onClick={() => { if (window.confirm('Cancel this booking?')) updateBookingStatus(b.id, 'cancelled'); }}
                      style={{ background: 'transparent', border: 'none', color: '#5a5535', fontSize: 12, padding: '4px 6px', cursor: 'pointer', fontFamily: 'Arial,sans-serif' }}
                      onMouseEnter={e => { e.currentTarget.style.color = '#d47a7a'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = '#5a5535'; }}
                    >
                      —
                    </button>
                  )}
                  {!canConfirm && !canComplete && !canCancel && (
                    <span style={{ color: '#5a5535', fontSize: 12, fontFamily: 'Arial,sans-serif' }}>—</span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}