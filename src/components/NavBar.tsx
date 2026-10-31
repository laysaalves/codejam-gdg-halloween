import { Award, Home, Trophy, User } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const links = [
  { to: '/app', icon: Home, label: 'Início' },
  { to: '/app/badges', icon: Award, label: 'Badges' },
  { to: '/app/ranking', icon: Trophy, label: 'Ranking' },
  { to: '/app/profile', icon: User, label: 'Perfil' },
]

export default function NavBar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#1E2230] border-t border-white/10 z-50">
      <div className="max-w-md mx-auto flex">
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/app'}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center gap-1 py-3 text-xs font-medium transition-colors ${
                isActive ? 'text-[#4285F4]' : 'text-[#9AA0B2]'
              }`
            }
          >
            <Icon size={20} />
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
