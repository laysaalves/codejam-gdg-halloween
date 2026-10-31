import type { Badge, MoquecaStatus, Rarity } from '../types'
import { STATIONS } from './tokens'

export const BADGES: Badge[] = [
  // Comum
  {
    key: 'presenca',
    name: 'Presença Confirmada',
    emoji: '🎟️',
    description: 'Fez check-in no DevFest GDG Aracaju.',
    rarity: 'comum',
    condition: (c) => c.includes('checkin'),
  },
  {
    key: 'marisqueiro',
    name: 'Marisqueiro Iniciante',
    emoji: '🦀',
    description: 'Coletou seu primeiro ingrediente.',
    rarity: 'comum',
    condition: (c) => c.length >= 1,
  },
  {
    key: 'curioso',
    name: 'Curioso de Plantão',
    emoji: '🥥',
    description: 'Visitou pelo menos 1 stand.',
    rarity: 'comum',
    condition: (c) => c.some((id) => ['sponsor1', 'sponsor2', 'networking'].includes(id)),
  },
  // Incomum
  {
    key: 'mise-en-place',
    name: 'Mise en Place',
    emoji: '🍲',
    description: 'Coletou 3 ingredientes.',
    rarity: 'incomum',
    condition: (c) => c.length >= 3,
  },
  {
    key: 'ouvinte',
    name: 'Ouvinte Assíduo',
    emoji: '🎙️',
    description: 'Assistiu 2 palestras ou workshops.',
    rarity: 'incomum',
    condition: (c) => c.filter((id) => ['workshop', 'lightning', 'talk', 'keynote'].includes(id)).length >= 2,
  },
  {
    key: 'networker',
    name: 'Networker',
    emoji: '🤝',
    description: 'Visitou 3 stands diferentes.',
    rarity: 'incomum',
    condition: (c) => c.filter((id) => ['sponsor1', 'sponsor2', 'networking', 'checkin'].includes(id)).length >= 3,
  },
  // Raro
  {
    key: 'mergulhador',
    name: 'Mergulhador Profundo',
    emoji: '🏄',
    description: 'Assistiu a todas as palestras e workshops.',
    rarity: 'raro',
    condition: (c) => ['workshop', 'lightning', 'talk', 'keynote'].every((id) => c.includes(id)),
  },
  {
    key: 'mapeou-tudo',
    name: 'Mapeou Tudo',
    emoji: '🗺️',
    description: 'Visitou todos os stands do evento.',
    rarity: 'raro',
    condition: (c) => ['sponsor1', 'sponsor2', 'networking', 'checkin'].every((id) => c.includes(id)),
  },
  {
    key: 'relampago',
    name: 'Relâmpago',
    emoji: '⚡',
    description: 'Coletou 5 ingredientes.',
    rarity: 'raro',
    condition: (c) => c.length >= 5,
  },
  // Épico
  {
    key: 'moqueca-completa',
    name: 'Pode Fazer uma Moqueca!',
    emoji: '🍲',
    description: 'Coletou todos os 8 ingredientes.',
    rarity: 'epico',
    condition: (c) => STATIONS.every((s) => c.includes(s.id)),
  },
  {
    key: 'farofeiro',
    name: 'Farofeiro de Ouro',
    emoji: '🎯',
    description: 'Desbloqueou todos os badges raros.',
    rarity: 'epico',
    condition: (_, b) => ['mergulhador', 'mapeou-tudo', 'relampago'].every((k) => b.includes(k)),
  },
  // Lendário
  {
    key: 'moquequeiro',
    name: 'Moquequeiro(a) de Primeira!',
    emoji: '👑',
    description: 'Coletou tudo e desbloqueou todos os badges épicos.',
    rarity: 'lendario',
    condition: (c, b) =>
      STATIONS.every((s) => c.includes(s.id)) &&
      ['moqueca-completa', 'farofeiro'].every((k) => b.includes(k)),
  },
  {
    key: 'gdg-legend',
    name: 'GDG Legend',
    emoji: '🏆',
    description: 'Concedido pelos organizadores. Você é lenda!',
    rarity: 'lendario',
    condition: (_, b) => b.includes('gdg-legend-granted'),
  },
]

export function computeNewBadges(collections: string[], currentBadges: string[]): string[] {
  const newBadges: string[] = []
  for (const badge of BADGES) {
    if (!currentBadges.includes(badge.key) && badge.condition(collections, [...currentBadges, ...newBadges])) {
      newBadges.push(badge.key)
    }
  }
  return newBadges
}

export function getMoquecaStatus(collections: string[]): MoquecaStatus {
  const n = collections.length
  const hasAll = STATIONS.every((s) => collections.includes(s.id))
  const hasCrab = collections.includes('keynote')
  if (hasAll) return 'moqueca-completa'
  if (n >= 7 && !hasCrab) return 'falta-o-principal'
  if (n >= 6) return 'falta-caranguejo'
  if (n >= 4) return 'quase-moqueca'
  if (n >= 2) return 'mise-en-place'
  return 'chegou-com-vontade'
}

export const STATUS_LABELS: Record<MoquecaStatus, { label: string; emoji: string }> = {
  'chegou-com-vontade': { label: 'Chegou com vontade', emoji: '🍋' },
  'mise-en-place': { label: 'Tá fazendo o mise en place', emoji: '🧅' },
  'quase-moqueca': { label: 'Tá quase uma moqueca', emoji: '🫑' },
  'falta-caranguejo': { label: 'Só falta o caranguejo!', emoji: '🦀' },
  'falta-o-principal': { label: 'Falta o principal!', emoji: '🥥' },
  'moqueca-completa': { label: 'Pode fazer uma moqueca!', emoji: '🍲' },
}

export const RARITY_COLORS: Record<Rarity, string> = {
  comum: '#9AA0B2',
  incomum: '#34A853',
  raro: '#4285F4',
  epico: '#FBBC04',
  lendario: '#EA4335',
}

export const RARITY_LABELS: Record<Rarity, string> = {
  comum: 'Comum',
  incomum: 'Incomum',
  raro: 'Raro',
  epico: 'Épico',
  lendario: 'Lendário',
}
