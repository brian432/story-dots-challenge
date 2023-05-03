import { type ResponseDataMarcas } from '../types'
const { API_URL } = process.env

export const getMarcas = async (): Promise<ResponseDataMarcas> => {
  try {
    const res = await fetch(`${API_URL}/marcas`)
    const json = await res.json()

    if (json.status_code === 200 || json.status_code === 404) return json
    throw new Error('Error interno del servidor')
  } catch (err: unknown) {
    throw new Error('Error al conectarse al servidor')
  }
}
