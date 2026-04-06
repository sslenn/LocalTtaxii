import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import Footer from '../components/Footer'

export default function Home() {
  const { vehicles } = useApp()

  return (
    <div className="bg-[#0A0908] min-h-screen">

      {/* Hero */}
      <section className="max-w-300 mx-auto px-10 pt-25 pb-20 text-center">
        <div className="text-[11px] tracking-[3px] uppercase text-[#C9A84C] mb-5">
          Premium Private Transfers · Cambodia
        </div>
        <h1 className="text-[clamp(36px,6vw,72px)] font-light text-[#F0EBE0] leading-[1.1] mb-6 tracking-[-1px]">
          Travel Cambodia<br />
          <span className="text-[#C9A84C]">in Comfort</span>
        </h1>
        <p className="text-base text-[#8A8070] max-w-120 mx-auto mb-10 leading-[1.7]">
          Fixed prices, premium vehicles and reliable service across 11 routes nationwide.
        </p>
        <div className="flex gap-3.5 justify-center flex-wrap">
          <Link
            to="/book"
            className="px-9 py-3.5 bg-[#C9A84C] text-black font-bold text-[13px] tracking-[1.5px] uppercase no-underline rounded"
          >
            Book Now
          </Link>
          <Link
            to="/routes"
            className="px-9 py-3.5 bg-transparent border border-[#2A2720] text-[#F0EBE0] text-[13px] tracking-[1.5px] uppercase no-underline rounded"
          >
            View Routes
          </Link>
        </div>
      </section>

      {/* Highlights */}
      <section className="border-t border-b border-[#2A2720] px-10 py-10">
        <div className="max-w-300 mx-auto grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-8">
          {[
            { icon: '💳', title: 'Fixed Pricing',    sub: 'No hidden fees or surprises' },
            { icon: '🛡️', title: 'Safe & Verified',  sub: 'Professional licensed drivers' },
            { icon: '🚖', title: '5 Vehicle Classes', sub: 'SUV to VIP Alphard' },
            { icon: '🕐', title: '24/7 Service',      sub: 'Available any time, any day' },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <div className="text-[28px] mb-2.5">{item.icon}</div>
              <div className="text-[13px] font-semibold text-[#F0EBE0] mb-1.5">{item.title}</div>
              <div className="text-xs text-[#8A8070]">{item.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Fleet Preview */}
      <section className="max-w-300 mx-auto px-10 py-20">
        <div className="text-center mb-12">
          <div className="text-[10px] tracking-[3px] uppercase text-[#C9A84C] mb-3">
            Our Fleet
          </div>
          <h2 className="text-[36px] font-light text-[#F0EBE0]">
            Choose Your Vehicle
          </h2>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4 mb-10">
          {vehicles.slice(0, 4).map(v => (
            <div
              key={v.id}
              className="bg-[#141210] border border-[#2A2720] rounded-md transition-colors duration-200 hover:border-[#C9A84C]"
            >
              {/* Vehicle image banner */}
              <div className="bg-[#1A1714] h-30 flex items-center justify-center border-b border-[#2A2720] overflow-hidden">
                {v.image
                  ? <img
                      src={v.image}
                      alt={v.name}
                      className="max-w-full max-h-[160%] object-cover"
                      onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
                    />
                  : null
                }
                <span className={`text-[64px] ${v.image ? 'hidden' : 'block'}`}>
                  {v.emoji}
                </span>
              </div>

              <div className="p-6">
                <div className="text-[15px] font-semibold text-[#F0EBE0] mb-1">{v.name}</div>
                <div className="text-xs text-[#8A8070] mb-3">{v.model}</div>
                <div className="flex gap-3 mb-4">
                  <span className="text-[11px] text-[#8A8070]">👥 {v.seats} seats</span>
                  <span className="text-[11px] text-[#8A8070]">🧳 {v.luggage} bags</span>
                </div>
                <div className="text-[13px] text-[#C9A84C] font-semibold">
                  From {v.price_tag}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/fleet"
            className="text-[13px] text-[#C9A84C] no-underline tracking-[1px] border-b border-[#C9A84C] pb-0.5"
          >
            View All Vehicles →
          </Link>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="bg-[#141210] border-t border-b border-[#2A2720] px-10 py-15 text-center">
        <h2 className="text-[32px] font-light text-[#F0EBE0] mb-3">
          Ready to Travel?
        </h2>
        <p className="text-sm text-[#8A8070] mb-7">
          Book your private transfer in minutes. Fixed price, no surprises.
        </p>
        <Link
          to="/book"
          className="px-10 py-3.5 bg-[#C9A84C] text-black font-bold text-[13px] tracking-[1.5px] uppercase no-underline rounded"
        >
          Book Now
        </Link>
      </section>

    </div>
  )
}