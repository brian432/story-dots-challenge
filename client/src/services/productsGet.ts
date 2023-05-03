import { type ResponseDataProductGetId, type ResponseDataProductGet } from '../types'
const { API_URL } = process.env
export const getProducts = async (page: string): Promise<ResponseDataProductGet> => {
  try {
    const res = await fetch(`${API_URL}/products/?page=${page}`)
    const json = await res.json()
    if (json.status_code === 200 || json.statu_code === 404) return json
    throw new Error('Error interno del servidor')
  } catch (err) {
    throw new Error('Error al conectarse al servidor')
  }
}

export const getProductsId = async (id: string): Promise<ResponseDataProductGetId> => {
  try {
    const res = await fetch(`${API_URL}/products/${id}`)
    const json = await res.json()

    if (json.status_code === 200 || json.statu_code === 404) return json
    throw new Error('Error interno del servidor')
  } catch (err) {
    throw new Error('Error al conectarse al servidor')
  }
}
