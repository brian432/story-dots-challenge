import { type IRegisterPost, type ILogin, type ResponseDataRegister, type ResponseDataLogin } from '../types'
const {
  API_URL
} = process.env

export const postUser = async (data: IRegisterPost): Promise<ResponseDataRegister> => {
  try {
    const res = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        ...data,
        isAdmin: true
      })
    })

    const json = await res.json()
    if (json.status_code === 201 || json.status_code === 400) return json
    throw new Error('Error interno del servidor')
  } catch (err) {
    throw new Error('Error al conectarse al servidor') // la request devuelve los datos e un error
  }
}

export const postLogin = async (data: ILogin): Promise<ResponseDataLogin> => {
  try {
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    const json = await res.json()

    if (json.status_code === 200 || json.status_code === 401) return json
    throw new Error('Error interno del servidor')
  } catch (err) {
    throw new Error('Error al conectarse al servidor')
  }
}
