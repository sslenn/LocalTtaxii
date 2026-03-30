import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'

const VEHICLE_COLS = [
  { label: 'SUV', key: 'v1' },
  { label: 'Starex', key: 'v2' },
  { label: 'Alphard', key: 'v3' },
  { label: 'Alphard 2012', key: 'v4' },
  { label: 'VIP / Alphard 2020', key: 'v5' }
]

export default function Routes() {
  const { routes } = useApp()

  return (
    <div className="pt-18 min-h-screen bg-[#0b0b0b]">

      {/* Header */}
      <section className="border-b border-[#141414] px-8 pt-16 pb-12"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.06) 0%, transparent 60%), #111' }}
      >
        <div className="max-w-300 mx-auto">
          <p className="text-[#c9a84c] tracking-[2px] text-[0.75rem]">
            Route Archive
          </p>
          <h1 className="font-['Cormorant_Garamond'] text-6xl mb-2 text-white">
            Regional Transfers
          </h1>
          <p className="text-[#888] max-w-125 text-[0.8rem]">
            Cross-province expeditions with fixed-rate transparency.
            All-inclusive pricing, door-to-door.
          </p>
        </div>
      </section>

      {/* Table */}
      <section className="px-8 py-12 max-w-300 mx-auto mt-8">
        <div className="border border-[#1a1a1a] rounded-md overflow-hidden bg-[#0d0d0d] p-4 m-4">
          <table className="w-full border-collapse text-white">
            <thead>
              <tr className="border-b border-[#1a1a1a] text-[11px] tracking-[1px] text-[#777]">
                <th className="p-3.5 text-left">#</th>
                <th className="text-left">Journey</th>
                {VEHICLE_COLS.map(c => (
                  <th key={c.key} className="text-right">{c.label}</th>
                ))}
                <th className="text-right pr-5">Action</th>
              </tr>
            </thead>

            <tbody>
              {routes.length > 0 ? (
                routes.map((r, i) => (
                  <tr
                    key={r.id}
                    className="border-b border-[#141414] transition-colors duration-200 hover:bg-[#111]"
                  >
                    <td className="p-6 text-[#666]">
                      {String(i + 1).padStart(2, '0')}
                    </td>

                    {/* Journey */}
                    <td>
                      <div className="leading-snug font-['Cormorant_Garamond']">
                        <div className="font-medium">{r.from}</div>
                        <div className="text-xs text-[#666]">→ {r.to}</div>
                      </div>
                    </td>

                    {/* Prices */}
                    {VEHICLE_COLS.map(c => (
                      <td
                        key={c.key}
                        className="text-right text-[#c9a84c] font-['Cormorant_Garamond'] text-[15px]"
                      >
                        ${r.prices?.[c.key] ?? '-'}
                      </td>
                    ))}

                    {/* Book button */}
                    <td className="text-right pr-5">
                      <Link
                        to={`/book?route=${r.id}`}
                        className="border border-[#c9a84c] px-4 py-1.5 text-[11px] text-[#c9a84c] no-underline tracking-[1px] transition-colors duration-200 hover:bg-[#c9a84c] hover:text-black"
                      >
                        BOOK
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-10 text-[#777]">
                    No routes available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}