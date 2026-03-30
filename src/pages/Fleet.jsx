import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function Fleet() {
  const { vehicles } = useApp()
  const navigate = useNavigate()

  return (
    <div className="bg-[#0A0908] min-h-screen">

      {/* Header */}
      <section className="max-w-[1200px] mx-auto px-10 pt-16 pb-12">
        <div className="text-[10px] tracking-[3px] uppercase text-[#C9A84C] mb-3">
          Our Fleet
        </div>
        <h1 className="text-[42px] font-light text-[#F0EBE0] mb-3">
          Choose Your Vehicle
        </h1>
        <p className="text-sm text-[#8A8070] max-w-[480px] leading-[1.7]">
          From budget-friendly SUVs to ultra-luxury VIP transfers — we have the perfect vehicle for every journey.
        </p>
      </section>

      {/* Vehicle Grid */}
      <section className="max-w-[1200px] mx-auto px-10 pb-20 grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-4">
        {vehicles.map(v => (
          <div
            key={v.id}
            className="bg-[#141210] border border-[#2A2720] rounded-md overflow-hidden transition-colors duration-200 hover:border-[#C9A84C]"
          >
            {/* Vehicle image banner */}
            <div className="bg-[#1A1714] h-[180px] flex items-center justify-center border-b border-[#2A2720] overflow-hidden">
              {v.image
                ? <img
                    src={v.image}
                    alt={v.name}
                    className="max-w-full max-h-[150%] object-cover"
                    onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
                  />
                : null
              }
              <span className={`text-[64px] ${v.image ? 'hidden' : 'block'}`}>
                {v.emoji}
              </span>
            </div>

            {/* Info */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="text-[18px] font-semibold text-[#F0EBE0]">{v.name}</div>
                  <div className="text-xs text-[#8A8070] mt-0.5">{v.model}</div>
                </div>
                <div className="text-[11px] px-2.5 py-1 bg-[#0A0908] border border-[#2A2720] rounded-full text-[#C9A84C] tracking-[1px] uppercase">
                  {v.type}
                </div>
              </div>

              <p className="text-[13px] text-[#8A8070] leading-[1.6] mb-5">
                {v.description}
              </p>

              {/* Specs */}
              <div className="flex gap-5 py-4 border-t border-b border-[#2A2720] mb-5">
                <div className="text-center">
                  <div className="text-[18px] mb-1">👥</div>
                  <div className="text-xs text-[#F0EBE0] font-semibold">{v.seats}</div>
                  <div className="text-[10px] text-[#8A8070]">Seats</div>
                </div>
                <div className="text-center">
                  <div className="text-[18px] mb-1">🧳</div>
                  <div className="text-xs text-[#F0EBE0] font-semibold">{v.luggage}</div>
                  <div className="text-[10px] text-[#8A8070]">Bags</div>
                </div>
                <div className="text-center">
                  <div className="text-[18px] mb-1">✅</div>
                  <div className={`text-xs font-semibold ${v.available ? 'text-[#27AE60]' : 'text-[#C0392B]'}`}>
                    {v.available ? 'Yes' : 'No'}
                  </div>
                  <div className="text-[10px] text-[#8A8070]">Available</div>
                </div>
                <div className="text-center ml-auto">
                  <div className="text-[20px] text-[#C9A84C] font-bold">{v.price_tag}</div>
                  <div className="text-[10px] text-[#8A8070]">Starting from</div>
                </div>
              </div>

              {/* Book button */}
              <button
                onClick={() => navigate('/book', { state: { vehicleId: v.id } })}
                disabled={!v.available}
                className={`w-full py-3 rounded text-[13px] font-bold tracking-[1px] uppercase border-none transition-colors
                  ${v.available
                    ? 'bg-[#C9A84C] text-black cursor-pointer'
                    : 'bg-[#2A2720] text-[#4A4438] cursor-not-allowed'
                  }`}
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