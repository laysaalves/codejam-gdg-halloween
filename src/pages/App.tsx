import NavBar from '../components/NavBar'
import MoquecaPot from '../components/MoquecaPot'
import { getMoquecaStatus, STATUS_LABELS } from '../lib/game-logic'
import { getPlayer } from '../lib/storage'
import { STATIONS } from '../lib/tokens'
import { Link } from 'react-router-dom'

export default function App() {
  const player = getPlayer()!

  const status = getMoquecaStatus(player.collections)
  const { label, emoji } = STATUS_LABELS[status]

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="bg-[#1E2230] border-b border-white/10 px-4 py-4">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div>
            <p className="text-[#9AA0B2] text-xs">Olá,</p>
            <p className="text-white font-bold">{player.nickname}</p>
          </div>
          <div className="flex gap-1">
            {['#4285F4', '#EA4335', '#FBBC04', '#34A853'].map((c, i) => (
              <div key={i} className="w-2 h-2 rounded-full" style={{ backgroundColor: c }} />
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 pt-6 space-y-6">
        {/* Status card */}
        <div
          className="rounded-2xl p-5 text-center border"
          style={{
            background: 'linear-gradient(135deg, #1E2230 0%, #252A3A 100%)',
            borderColor: status === 'moqueca-completa' ? '#FBBC04' : '#4285F4',
            boxShadow: status === 'moqueca-completa' ? '0 0 20px #FBBC0440' : 'none',
          }}
        >
          <MoquecaPot collections={player.collections} />
          <p className="text-2xl mt-3">{emoji}</p>
          <p className="text-white font-semibold text-lg mt-1">{label}</p>
        </div>

        {/* Ingredients grid */}
        <div>
          <h2 className="text-[#9AA0B2] text-xs font-semibold uppercase tracking-widest mb-3">
            Ingredientes
          </h2>
          <div className="grid grid-cols-4 gap-2">
            {STATIONS.map((station) => {
              const collected = player.collections.includes(station.id)
              return (
                <div
                  key={station.id}
                  className="rounded-xl flex flex-col items-center gap-1 py-3 transition-all border"
                  style={{
                    background: collected ? '#252A3A' : '#1E2230',
                    borderColor: collected ? '#4285F4' : '#ffffff15',
                    opacity: collected ? 1 : 0.5,
                  }}
                >
                  <span className="text-2xl" style={{ filter: collected ? 'none' : 'grayscale(1)' }}>
                    {station.ingredient.emoji}
                  </span>
                  <span className="text-[10px] text-[#9AA0B2] text-center leading-tight px-1">
                    {station.ingredient.name}
                  </span>
                  {collected && (
                    <span className="text-[8px] font-bold" style={{ color: '#4285F4' }}>✓</span>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-3">
          <Link
            to="/app/badges"
            className="bg-[#1E2230] border border-white/10 rounded-xl p-4 text-center hover:border-[#FBBC04]/50 transition-all"
          >
            <p className="text-xl mb-1">🏅</p>
            <p className="text-white text-sm font-medium">Badges</p>
            <p className="text-[#9AA0B2] text-xs">{player.badges.length} desbloqueados</p>
          </Link>
          <Link
            to="/app/ranking"
            className="bg-[#1E2230] border border-white/10 rounded-xl p-4 text-center hover:border-[#4285F4]/50 transition-all"
          >
            <p className="text-xl mb-1">🏆</p>
            <p className="text-white text-sm font-medium">Ranking</p>
            <p className="text-[#9AA0B2] text-xs">Ver posição</p>
          </Link>
        </div>
      </div>

      <NavBar />
    </div>
  )
}
