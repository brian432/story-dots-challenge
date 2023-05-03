import { type ResponseDataProductPut, type IProductPutFetch } from '../types'

const { API_URL } = process.env

export const putProduct = async ({ values, id }: IProductPutFetch): Promise<ResponseDataProductPut> => {
  const token = localStorage.getItem('token')
  if (token !== null && id) {
    try {
      const res = await fetch(`${API_URL}/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(values)
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
