import { type ResponseDataProductPut, type IProductPutFetch } from '../types'

export const putProduct = async ({ values, id }: IProductPutFetch): Promise<ResponseDataProductPut> => {
  const token = sessionStorage.getItem('token')
  if (token !== null && id) {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/products/${id}`, {
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
