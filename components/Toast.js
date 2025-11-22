export default function Toast({ msg, onClose }) {
  if (!msg) return null
  return (
    <div className="fixed bottom-6 right-6 bg-indigo-600 text-white px-4 py-2 rounded shadow-lg z-50">
      <div className="flex items-center gap-3">
        <div className="text-sm">{msg}</div>
        <button onClick={onClose} className="text-white opacity-80">✕</button>
      </div>
    </div>
  )
}