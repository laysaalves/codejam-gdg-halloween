import NavBar from '../components/NavBar'
import MoquecaPot from '../components/MoquecaPot'
import { getMoquecaStatus, STATUS_LABELS } from '../lib/game-logic'
import { clearPlayer, getPlayer } from '../lib/storage'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
  const navigate = useNavigate()
  const player = getPlayer()!
  const status = getMoquecaStatus(player.collections)
  const { label, emoji } = STATUS_LABELS[status]

  function handleLogout() {
    if (confirm('Sair e apagar seus dados? Essa ação é irreversível.')) {
      clearPlayer()
      navigate('/')
    }
  }

  const shareText = `Tô no DevFest GDG Aracaju! Status: ${emoji} ${label} (${player.collections.length}/8 ingredientes) 🦀 #GDGAracaju #DevFest`

  function handleShare() {
    if (navigator.share) {
      navigator.share({ title: 'Moqueca Quest – DevFest GDG Aracaju', text: shareText })
    } else {
      navigator.clipboard.writeText(shareText).then(() => alert('Copiado para área de transferência!'))
    }
  }

  return (
    <div className="min-h-screen pb-20">
      <div className="bg-[#1E2230] border-b border-white/10 px-4 py-4">
        <div className="max-w-md mx-auto">
          <h1 className="text-white font-bold text-lg">Perfil</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 pt-6 space-y-4">
        {/* Avatar + nickname */}
        <div className="bg-[#1E2230] rounded-2xl p-6 border border-white/10 flex flex-col items-center gap-3">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold"
            style={{ background: 'linear-gradient(135deg, #4285F4, #34A853)' }}
          >
            {player.nickname[0].toUpperCase()}
          </div>
          <div className="text-center">
            <p className="text-white font-bold text-xl">{player.nickname}</p>
            <p className="text-[#9AA0B2] text-sm">{emoji} {label}</p>
          </div>
        </div>

        {/* Moqueca pot */}
        <div className="bg-[#1E2230] rounded-2xl p-6 border border-white/10 flex justify-center">
          <MoquecaPot collections={player.collections} />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#1E2230] rounded-xl p-4 border border-white/10 text-center">
            <p className="text-2xl font-bold text-white">{player.collections.length}</p>
            <p className="text-[#9AA0B2] text-xs">Ingredientes</p>
          </div>
          <div className="bg-[#1E2230] rounded-xl p-4 border border-white/10 text-center">
            <p className="text-2xl font-bold text-white">{player.badges.length}</p>
            <p className="text-[#9AA0B2] text-xs">Badges</p>
          </div>
        </div>

        {/* Share */}
        <button
          onClick={handleShare}
          className="w-full py-3 rounded-xl font-semibold text-white border border-[#4285F4]/40 hover:border-[#4285F4] transition-all"
          style={{ background: '#4285F420' }}
        >
          📤 Compartilhar progresso
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full py-3 rounded-xl font-medium text-[#EA4335] border border-[#EA4335]/20 hover:border-[#EA4335]/50 transition-all"
        >
          Sair
        </button>
      </div>

      <NavBar />
    </div>
  )
}
