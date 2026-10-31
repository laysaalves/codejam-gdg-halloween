import type { Player } from '../types'
import { computeNewBadges } from './game-logic'

const PLAYER_KEY = 'gdg_player'

export function getPlayer(): Player | null {
  try {
    const raw = localStorage.getItem(PLAYER_KEY)
    return raw ? (JSON.parse(raw) as Player) : null
  } catch {
    return null
  }
}

export function createPlayer(nickname: string): Player {
  const player: Player = {
    nickname: nickname.trim(),
    collections: [],
    badges: [],
    joinedAt: Date.now(),
  }
  localStorage.setItem(PLAYER_KEY, JSON.stringify(player))
  return player
}

export function savePlayer(player: Player): void {
  localStorage.setItem(PLAYER_KEY, JSON.stringify(player))
}

export function clearPlayer(): void {
  localStorage.removeItem(PLAYER_KEY)
}

/** Returns newly unlocked badge keys (empty if already collected or none new). */
export function collectStation(stationId: string): { player: Player; newBadges: string[]; alreadyCollected: boolean } {
  const player = getPlayer()
  if (!player) throw new Error('No player found')

  if (player.collections.includes(stationId)) {
    return { player, newBadges: [], alreadyCollected: true }
  }

  player.collections = [...player.collections, stationId]
  const newBadges = computeNewBadges(player.collections, player.badges)
  player.badges = [...player.badges, ...newBadges]
  savePlayer(player)
  return { player, newBadges, alreadyCollected: false }
}
