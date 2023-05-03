import React from 'react'
import { Link } from 'react-router-dom'
import { type IProductGetResponse } from '../../types'
import './productCard.css'

interface ICardProduct {
  product: IProductGetResponse
}

export const ProductCard: React.FC<ICardProduct> = ({
  product: {
    name,
    marca,
    price,
    id,
    image_url
  }
}: ICardProduct) => {
  return (
    <Link to={`/product/${id}`} className='card'>
      <div className='divImg'>
        <img src={image_url} alt={name} />
      </div>
      <div className="productCardDetails">
        <div className="circleColor">
          <img src={marca.logo_url} alt={marca.name} />
        </div>
        <h1>{name}</h1>
        <div></div>
        <h2><strong>${price}</strong></h2>
      </div>
    </Link>
  )
}
