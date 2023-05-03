import { type ResponseDataProductDel } from '../types'

export const delProduct = async (id: string): Promise<ResponseDataProductDel> => {
  const token = localStorage.getItem('token')
  if (token !== null) {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })

      const json = await res.json()
      if (json.status_code === 200 || json.status_code === 400) return json

      throw new Error('Error al eliminar el producto')
    } catch (err) {
      throw new Error('Error al conectarse con el servidor')
    }
  }
  throw new Error('Token inexistente')
}
