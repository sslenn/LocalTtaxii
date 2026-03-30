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

    const user = JSON.parse(localStorage.getItem('tt_current_user'))
    toast('Welcome back ' + user.name + '!', 'success')
    navigate(user.role === 'admin' ? '/admin' : '/')
  }

  const inputClass = "w-full px-3.5 py-2.5 bg-[#0A0908] border border-[#2A2720] rounded text-[#F0EBE0] text-[13px] outline-none box-border"
  const labelClass = "block text-[11px] tracking-[1.5px] uppercase text-[#8A8070] mb-1.5"

  return (
    <div className="min-h-screen bg-[#0A0908] flex items-center justify-center px-5 py-10">
      <div className="w-full max-w-[380px]">

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
          <p className="text-[13px] text-[#8A8070] mt-2">Sign in to your account</p>
        </div>

        {/* Form Card */}
        <div className="bg-[#141210] border border-[#2A2720] rounded-md p-8">
          <form onSubmit={handleSubmit}>

            {/* Email */}
            <div className="mb-4">
              <label className={labelClass}>Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@email.com"
                className={inputClass}
              />
            </div>

            {/* Password */}
            <div className="mb-6">
              <label className={labelClass}>Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
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
              {loading ? 'Signing in...' : 'SIGN IN'}
            </button>

          </form>

          {/* Register link */}
          <p className="text-center mt-5 text-[13px] text-[#8A8070]">
            No account?{' '}
            <Link to="/register" className="text-[#C9A84C] no-underline font-medium">
              Register here
            </Link>
          </p>
        </div>

        {/* Demo credentials */}
        <div className="mt-4 px-4 py-3 bg-[#141210] border border-dashed border-[#2A2720] rounded text-[11px] text-[#8A8070] leading-[1.8]">
          <span className="text-[#C9A84C] font-semibold">Demo:</span>{' '}
          admin@localttaxi.com / admin123
        </div>

      </div>
    </div>
  )
}