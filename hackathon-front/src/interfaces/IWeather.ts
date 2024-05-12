export interface WeatherResponse {
  departamento_list: DepartamentoList[]
}

export interface DepartamentoList {
  id: number
  nombre: string
  poblacion: number
  coord: Coord
  pronostico_extendido_list: PronosticoExtendidoList[]
}

export interface Coord {
  lat: number
  lon: number
}

export interface PronosticoExtendidoList {
  fecha_hora_txt: string
  dia_text: string
  main: Main
  clima: Clima[]
  viento: Viento
  visibilidad: number
  probabilidad_precipitacion: number
  lluvia: Lluvia
  alert: string
}

export interface Main {
  temp: number
  temp_min: number
  temp_max: number
  humedad: number
}

export interface Clima {
  id: number
  tipo: string
  description: string
}

export interface Viento {
  velocidad: number
  direccion: number
}

export interface Lluvia {
  volumen_1h: number
}
