import React from 'react'
import { ProductCard } from '../../components/productCard/ProductCard'
import './home.css'
import { useGetProducts } from '../../query-hooks/useGetProducts'
import Spinner from '../../components/spinner/Spinner'
import { useLocation } from 'react-router-dom'
import { PageButtons } from '../../components/pageButtons/PageButtons'
import NotFound from '../../components/notFound/NotFound'

export const Home: React.FC = () => {
  const { search } = useLocation()
  const pageQuery: string = search?.slice(6)
  const { isLoading, data, isError, lengthData } = useGetProducts(pageQuery)

  if (isLoading) return <Spinner />
  if (isError) return <NotFound />
  return (
    <main className='home'>
      {
        data?.map(product =>
          <ProductCard key={product.id} product={product} />
        )
      }
      {lengthData ? <PageButtons lengthData={lengthData} /> : null}
    </main >
  )
}
