import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { getPlayer } from './lib/storage'
import Admin from './pages/Admin'
import App from './pages/App'
import Badges from './pages/Badges'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Ranking from './pages/Ranking'
import Redeem from './pages/Redeem'

function RequirePlayer({ children }: { children: React.ReactNode }) {
  const player = getPlayer()
  if (!player) return <Navigate to="/" replace />
  return <>{children}</>
}

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/app"
          element={
            <RequirePlayer>
              <App />
            </RequirePlayer>
          }
        />
        <Route
          path="/app/badges"
          element={
            <RequirePlayer>
              <Badges />
            </RequirePlayer>
          }
        />
        <Route
          path="/app/ranking"
          element={
            <RequirePlayer>
              <Ranking />
            </RequirePlayer>
          }
        />
        <Route
          path="/app/profile"
          element={
            <RequirePlayer>
              <Profile />
            </RequirePlayer>
          }
        />
        <Route path="/c/:token" element={<Redeem />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
