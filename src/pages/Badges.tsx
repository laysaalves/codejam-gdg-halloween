import NavBar from '../components/NavBar'
import { BADGES, RARITY_COLORS, RARITY_LABELS } from '../lib/game-logic'
import { getPlayer } from '../lib/storage'
import type { Rarity } from '../types'

const RARITY_ORDER: Rarity[] = ['lendario', 'epico', 'raro', 'incomum', 'comum']

export default function Badges() {
  const player = getPlayer()!
  const unlocked = player.badges

  const grouped = RARITY_ORDER.map((rarity) => ({
    rarity,
    badges: BADGES.filter((b) => b.rarity === rarity),
  }))

  return (
    <div className="min-h-screen pb-20">
      <div className="bg-[#1E2230] border-b border-white/10 px-4 py-4">
        <div className="max-w-md mx-auto">
          <h1 className="text-white font-bold text-lg">Badges</h1>
          <p className="text-[#9AA0B2] text-sm">
            {unlocked.length} / {BADGES.length} desbloqueados
          </p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 pt-6 space-y-6">
        {grouped.map(({ rarity, badges }) => (
          <div key={rarity}>
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: RARITY_COLORS[rarity] }}
              />
              <h2 className="text-sm font-semibold uppercase tracking-widest" style={{ color: RARITY_COLORS[rarity] }}>
                {RARITY_LABELS[rarity]}
              </h2>
            </div>
            <div className="space-y-2">
              {badges.map((badge) => {
                const isUnlocked = unlocked.includes(badge.key)
                return (
                  <div
                    key={badge.key}
                    className="flex items-center gap-4 rounded-xl p-4 border transition-all"
                    style={{
                      background: isUnlocked ? '#252A3A' : '#1E2230',
                      borderColor: isUnlocked ? RARITY_COLORS[badge.rarity] : '#ffffff10',
                      opacity: isUnlocked ? 1 : 0.5,
                      boxShadow:
                        isUnlocked && badge.rarity === 'lendario'
                          ? `0 0 12px ${RARITY_COLORS[badge.rarity]}40`
                          : 'none',
                    }}
                  >
                    <span className="text-3xl" style={{ filter: isUnlocked ? 'none' : 'grayscale(1)' }}>
                      {badge.emoji}
                    </span>
                    <div className="flex-1">
                      <p className="text-white text-sm font-semibold">{badge.name}</p>
                      <p className="text-[#9AA0B2] text-xs mt-0.5">{badge.description}</p>
                    </div>
                    {isUnlocked && (
                      <span className="text-xs font-bold" style={{ color: RARITY_COLORS[badge.rarity] }}>
                        ✓
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <NavBar />
    </div>
  )
}
