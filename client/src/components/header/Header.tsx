import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import './header.css'
import { useResize } from '../../query-hooks/useResize'
import { Context } from '../../context/LoggedState'

export const Header: React.FC = () => {
  const [menu, setMenu] = useState<string>('') // estado para manejar el menu "hamburguesa"
  const { state: { isLogged }, dispatch } = useContext(Context) // Utilizo el estado isLogged para mostrar o no los enlaces a inciar sesión, registrarse, etc...
  const { isTablet } = useResize() // verifica si es una tablet para mostrar o no el menu "hamburguesas"

  const handleMenu: (str: string) => void = (param: string) => {
    if (!param) {
      menu === ''
        ? setMenu('activo')
        : setMenu('')
    } else setMenu('')
  }

  const handleLogout = (): void => { // envio el nuevo estado al reducer del context
    handleMenu('')
    dispatch({
      type: 'logout',
      payload: {
        isLogged: false
      }
    })
  }

  return (
    <header className='header'>
      <Link to='/' className='logo'>
        <img src='https://storydots.app/static/media/storydots-white-logo.b3c9d077.svg' alt='logo' />
      </Link>
      <div className={isTablet ? menu === 'activo' ? 'menu-active' : 'menu-disable nav' : 'nav'}>
        {
          isLogged
            ? <>
              <div>
                <Link to='/' onClick={handleLogout}>Cerrar sesión</Link>
              </div>
              <div className='divAdmin'>
                <Link to='/admin' onClick={() => { handleMenu('') }}>Admin</Link>
              </div>
            </>
            : <>
              <div>
                <Link to='/login' onClick={() => { handleMenu('') }}>Iniciar sesión</Link>
              </div>
              <div>
                <Link to='/register' onClick={() => { handleMenu('') }}>Registrarse</Link>
              </div>
            </>
        }
      </div>
      {
        isTablet
          ? <div id="hamburguesa" onClick={() => { handleMenu('') }}>
            <div className={menu === '' ? '' : 'linea1'}></div>
            <div className={menu === '' ? '' : 'linea2'}></div>
            <div className={menu === '' ? '' : 'linea3'}></div>
          </div>
          : null
      }
    </header>
  )
}
