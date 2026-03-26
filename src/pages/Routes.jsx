import { getRoutes, seedData } from '../utils/storage'
import { useState, useEffect } from "react"
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

  // saving time and improving code readability by seeding data and fetching routes in a single useEffect
  return (
    <div style={{ paddingTop: '72px', minHeight: '100vh', background: '#0b0b0b' }}>

      {/* Header */}
      <section
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.06) 0%, transparent 60%), #111',
          borderBottom: '1px solid #141414',
          padding: '4rem 2rem 3rem'
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p style={{ color: '#c9a84c', letterSpacing: '2px', fontSize: '0.75rem' }}>
            Route Archive
          </p>

          <h1
            style={{
              fontFamily: 'Cormorant Garamond',
              fontSize: '4rem',
              marginBottom: '0.5rem',
              color: 'white'
            }}
          >
            Regional Transfers
          </h1>

          <p style={{ color: '#888', maxWidth: '500px', fontSize: '0.8rem' }}>
            Cross-province expeditions with fixed-rate transparency.
            All-inclusive pricing, door-to-door.
          </p>
        </div>
      </section>

      {/* Table */}
      <section
        style={{
          padding: '3rem 2rem',
          maxWidth: '1200px',
          margin: '0 auto',
          marginTop: '2rem'
        }}
      >
        <div
          style={{
            border: '1px solid #1a1a1a',
            borderRadius: '6px',
            overflow: 'hidden',
            background: '#0d0d0d',
            padding: '1rem',
            margin: '1rem'
          }}
        >
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              color: 'white'
            }}
          >
            <thead>
              <tr
                style={{
                  borderBottom: '1px solid #1a1a1a',
                  fontSize: '11px',
                  letterSpacing: '1px',
                  color: '#777'
                }}
              >
                <th style={{ padding: '14px', textAlign: 'left' }}>#</th>
                <th style={{ textAlign: 'left' }}>Journey</th>

                {VEHICLE_COLS.map(c => (
                  <th key={c.key} style={{ textAlign: 'right' }}>
                    {c.label}
                  </th>
                ))}

                <th style={{ textAlign: 'right', paddingRight: '20px' }}>
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {routes.length > 0 ? (
                routes.map((r, i) => (
                  <tr
                    key={r.id}
                    style={{
                      borderBottom: '1px solid #141414',
                      transition: '0.2s'
                    }}
                    onMouseEnter={e =>
                      (e.currentTarget.style.background = '#111')
                    }
                    onMouseLeave={e =>
                      (e.currentTarget.style.background = 'transparent')
                    }
                  >
                    <td style={{ padding: '24px', color: '#666' }}>
                      {String(i + 1).padStart(2, '0')}
                    </td>

                    {/* Journey */}
                    <td>
                      <div
                        style={{
                          lineHeight: '1.3',
                          fontFamily: 'Cormorant Garamond'
                        }}
                      >
                        <div style={{ fontWeight: 500 }}>{r.from}</div>
                        <div style={{ fontSize: '12px', color: '#666' }}>
                          → {r.to}
                        </div>
                      </div>
                    </td>

                    {/* Prices */}
                    {VEHICLE_COLS.map(c => (
                      <td
                        key={c.key}
                        style={{
                          textAlign: 'right',
                          color: '#c9a84c',
                          fontFamily: 'Cormorant Garamond',
                          fontSize: '15px'
                        }}
                      >
                        ${r.prices?.[c.key] ?? '-'}
                      </td>
                    ))}

                    {/* Book button */}
                    <td style={{ textAlign: 'right', paddingRight: '20px' }}>
                      <Link
                        to={`/book?route=${r.id}`}
                        style={{
                          border: '1px solid #c9a84c',
                          padding: '6px 16px',
                          fontSize: '11px',
                          color: '#c9a84c',
                          textDecoration: 'none',
                          letterSpacing: '1px',
                          transition: '0.2s'
                        }}
                      >
                        BOOK
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    style={{
                      textAlign: 'center',
                      padding: '40px',
                      color: '#777'
                    }}
                  >
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