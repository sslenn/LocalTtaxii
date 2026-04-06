import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const TODAY = new Date().toISOString().split('T')[0];
// '2026-04-06T06:00:00.000Z'
// '2026-04-06'

export default function Booking() {
  const { currentUser, routes, vehicles, createBooking, toast } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!currentUser) navigate('/login', { state: { from: '/booking' } });
  }, [currentUser]);

 // Filter out inactive routes and vehicles
  const activeRoutes   = routes.filter(r => r.active !== false);
  const activeVehicles = vehicles.filter(v => v.available !== false);

 // Prefill form if coming from a route/vehicle selection
  const prefill      = location.state || {};
  const prefillRoute = activeRoutes.find(r => r.id === prefill.routeId);
  const fromCities   = [...new Set(activeRoutes.map(r => r.from))];

 // Initialize form state with prefill or defaults
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

 // Update destination options when fromCity changes
  const toOptions = activeRoutes.filter(r => r.from === fromCity).map(r => r.to);

  // Auto-select first available destination when fromCity changes
  useEffect(() => {
    const opts = activeRoutes.filter(r => r.from === fromCity).map(r => r.to);
    setToCity(opts[0] || '');
  }, [fromCity]);

  // Calculate price based on selected route and vehicle
  const selectedRoute   = activeRoutes.find(r => r.from === fromCity && r.to === toCity);
  const selectedVehicle = activeVehicles.find(v => v.id === vehicleId);
  const price = selectedRoute && selectedVehicle
    ? (selectedRoute.prices?.[selectedVehicle.id] ?? 0)
    : 0;

  // Helper to format date for summary display
  const fmtDate = d => d
    ? new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    : '—';

  // Form submission handler with validation
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
    <div className="min-h-screen bg-[#111108] text-[#e8e0c8] font-serif">

      {/* ── Header ── */}
      <section className="bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,168,76,0.06)_0%,transparent_60%)] bg-[#111] border-b border-[#141414] py-16 px-8 mb-10">
        <div className="max-w-245 mx-auto">
          <p className="text-[#c9a84c] tracking-widest text-xs font-sans mb-3">RESERVE YOUR SEAT</p>
          <h1 className="font-cormorant text-[3.5rem] font-normal text-white mb-2.5 tracking-[1px]">Book a Transfer</h1>
          <p className="text-gray-500 max-w-125 text-xs font-sans leading-6 m-0">
            Cross-province expeditions with fixed-rate transparency. All-inclusive pricing, door-to-door.
          </p>
        </div>
      </section>

      {/* ── Body ── */}
      <div className="max-w-245 mx-auto px-6 pb-20">
        <div className="flex gap-7 items-start">

          {/* ── Form column ── */}
          <div className="flex-1 min-w-0">

            {/* STEP 1 */}
            <p className="text-[10px] tracking-widest text-[#7a7055] uppercase font-sans mb-3.5">
              STEP 1 — ROUTE & VEHICLE
            </p>

            <label className="block text-[10px] tracking-wide text-[#7a7055] uppercase font-sans mb-1">FROM</label>
            <select
              value={fromCity}
              onChange={e => setFromCity(e.target.value)}
              className="w-full bg-[#1a1908] border border-[#2a2810] text-[#e8e0c8] text-[13px] p-3 outline-none font-sans cursor-pointer appearance-none"
            >
              {fromCities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            <label className="block text-[10px] tracking-wide text-[#7a7055] uppercase font-sans mt-3.5 mb-1">TO</label>
            <select
              value={toCity}
              onChange={e => setToCity(e.target.value)}
              className="w-full bg-[#1a1908] border border-[#2a2810] text-[#e8e0c8] text-[13px] p-3 outline-none font-sans cursor-pointer appearance-none"
            >
              <option value="">Select destination...</option>
              {toOptions.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            <label className="block text-[10px] tracking-wide text-[#7a7055] uppercase font-sans mt-3.5 mb-1">VEHICLE CLASS</label>
            <select
              value={vehicleId}
              onChange={e => setVehicleId(e.target.value)}
              className="w-full bg-[#1a1908] border border-[#2a2810] text-[#e8e0c8] text-[13px] p-3 outline-none font-sans cursor-pointer appearance-none"
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
            <p className="text-[10px] tracking-widest text-[#7a7055] uppercase font-sans mt-7 mb-3.5">
              STEP 2 — DATE & PASSENGERS
            </p>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-[10px] tracking-wide text-[#7a7055] uppercase font-sans mb-1">DATE</label>
                <input
                  type="date"
                  min={TODAY}
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  className="w-full bg-[#1a1908] border border-[#2a2810] text-[#e8e0c8] text-[13px] p-3 outline-none font-sans"
                />
              </div>
              <div className="flex-1">
                <label className="block text-[10px] tracking-wide text-[#7a7055] uppercase font-sans mb-1">PASSENGERS</label>
                <input
                  type="number"
                  min={1}
                  max={selectedVehicle?.seats || 10}
                  value={passengers}
                  onChange={e => setPassengers(Math.max(1, +e.target.value))}
                  className="w-full bg-[#1a1908] border border-[#2a2810] text-[#e8e0c8] text-[13px] p-3 outline-none font-sans"
                />
              </div>
            </div>

            {selectedVehicle?.seats && passengers > selectedVehicle.seats && (
              <p className="text-[#c97050] text-[12px] mt-1.5 font-sans">
                ⚠ Max {selectedVehicle.seats} passengers for this vehicle.
              </p>
            )}

            {/* STEP 3 */}
            <p className="text-[10px] tracking-widest text-[#7a7055] uppercase font-sans mt-7 mb-3.5">
              STEP 3 — YOUR DETAILS
            </p>

            <label className="block text-[10px] tracking-wide text-[#7a7055] uppercase font-sans mb-1">FULL NAME</label>
            <input
              type="text"
              placeholder="Sophea Heng"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-[#1a1908] border border-[#2a2810] text-[#e8e0c8] text-[13px] p-3 outline-none font-sans"
            />

            <div className="flex gap-4 mt-3.5">
              <div className="flex-1">
                <label className="block text-[10px] tracking-wide text-[#7a7055] uppercase font-sans mb-1">PHONE</label>
                <input
                  type="tel"
                  placeholder="+855 17 xxx xxx"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full bg-[#1a1908] border border-[#2a2810] text-[#e8e0c8] text-[13px] p-3 outline-none font-sans"
                />
              </div>
              <div className="flex-1">
                <label className="block text-[10px] tracking-wide text-[#7a7055] uppercase font-sans mb-1">EMAIL</label>
                <input
                  type="email"
                  placeholder="you@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-[#1a1908] border border-[#2a2810] text-[#e8e0c8] text-[13px] p-3 outline-none font-sans"
                />
              </div>
            </div>

            <label className="block text-[10px] tracking-wide text-[#7a7055] uppercase font-sans mt-3.5 mb-1">PICKUP ADDRESS</label>
            <input
              type="text"
              placeholder="Street / Hotel name"
              value={pickup}
              onChange={e => setPickup(e.target.value)}
              className="w-full bg-[#1a1908] border border-[#2a2810] text-[#e8e0c8] text-[13px] p-3 outline-none font-sans"
            />

            <label className="block text-[10px] tracking-wide text-[#7a7055] uppercase font-sans mt-3.5 mb-1">NOTES (OPTIONAL)</label>
            <textarea
              placeholder="Flight number, special requests..."
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="w-full bg-[#1a1908] border border-[#2a2810] text-[#e8e0c8] text-[13px] p-3 outline-none font-sans resize-y min-h-[22] "
            />

            {error && (
              <div className="mt-4 p-2.5 bg-[#2a1010] border border-[#5a2020] text-[#e87070] text-[12px] font-sans">
                ⚠ {error}
              </div>
            )}

          </div>

          {/* ── Summary sidebar ── */}
          <div className="w-58.75 shrink-0 bg-[#0d0c05] border border-[#1e1d08] p-6 sticky top-6">
            <p className="text-[15px] text-[#e8e0c8] font-serif font-normal mb-5">Booking Summary</p>

            <div className="flex justify-between items-start mb-3 text-[12px] font-sans gap-2">
              <span className="text-[#7a7055]">Route</span>
              <span className="text-[#e8e0c8] text-right">{fromCity && toCity ? `${fromCity} → ${toCity}` : '—'}</span>
            </div>

            <div className="flex justify-between items-start mb-3 text-[12px] font-sans gap-2">
              <span className="text-[#7a7055]">Vehicle</span>
              <span className="text-[#e8e0c8] text-right">{selectedVehicle?.name || '—'}</span>
            </div>

            <div className="flex justify-between items-start mb-3 text-[12px] font-sans gap-2">
              <span className="text-[#7a7055]">Date</span>
              <span className="text-[#e8e0c8] text-right">{fmtDate(date)}</span>
            </div>

            <div className="flex justify-between items-start mb-3 text-[12px] font-sans gap-2">
              <span className="text-[#7a7055]">Passengers</span>
              <span className="text-[#e8e0c8]">{passengers}</span>
            </div>

            <hr className="border-t border-[#1e1d08] my-4" />

            <div className="flex justify-between items-center mb-5">
              <span className="text-[15px] text-[#e8e0c8] font-serif">Total</span>
              <span className="text-[18px] text-[#c9a84c] font-bold font-sans">{price > 0 ? `$${price}` : '—'}</span>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`w-full py-3 text-[11px] font-bold tracking-widest uppercase font-sans ${
                loading ? 'opacity-70 cursor-not-allowed' : 'opacity-100 cursor-pointer'
              } bg-[#c9a84c] text-[#0d0c05]`}
            >
              {loading ? 'Submitting...' : 'Confirm Booking'}
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}