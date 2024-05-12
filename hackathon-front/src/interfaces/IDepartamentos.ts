export interface Departamento {
  id: number
  nombre: string
  poblacion: number
  coord: Coord
}

export interface Coord {
  lat: number
  lon: number
}