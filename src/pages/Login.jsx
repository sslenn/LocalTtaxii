import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function Login() {
  const { login, toast } = useApp()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.email || !form.password) {
      toast('Please fill in all fields.', 'error')
      return
    }
    setLoading(true)
    const success = login(form.email, form.password)
    setLoading(false)

    if (!success) {
      toast('Invalid email or password.', 'error')
      return
    }

    // Check role from localStorage
    const user = JSON.parse(localStorage.getItem('tt_current_user'))
    toast('Welcome back ' + user.name + '!', 'success')

    if (user.role === 'admin') {
      navigate('/admin')
    } else {
      navigate('/')
    }
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
      <div style={{
        width: '100%',
        maxWidth: '380px',
      }}>

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
            Sign in to your account
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

            {/* Email */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'block', fontSize: 11,
                letterSpacing: '1.5px', textTransform: 'uppercase',
                color: '#8A8070', marginBottom: '6px',
              }}>
                Email
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
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block', fontSize: 11,
                letterSpacing: '1.5px', textTransform: 'uppercase',
                color: '#8A8070', marginBottom: '6px',
              }}>
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                style={{
                  width: '100%', padding: '10px 14px',
                  background: '#0A0908',
                  border: '1px solid #2A2720',
                  borderRadius: '4px',
                  color: '#F0EBE0', fontSize: 13,
                  outline: 'none',
                  boxSizing: 'border-box',
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
              {loading ? 'Signing in...' : 'SIGN IN'}
            </button>

          </form>

          {/* Register link */}
          <p style={{ textAlign: 'center', marginTop: '20px', fontSize: 13, color: '#8A8070' }}>
            No account?{' '}
            <Link to="/register" style={{ color: '#C9A84C', textDecoration: 'none', fontWeight: 500 }}>
              Register here
            </Link>
          </p>
        </div>

        {/* Demo credentials */}
        <div style={{
          marginTop: '16px',
          padding: '12px 16px',
          background: '#141210',
          border: '1px dashed #2A2720',
          borderRadius: '4px',
          fontSize: 11,
          color: '#8A8070',
          lineHeight: 1.8,
        }}>
          <span style={{ color: '#C9A84C', fontWeight: 600 }}>Demo:</span>{' '}
          admin@localttaxi.com / admin123
        </div>

      </div>
    </div>
  )
}