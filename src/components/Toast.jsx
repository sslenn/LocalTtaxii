import { useApp } from '../context/AppContext'

export default function Toast() {
  const { toasts } = useApp()

  if (!toasts.length) return null

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-2 z-9999">
      {toasts.map(t => {
        const bgColor = t.type === 'success' ? 'bg-green-600' :
                        t.type === 'error'   ? 'bg-red-600' :
                        t.type === 'warning' ? 'bg-orange-500' :
                                                'bg-blue-500';

        return (
          <div
            key={t.id}
            className={`${bgColor} text-white font-medium text-sm min-w-60 px-5 py-3 rounded shadow-lg animate-slideIn`}
          >
            {t.msg}
          </div>
        )
      })}

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .animate-slideIn {
          animation: slideIn 0.2s ease forwards;
        }
      `}</style>
    </div>
  )
}