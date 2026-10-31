export type Rarity = 'comum' | 'incomum' | 'raro' | 'epico' | 'lendario'

export interface Ingredient {
  key: string
  name: string
  emoji: string
  stationName: string
}

export interface Station {
  id: string
  name: string
  description: string
  ingredient: Ingredient
  token: string
}

export interface Badge {
  key: string
  name: string
  emoji: string
  description: string
  rarity: Rarity
  condition: (collections: string[], badges: string[]) => boolean
}

export interface Player {
  nickname: string
  collections: string[] // station ids collected
  badges: string[]      // badge keys unlocked
  joinedAt: number
}

export type MoquecaStatus =
  | 'chegou-com-vontade'
  | 'mise-en-place'
  | 'quase-moqueca'
  | 'falta-caranguejo'
  | 'falta-o-principal'
  | 'moqueca-completa'
