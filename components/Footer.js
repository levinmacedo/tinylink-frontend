export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-12 border-t pt-6 pb-8">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="text-sm text-gray-600">
          <strong>TinyLink</strong> — v1.0
        </div>
      </div>
    </footer>
  )
}