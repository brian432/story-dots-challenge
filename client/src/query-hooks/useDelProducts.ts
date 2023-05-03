import { useMutation, type UseMutateFunction, useQueryClient } from '@tanstack/react-query'
import { swalAlert } from '../utils/swal'
import { useNavigate } from 'react-router-dom'
import { delProduct } from '../services/productsDelete'
import { type ResponseDataProductDel } from '../types'

interface ReturnUseDelProducts {
  mutate: UseMutateFunction<ResponseDataProductDel, unknown, string, unknown>
}

export const useDelProducts = (): ReturnUseDelProducts => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: delProduct,
    onSuccess: (data: ResponseDataProductDel) => {
      if (data.status_code === 200) {
        queryClient.invalidateQueries({ queryKey: ['products'] })
        swalAlert('Producto eliminado correctamente', '')
        navigate('/', { replace: true })
      }
      if (data.status_code === 400) swalAlert('Error al eliminar el producto')
    },
    onError: (error) => {
      if (error instanceof Error) swalAlert(error.message)
    }
  })

  return { mutate }
}
