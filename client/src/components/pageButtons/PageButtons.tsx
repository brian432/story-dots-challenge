import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

interface Props {
  lengthData: number
}

export const PageButtons: React.FC<Props> = ({ lengthData }: Props) => {
  const { search } = useLocation()
  const query = search?.slice(6)
  const [page, setPage] = useState<number>(Number(query))

  const handlePage = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    const target = e.target as HTMLButtonElement
    const id = target.id
    id === '+' ? setPage(page + 1) : setPage(page - 1)
  }
  return (
    <div className='containerButtons'>
      {page > 0 && page <= lengthData ? <Link to={`/?page=${page - 1}`} onClick={handlePage} id='-' className='btn'>Anterior</Link> : null}
      {page < (lengthData / 8) - 1 ? < Link to={`/?page=${page + 1}`} onClick={handlePage} id='+' className='btn'>Siguiente</Link> : null}
    </div >
  )
}
