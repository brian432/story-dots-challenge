import { useMutation, type UseMutateFunction } from '@tanstack/react-query'
import { type IRegisterPost, type ResponseDataRegister } from '../types'
import { postUser } from '../services/authPost'
import { swalAlert, swalSuccess } from '../utils/swal'
import { useNavigate } from 'react-router-dom'

interface ReturnUseCreateUser {
  mutate: UseMutateFunction<ResponseDataRegister, unknown, IRegisterPost, unknown>
}

export const useCreateUser = (): ReturnUseCreateUser => {
  const navigate = useNavigate()

  const { mutate } = useMutation({
    mutationFn: postUser,
    onSuccess: (data: ResponseDataRegister) => {
      if (data?.status_code === 201) swalSuccess('Usuario creado correctamente', navigate)
      if (data?.status_code === 400) swalAlert('El nombre de usuario ya existe')
    },
    onError: (error) => {
      if (error instanceof Error) {
        swalAlert(error.message)
      }
    }
  })
  return { mutate }
}
