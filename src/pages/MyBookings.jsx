import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

// Define styles for different booking statuses
const STATUS_STYLES = {
  confirmed: { className: 'bg-[rgba(80,160,80,0.15)] text-[#6abf6a] border border-[rgba(80,160,80,0.3)]', label: 'CONFIRMED' },
  pending:   { className: 'bg-[rgba(201,168,76,0.12)] text-[#c9a84c] border border-[rgba(201,168,76,0.3)]', label: 'PENDING' },
  completed: { className: 'bg-[rgba(100,130,180,0.12)] text-[#8aaad4] border border-[rgba(100,130,180,0.3)]', label: 'COMPLETED' },
  cancelled: { className: 'bg-[rgba(180,60,60,0.12)] text-[#d47a7a] border border-[rgba(180,60,60,0.3)]', label: 'CANCELLED' },
};

export default function MyBookings() {
  // Access user data and actions from global context
  const { currentUser, myBookings, cancelBooking } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) navigate('/login', { state: { from: '/my-bookings' } });
  }, [currentUser]);

  if (!currentUser) return null;

  // Sort bookings by most recent first
  const sorted = [...myBookings].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Format date for display
  const fmtDate = d => d
    ? new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    : '—';

  // Generate reference number for booking
  const getRef = (booking, index) =>
    booking.id?.startsWith('#') ? booking.id : `#BK-${String(index + 1).padStart(3, '0')}`;

  return (
    <div className="min-h-screen bg-[#0e0d07] text-[#e8e0c8] font-serif">

      {/* Header */}
      <section className="px-8 pt-14 pb-10 border-b border-[#1a1a0a]">
        <div className="max-w-205 mx-auto">
          <p className="text-[10px] tracking-[3px] text-[#7a7055] uppercase font-sans mb-3">
            YOUR TRANSFERS
          </p>
          <div className="w-7 h-0.5 bg-[#c9a84c] mb-4" />
          <h1 className="text-[34px] font-normal text-[#e8e0c8] m-0 tracking-[0.5px]">
            My Bookings
          </h1>
        </div>
      </section>

      {/* Bookings list */}
      <div className="max-w-205 mx-auto px-8 pt-7 pb-20">

        {sorted.length === 0 ? (
          <div className="text-center py-20 text-[#5a5535] font-sans text-sm">
            <p className="text-[32px] mb-4">🚗</p>
            <p className="mb-2">No bookings yet.</p>
            <button
              onClick={() => navigate('/book')}
              className="mt-4 bg-[#c9a84c] border-none text-[#0e0d07] px-7 py-3 text-[11px] font-bold tracking-[1.5px] cursor-pointer font-sans uppercase"
            >
              Book a Transfer
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-0.5">
            {sorted.map((booking, index) => {
              // Determine status and corresponding styles
              const status = (booking.status || 'pending').toLowerCase();
              const st = STATUS_STYLES[status] || STATUS_STYLES.pending;
              const ref = getRef(booking, index);
              const canCancel = status === 'pending' || status === 'confirmed';

              return (
                <div
                  key={booking.id}
                  className="bg-[#131208] border border-[#1e1c0a] px-6 py-4.5 flex items-center gap-5 transition-colors duration-200 hover:bg-[#181608]"
                >
                  {/* Ref number */}
                  <span className="text-[11px] text-[#c9a84c] font-sans tracking-[1px] min-w-17 font-bold">
                    {ref}
                  </span>

                  {/* Route */}
                  <span className="text-sm text-[#e8e0c8] flex-1 font-serif">
                    {booking.from}{' '}
                    <span className="text-[#7a7055] mx-1">→</span>
                    {booking.to}
                  </span>

                  {/* Meta */}
                  <span className="text-xs text-[#7a7055] font-sans whitespace-nowrap">
                    {fmtDate(booking.date)}
                    {booking.vehicleName && <span> · {booking.vehicleName}</span>}
                    {booking.passengers  && <span> · {booking.passengers} pax</span>}
                  </span>

                  {/* Status badge */}
                  <span className={`text-[10px] font-sans tracking-[1px] px-2.5 py-0.5 whitespace-nowrap ${st.className}`}>
                    {st.label}
                  </span>

                  {/* Price */}
                  <span className="text-[15px] text-[#e8e0c8] font-sans font-bold min-w-12 text-right">
                    ${booking.price ?? '—'}
                  </span>

                  {/* Cancel button */}
                  {canCancel && (
                    <button
                      onClick={() => { if (window.confirm('Cancel this booking?')) cancelBooking(booking.id); }}
                      className="bg-transparent border border-[#2e2a10] text-[#7a7055] text-[10px] px-2.5 py-1 cursor-pointer font-sans tracking-[1px] uppercase whitespace-nowrap transition-colors duration-200 hover:border-[#c97050] hover:text-[#c97050]"
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
          <div className="mt-8 border-t border-[#1a1a0a] pt-6">
            <button
              onClick={() => navigate('/booking')}
              className="bg-[#c9a84c] border-none text-[#0e0d07] px-7 py-3 text-[11px] font-bold tracking-[1.5px] cursor-pointer font-sans uppercase transition-opacity duration-200 hover:opacity-85"
            >
              + Book Another Transfer
            </button>
          </div>
        )}

      </div>
    </div>
  );
}