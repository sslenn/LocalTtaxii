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

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0A0908',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
    }}>
      <div style={{ width: '100%', maxWidth: '380px' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div style={{
              width: 44, height: 44,
              background: '#C9A84C',
              borderRadius: '4px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 24, fontWeight: 700, color: '#000',
              margin: '0 auto 12px',
            }}>T</div>
            <span style={{ fontSize: 22, fontWeight: 600, color: '#F0EBE0' }}>
              LocalT<span style={{ color: '#C9A84C' }}>taxi</span>
            </span>
          </Link>
          <p style={{ fontSize: 13, color: '#8A8070', marginTop: '8px' }}>
            Create your account
          </p>
        </div>

        {/* Form Card */}
        <div style={{
          background: '#141210',
          border: '1px solid #2A2720',
          borderRadius: '6px',
          padding: '32px',
        }}>
          <form onSubmit={handleSubmit}>

            {/* Name */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'block', fontSize: 11,
                letterSpacing: '1.5px', textTransform: 'uppercase',
                color: '#8A8070', marginBottom: '6px',
              }}>
                Full Name <span style={{ color: '#C9A84C' }}>*</span>
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
                style={{
                  width: '100%', padding: '10px 14px',
                  background: '#0A0908',
                  border: '1px solid #2A2720',
                  borderRadius: '4px',
                  color: '#F0EBE0', fontSize: 13,
                  outline: 'none', boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Email */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'block', fontSize: 11,
                letterSpacing: '1.5px', textTransform: 'uppercase',
                color: '#8A8070', marginBottom: '6px',
              }}>
                Email <span style={{ color: '#C9A84C' }}>*</span>
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@email.com"
                style={{
                  width: '100%', padding: '10px 14px',
                  background: '#0A0908',
                  border: '1px solid #2A2720',
                  borderRadius: '4px',
                  color: '#F0EBE0', fontSize: 13,
                  outline: 'none', boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Phone */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'block', fontSize: 11,
                letterSpacing: '1.5px', textTransform: 'uppercase',
                color: '#8A8070', marginBottom: '6px',
              }}>
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="012 345 678"
                style={{
                  width: '100%', padding: '10px 14px',
                  background: '#0A0908',
                  border: '1px solid #2A2720',
                  borderRadius: '4px',
                  color: '#F0EBE0', fontSize: 13,
                  outline: 'none', boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'block', fontSize: 11,
                letterSpacing: '1.5px', textTransform: 'uppercase',
                color: '#8A8070', marginBottom: '6px',
              }}>
                Password <span style={{ color: '#C9A84C' }}>*</span>
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Min. 6 characters"
                style={{
                  width: '100%', padding: '10px 14px',
                  background: '#0A0908',
                  border: '1px solid #2A2720',
                  borderRadius: '4px',
                  color: '#F0EBE0', fontSize: 13,
                  outline: 'none', boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Confirm Password */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block', fontSize: 11,
                letterSpacing: '1.5px', textTransform: 'uppercase',
                color: '#8A8070', marginBottom: '6px',
              }}>
                Confirm Password <span style={{ color: '#C9A84C' }}>*</span>
              </label>
              <input
                type="password"
                name="confirm"
                value={form.confirm}
                onChange={handleChange}
                placeholder="••••••••"
                style={{
                  width: '100%', padding: '10px 14px',
                  background: '#0A0908',
                  border: '1px solid #2A2720',
                  borderRadius: '4px',
                  color: '#F0EBE0', fontSize: 13,
                  outline: 'none', boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Submit */}
            <button type="submit" disabled={loading} style={{
              width: '100%', padding: '12px',
              background: '#C9A84C',
              border: 'none', borderRadius: '4px',
              color: '#000', fontSize: 13,
              fontWeight: 700, cursor: 'pointer',
              letterSpacing: '1px',
              opacity: loading ? 0.7 : 1,
            }}>
              {loading ? 'Creating account...' : 'CREATE ACCOUNT'}
            </button>

          </form>

          {/* Login link */}
          <p style={{ textAlign: 'center', marginTop: '20px', fontSize: 13, color: '#8A8070' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#C9A84C', textDecoration: 'none', fontWeight: 500 }}>
              Sign in
            </Link>
          </p>
        </div>

      </div>
    </div>
  )
}