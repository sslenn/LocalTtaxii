
import { useApp } from '../context/AppContext'

export default function Toast() {
  const { toasts } = useApp()

  if (!toasts.length) return null

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    }}>
      {toasts.map(t => (
        <div key={t.id} style={{
          padding: '12px 20px',
          borderRadius: '6px',
          fontSize: '13px',
          fontWeight: 500,
          color: '#fff',
          minWidth: '240px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          background:
            t.type === 'success' ? '#27AE60' :
            t.type === 'error'   ? '#C0392B' :
            t.type === 'warning' ? '#E8590C' :
            '#3B82F6',
          animation: 'slideIn 0.2s ease',
        }}>
          {t.msg}
        </div>
      ))}

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  )
}