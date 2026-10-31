import { useEffect, useRef, useState } from 'react'
import { STATIONS } from '../lib/tokens'
import type { Station } from '../types'
import QRCode from 'qrcode'

export default function Admin() {
  const baseUrl = window.location.origin

  return (
    <div className="min-h-screen pb-10">
      <div className="bg-[#1E2230] border-b border-white/10 px-4 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-white font-bold text-lg">Admin — DevFest GDG Aracaju</h1>
            <p className="text-[#9AA0B2] text-sm">Stations & QR Codes</p>
          </div>
          <div className="flex gap-1">
            {['#4285F4', '#EA4335', '#FBBC04', '#34A853'].map((c, i) => (
              <div key={i} className="w-2 h-2 rounded-full" style={{ backgroundColor: c }} />
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {STATIONS.map((station) => (
            <StationCard key={station.id} station={station} baseUrl={baseUrl} />
          ))}
        </div>
      </div>
    </div>
  )
}

function StationCard({ station, baseUrl }: { station: Station; baseUrl: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [generated, setGenerated] = useState(false)
  const url = `${baseUrl}/c/${station.token}`

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, url, {
        width: 180,
        color: { dark: '#FFFFFF', light: '#1E2230' },
        margin: 2,
      }).then(() => setGenerated(true))
    }
  }, [url])

  function handleDownload() {
    if (!canvasRef.current) return
    const link = document.createElement('a')
    link.download = `qr-${station.id}.png`
    link.href = canvasRef.current.toDataURL()
    link.click()
  }

  return (
    <div className="bg-[#1E2230] rounded-2xl p-5 border border-white/10 flex flex-col items-center gap-3">
      <div className="flex items-center gap-2 w-full">
        <span className="text-2xl">{station.ingredient.emoji}</span>
        <div>
          <p className="text-white font-semibold text-sm">{station.name}</p>
          <p className="text-[#9AA0B2] text-xs">{station.ingredient.name}</p>
        </div>
      </div>

      <canvas ref={canvasRef} className="rounded-xl" />

      <p className="text-[#9AA0B2] text-xs text-center break-all px-2">{url}</p>

      <button
        onClick={handleDownload}
        disabled={!generated}
        className="w-full py-2 rounded-xl text-sm font-medium text-white transition-all disabled:opacity-40"
        style={{ background: '#4285F4' }}
      >
        ⬇ Baixar PNG
      </button>
    </div>
  )
}
