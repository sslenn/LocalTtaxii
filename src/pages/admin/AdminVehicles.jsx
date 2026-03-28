import { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';

const EMPTY = {
  name: '', model: '', type: 'Standard', seats: 4,
  luggage: 2, emoji: '🚙', image: '', price_tag: '', description: '', available: true,
};
const TYPES = ['Standard', 'Van', 'Premium', 'Business', 'VIP'];

export default function AdminVehicles() {
  const { vehicles, addVehicle, updateVehicle, deleteVehicle } = useApp();

  const [showModal, setShowModal] = useState(false);
<<<<<<< HEAD
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState('');
  const fileRef = useRef(null);

  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }));
=======
  const [editing,   setEditing]   = useState(null);
  const [form,      setForm]      = useState(EMPTY);
  const [error,     setError]     = useState('');
  const fileRef = useRef(null);
>>>>>>> da48fed (add default users)

  function openAdd() {
    setForm(EMPTY); setEditing(null); setError(''); setShowModal(true);
  }

  function openEdit(v) {
    setForm({ ...EMPTY, ...v }); setEditing(v); setError(''); setShowModal(true);
  }

  function handleImageUpload(e) {
    const file = e.target.files?.[0]; if (!file) return;
    const reader = new FileReader();
     reader.onload = ev => {
      const img = new Image();
      img.onload = () => {
        const MAX_WIDTH  = 800;
        const MAX_HEIGHT = 500;
 
        let width  = img.width;
        let height = img.height;
 
        // Scale down proportionally if too large
        if (width > MAX_WIDTH) {
          height = Math.round((height * MAX_WIDTH) / width);
          width  = MAX_WIDTH;
        }
        if (height > MAX_HEIGHT) {
          width  = Math.round((width * MAX_HEIGHT) / height);
          height = MAX_HEIGHT;
        }
 
        // Draw resized image onto canvas
        const canvas = document.createElement('canvas');
        canvas.width  = width;
        canvas.height = height;
        canvas.getContext('2d').drawImage(img, 0, 0, width, height);
 
        // Compress to JPEG at 80% quality
        const resized = canvas.toDataURL('image/jpeg', 0.8);
        upd('image', resized);
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  }

  function handleImageUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => upd('image', ev.target.result);
    reader.readAsDataURL(file);
  }

  function handleSave() {
    setError('');
    if (!form.name.trim()) return setError('Name is required.');
    if (!form.model.trim()) return setError('Model is required.');
    editing ? updateVehicle(editing.id, { ...form }) : addVehicle({ ...form });
    setShowModal(false);
  }

  function handleDelete(id) {
    if (window.confirm('Delete this vehicle? This cannot be undone.')) deleteVehicle(id);
  }

  function toggleAvailability(v) {
    updateVehicle(v.id, { ...v, available: !v.available });
  }

<<<<<<< HEAD
=======
  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const inputStyle = {
    width: '100%', background: '#0d0c05', border: '1px solid #2a2810',
    color: '#e8e0c8', fontSize: 13, padding: '9px 12px', outline: 'none',
    fontFamily: 'Arial,sans-serif', boxSizing: 'border-box',
  };
  const labelStyle = {
    display: 'block', fontSize: 10, letterSpacing: '2px', color: '#7a7055',
    textTransform: 'uppercase', fontFamily: 'Arial,sans-serif', marginBottom: 5,
  };

>>>>>>> da48fed (add default users)
  return (
    <div className="min-h-screen bg-[#0a0900] text-[#e8e0c8] font-serif p-10 pb-20">

      {/* Header */}
      <div className="mb-9">
        <p className="text-[10px] tracking-widest text-[#7a7055] uppercase font-sans mb-2">FLEET</p>
        <div className="flex justify-between items-end">
          <div>
            <div className="w-7 h-0.5 bg-[#c9a84c] mb-3.5" />
            <h1 className="text-[38px] font-normal text-[#e8e0c8] font-serif tracking-[0.5px]">Vehicles</h1>
          </div>
          <button
            onClick={openAdd}
            className="bg-[#c9a84c] text-[#0a0900] px-5 py-2 text-[11px] font-bold tracking-[1.5px] uppercase font-sans hover:opacity-85 transition-opacity"
          >
            + Add Vehicle
          </button>
        </div>
      </div>

<<<<<<< HEAD
      {/* Table */}
      <div className="border border-[#1e1c08] overflow-hidden">
        {/* Header row */}
        <div className="grid grid-cols-[64px_1fr_1fr_70px_70px_80px_100px_140px_140px] px-5 py-3 bg-[#111008] border-b border-[#1a1900]">
          {['', 'NAME', 'MODEL', 'SEATS', 'BAGS', 'TYPE', 'PRICE', 'STATUS', 'ACTIONS'].map((h,i) => (
            <span key={i} className="text-[9px] tracking-[2px] text-[#5a5535] uppercase font-sans">{h}</span>
=======
      {/* ── Table ── */}
      <div style={{ border: '1px solid #1e1c08', overflow: 'hidden' }}>

        <div style={{ display: 'grid', gridTemplateColumns: '64px 1fr 1fr 70px 70px 80px 100px 140px 140px', padding: '12px 20px', background: '#111008', borderBottom: '1px solid #1a1900' }}>
          {['', 'NAME', 'MODEL', 'SEATS', 'BAGS', 'TYPE', 'PRICE', 'STATUS', 'ACTIONS'].map((h, i) => (
            <span key={i} style={{ fontSize: 9, letterSpacing: '2px', color: '#5a5535', textTransform: 'uppercase', fontFamily: 'Arial,sans-serif' }}>
              {h}
            </span>
>>>>>>> da48fed (add default users)
          ))}
        </div>

        {vehicles.length === 0 ? (
          <div className="px-5 py-10 text-center text-[#5a5535] text-sm font-sans">
            No vehicles yet. Add one above.
          </div>
        ) : (
          vehicles.map(v => (
            <div
              key={v.id}
<<<<<<< HEAD
              className="grid grid-cols-[64px_1fr_1fr_70px_70px_80px_100px_140px_140px] px-5 py-3 border-b border-[#161505] items-center cursor-default hover:bg-[#111008] transition-colors"
            >
              {/* Thumbnail */}
              <div className="w-12 h-9 overflow-hidden rounded bg-[#1a1900] flex items-center justify-center">
                {v.image ? <img src={v.image} alt={v.name} className="w-full h-full object-cover" /> : <span className="text-2xl">{v.emoji}</span>}
              </div>

              <span className="text-[13px] text-[#e8e0c8] font-serif">{v.name}</span>
              <span className="text-[13px] text-[#c8c0a8] font-serif">{v.model}</span>
              <span className="text-[12px] text-[#9a9070] font-sans">{v.seats}</span>
              <span className="text-[12px] text-[#9a9070] font-sans">{v.luggage}</span>
              <span className="text-[12px] text-[#9a9070] font-sans">{v.type}</span>
              <span className="text-[12px] text-[#c9a84c] font-sans">{v.price_tag || '—'}</span>

              <button
                onClick={() => toggleAvailability(v)}
                className={`text-[11px] font-sans tracking-[2px] px-4 py-1 uppercase rounded transition-colors w-26
                  ${v.available ? 'bg-green-800 text-green-400 border border-green-700' : 'bg-yellow-900 text-yellow-400 border border-yellow-700'}`}
=======
              style={{ display: 'grid', gridTemplateColumns: '64px 1fr 1fr 70px 70px 80px 100px 140px 140px', padding: '10px 20px', borderBottom: '1px solid #161505', alignItems: 'center', transition: 'background 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.background = '#111008'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              {/* Thumbnail */}
              <div style={{ width: 48, height: 36, overflow: 'hidden', borderRadius: 3, background: '#1a1900', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {v.image
                  ? <img src={v.image} alt={v.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <span style={{ fontSize: 20 }}>{v.emoji}</span>
                }
              </div>

              <span style={{ fontSize: 13, color: '#e8e0c8', fontFamily: 'Georgia,serif' }}>{v.name}</span>
              <span style={{ fontSize: 13, color: '#c8c0a8', fontFamily: 'Georgia,serif' }}>{v.model}</span>
              <span style={{ fontSize: 12, color: '#9a9070', fontFamily: 'Arial,sans-serif' }}>{v.seats}</span>
              <span style={{ fontSize: 12, color: '#9a9070', fontFamily: 'Arial,sans-serif' }}>{v.luggage}</span>
              <span style={{ fontSize: 12, color: '#9a9070', fontFamily: 'Arial,sans-serif' }}>{v.type}</span>
              <span style={{ fontSize: 12, color: '#c9a84c', fontFamily: 'Arial,sans-serif' }}>{v.price_tag || '—'}</span>

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
                  border:      `1px solid ${v.available ? '#2a6040' : '#5a4a20'}`,
                }}
>>>>>>> da48fed (add default users)
              >
                {v.available ? 'AVAILABLE' : 'IN SERVICE'}
              </button>

<<<<<<< HEAD
              <div className="flex gap-4">
                <button onClick={() => openEdit(v)} className="text-[#c9a84c] font-serif text-[13px]">Edit</button>
                <button onClick={() => handleDelete(v.id)} className="text-[#3a3520] hover:text-[#d47a7a] font-serif text-[13px]">Delete</button>
=======
              <div style={{ display: 'flex', gap: 16 }}>
                <button onClick={() => openEdit(v)} style={{ background: 'none', border: 'none', color: '#c9a84c', fontSize: 13, cursor: 'pointer', fontFamily: 'Georgia,serif', padding: 0 }}>
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
>>>>>>> da48fed (add default users)
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/75 flex items-center justify-center z-50"
          onClick={e => { if(e.target===e.currentTarget) setShowModal(false); }}
        >
          <div className="bg-[#111008] border border-[#2a2810] p-8 w-130 max-w-[90vw] max-h-[90vh] overflow-y-auto">

            <h2 className="text-[22px] font-normal text-[#e8e0c8] font-serif mb-6">
              {editing ? 'Edit Vehicle' : 'Add Vehicle'}
            </h2>

<<<<<<< HEAD
            {/* Image upload */}
            <div className="mb-5">
              <label className="block text-[10px] tracking-[2px] text-[#7a7055] uppercase mb-1">VEHICLE IMAGE</label>
              <div className="w-full h-40 bg-[#0d0c05] border border-[#2a2810] mb-2 flex items-center justify-center overflow-hidden">
                {form.image ? <img src={form.image} alt="preview" className="w-full h-full object-cover"/> : <p className="text-[11px] text-[#5a5535] font-sans">No image — click Upload to add one</p>}
              </div>
              <input ref={fileRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden"/>
              <div className="flex gap-2">
                <button onClick={()=>fileRef.current.click()} className="flex-1 border border-[#2a2810] text-[#7a7055] py-2 text-[11px] uppercase tracking-[1.5px] font-sans hover:border-[#c9a84c] hover:text-[#c9a84c] transition">Upload Image</button>
                {form.image && <button onClick={()=>upd('image','')} className="border border-[#2a2810] text-[#7a7055] py-2 px-4 text-[11px] uppercase tracking-[1.5px] font-sans hover:border-[#d47a7a] hover:text-[#d47a7a] transition">Remove</button>}
              </div>
=======
            {/* ── Image upload ── */}
            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>VEHICLE IMAGE</label>

              {/* Preview */}
              <div style={{
                width: '100%', height: 160,
                background: '#0d0c05', border: '1px solid #2a2810',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 8, overflow: 'hidden',
              }}>
                {form.image
                  ? <img src={form.image} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <div style={{ textAlign: 'center' }}>
                      <p style={{ fontSize: 11, color: '#5a5535', fontFamily: 'Arial,sans-serif', margin: 0 }}>
                        No image — click Upload to add one
                      </p>
                    </div>
                }
              </div>

              {/* Hidden file input */}
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />

              {/* Buttons */}
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  onClick={() => fileRef.current.click()}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#c9a84c'; e.currentTarget.style.color = '#c9a84c'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#2a2810'; e.currentTarget.style.color = '#7a7055'; }}
                  style={{ flex: 1, background: 'transparent', border: '1px solid #2a2810', color: '#7a7055', padding: '8px 0', fontSize: 11, cursor: 'pointer', fontFamily: 'Arial,sans-serif', letterSpacing: '1.5px', textTransform: 'uppercase', transition: 'all 0.2s' }}
                >
                  Upload Image
                </button>
                {form.image && (
                  <button
                    onClick={() => upd('image', '')}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#d47a7a'; e.currentTarget.style.color = '#d47a7a'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#2a2810'; e.currentTarget.style.color = '#7a7055'; }}
                    style={{ background: 'transparent', border: '1px solid #2a2810', color: '#7a7055', padding: '8px 16px', fontSize: 11, cursor: 'pointer', fontFamily: 'Arial,sans-serif', letterSpacing: '1.5px', textTransform: 'uppercase', transition: 'all 0.2s' }}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>

            {/* Name */}
            <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
              <div style={{ flex: 2 }}>
                <label style={labelStyle}>NAME</label>
                <input style={inputStyle} value={form.name} onChange={e => upd('name', e.target.value)} placeholder="SUV" />
              </div>
>>>>>>> da48fed (add default users)
            </div>

            {/* Name / Model / Type / Price */}
            <div className="flex gap-4 mb-4">
              <div className="flex-2">
                <label className="block text-[10px] tracking-[2px] text-[#7a7055] uppercase mb-1">NAME</label>
                <input value={form.name} onChange={e=>upd('name',e.target.value)} placeholder="SUV" className="w-full bg-[#0d0c05] border border-[#2a2810] text-[#e8e0c8] p-2.5 text-[13px] font-sans"/>
              </div>
              <div className="flex-2">
                <label className="block text-[10px] tracking-[2px] text-[#7a7055] uppercase mb-1">MODEL</label>
                <input value={form.model} onChange={e=>upd('model',e.target.value)} placeholder="Toyota Fortuner" className="w-full bg-[#0d0c05] border border-[#2a2810] text-[#e8e0c8] p-2.5 text-[13px] font-sans"/>
              </div>
            </div>

<<<<<<< HEAD
            <div className="flex gap-4 mb-4">
              <div className="flex-1">
                <label className="block text-[10px] tracking-[2px] text-[#7a7055] uppercase mb-1">TYPE</label>
                <select value={form.type} onChange={e=>upd('type',e.target.value)} className="w-full bg-[#0d0c05] border border-[#2a2810] text-[#e8e0c8] p-2.5 text-[13px] font-sans cursor-pointer">
                  {TYPES.map(t=> <option key={t}>{t}</option>)}
=======
            {/* Type + Price tag */}
            <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>TYPE</label>
                <select style={{ ...inputStyle, cursor: 'pointer', appearance: 'none' }} value={form.type} onChange={e => upd('type', e.target.value)}>
                  {TYPES.map(t => <option key={t}>{t}</option>)}
>>>>>>> da48fed (add default users)
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-[10px] tracking-[2px] text-[#7a7055] uppercase mb-1">PRICE TAG</label>
                <input value={form.price_tag} onChange={e=>upd('price_tag',e.target.value)} placeholder="$79+" className="w-full bg-[#0d0c05] border border-[#2a2810] text-[#e8e0c8] p-2.5 text-[13px] font-sans"/>
              </div>
            </div>

            {/* Seats / Luggage */}
            <div className="flex gap-4 mb-4">
              <div className="flex-1">
                <label className="block text-[10px] tracking-[2px] text-[#7a7055] uppercase mb-1">SEATS</label>
                <input type="number" min={1} value={form.seats} onChange={e=>upd('seats',+e.target.value)} className="w-full bg-[#0d0c05] border border-[#2a2810] text-[#e8e0c8] p-2.5 text-[13px] font-sans"/>
              </div>
              <div className="flex-1">
                <label className="block text-[10px] tracking-[2px] text-[#7a7055] uppercase mb-1">LUGGAGE BAGS</label>
                <input type="number" min={0} value={form.luggage} onChange={e=>upd('luggage',+e.target.value)} className="w-full bg-[#0d0c05] border border-[#2a2810] text-[#e8e0c8] p-2.5 text-[13px] font-sans"/>
              </div>
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="block text-[10px] tracking-[2px] text-[#7a7055] uppercase mb-1">DESCRIPTION</label>
              <textarea value={form.description} onChange={e=>upd('description',e.target.value)} placeholder="Describe this vehicle..." className="w-full bg-[#0d0c05] border border-[#2a2810] text-[#e8e0c8] p-2.5 text-[13px] font-sans min-h-18 resize-y"/>
            </div>

            {/* Available */}
<<<<<<< HEAD
            <div className="flex items-center gap-2 mb-6">
              <input type="checkbox" id="available" checked={form.available} onChange={e=>upd('available',e.target.checked)} className="accent-[#c9a84c] w-3.5 h-3.5 cursor-pointer"/>
              <label htmlFor="available" className="text-[12px] text-[#9a9070] font-sans select-none cursor-pointer">Available for booking</label>
            </div>

            {error && <div className="mb-4 p-2.5 bg-red-900 border border-red-800 text-[#e87070] text-[12px] font-sans">⚠ {error}</div>}

            <div className="flex justify-end gap-2">
              <button onClick={()=>setShowModal(false)} className="border border-[#2a2810] text-[#9a9070] px-5 py-2 text-[11px] font-sans uppercase">Cancel</button>
              <button onClick={handleSave} className="bg-[#c9a84c] text-[#0a0900] px-6 py-2 text-[11px] font-bold font-sans uppercase hover:opacity-85 transition-opacity">{editing ? 'Save Changes':'Add Vehicle'}</button>
=======
            <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
              <input type="checkbox" id="available" checked={form.available} onChange={e => upd('available', e.target.checked)} style={{ accentColor: '#c9a84c', width: 14, height: 14, cursor: 'pointer' }} />
              <label htmlFor="available" style={{ fontSize: 12, color: '#9a9070', fontFamily: 'Arial,sans-serif', cursor: 'pointer', userSelect: 'none' }}>
                Available for booking
              </label>
            </div>

            {error && (
              <div style={{ marginBottom: 16, padding: '8px 12px', background: '#2a1010', border: '1px solid #5a2020', color: '#e87070', fontSize: 12, fontFamily: 'Arial,sans-serif' }}>
                ⚠ {error}
              </div>
            )}

            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button onClick={() => setShowModal(false)} style={{ background: 'transparent', border: '1px solid #2a2810', color: '#9a9070', padding: '10px 20px', fontSize: 11, cursor: 'pointer', fontFamily: 'Arial,sans-serif', letterSpacing: '1px', textTransform: 'uppercase' }}>
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
>>>>>>> da48fed (add default users)
            </div>

          </div>
        </div>
      )}
    </div>
  );
}