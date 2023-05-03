import { type UseMutateFunction, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { type IProductPutFetch, type ResponseDataProductPut } from '../types'
import { putProduct } from '../services/productPut'
import { swalAlert, swalSuccess } from '../utils/swal'

interface ReturnUsePut {
  mutate: UseMutateFunction<ResponseDataProductPut, unknown, IProductPutFetch, unknown>
  isLoading: boolean
}

export const usePutProduct = (): ReturnUsePut => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { mutate, isLoading } = useMutation({
    mutationFn: (variables: IProductPutFetch) => putProduct(variables),
    onSuccess: (data: ResponseDataProductPut) => {
      if (data?.status_code === 200) {
        queryClient.invalidateQueries(['products'])
        swalSuccess('Producto actualizado correctamente', navigate)
      }
      if (data?.status_code === 400) return swalAlert('Error al actualizar el producto')
    },
    onError: (error) => {
      if (error instanceof Error) {
        swalAlert(error.message)
      }
    }
  })
  return { mutate, isLoading }
}
