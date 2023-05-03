import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useGetProductsId } from '../../query-hooks/useGetProducts'
import Spinner from '../../components/spinner/Spinner'
import './product.css'
import { useDelProducts } from '../../query-hooks/useDelProducts'
import NotFound from '../../components/notFound/NotFound'

export const Product: React.FC = () => {
  const { id } = useParams()
  const { isLoading, isError, data } = useGetProductsId(id as string)
  const { mutate } = useDelProducts()

  const handleDelete = (): void => {
    mutate(id as string)
  }

  if (isLoading) return <Spinner />
  if (isError) return <NotFound />

  return (
    <main className='productWrapper'>
      <div className='divImg'>
        <img src={data?.image_url} alt={data?.name} />
      </div>
      <div className='details'>
        <h1 className='title'>{data?.name}</h1>
        <div className='wrapperMarca'>
          <div className='divImgMarca'>
            <img src={data?.marca.logo_url} alt={data?.marca.name} />
          </div>
          <h2>${data?.price}</h2>
        </div>
      </div>
      <p className='description'>{data?.description}</p>
      <div className='divButtons'>
        <button className='btn' onClick={handleDelete}>Eliminar</button>
        {data?.id ? <Link className='btn' to={`/admin/update/${data?.id}`}>Actualizar</Link> : null}
      </div>
    </main>
  )
}
