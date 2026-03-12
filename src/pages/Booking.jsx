import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const TODAY = new Date().toISOString().split('T')[0];

export default function Booking() {
  const { currentUser, routes, vehicles, createBooking, toast } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!currentUser) navigate('/login', { state: { from: '/booking' } });
  }, [currentUser]);

  const activeRoutes   = routes.filter(r => r.active !== false);
  const activeVehicles = vehicles.filter(v => v.available !== false);

  const prefill      = location.state || {};
  const prefillRoute = activeRoutes.find(r => r.id === prefill.routeId);
  const fromCities   = [...new Set(activeRoutes.map(r => r.from))];

  const [fromCity,   setFromCity]   = useState(prefillRoute?.from || fromCities[0] || '');
  const [toCity,     setToCity]     = useState(prefillRoute?.to   || '');
  const [vehicleId,  setVehicleId]  = useState(prefill.vehicleId  || '');
  const [date,       setDate]       = useState('');
  const [passengers, setPassengers] = useState(1);
  const [name,       setName]       = useState(currentUser?.name  || '');
  const [email,      setEmail]      = useState(currentUser?.email || '');
  const [phone,      setPhone]      = useState(currentUser?.phone || '');
  const [pickup,     setPickup]     = useState('');
  const [notes,      setNotes]      = useState('');
  const [error,      setError]      = useState('');
  const [loading,    setLoading]    = useState(false);

  const toOptions = activeRoutes.filter(r => r.from === fromCity).map(r => r.to);

  useEffect(() => {
    const opts = activeRoutes.filter(r => r.from === fromCity).map(r => r.to);
    setToCity(opts[0] || '');
  }, [fromCity]);

  const selectedRoute   = activeRoutes.find(r => r.from === fromCity && r.to === toCity);
  const selectedVehicle = activeVehicles.find(v => v.id === vehicleId);
  const price = selectedRoute && selectedVehicle
    ? (selectedRoute.prices?.[selectedVehicle.id] ?? 0)
    : 0;

  const fmtDate = d => d
    ? new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    : '—';

  function handleSubmit() {
    setError('');
    if (!fromCity || !toCity) return setError('Please select a valid route.');
    if (!vehicleId)           return setError('Please select a vehicle.');
    if (!date)                return setError('Please select a travel date.');
    if (passengers < 1)       return setError('At least 1 passenger required.');
    if (selectedVehicle?.seats && passengers > selectedVehicle.seats)
      return setError(`Max ${selectedVehicle.seats} passengers for this vehicle.`);
    if (!name.trim())         return setError('Please enter your full name.');
    if (!email.trim())        return setError('Please enter your email.');
    if (!phone.trim())        return setError('Please enter your phone number.');
    if (!pickup.trim())       return setError('Please enter a pickup address.');

    setLoading(true);
    setTimeout(() => {
      createBooking({
        routeId:       selectedRoute?.id || '',
        vehicleId,
        vehicleName:   selectedVehicle?.name || '',
        from:          fromCity,
        to:            toCity,
        date,
        passengers,
        pickupAddress: pickup,
        notes,
        price,
        customerName:  name,
        customerPhone: phone,
        customerEmail: email,
      });
      toast('Booking submitted! We will confirm shortly.', 'success');
      setLoading(false);
      navigate('/my-bookings');
    }, 600);
  }

  if (!currentUser) return null;

  return (
    <div style={{ minHeight: '100vh', background: '#111108', color: '#e8e0c8', fontFamily: 'Georgia, serif' }}>

      {/* ── Header ── */}
      <section style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.06) 0%, transparent 60%), #111', borderBottom: '1px solid #141414', padding: '4rem 2rem 3rem', marginBottom: 40 }}>
        <div style={{ maxWidth: 980, margin: '0 auto' }}>
          <p style={{ color: '#c9a84c', letterSpacing: '2px', fontSize: '0.75rem', fontFamily: 'Arial,sans-serif', marginBottom: 12 }}>
            RESERVE YOUR SEAT
          </p>
          <h1 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '3.5rem', fontWeight: 'normal', color: '#fff', marginBottom: '0.5rem', letterSpacing: 1 }}>
            Book a Transfer
          </h1>
          <p style={{ color: '#888', maxWidth: 500, fontSize: '0.8rem', fontFamily: 'Arial,sans-serif', lineHeight: 1.6, margin: 0 }}>
            Cross-province expeditions with fixed-rate transparency. All-inclusive pricing, door-to-door.
          </p>
        </div>
      </section>

      {/* ── Body ── */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '0 24px 80px' }}>
        <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start' }}>

          {/* ── Form column ── */}
          <div style={{ flex: 1, minWidth: 0 }}>

            {/* STEP 1 */}
            <p style={{ fontSize: 10, letterSpacing: '2.5px', color: '#7a7055', textTransform: 'uppercase', fontFamily: 'Arial,sans-serif', margin: '0 0 14px' }}>
              STEP 1 — ROUTE &amp; VEHICLE
            </p>

            <label style={{ display: 'block', fontSize: 10, letterSpacing: '2px', color: '#7a7055', textTransform: 'uppercase', fontFamily: 'Arial,sans-serif', marginBottom: 5 }}>
              FROM
            </label>
            <select
              value={fromCity}
              onChange={e => setFromCity(e.target.value)}
              style={{ width: '100%', background: '#1a1908', border: '1px solid #2a2810', color: '#e8e0c8', fontSize: 13, padding: '11px 14px', outline: 'none', fontFamily: 'Arial,sans-serif', boxSizing: 'border-box', cursor: 'pointer', appearance: 'none', WebkitAppearance: 'none' }}
            >
              {fromCities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            <label style={{ display: 'block', fontSize: 10, letterSpacing: '2px', color: '#7a7055', textTransform: 'uppercase', fontFamily: 'Arial,sans-serif', marginBottom: 5, marginTop: 14 }}>
              TO
            </label>
            <select
              value={toCity}
              onChange={e => setToCity(e.target.value)}
              style={{ width: '100%', background: '#1a1908', border: '1px solid #2a2810', color: '#e8e0c8', fontSize: 13, padding: '11px 14px', outline: 'none', fontFamily: 'Arial,sans-serif', boxSizing: 'border-box', cursor: 'pointer', appearance: 'none', WebkitAppearance: 'none' }}
            >
              <option value="">Select destination...</option>
              {toOptions.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            <label style={{ display: 'block', fontSize: 10, letterSpacing: '2px', color: '#7a7055', textTransform: 'uppercase', fontFamily: 'Arial,sans-serif', marginBottom: 5, marginTop: 14 }}>
              VEHICLE CLASS
            </label>
            <select
              value={vehicleId}
              onChange={e => setVehicleId(e.target.value)}
              style={{ width: '100%', background: '#1a1908', border: '1px solid #2a2810', color: '#e8e0c8', fontSize: 13, padding: '11px 14px', outline: 'none', fontFamily: 'Arial,sans-serif', boxSizing: 'border-box', cursor: 'pointer', appearance: 'none', WebkitAppearance: 'none' }}
            >
              <option value="">Select a vehicle...</option>
              {activeVehicles.map(v => {
                const p = selectedRoute ? selectedRoute.prices?.[v.id] : null;
                return (
                  <option key={v.id} value={v.id}>
                    {v.name}{v.model ? ` — ${v.model}` : ''}{p != null ? ` ($${p})` : ''}
                  </option>
                );
              })}
            </select>

            {/* STEP 2 */}
            <p style={{ fontSize: 10, letterSpacing: '2.5px', color: '#7a7055', textTransform: 'uppercase', fontFamily: 'Arial,sans-serif', margin: '28px 0 14px' }}>
              STEP 2 — DATE &amp; PASSENGERS
            </p>

            <div style={{ display: 'flex', gap: 16 }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: 10, letterSpacing: '2px', color: '#7a7055', textTransform: 'uppercase', fontFamily: 'Arial,sans-serif', marginBottom: 5 }}>
                  DATE
                </label>
                <input
                  type="date"
                  min={TODAY}
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  style={{ width: '100%', background: '#1a1908', border: '1px solid #2a2810', color: '#e8e0c8', fontSize: 13, padding: '11px 14px', outline: 'none', fontFamily: 'Arial,sans-serif', boxSizing: 'border-box', colorScheme: 'dark' }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: 10, letterSpacing: '2px', color: '#7a7055', textTransform: 'uppercase', fontFamily: 'Arial,sans-serif', marginBottom: 5 }}>
                  PASSENGERS
                </label>
                <input
                  type="number"
                  min={1}
                  max={selectedVehicle?.seats || 10}
                  value={passengers}
                  onChange={e => setPassengers(Math.max(1, +e.target.value))}
                  style={{ width: '100%', background: '#1a1908', border: '1px solid #2a2810', color: '#e8e0c8', fontSize: 13, padding: '11px 14px', outline: 'none', fontFamily: 'Arial,sans-serif', boxSizing: 'border-box', colorScheme: 'dark' }}
                />
              </div>
            </div>

            {selectedVehicle?.seats && passengers > selectedVehicle.seats && (
              <p style={{ color: '#c97050', fontSize: 12, marginTop: 6, fontFamily: 'Arial,sans-serif' }}>
                ⚠ Max {selectedVehicle.seats} passengers for this vehicle.
              </p>
            )}

            {/* STEP 3 */}
            <p style={{ fontSize: 10, letterSpacing: '2.5px', color: '#7a7055', textTransform: 'uppercase', fontFamily: 'Arial,sans-serif', margin: '28px 0 14px' }}>
              STEP 3 — YOUR DETAILS
            </p>

            <label style={{ display: 'block', fontSize: 10, letterSpacing: '2px', color: '#7a7055', textTransform: 'uppercase', fontFamily: 'Arial,sans-serif', marginBottom: 5 }}>
              FULL NAME
            </label>
            <input
              type="text"
              placeholder="Sophea Heng"
              value={name}
              onChange={e => setName(e.target.value)}
              style={{ width: '100%', background: '#1a1908', border: '1px solid #2a2810', color: '#e8e0c8', fontSize: 13, padding: '11px 14px', outline: 'none', fontFamily: 'Arial,sans-serif', boxSizing: 'border-box' }}
            />

            <div style={{ display: 'flex', gap: 16, marginTop: 14 }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: 10, letterSpacing: '2px', color: '#7a7055', textTransform: 'uppercase', fontFamily: 'Arial,sans-serif', marginBottom: 5 }}>
                  PHONE
                </label>
                <input
                  type="tel"
                  placeholder="+855 17 xxx xxx"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  style={{ width: '100%', background: '#1a1908', border: '1px solid #2a2810', color: '#e8e0c8', fontSize: 13, padding: '11px 14px', outline: 'none', fontFamily: 'Arial,sans-serif', boxSizing: 'border-box' }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: 10, letterSpacing: '2px', color: '#7a7055', textTransform: 'uppercase', fontFamily: 'Arial,sans-serif', marginBottom: 5 }}>
                  EMAIL
                </label>
                <input
                  type="email"
                  placeholder="you@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{ width: '100%', background: '#1a1908', border: '1px solid #2a2810', color: '#e8e0c8', fontSize: 13, padding: '11px 14px', outline: 'none', fontFamily: 'Arial,sans-serif', boxSizing: 'border-box' }}
                />
              </div>
            </div>

            <label style={{ display: 'block', fontSize: 10, letterSpacing: '2px', color: '#7a7055', textTransform: 'uppercase', fontFamily: 'Arial,sans-serif', marginBottom: 5, marginTop: 14 }}>
              PICKUP ADDRESS
            </label>
            <input
              type="text"
              placeholder="Street / Hotel name"
              value={pickup}
              onChange={e => setPickup(e.target.value)}
              style={{ width: '100%', background: '#1a1908', border: '1px solid #2a2810', color: '#e8e0c8', fontSize: 13, padding: '11px 14px', outline: 'none', fontFamily: 'Arial,sans-serif', boxSizing: 'border-box' }}
            />

            <label style={{ display: 'block', fontSize: 10, letterSpacing: '2px', color: '#7a7055', textTransform: 'uppercase', fontFamily: 'Arial,sans-serif', marginBottom: 5, marginTop: 14 }}>
              NOTES (OPTIONAL)
            </label>
            <textarea
              placeholder="Flight number, special requests..."
              value={notes}
              onChange={e => setNotes(e.target.value)}
              style={{ width: '100%', background: '#1a1908', border: '1px solid #2a2810', color: '#e8e0c8', fontSize: 13, padding: '11px 14px', outline: 'none', fontFamily: 'Arial,sans-serif', boxSizing: 'border-box', resize: 'vertical', minHeight: 88 }}
            />

            {error && (
              <div style={{ marginTop: 16, padding: '10px 14px', background: '#2a1010', border: '1px solid #5a2020', color: '#e87070', fontSize: 12, fontFamily: 'Arial,sans-serif' }}>
                ⚠ {error}
              </div>
            )}

          </div>

          {/* ── Summary sidebar ── */}
          <div style={{ width: 235, flexShrink: 0, background: '#0d0c05', border: '1px solid #1e1d08', padding: '24px 20px', position: 'sticky', top: 24 }}>

            <p style={{ fontSize: 15, color: '#e8e0c8', marginBottom: 20, fontFamily: 'Georgia,serif', fontWeight: 'normal' }}>
              Booking Summary
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12, fontSize: 12, fontFamily: 'Arial,sans-serif', gap: 8 }}>
              <span style={{ color: '#7a7055' }}>Route</span>
              <span style={{ color: '#e8e0c8', textAlign: 'right' }}>
                {fromCity && toCity ? `${fromCity} → ${toCity}` : '—'}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12, fontSize: 12, fontFamily: 'Arial,sans-serif', gap: 8 }}>
              <span style={{ color: '#7a7055' }}>Vehicle</span>
              <span style={{ color: '#e8e0c8', textAlign: 'right' }}>{selectedVehicle?.name || '—'}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12, fontSize: 12, fontFamily: 'Arial,sans-serif', gap: 8 }}>
              <span style={{ color: '#7a7055' }}>Date</span>
              <span style={{ color: '#e8e0c8', textAlign: 'right' }}>{fmtDate(date)}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12, fontSize: 12, fontFamily: 'Arial,sans-serif', gap: 8 }}>
              <span style={{ color: '#7a7055' }}>Passengers</span>
              <span style={{ color: '#e8e0c8' }}>{passengers}</span>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid #1e1d08', margin: '16px 0' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <span style={{ fontSize: 15, color: '#e8e0c8', fontFamily: 'Georgia,serif' }}>Total</span>
              <span style={{ fontSize: 18, color: '#c9a84c', fontWeight: 'bold', fontFamily: 'Arial,sans-serif' }}>
                {price > 0 ? `$${price}` : '—'}
              </span>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
              onMouseLeave={e => e.currentTarget.style.opacity = loading ? '0.7' : '1'}
              style={{ width: '100%', background: '#c9a84c', border: 'none', color: '#0d0c05', padding: '13px 0', fontSize: 11, fontWeight: 'bold', letterSpacing: '1.5px', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'Arial,sans-serif', textTransform: 'uppercase', opacity: loading ? 0.7 : 1 }}
            >
              {loading ? 'Submitting...' : 'Confirm Booking'}
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}