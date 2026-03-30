import { useState } from 'react';
import { useApp } from '../../context/AppContext';

const STATUS_STYLE = {
  confirmed: 'bg-[rgba(80,160,80,0.15)] text-[#6abf6a] border border-[rgba(80,160,80,0.35)]',
  pending:   'bg-[rgba(201,168,76,0.12)] text-[#c9a84c] border border-[rgba(201,168,76,0.35)]',
  completed: 'bg-[rgba(100,130,180,0.12)] text-[#8aaad4] border border-[rgba(100,130,180,0.35)]',
  cancelled: 'bg-[rgba(180,60,60,0.12)] text-[#d47a7a] border border-[rgba(180,60,60,0.35)]',
};

export default function AdminBookings() {
  const { bookings, updateBookingStatus } = useApp();
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');

  const sorted = [...bookings].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const filtered = sorted.filter(b => {
    const matchStatus = statusFilter === 'all' || b.status === statusFilter;
    const q = search.toLowerCase();
    const matchSearch = !q
      || (b.customerName || b.userName || '').toLowerCase().includes(q)
      || (b.from || '').toLowerCase().includes(q)
      || (b.to || '').toLowerCase().includes(q)
      || (b.vehicleName || '').toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  const fmtDate = d => d
    ? new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })
    : '—';

  const getRef = (i) => `#BK-${String(i + 1).padStart(3, '0')}`;
  const fromShort = from => from ? from.split(' ').map(w => w[0]).join('') : '?';

  return (
    <div className="min-h-screen bg-[#0a0900] text-[#e8e0c8] font-serif p-10 pb-20">

      {/* Header */}
      <div className="mb-9">
        <p className="text-[10px] tracking-widest text-[#7a7055] uppercase mb-2 font-sans">
          MANAGEMENT
        </p>
        <div className="flex items-center justify-between gap-4">
          <div className="w-7 h-0.5 bg-[#c9a84c] mb-3.5" />
        </div>
        <div className="flex items-end justify-between">
          <h1 className="text-4xl font-normal text-[#e8e0c8] font-serif tracking-[0.5px]">
            All Bookings
          </h1>

          {/* Filters */}
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="bg-[#111008] border border-[#2a2810] text-[#e8e0c8] text-[12px] px-4 py-2 outline-none font-sans cursor-pointer appearance-none"
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
              className="bg-[#111008] border border-[#2a2810] text-[#e8e0c8] text-[12px] px-4 py-2 outline-none font-sans w-44"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="border border-[#1e1c08] overflow-hidden">

        {/* Column headers */}
        <div className="grid grid-cols-[100px_1fr_1fr_90px_80px_60px_75px_110px_100px] p-3 bg-[#111008] border-b border-[#1a1900] text-[9px] tracking-widest uppercase text-[#5a5535] font-sans">
          {['ID', 'CUSTOMER', 'ROUTE', 'VEHICLE', 'DATE', 'PAX', 'AMOUNT', 'STATUS', 'ACTION'].map(h => (
            <span key={h}>{h}</span>
          ))}
        </div>

        {/* Rows */}
        {filtered.length === 0 ? (
          <div className="p-10 text-center text-[#5a5535] text-sm font-sans">
            No bookings found.
          </div>
        ) : (
          filtered.map((b, i) => {
            const status = (b.status || 'pending').toLowerCase();
            const st = STATUS_STYLE[status] || STATUS_STYLE.pending;
            const canConfirm = status === 'pending';
            const canComplete = status === 'confirmed';
            const canCancel = status === 'pending' || status === 'confirmed';

            return (
              <div
                key={b.id}
                className="grid grid-cols-[100px_1fr_1fr_90px_80px_60px_75px_110px_100px] p-3 border-b border-[#161505] items-center hover:bg-[#111008] transition-colors cursor-default"
              >
                {/* ID */}
                <span className="text-[12px] text-[#c9a84c] font-sans tracking-[0.5px]">{getRef(sorted.length - 1 - i)}</span>

                {/* Customer */}
                <span className="text-sm text-[#e8e0c8] font-serif">{b.customerName || b.userName || '—'}</span>

                {/* Route */}
                <span className="text-sm text-[#c8c0a8] font-serif">
                  {b.from && b.to
                    ? <>{fromShort(b.from)} <span className="mx-1 text-[#5a5535]">→</span> {b.to}</>
                    : b.routeLabel || '—'
                  }
                </span>

                {/* Vehicle */}
                <span className="text-[12px] text-[#9a9070] font-sans">{b.vehicleName || '—'}</span>

                {/* Date */}
                <span className="text-[12px] text-[#9a9070] font-sans">{fmtDate(b.date)}</span>

                {/* Pax */}
                <span className="text-[12px] text-[#9a9070] font-sans">{b.passengers ?? '—'}</span>

                {/* Amount */}
                <span className="text-sm text-[#e8e0c8] font-sans">${b.price ?? '—'}</span>

                {/* Status badge */}
                <span className={`flex justify-center text-[10px] font-sans tracking-wider w-24 px-3 py-1 uppercase  ${st}`}>
                  {status}
                </span>

                {/* Actions */}
                <div className="flex gap-1 justify-center">
                  {canConfirm && (
                    <button
                      onClick={() => updateBookingStatus(b.id, 'confirmed')}
                      className="text-[10px] font-sans uppercase tracking-wide px-2 py-1 border border-[#2a2810] text-[#c9a84c] hover:bg-[rgba(201,168,76,0.1)]"
                    >
                      Confirm
                    </button>
                  )}
                  {canComplete && (
                    <button
                      onClick={() => updateBookingStatus(b.id, 'completed')}
                      className="text-[10px] font-sans uppercase tracking-wide px-2 py-1 border border-[#2a2810] text-[#8aaad4] hover:bg-[rgba(100,130,180,0.1)]"
                    >
                      Complete
                    </button>
                  )}
                  {canCancel && (
                    <button
                      onClick={() => { if (window.confirm('Cancel this booking?')) updateBookingStatus(b.id, 'cancelled'); }}
                      className="text-[12px] font-sans px-1 hover:text-[#d47a7a] text-[#5a5535]"
                    >
                      
                    </button>
                  )}
                  {!canConfirm && !canComplete && !canCancel && (
                    <span className="text-[12px] text-[#5a5535] font-sans">—</span>
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