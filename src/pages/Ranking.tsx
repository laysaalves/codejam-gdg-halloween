import NavBar from '../components/NavBar'
import { getMoquecaStatus, STATUS_LABELS } from '../lib/game-logic'
import { getPlayer } from '../lib/storage'
import { STATIONS } from '../lib/tokens'

// In MVP, ranking is local — shows only the current player.
// Future: replace with Supabase real-time query.
export default function Ranking() {
  const player = getPlayer()!
  const status = getMoquecaStatus(player.collections)
  const { label, emoji } = STATUS_LABELS[status]

  return (
    <div className="min-h-screen pb-20">
      <div className="bg-[#1E2230] border-b border-white/10 px-4 py-4">
        <div className="max-w-md mx-auto">
          <h1 className="text-white font-bold text-lg">Ranking</h1>
          <p className="text-[#9AA0B2] text-sm">Sua jornada no DevFest</p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 pt-6 space-y-4">
        {/* Player card */}
        <div
          className="rounded-2xl p-5 border"
          style={{
            background: 'linear-gradient(135deg, #1E2230, #252A3A)',
            borderColor: '#4285F4',
            boxShadow: '0 0 20px #4285F420',
          }}
        >
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold"
              style={{ background: '#4285F4' }}
            >
              {player.nickname[0].toUpperCase()}
            </div>
            <div className="flex-1">
              <p className="text-white font-bold">{player.nickname}</p>
              <p className="text-[#9AA0B2] text-sm">{emoji} {label}</p>
            </div>
            <div className="text-right">
              <p className="text-white font-bold text-xl">{player.collections.length}</p>
              <p className="text-[#9AA0B2] text-xs">/{STATIONS.length} itens</p>
            </div>
          </div>
        </div>

        {/* Progress bars */}
        <div className="bg-[#1E2230] rounded-2xl p-5 border border-white/10">
          <h3 className="text-white font-semibold mb-4">Sua progressão</h3>
          <div className="space-y-3">
            <ProgressBar
              label="Ingredientes coletados"
              value={player.collections.length}
              max={STATIONS.length}
              color="#4285F4"
            />
            <ProgressBar
              label="Badges desbloqueados"
              value={player.badges.length}
              max={12}
              color="#FBBC04"
            />
          </div>
        </div>

        {/* MVP notice */}
        <div className="bg-[#1E2230] rounded-2xl p-4 border border-[#FBBC04]/20 text-center">
          <p className="text-[#FBBC04] text-sm font-medium mb-1">🚧 Ranking global em breve</p>
          <p className="text-[#9AA0B2] text-xs">
            O ranking completo entre participantes será ativado durante o evento.
          </p>
        </div>
      </div>

      <NavBar />
    </div>
  )
}

function ProgressBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const pct = Math.min((value / max) * 100, 100)
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-[#9AA0B2]">{label}</span>
        <span className="text-white font-medium">{value}/{max}</span>
      </div>
      <div className="h-2 bg-[#252A3A] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  )
}
