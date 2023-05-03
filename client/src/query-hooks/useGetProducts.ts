import { useQuery } from '@tanstack/react-query'
import { type ResponseDataProductGetId, type ResponseDataProductGet } from '../types'
import { getProducts, getProductsId } from '../services/productsGet'
import { swalAlert } from '../utils/swal'

interface ReturnUseGetProducts {
  isError: boolean
  isSuccess: boolean
  isLoading: boolean
  data?: ResponseDataProductGet['data']
  lengthData?: number
}

export const useGetProducts = (pageQuery: string): ReturnUseGetProducts => {
  const { isError, isSuccess, data, isLoading } = useQuery({
    queryKey: ['products', { pageQuery }],
    keepPreviousData: true,
    queryFn: () => getProducts(pageQuery)
  })
  if (data?.status_code === 200) return { isError, isSuccess, isLoading, data: data.data, lengthData: data.lengthData }
  return { isError, isSuccess, isLoading }
}

interface ReturnUseGetProductsId {
  isError: boolean
  isSuccess: boolean
  isLoading: boolean
  data?: ResponseDataProductGetId['data']
}

export const useGetProductsId = (id: string): ReturnUseGetProductsId => {
  const { isError, isSuccess, data, isLoading } = useQuery({
    queryKey: ['products', id],
    queryFn: () => getProductsId(id),
    onError: (error) => {
      if (error instanceof Error) swalAlert(error.message, '')
    }
  })
  if (data?.status_code === 200) return { isError, isSuccess, isLoading, data: data.data }
  return { isError, isSuccess, isLoading }
}
