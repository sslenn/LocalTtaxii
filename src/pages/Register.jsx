import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function Register() {
  const { register, toast } = useApp()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.password) {
      toast('Please fill in all required fields.', 'error')
      return
    }
    if (form.password !== form.confirm) {
      toast('Passwords do not match.', 'error')
      return
    }
    if (form.password.length < 6) {
      toast('Password must be at least 6 characters.', 'error')
      return
    }

    setLoading(true)
    const success = register(form.name, form.email, form.password, form.phone)
    setLoading(false)

    if (!success) {
      toast('Email already registered.', 'error')
      return
    }

    toast('Account created! Welcome ' + form.name + '!', 'success')
    navigate('/')
  }

  const inputClass = "w-full px-3.5 py-2.5 bg-[#0A0908] border border-[#2A2720] rounded text-[#F0EBE0] text-[13px] outline-none"
  const labelClass = "block text-[11px] tracking-[1.5px] uppercase text-[#8A8070] mb-1.5"

  return (
    <div className="min-h-screen bg-[#0A0908] flex items-center justify-center px-5 py-10">
      <div className="w-full max-w-95">

        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="no-underline">
            <div className="w-11 h-11 bg-[#C9A84C] rounded flex items-center justify-center text-2xl font-bold text-black mx-auto mb-3">
              T
            </div>
            <span className="text-[22px] font-semibold text-[#F0EBE0]">
              LocalT<span className="text-[#C9A84C]">taxi</span>
            </span>
          </Link>
          <p className="text-[13px] text-[#8A8070] mt-2">Create your account</p>
        </div>

        {/* Form Card */}
        <div className="bg-[#141210] border border-[#2A2720] rounded-md p-8">
          <form onSubmit={handleSubmit}>

            {/* Name */}
            <div className="mb-4">
              <label className={labelClass}>
                Full Name <span className="text-[#C9A84C]">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
                className={inputClass}
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className={labelClass}>
                Email <span className="text-[#C9A84C]">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@email.com"
                className={inputClass}
              />
            </div>

            {/* Phone */}
            <div className="mb-4">
              <label className={labelClass}>Phone</label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="012 345 678"
                className={inputClass}
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className={labelClass}>
                Password <span className="text-[#C9A84C]">*</span>
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Min. 6 characters"
                className={inputClass}
              />
            </div>

            {/* Confirm Password */}
            <div className="mb-6">
              <label className={labelClass}>
                Confirm Password <span className="text-[#C9A84C]">*</span>
              </label>
              <input
                type="password"
                name="confirm"
                value={form.confirm}
                onChange={handleChange}
                placeholder="••••••••"
                className={inputClass}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 bg-[#C9A84C] rounded text-black text-[13px] font-bold tracking-[1px] cursor-pointer border-none transition-opacity ${loading ? 'opacity-70' : 'opacity-100'}`}
            >
              {loading ? 'Creating account...' : 'CREATE ACCOUNT'}
            </button>

          </form>

          {/* Login link */}
          <p className="text-center mt-5 text-[13px] text-[#8A8070]">
            Already have an account?{' '}
            <Link to="/login" className="text-[#C9A84C] no-underline font-medium">
              Sign in
            </Link>
          </p>
        </div>

      </div>
    </div>
  )
}