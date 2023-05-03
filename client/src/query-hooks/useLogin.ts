import { useMutation, type UseMutateFunction } from '@tanstack/react-query'
import { type ResponseDataLogin, type ILogin } from '../types'
import { postLogin } from '../services/authPost'
import { useNavigate } from 'react-router-dom'
import { swalAlert } from '../utils/swal'
import { useContext } from 'react'
import { Context } from '../context/LoggedState'

interface ReturnUseLogin {
  mutate: UseMutateFunction<ResponseDataLogin, unknown, ILogin, unknown>
}

export const useLogin = (): ReturnUseLogin => {
  const { dispatch } = useContext(Context)
  const navigate = useNavigate()

  const { mutate } = useMutation({ // envio los datos del logeo y manejo el resultado con las propiedades onSuccess y onError
    mutationFn: postLogin,
    onSuccess: (data: ResponseDataLogin) => {
      if (data?.status_code === 200) {
        localStorage.setItem('token', data.data?.token)
        dispatch({
          type: 'logged',
          payload: { isLogged: true }
        })
        navigate('/', { replace: true })
      }
      if (data.status_code === 401) swalAlert('Usuario y/o contraseña invalida')
    },
    onError: (error) => {
      if (error instanceof Error) {
        swalAlert(error.message)
      }
    }
  })

  return { mutate }
}
