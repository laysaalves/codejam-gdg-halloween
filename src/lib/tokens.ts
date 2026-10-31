import type { Station } from '../types'

export const STATIONS: Station[] = [
  {
    id: 'checkin',
    name: 'Check-in Geral',
    description: 'Entrada do evento — bem-vindo ao DevFest!',
    ingredient: { key: 'limao', name: 'Limão', emoji: '🍋', stationName: 'Check-in Geral' },
    token: 'DEVFEST-LIMAO-2024',
  },
  {
    id: 'sponsor1',
    name: 'Stand Patrocinador 1',
    description: 'Conheça nosso patrocinador e ganhe um ingrediente.',
    ingredient: { key: 'cebola', name: 'Cebola', emoji: '🧅', stationName: 'Stand Patrocinador 1' },
    token: 'DEVFEST-CEBOLA-2024',
  },
  {
    id: 'sponsor2',
    name: 'Stand Patrocinador 2',
    description: 'Mais um patrocinador incrível do DevFest.',
    ingredient: { key: 'tomate', name: 'Tomate', emoji: '🍅', stationName: 'Stand Patrocinador 2' },
    token: 'DEVFEST-TOMATE-2024',
  },
  {
    id: 'workshop',
    name: 'Workshop / Hands-on',
    description: 'Coloque a mão na massa!',
    ingredient: { key: 'pimentao', name: 'Pimentão', emoji: '🫑', stationName: 'Workshop' },
    token: 'DEVFEST-PIMENTAO-2024',
  },
  {
    id: 'lightning',
    name: 'Lightning Talk',
    description: 'Aprenda algo novo em 5 minutos.',
    ingredient: { key: 'coentro', name: 'Coentro', emoji: '🌿', stationName: 'Lightning Talk' },
    token: 'DEVFEST-COENTRO-2024',
  },
  {
    id: 'talk',
    name: 'Palestra Técnica',
    description: 'Aprofunde seu conhecimento.',
    ingredient: { key: 'dende', name: 'Azeite de Dendê', emoji: '🫚', stationName: 'Palestra Técnica' },
    token: 'DEVFEST-DENDE-2024',
  },
  {
    id: 'networking',
    name: 'Ativação de Networking',
    description: 'Conecte-se com a comunidade!',
    ingredient: { key: 'leite-coco', name: 'Leite de Coco', emoji: '🥥', stationName: 'Networking' },
    token: 'DEVFEST-COCO-2024',
  },
  {
    id: 'keynote',
    name: 'Keynote Principal',
    description: 'O ingrediente mais valioso do evento.',
    ingredient: { key: 'caranguejo', name: 'Caranguejo', emoji: '🦀', stationName: 'Keynote' },
    token: 'DEVFEST-CARANGUEJO-2024',
  },
]

export const TOKEN_MAP: Record<string, Station> = Object.fromEntries(
  STATIONS.map((s) => [s.token, s])
)

export const STATION_MAP: Record<string, Station> = Object.fromEntries(
  STATIONS.map((s) => [s.id, s])
)
