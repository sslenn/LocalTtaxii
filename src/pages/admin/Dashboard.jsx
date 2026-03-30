import { useApp } from '../../context/AppContext';
import { Link } from 'react-router-dom';

const STATUS_CLASSES = {
  confirmed: 'bg-green-100 text-green-500 border border-green-300',
  pending: 'bg-yellow-100 text-yellow-400 border border-yellow-300',
  completed: 'bg-gray-800 text-blue-400 border border-blue-800',
  cancelled: 'bg-red-100 text-red-400 border border-red-300',
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
    <div className="min-h-screen bg-[#0a0900] text-[#e8e0c8] font-serif p-10 pb-20">

      {/* Header */}
      <div className="mb-9">
        <p className="text-[10px] tracking-widest text-[#7a7055] uppercase font-sans mb-2">
          OVERVIEW
        </p>
        <div className="w-7 h-0.5 bg-[#c9a84c] mb-3.5" />
        <h1 className="text-[38px] font-normal text-[#e8e0c8] font-serif tracking-[0.5px]">
          Dashboard
        </h1>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-9">
        {[
          { label: 'TOTAL REVENUE', value: `$${stats.totalRevenue?.toLocaleString() ?? 0}`, sub: 'This month' },
          { label: 'TOTAL BOOKINGS', value: stats.totalBookings ?? 0, sub: 'All time' },
          { label: 'ACTIVE VEHICLES', value: activeVehicles, sub: 'Fleet size' },
          { label: 'REGISTERED USERS', value: totalCustomers, sub: 'Customers' },
        ].map(card => (
          <div key={card.label} className="bg-[#111008] border border-[#1e1c08] p-6">
            <p className="text-[9px] tracking-[2.5px] text-[#5a5535] uppercase font-sans mb-3.5">
              {card.label}
            </p>
            <p className="text-2xl sm:text-3xl text-[#e8e0c8] font-serif font-normal mb-1.5">
              {card.value}
            </p>
            <p className="text-[11px] text-[#5a5535] font-sans m-0">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-[#111008] border border-[#1e1c08] overflow-hidden">

        {/* Table title bar */}
        <div className="flex justify-between items-center px-5 py-4 border-b border-[#1a1900]">
          <p className="text-[10px] tracking-[2.5px] text-[#7a7055] uppercase font-sans m-0">
            RECENT BOOKINGS
          </p>
          <Link
            to="/admin/bookings"
            className="text-[11px] tracking-[1px] text-[#c9a84c] uppercase font-sans no-underline"
          >
            VIEW ALL →
          </Link>
        </div>

        {/* Column headers */}
        <div className="grid grid-cols-[120px_1fr_1fr_100px_90px_80px_120px] px-5 py-2.5 bg-[#0e0d06] border-b border-[#1a1900]">
          {['ID', 'CUSTOMER', 'ROUTE', 'VEHICLE', 'DATE', 'AMOUNT', 'STATUS'].map(h => (
            <span
              key={h}
              className="text-[9px] tracking-[2px] text-[#5a5535] uppercase font-sans"
            >
              {h}
            </span>
          ))}
        </div>

        {/* Rows */}
        {recent.length === 0 ? (
          <div className="px-5 py-10 text-center text-[#5a5535] font-sans text-sm">
            No bookings yet.
          </div>
        ) : (
          recent.map((b, i) => {
            const status = (b.status || 'pending').toLowerCase();
            const fromShort = b.from ? b.from.split(' ').map(w => w[0]).join('') : '?';
            return (
              <div
                key={b.id}
                className="grid grid-cols-[120px_1fr_1fr_100px_90px_80px_120px] px-5 py-3 border-b border-[#161505] items-center cursor-default hover:bg-[#141200] transition-colors"
              >
                <span className="text-[12px] text-[#c9a84c] font-sans tracking-[0.5px]">
                  {getRef(bookings.length - 1 - i)}
                </span>
                <span className="text-[13px] text-[#e8e0c8] font-serif">
                  {b.customerName || b.userName || '—'}
                </span>
                <span className="text-[13px] text-[#c8c0a8] font-serif">
                  {b.from && b.to
                    ? <>{fromShort} <span className="text-[#5a5535] mx-1">→</span> {b.to}</>
                    : b.routeLabel || '—'}
                </span>
                <span className="text-[12px] text-[#9a9070] font-sans">{b.vehicleName || '—'}</span>
                <span className="text-[12px] text-[#9a9070] font-sans">{fmtDate(b.date)}</span>
                <span className="text-[13px] text-[#e8e0c8] font-sans">${b.price ?? '—'}</span>
                <span
                  className={`text-[10px] font-sans tracking-[1px] px-2.5 py-1 uppercase flex justify-center ${STATUS_CLASSES[status] || STATUS_CLASSES.pending}`}
                >
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