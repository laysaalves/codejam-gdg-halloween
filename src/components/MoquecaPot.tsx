import { STATIONS } from '../lib/tokens'

interface Props {
  collections: string[]
}

export default function MoquecaPot({ collections }: Props) {
  const total = STATIONS.length
  const collected = collections.length
  const progress = total > 0 ? collected / total : 0

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Pot SVG */}
      <div className="relative w-32 h-32">
        <svg viewBox="0 0 120 120" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Pot body */}
          <path
            d="M20 50 Q18 95 60 100 Q102 95 100 50 Z"
            fill="#1E2230"
            stroke="#4285F4"
            strokeWidth="2"
          />
          {/* Fill level */}
          <clipPath id="pot-clip">
            <path d="M20 50 Q18 95 60 100 Q102 95 100 50 Z" />
          </clipPath>
          <rect
            x="0"
            y={100 - progress * 55}
            width="120"
            height="60"
            fill="#4285F4"
            fillOpacity="0.3"
            clipPath="url(#pot-clip)"
          />
          {/* Liquid surface shimmer */}
          {progress > 0 && (
            <ellipse
              cx="60"
              cy={100 - progress * 55}
              rx="35"
              ry="4"
              fill="#4285F4"
              fillOpacity="0.5"
            />
          )}
          {/* Pot rim */}
          <rect x="15" y="45" width="90" height="8" rx="4" fill="#252A3A" stroke="#4285F4" strokeWidth="1.5" />
          {/* Handles */}
          <rect x="5" y="48" width="14" height="7" rx="3.5" fill="#252A3A" stroke="#4285F4" strokeWidth="1.5" />
          <rect x="101" y="48" width="14" height="7" rx="3.5" fill="#252A3A" stroke="#4285F4" strokeWidth="1.5" />
          {/* Steam (only when full) */}
          {progress >= 1 && (
            <>
              <path d="M45 40 Q47 32 45 25" stroke="#FBBC04" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7" />
              <path d="M60 38 Q62 30 60 23" stroke="#34A853" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7" />
              <path d="M75 40 Q77 32 75 25" stroke="#EA4335" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7" />
            </>
          )}
        </svg>
        {/* Ingredient emojis floating inside */}
        <div className="absolute inset-0 flex items-end justify-center pb-4 flex-wrap gap-0.5 px-4">
          {STATIONS.slice(0, collected).map((s) => (
            <span key={s.id} className="text-xs leading-none">{s.ingredient.emoji}</span>
          ))}
        </div>
      </div>

      {/* Progress text */}
      <p className="text-sm text-[#9AA0B2]">
        <span className="text-white font-bold">{collected}</span> / {total} ingredientes
      </p>
    </div>
  )
}
