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
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

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
    if (!name.trim()) { toast('Name cannot be empty.', 'error'); return; }
    if (!email.trim()) { toast('Email cannot be empty.', 'error'); return; }
    if (!emailRegex.test(email.trim())) { toast('Please enter a valid email address (must include @).', 'error'); return; }
    updateProfile({ name: name.trim(), phone: phone.trim(), email: email.trim() });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    toast('Profile updated successfully!', 'success');
  }

  const inputClass = "w-full bg-[#0e0d07] border border-[#2a2810] text-[#e8e0c8] text-[13px] px-3.5 py-2.5 outline-none font-sans box-border"
  const labelClass = "block text-[10px] tracking-[2px] text-[#7a7055] uppercase font-sans mb-1.5"

  return (
    <div className="min-h-screen bg-[#0e0d07] text-[#e8e0c8] font-serif">

      {/* Header */}
      <section className="px-8 pt-14 pb-10 border-b border-[#1a1a0a]">
        <div className="max-w-215 mx-auto">
          <p className="text-[10px] tracking-[3px] text-[#7a7055] uppercase font-sans mb-3">
            ACCOUNT
          </p>
          <div className="w-7 h-0.5 bg-[#c9a84c] mb-4" />
          <h1 className="text-[34px] font-normal text-[#e8e0c8] tracking-[0.5px] m-0">
            My Profile
          </h1>
        </div>
      </section>

      {/* Body */}
      <div className="max-w-215 mx-auto px-8 pt-8 pb-20 flex gap-4 items-start">

        {/* Left card: avatar */}
        <div className="w-50 h-78 shrink-0 bg-[#131208] border border-[#1e1c0a] px-6 py-9 flex flex-col items-center text-center">

          {/* Avatar circle */}
          <div className="w-18 h-18 rounded-full border border-[#c9a84c] flex items-center justify-center text-[26px] text-[#c9a84c] font-serif mb-5 bg-transparent overflow-hidden shrink-0">
            {avatar
              ? <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
              : initial
            }
          </div>

          <p className="text-base text-[#e8e0c8] font-serif m-0 mb-1 font-normal">
            {currentUser.name}
          </p>
          <p className="text-xs text-[#7a7055] font-sans m-0 mb-6">
            {currentUser.email}
          </p>

          <p className="text-[9px] tracking-[2px] text-[#5a5535] uppercase font-sans m-0 mb-1.5">
            MEMBER SINCE
          </p>
          <p className="text-[13px] text-[#9a9070] font-serif m-0 mb-6">
            {memberSince}
          </p>

          <input ref={fileRef} type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
          <button
            onClick={() => fileRef.current.click()}
            className="w-full bg-transparent border border-[#2e2a10] text-[#7a7055] text-[10px] py-1.5 px-3.5 cursor-pointer font-sans tracking-[1.5px] uppercase transition-all duration-200 hover:border-[#c9a84c] hover:text-[#c9a84c]"
          >
            Upload Photo
          </button>
        </div>

        {/* Right card: form */}
        <div className="flex-1 bg-[#131208] border border-[#1e1c0a] px-7 pt-7 pb-8">

          <p className="text-[10px] tracking-[2.5px] text-[#7a7055] uppercase font-sans mb-5.5">
            PERSONAL INFORMATION
          </p>

          {/* Full Name */}
          <label className={labelClass}>FULL NAME</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className={`${inputClass} mb-5`}
          />

          {/* Phone + Email row */}
          <div className="flex gap-4 mb-7">
            <div className="flex-1">
              <label className={labelClass}>PHONE</label>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="+855 17 xxx xxx"
                className={inputClass}
              />
            </div>
            <div className="flex-1">
              <label className={labelClass}>EMAIL</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@email.com"
                className={`${inputClass} transition-colors duration-200 ${email && !emailRegex.test(email) ? 'border-[#c0392b]' : 'border-[#2a2810]'}`}
              />
              {email && !emailRegex.test(email) && (
                <p className="text-[#c0392b] text-[10px] mt-1 font-sans tracking-[0.5px]">
                  Must include @ and a domain (e.g. you@email.com)
                </p>
              )}
            </div>
          </div>

          {/* Save button */}
          <button
            onClick={handleSave}
            className="bg-[#c9a84c] border-none text-[#0e0d07] px-6 py-2.5 text-[11px] font-bold tracking-[1.5px] cursor-pointer font-sans uppercase transition-opacity duration-200 hover:opacity-85"
          >
            {saved ? '✓ Saved' : 'Save Changes'}
          </button>

        </div>
      </div>
    </div>
  );
}