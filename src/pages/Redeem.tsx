import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { BADGES, RARITY_LABELS } from '../lib/game-logic'
import { collectStation, createPlayer, getPlayer } from '../lib/storage'
import { TOKEN_MAP } from '../lib/tokens'
import type { Station } from '../types'

type State = 'nickname' | 'loading' | 'success' | 'already' | 'invalid' | 'error'

export default function Redeem() {
  const { token } = useParams<{ token: string }>()
  const navigate = useNavigate()

  const [state, setState] = useState<State>('loading')
  const [station, setStation] = useState<Station | null>(null)
  const [newBadges, setNewBadges] = useState<string[]>([])
  const [nickname, setNickname] = useState('')
  const [nicknameError, setNicknameError] = useState('')

  useEffect(() => {
    if (!token) { setState('invalid'); return }

    const found = TOKEN_MAP[token.toUpperCase()]
    if (!found) { setState('invalid'); return }

    setStation(found)

    const player = getPlayer()
    if (!player) {
      setState('nickname')
      return
    }

    try {
      const result = collectStation(found.id)
      setNewBadges(result.newBadges)
      setState(result.alreadyCollected ? 'already' : 'success')
    } catch {
      setState('error')
    }
  }, [token])

  function handleNickname() {
    const trimmed = nickname.trim()
    if (trimmed.length < 2) {
      setNicknameError('Nickname precisa ter pelo menos 2 caracteres.')
      return
    }
    createPlayer(trimmed)
    const result = collectStation(station!.id)
    setNewBadges(result.newBadges)
    setState('success')
  }

  if (state === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[#9AA0B2]">Verificando QR code...</p>
      </div>
    )
  }

  if (state === 'invalid') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <p className="text-5xl mb-4">❌</p>
        <h2 className="text-white text-xl font-bold mb-2">QR Code inválido</h2>
        <p className="text-[#9AA0B2] mb-6">Esse token não existe ou expirou.</p>
        <button onClick={() => navigate('/app')} className="text-[#4285F4] font-medium">
          ← Voltar
        </button>
      </div>
    )
  }

  if (state === 'nickname') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <p className="text-4xl text-center mb-2">{station?.ingredient.emoji}</p>
          <h2 className="text-white text-xl font-bold text-center mb-1">
            {station?.ingredient.name} encontrado!
          </h2>
          <p className="text-[#9AA0B2] text-sm text-center mb-6">
            Primeiro, escolha seu nickname para participar.
          </p>
          <input
            type="text"
            placeholder="Seu nickname"
            value={nickname}
            onChange={(e) => { setNickname(e.target.value); setNicknameError('') }}
            onKeyDown={(e) => e.key === 'Enter' && handleNickname()}
            className="w-full bg-[#252A3A] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-[#9AA0B2] focus:outline-none focus:border-[#4285F4] mb-3"
          />
          {nicknameError && <p className="text-[#EA4335] text-sm mb-3">{nicknameError}</p>}
          <button
            onClick={handleNickname}
            className="w-full py-3 rounded-xl font-semibold text-white"
            style={{ background: 'linear-gradient(135deg, #4285F4, #34A853)' }}
          >
            Coletar ingrediente 🦀
          </button>
        </div>
      </div>
    )
  }

  if (state === 'already') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <p className="text-5xl mb-4">{station?.ingredient.emoji}</p>
        <h2 className="text-white text-xl font-bold mb-2">Já coletado!</h2>
        <p className="text-[#9AA0B2] mb-6">
          Você já tinha o <strong className="text-white">{station?.ingredient.name}</strong>.
        </p>
        <button
          onClick={() => navigate('/app')}
          className="px-6 py-3 rounded-xl font-semibold text-white"
          style={{ background: '#4285F4' }}
        >
          Ver minha panela →
        </button>
      </div>
    )
  }

  if (state === 'success') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
        {/* Confetti dots */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                backgroundColor: ['#4285F4', '#EA4335', '#FBBC04', '#34A853'][i % 4],
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: 0.6,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 w-full max-w-sm">
          <div
            className="rounded-2xl p-8 border mb-4"
            style={{
              background: 'linear-gradient(135deg, #1E2230, #252A3A)',
              borderColor: '#34A853',
              boxShadow: '0 0 30px #34A85340',
            }}
          >
            <p className="text-7xl mb-3">{station?.ingredient.emoji}</p>
            <h2 className="text-white text-2xl font-bold mb-1">{station?.ingredient.name}</h2>
            <p className="text-[#34A853] font-medium mb-2">+ coletado!</p>
            <p className="text-[#9AA0B2] text-sm">em {station?.ingredient.stationName ?? station?.name}</p>
          </div>

          {newBadges.length > 0 && (
            <div className="bg-[#1E2230] rounded-2xl p-4 border border-[#FBBC04]/40 mb-4">
              <p className="text-[#FBBC04] font-semibold text-sm mb-3">🏅 Novos badges desbloqueados!</p>
              {newBadges.map((key) => {
                const badge = BADGES.find((b) => b.key === key)
                if (!badge) return null
                return (
                  <div key={key} className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{badge.emoji}</span>
                    <div className="text-left">
                      <p className="text-white text-sm font-medium">{badge.name}</p>
                      <p className="text-[#9AA0B2] text-xs">{RARITY_LABELS[badge.rarity]}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          <button
            onClick={() => navigate('/app')}
            className="w-full py-3 rounded-xl font-semibold text-white"
            style={{ background: 'linear-gradient(135deg, #4285F4, #34A853)' }}
          >
            Ver minha panela →
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <p className="text-5xl mb-4">⚠️</p>
      <h2 className="text-white text-xl font-bold mb-2">Algo deu errado</h2>
      <button onClick={() => navigate('/app')} className="text-[#4285F4] font-medium mt-4">
        ← Voltar
      </button>
    </div>
  )
}
