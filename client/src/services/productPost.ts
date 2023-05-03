import { type ResponseDataProductPost, type IProductPost } from '../types'
export const postProduct = async (data: IProductPost): Promise<ResponseDataProductPost> => {
  const token = localStorage.getItem('token')
  if (token !== null) {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
      })

      const json = await res.json()

      if (json.status_code === 200 || json.status_code === 400) return json
      throw new Error('Error interno del servidor')
    } catch (err) {
      throw new Error('Error al conectarse al servidor')
    }
  }
  throw new Error('Token inexistente')
}
