import { useState } from 'react';
import { useApp } from '../../context/AppContext';

const EMPTY = {
  name: '', model: '', type: 'Standard', seats: 4,
  luggage: 2, emoji: '🚙', price_tag: '', description: '', available: true,
};

const TYPES = ['Standard', 'Van', 'Premium', 'Business', 'VIP'];

export default function AdminVehicles() {
  const { vehicles, addVehicle, updateVehicle, deleteVehicle } = useApp();

  const [showModal, setShowModal] = useState(false);
  const [editing,   setEditing]   = useState(null);
  const [form,      setForm]      = useState(EMPTY);
  const [error,     setError]     = useState('');

  function openAdd() {
    setForm(EMPTY);
    setEditing(null);
    setError('');
    setShowModal(true);
  }

  function openEdit(v) {
    setForm({ ...EMPTY, ...v });
    setEditing(v);
    setError('');
    setShowModal(true);
  }

  function handleSave() {
    setError('');
    if (!form.name.trim())  return setError('Name is required.');
    if (!form.model.trim()) return setError('Model is required.');
    if (editing) {
      updateVehicle(editing.id, { ...form });
    } else {
      addVehicle({ ...form });
    }
    setShowModal(false);
  }

  function handleDelete(id) {
    if (window.confirm('Delete this vehicle? This cannot be undone.')) deleteVehicle(id);
  }

  function toggleAvailability(v) {
    updateVehicle(v.id, { ...v, available: !v.available });
  }

  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }));

  // ── Styles ─────────────────────────────────────────────────────────────────
  const inputStyle = {
    width: '100%', background: '#0d0c05', border: '1px solid #2a2810',
    color: '#e8e0c8', fontSize: 13, padding: '9px 12px', outline: 'none',
    fontFamily: 'Arial,sans-serif', boxSizing: 'border-box',
  };
  const labelStyle = {
    display: 'block', fontSize: 10, letterSpacing: '2px', color: '#7a7055',
    textTransform: 'uppercase', fontFamily: 'Arial,sans-serif', marginBottom: 5,
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0a0900', color: '#e8e0c8', fontFamily: 'Georgia, serif', padding: '40px 40px 80px' }}>

      {/* ── Header ── */}
      <div style={{ marginBottom: 36 }}>
        <p style={{ fontSize: 10, letterSpacing: '3px', color: '#7a7055', textTransform: 'uppercase', fontFamily: 'Arial,sans-serif', margin: '0 0 10px' }}>
          FLEET
        </p>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <div style={{ width: 28, height: 2, background: '#c9a84c', marginBottom: 14 }} />
            <h1 style={{ fontSize: 38, fontWeight: 'normal', color: '#e8e0c8', margin: 0, fontFamily: 'Georgia,serif', letterSpacing: 0.5 }}>
              Vehicles
            </h1>
          </div>
          <button
            onClick={openAdd}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            style={{ background: '#c9a84c', border: 'none', color: '#0a0900', padding: '10px 20px', fontSize: 11, fontWeight: 'bold', letterSpacing: '1.5px', cursor: 'pointer', fontFamily: 'Arial,sans-serif', textTransform: 'uppercase' }}
          >
            + Add Vehicle
          </button>
        </div>
      </div>

      {/* ── Table ── */}
      <div style={{ border: '1px solid #1e1c08', overflow: 'hidden' }}>

        {/* Column headers */}
        <div style={{ display: 'grid', gridTemplateColumns: '44px 1fr 1fr 70px 70px 80px 100px 140px 140px', padding: '12px 20px', background: '#111008', borderBottom: '1px solid #1a1900' }}>
          {['', 'NAME', 'MODEL', 'SEATS', 'BAGS', 'TYPE', 'PRICE', 'STATUS', 'ACTIONS'].map((h, i) => (
            <span key={i} style={{ fontSize: 9, letterSpacing: '2px', color: '#5a5535', textTransform: 'uppercase', fontFamily: 'Arial,sans-serif' }}>
              {h}
            </span>
          ))}
        </div>

        {/* Rows */}
        {vehicles.length === 0 ? (
          <div style={{ padding: '40px 20px', textAlign: 'center', color: '#5a5535', fontFamily: 'Arial,sans-serif', fontSize: 13 }}>
            No vehicles yet. Add one above.
          </div>
        ) : (
          vehicles.map(v => (
            <div
              key={v.id}
              style={{ display: 'grid', gridTemplateColumns: '44px 1fr 1fr 70px 70px 80px 100px 140px 140px', padding: '14px 20px', borderBottom: '1px solid #161505', alignItems: 'center', transition: 'background 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.background = '#111008'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              {/* Emoji */}
              <span style={{ fontSize: 20 }}>{v.emoji}</span>

              {/* Name */}
              <span style={{ fontSize: 13, color: '#e8e0c8', fontFamily: 'Georgia,serif' }}>{v.name}</span>

              {/* Model */}
              <span style={{ fontSize: 13, color: '#c8c0a8', fontFamily: 'Georgia,serif' }}>{v.model}</span>

              {/* Seats */}
              <span style={{ fontSize: 12, color: '#9a9070', fontFamily: 'Arial,sans-serif' }}>{v.seats}</span>

              {/* Luggage */}
              <span style={{ fontSize: 12, color: '#9a9070', fontFamily: 'Arial,sans-serif' }}>{v.luggage}</span>

              {/* Type */}
              <span style={{ fontSize: 12, color: '#9a9070', fontFamily: 'Arial,sans-serif' }}>{v.type}</span>

              {/* Price tag */}
              <span style={{ fontSize: 12, color: '#c9a84c', fontFamily: 'Arial,sans-serif' }}>{v.price_tag || '—'}</span>

              {/* Availability toggle */}
              <button
                onClick={() => toggleAvailability(v)}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                style={{
                  fontSize: 11, fontFamily: 'Arial,sans-serif', letterSpacing: '2px',
                  padding: '8px 18px', textTransform: 'uppercase', width: 'fit-content',
                  cursor: 'pointer', transition: 'opacity 0.15s', borderRadius: '6px',
                  background: v.available ? '#1a4a2e' : '#3a3010',
                  color:       v.available ? '#4ade80' : '#c9a84c',
                }}
              >
                {v.available ? 'AVAILABLE' : 'IN SERVICE'}
              </button>

              {/* Actions */}
              <div style={{ display: 'flex', gap: 16 }}>
                <button
                  onClick={() => openEdit(v)}
                  onMouseEnter={e => e.currentTarget.style.color = '#c9a84c'}
                  onMouseLeave={e => e.currentTarget.style.color = '#c9a84c'}
                  style={{ background: 'none', border: 'none', color: '#c9a84c', fontSize: 13, cursor: 'pointer', fontFamily: 'Georgia,serif', padding: 0, letterSpacing: '0.5px' }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(v.id)}
                  onMouseEnter={e => e.currentTarget.style.color = '#d47a7a'}
                  onMouseLeave={e => e.currentTarget.style.color = '#3a3520'}
                  style={{ background: 'none', border: 'none', color: '#3a3520', fontSize: 13, cursor: 'pointer', fontFamily: 'Georgia,serif', padding: 0 }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ── Modal ── */}
      {showModal && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999 }}
          onClick={e => { if (e.target === e.currentTarget) setShowModal(false); }}
        >
          <div style={{ background: '#111008', border: '1px solid #2a2810', padding: '32px', width: 520, maxWidth: '90vw', maxHeight: '90vh', overflowY: 'auto' }}>

            <h2 style={{ fontSize: 22, fontWeight: 'normal', color: '#e8e0c8', margin: '0 0 24px', fontFamily: 'Georgia,serif' }}>
              {editing ? 'Edit Vehicle' : 'Add Vehicle'}
            </h2>

            {/* Name + Emoji */}
            <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
              <div style={{ flex: 2 }}>
                <label style={labelStyle}>NAME</label>
                <input style={inputStyle} value={form.name} onChange={e => upd('name', e.target.value)} placeholder="SUV" />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>EMOJI</label>
                <input style={inputStyle} value={form.emoji} onChange={e => upd('emoji', e.target.value)} placeholder="🚙" />
              </div>
            </div>

            {/* Model */}
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>MODEL</label>
              <input style={inputStyle} value={form.model} onChange={e => upd('model', e.target.value)} placeholder="Toyota Fortuner" />
            </div>

            {/* Type + Price tag */}
            <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>TYPE</label>
                <select
                  style={{ ...inputStyle, cursor: 'pointer', appearance: 'none' }}
                  value={form.type}
                  onChange={e => upd('type', e.target.value)}
                >
                  {TYPES.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>PRICE TAG</label>
                <input style={inputStyle} value={form.price_tag} onChange={e => upd('price_tag', e.target.value)} placeholder="$79+" />
              </div>
            </div>

            {/* Seats + Luggage */}
            <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>SEATS</label>
                <input style={inputStyle} type="number" min={1} value={form.seats} onChange={e => upd('seats', +e.target.value)} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>LUGGAGE BAGS</label>
                <input style={inputStyle} type="number" min={0} value={form.luggage} onChange={e => upd('luggage', +e.target.value)} />
              </div>
            </div>

            {/* Description */}
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>DESCRIPTION</label>
              <textarea
                style={{ ...inputStyle, resize: 'vertical', minHeight: 72 }}
                value={form.description}
                onChange={e => upd('description', e.target.value)}
                placeholder="Describe this vehicle..."
              />
            </div>

            {/* Available toggle */}
            <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
              <input
                type="checkbox"
                id="available"
                checked={form.available}
                onChange={e => upd('available', e.target.checked)}
                style={{ accentColor: '#c9a84c', width: 14, height: 14, cursor: 'pointer' }}
              />
              <label htmlFor="available" style={{ fontSize: 12, color: '#9a9070', fontFamily: 'Arial,sans-serif', cursor: 'pointer', userSelect: 'none' }}>
                Available for booking
              </label>
            </div>

            {/* Error */}
            {error && (
              <div style={{ marginBottom: 16, padding: '8px 12px', background: '#2a1010', border: '1px solid #5a2020', color: '#e87070', fontSize: 12, fontFamily: 'Arial,sans-serif' }}>
                ⚠ {error}
              </div>
            )}

            {/* Buttons */}
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowModal(false)}
                style={{ background: 'transparent', border: '1px solid #2a2810', color: '#9a9070', padding: '10px 20px', fontSize: 11, cursor: 'pointer', fontFamily: 'Arial,sans-serif', letterSpacing: '1px', textTransform: 'uppercase' }}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                style={{ background: '#c9a84c', border: 'none', color: '#0a0900', padding: '10px 24px', fontSize: 11, fontWeight: 'bold', cursor: 'pointer', fontFamily: 'Arial,sans-serif', letterSpacing: '1.5px', textTransform: 'uppercase' }}
              >
                {editing ? 'Save Changes' : 'Add Vehicle'}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}