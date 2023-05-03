import { useQuery } from '@tanstack/react-query'
import { getMarcas } from '../services/marcasGet'
import { type ResponseDataMarcas } from '../types'

interface ReturnUseGetMarcas {
  data?: ResponseDataMarcas['data']
}

export const useGetMarcas = (): ReturnUseGetMarcas => {
  const { data } = useQuery({
    queryKey: ['marcas'],
    queryFn: getMarcas
  })
  if (data?.status_code === 200) return { data: data.data }
  return { data: [] }
}
