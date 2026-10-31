import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createPlayer, getPlayer } from '../lib/storage'

export default function Home() {
  const navigate = useNavigate()
  const [nickname, setNickname] = useState('')
  const [error, setError] = useState('')

  const existing = getPlayer()

  function handleEnter() {
    if (existing) {
      navigate('/app')
      return
    }
    const trimmed = nickname.trim()
    if (trimmed.length < 2) {
      setError('Nickname precisa ter pelo menos 2 caracteres.')
      return
    }
    createPlayer(trimmed)
    navigate('/app')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          background:
            'radial-gradient(ellipse at 20% 50%, #4285F4 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, #EA4335 0%, transparent 50%), radial-gradient(ellipse at 60% 80%, #34A853 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 w-full max-w-md text-center">
        {/* GDG Logo area */}
        <div className="flex justify-center gap-2 mb-6">
          {['#4285F4', '#EA4335', '#FBBC04', '#34A853'].map((color, i) => (
            <div key={i} className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
          ))}
        </div>

        <p className="text-[#9AA0B2] text-sm font-medium tracking-widest uppercase mb-2">
          GDG Aracaju · DevFest 2024
        </p>

        <h1 className="text-4xl font-bold text-white mb-2">
          🍲 Moqueca Quest
        </h1>
        <p className="text-[#9AA0B2] text-base mb-8">
          Colecione ingredientes em stands e palestras.<br />
          Quem chegar primeiro faz a moqueca!
        </p>

        {existing ? (
          <div className="bg-[#1E2230] rounded-2xl p-6 border border-[#4285F4]/30">
            <p className="text-[#9AA0B2] text-sm mb-2">Bem-vindo de volta,</p>
            <p className="text-white text-xl font-bold mb-4">{existing.nickname} 👋</p>
            <button
              onClick={handleEnter}
              className="w-full py-3 rounded-xl font-semibold text-white transition-all"
              style={{ background: 'linear-gradient(135deg, #4285F4, #34A853)' }}
            >
              Continuar jornada →
            </button>
          </div>
        ) : (
          <div className="bg-[#1E2230] rounded-2xl p-6 border border-white/10">
            <label className="block text-left text-sm text-[#9AA0B2] mb-2 font-medium">
              Seu nickname
            </label>
            <input
              type="text"
              placeholder="Ex: devzinho_se"
              value={nickname}
              onChange={(e) => { setNickname(e.target.value); setError('') }}
              onKeyDown={(e) => e.key === 'Enter' && handleEnter()}
              className="w-full bg-[#252A3A] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-[#9AA0B2] focus:outline-none focus:border-[#4285F4] mb-3"
            />
            {error && <p className="text-[#EA4335] text-sm mb-3">{error}</p>}
            <button
              onClick={handleEnter}
              className="w-full py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #4285F4, #34A853)' }}
            >
              Entrar na aventura 🦀
            </button>
          </div>
        )}

        {/* Ingredients preview */}
        <div className="flex justify-center gap-2 mt-8 flex-wrap">
          {['🍋', '🧅', '🍅', '🫑', '🌿', '🫚', '🥥', '🦀'].map((e, i) => (
            <span
              key={i}
              className="text-2xl opacity-40"
              style={{ filter: 'grayscale(1)' }}
            >
              {e}
            </span>
          ))}
        </div>
        <p className="text-[#9AA0B2] text-xs mt-2">8 ingredientes para colecionar</p>
      </div>
    </div>
  )
}
