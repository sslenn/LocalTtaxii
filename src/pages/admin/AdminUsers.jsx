import { useState } from 'react';
import { useApp } from '../../context/AppContext';

export default function AdminUsers() {
  const { users, bookings } = useApp();
  const [search, setSearch] = useState('');

  const filtered = users.filter(u => {
    const q = search.toLowerCase();
    return !q
      || (u.name  || '').toLowerCase().includes(q)
      || (u.email || '').toLowerCase().includes(q)
      || (u.phone || '').toLowerCase().includes(q);
  });

  const fmtJoined = d => d
    ? new Date(d).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })
    : '—';

  const bookingCount = (userId) =>
    bookings.filter(b => b.userId === userId).length;

  return (
    <div style={{ minHeight: '100vh', background: '#0a0900', color: '#e8e0c8', fontFamily: 'Georgia, serif', padding: '40px 40px 80px' }}>

      {/* ── Header ── */}
      <div style={{ marginBottom: 36 }}>
        <p style={{ fontSize: 10, letterSpacing: '3px', color: '#7a7055', textTransform: 'uppercase', fontFamily: 'Arial,sans-serif', margin: '0 0 10px' }}>
          CUSTOMERS
        </p>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <div style={{ width: 28, height: 2, background: '#c9a84c', marginBottom: 14 }} />
            <h1 style={{ fontSize: 38, fontWeight: 'normal', color: '#e8e0c8', margin: 0, fontFamily: 'Georgia,serif', letterSpacing: 0.5 }}>
              Users
            </h1>
          </div>
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ background: '#111008', border: '1px solid #2a2810', color: '#e8e0c8', fontSize: 12, padding: '9px 16px', outline: 'none', fontFamily: 'Arial,sans-serif', width: 200 }}
          />
        </div>
      </div>

      {/* ── Table ── */}
      <div style={{ border: '1px solid #1e1c08', overflow: 'hidden' }}>

        {/* Column headers */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 100px 100px 100px 100px', padding: '12px 20px', background: '#111008', borderBottom: '1px solid #1a1900' }}>
          {['NAME', 'EMAIL', 'PHONE', 'ROLE', 'JOINED', 'BOOKINGS', 'STATUS'].map(h => (
            <span key={h} style={{ fontSize: 9, letterSpacing: '2px', color: '#5a5535', textTransform: 'uppercase', fontFamily: 'Arial,sans-serif' }}>
              {h}
            </span>
          ))}
        </div>

        {/* Rows */}
        {filtered.length === 0 ? (
          <div style={{ padding: '40px 20px', textAlign: 'center', color: '#5a5535', fontFamily: 'Arial,sans-serif', fontSize: 13 }}>
            No users found.
          </div>
        ) : (
          filtered.map(u => {
            const isAdmin = u.role === 'admin';
            const count = bookingCount(u.id);

            return (
              <div
                key={u.id}
                style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 100px 100px 100px 100px', padding: '14px 20px', borderBottom: '1px solid #161505', alignItems: 'center', transition: 'background 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#111008'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                {/* Name */}
                <span style={{ fontSize: 13, color: '#e8e0c8', fontFamily: 'Georgia,serif' }}>
                  {u.name}
                </span>

                {/* Email */}
                <span style={{ fontSize: 12, color: '#9a9070', fontFamily: 'Arial,sans-serif' }}>
                  {u.email}
                </span>

                {/* Phone */}
                <span style={{ fontSize: 12, color: '#9a9070', fontFamily: 'Arial,sans-serif' }}>
                  {u.phone || '—'}
                </span>

                {/* Role badge */}
                <span style={{
                  fontSize: 10, fontFamily: 'Arial,sans-serif', letterSpacing: '1px',
                  padding: '3px 10px', textTransform: 'uppercase', display: 'inline-block', width: 'fit-content',
                  background: isAdmin ? 'rgba(201,168,76,0.12)' : 'rgba(100,130,180,0.1)',
                  color:       isAdmin ? '#c9a84c'               : '#8aaad4',
                  border:      `1px solid ${isAdmin ? 'rgba(201,168,76,0.35)' : 'rgba(100,130,180,0.3)'}`,
                }}>
                  {u.role || 'customer'}
                </span>

                {/* Joined */}
                <span style={{ fontSize: 12, color: '#9a9070', fontFamily: 'Arial,sans-serif' }}>
                  {fmtJoined(u.createdAt)}
                </span>

                {/* Bookings count */}
                <span style={{ fontSize: 13, color: '#e8e0c8', fontFamily: 'Arial,sans-serif' }}>
                  {isAdmin ? '—' : count}
                </span>

                {/* Status */}
                <span style={{
                  fontSize: 10, fontFamily: 'Arial,sans-serif', letterSpacing: '2px',
                  padding: '6px 12px', textTransform: 'uppercase', display: 'inline-block', width: 'fit-content',
                  background: '#1a4a2e', color: '#4ade80',
                  border: '1px solid #2a6040', borderRadius: '5px',
                }}>
                  ACTIVE
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}