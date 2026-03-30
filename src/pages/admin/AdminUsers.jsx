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

  const bookingCount = userId => bookings.filter(b => b.userId === userId).length;

  return (
    <div className="min-h-screen bg-[#0a0900] text-[#e8e0c8] font-serif p-10 pb-20">

      {/* Header */}
      <div className="mb-9">
        <p className="text-[10px] tracking-widest text-[#7a7055] uppercase mb-2 font-sans">
          CUSTOMERS
        </p>
        <div className="flex justify-between items-end">
          <div>
            <div className="w-7 h-0.5 bg-[#c9a84c] mb-3.5"></div>
            <h1 className="text-4xl font-normal text-[#e8e0c8] font-serif tracking-[0.5px]">
              Users
            </h1>
          </div>
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-[#111008] border border-[#2a2810] text-[#e8e0c8] text-[12px] px-4 py-2 outline-none font-sans w-52"
          />
        </div>
      </div>

      {/* Table */}
      <div className="border border-[#1e1c08] overflow-hidden">

        {/* Column headers */}
        <div className="grid grid-cols-[1fr_1fr_1fr_100px_100px_100px_100px] p-3 bg-[#111008] border-b border-[#1a1900] text-[9px] tracking-widest uppercase text-[#5a5535] font-sans">
          {['NAME', 'EMAIL', 'PHONE', 'ROLE', 'JOINED', 'BOOKINGS', 'STATUS'].map(h => (
            <span key={h}>{h}</span>
          ))}
        </div>

        {/* Rows */}
        {filtered.length === 0 ? (
          <div className="p-10 text-center text-[#5a5535] text-sm font-sans">
            No users found.
          </div>
        ) : (
          filtered.map(u => {
            const isAdmin = u.role === 'admin';
            const count = bookingCount(u.id);

            return (
              <div
                key={u.id}
                className="grid grid-cols-[1fr_1fr_1fr_100px_100px_100px_100px] p-3 border-b border-[#161505] items-center hover:bg-[#111008] transition-colors"
              >
                {/* Name */}
                <span className="text-sm text-[#e8e0c8] font-serif">{u.name}</span>

                {/* Email */}
                <span className="text-sm text-[#9a9070] font-sans">{u.email}</span>

                {/* Phone */}
                <span className="text-sm text-[#9a9070] font-sans">{u.phone || '—'}</span>

                {/* Role badge */}
                <span className={`text-[10px] font-sans tracking-tight px-3 py-1 uppercase w-20 flex items-center justify-center
                  ${isAdmin
                    ? 'bg-[rgba(201,168,76,0.12)] text-[#c9a84c] border border-[rgba(201,168,76,0.35)]'
                    : 'bg-[rgba(100,130,180,0.1)] text-[#8aaad4] border border-[rgba(100,130,180,0.3)]'}
                `}>
                  {u.role || 'customer'}
                </span>

                {/* Joined */}
                <span className="text-sm text-[#9a9070] font-sans">{fmtJoined(u.createdAt)}</span>

                {/* Bookings count */}
                <span className="text-sm text-[#e8e0c8] font-serif">{isAdmin ? '—' : count}</span>

                {/* Status */}
                <span className="text-[10px] font-sans tracking-widest px-3 py-1 w-20 uppercase flex justify-center bg-[#1a4a2e] text-[#4ade80] border border-[#2a6040] rounded">
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