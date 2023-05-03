import { useMutation, type UseMutateFunction, useQueryClient } from '@tanstack/react-query'
import { type ResponseDataProductPost, type IProductPost } from '../types'
import { swalAlert } from '../utils/swal'
import { postProduct } from '../services/productPost'

interface ReturnUseCreateProduct {
  mutate: UseMutateFunction<ResponseDataProductPost, unknown, IProductPost, unknown>
  isLoading: boolean
}

export const useCreateProducts = (): ReturnUseCreateProduct => {
  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation({
    mutationFn: postProduct,
    onSuccess: (data: ResponseDataProductPost) => {
      if (data.status_code === 200) {
        queryClient.invalidateQueries({ queryKey: ['products'] })
        swalAlert('Producto agregado correctamente', '')
      }
      if (data.status_code === 400) swalAlert('Error al crear el producto')
    },
    onError: () => swalAlert('Error al crear el producto')
  })
  return { mutate, isLoading }
}
