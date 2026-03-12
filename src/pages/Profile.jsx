import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Profile() {
  const { currentUser, updateProfile, toast } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) navigate('/login', { state: { from: '/profile' } });
  }, [currentUser]);

  const [name,   setName]   = useState(currentUser?.name  || '');
  const [phone,  setPhone]  = useState(currentUser?.phone || '');
  const [email,  setEmail]  = useState(currentUser?.email || '');
  const [saved,  setSaved]  = useState(false);
  const [avatar, setAvatar] = useState(currentUser?.avatar || null);
  const fileRef = useRef(null);

  function handleAvatarChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      setAvatar(ev.target.result);
      updateProfile({ avatar: ev.target.result });
      toast('Profile photo updated.', 'success');
    };
    reader.readAsDataURL(file);
  }

  if (!currentUser) return null;

  const initial = (currentUser.name || 'U')[0].toUpperCase();

  const memberSince = currentUser.createdAt
    ? new Date(currentUser.createdAt).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
    : 'Member';

  function handleSave() {
    if (!name.trim())  { alert('Name cannot be empty.'); return; }
    if (!email.trim()) { alert('Email cannot be empty.'); return; }
    updateProfile({ name: name.trim(), phone: phone.trim(), email: email.trim() });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    alert('Profile updated successfully!');
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0e0d07', color: '#e8e0c8', fontFamily: 'Georgia, serif' }}>

      {/* ── Header ── */}
      <section style={{ padding: '3.5rem 2rem 2.5rem', borderBottom: '1px solid #1a1a0a' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <p style={{ fontSize: 10, letterSpacing: '3px', color: '#7a7055', textTransform: 'uppercase', fontFamily: 'Arial,sans-serif', margin: '0 0 12px' }}>
            ACCOUNT
          </p>
          <div style={{ width: 28, height: 2, background: '#c9a84c', marginBottom: 16 }} />
          <h1 style={{ fontSize: 34, fontWeight: 'normal', color: '#e8e0c8', margin: 0, letterSpacing: 0.5 }}>
            My Profile
          </h1>
        </div>
      </section>

      {/* ── Body ── */}
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '32px 2rem 80px', display: 'flex', gap: 16, alignItems: 'flex-start' }}>

        {/* ── Left card: avatar ── */}
        <div style={{ width: 200, height: 312, flexShrink: 0, background: '#131208', border: '1px solid #1e1c0a', padding: '36px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>

          {/* Avatar circle */}
          <div style={{ width: 72, height: 72, borderRadius: '50%', border: '1px solid #c9a84c', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, color: '#c9a84c', fontFamily: 'Georgia,serif', marginBottom: 20, background: 'transparent', overflow: 'hidden', flexShrink: 0 }}>
            {avatar
              ? <img src={avatar} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              : initial
            }
          </div>

          <p style={{ fontSize: 16, color: '#e8e0c8', fontFamily: 'Georgia,serif', margin: '0 0 4px', fontWeight: 'normal' }}>
            {currentUser.name}
          </p>
          <p style={{ fontSize: 12, color: '#7a7055', fontFamily: 'Arial,sans-serif', margin: '0 0 24px' }}>
            {currentUser.email}
          </p>

          <p style={{ fontSize: 9, letterSpacing: '2px', color: '#5a5535', textTransform: 'uppercase', fontFamily: 'Arial,sans-serif', margin: '0 0 6px' }}>
            MEMBER SINCE
          </p>
          <p style={{ fontSize: 13, color: '#9a9070', fontFamily: 'Georgia,serif', margin: '0 0 24px' }}>
            {memberSince}
          </p>

          {/* Upload photo */}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            style={{ display: 'none' }}
          />
          <button
            onClick={() => fileRef.current.click()}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#c9a84c'; e.currentTarget.style.color = '#c9a84c'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#2e2a10'; e.currentTarget.style.color = '#7a7055'; }}
            style={{ background: 'transparent', border: '1px solid #2e2a10', color: '#7a7055', fontSize: 10, padding: '7px 14px', cursor: 'pointer', fontFamily: 'Arial,sans-serif', letterSpacing: '1.5px', textTransform: 'uppercase', transition: 'all 0.2s', width: '100%' }}
          >
            Upload Photo
          </button>
        </div>

        {/* ── Right card: form ── */}
        <div style={{ flex: 1, background: '#131208', border: '1px solid #1e1c0a', padding: '28px 28px 32px' }}>

          <p style={{ fontSize: 10, letterSpacing: '2.5px', color: '#7a7055', textTransform: 'uppercase', fontFamily: 'Arial,sans-serif', margin: '0 0 22px' }}>
            PERSONAL INFORMATION
          </p>

          {/* Full Name */}
          <label style={{ display: 'block', fontSize: 10, letterSpacing: '2px', color: '#7a7055', textTransform: 'uppercase', fontFamily: 'Arial,sans-serif', marginBottom: 6 }}>
            FULL NAME
          </label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            style={{ width: '100%', background: '#0e0d07', border: '1px solid #2a2810', color: '#e8e0c8', fontSize: 13, padding: '10px 14px', outline: 'none', fontFamily: 'Arial,sans-serif', boxSizing: 'border-box', marginBottom: 20 }}
          />

          {/* Phone + Email row */}
          <div style={{ display: 'flex', gap: 16, marginBottom: 28 }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: 10, letterSpacing: '2px', color: '#7a7055', textTransform: 'uppercase', fontFamily: 'Arial,sans-serif', marginBottom: 6 }}>
                PHONE
              </label>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="+855 17 xxx xxx"
                style={{ width: '100%', background: '#0e0d07', border: '1px solid #2a2810', color: '#e8e0c8', fontSize: 13, padding: '10px 14px', outline: 'none', fontFamily: 'Arial,sans-serif', boxSizing: 'border-box' }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: 10, letterSpacing: '2px', color: '#7a7055', textTransform: 'uppercase', fontFamily: 'Arial,sans-serif', marginBottom: 6 }}>
                EMAIL
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@email.com"
                style={{ width: '100%', background: '#0e0d07', border: '1px solid #2a2810', color: '#e8e0c8', fontSize: 13, padding: '10px 14px', outline: 'none', fontFamily: 'Arial,sans-serif', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          {/* Save button */}
          <button
            onClick={handleSave}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            style={{ background: '#c9a84c', border: 'none', color: '#0e0d07', padding: '10px 24px', fontSize: 11, fontWeight: 'bold', letterSpacing: '1.5px', cursor: 'pointer', fontFamily: 'Arial,sans-serif', textTransform: 'uppercase', transition: 'opacity 0.2s' }}
          >
            {saved ? '✓ Saved' : 'Save Changes'}
          </button>

        </div>
      </div>
    </div>
  );
}