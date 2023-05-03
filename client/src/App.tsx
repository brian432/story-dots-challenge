import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/home/Home'
import { Login } from './pages/login/Login'
import { Register } from './pages/register/Register'
import { Product } from './pages/product/Product'
import './App.css'
import Background from './components/background/Background'
import { Header } from './components/header/Header'
import { Logged } from './components/logged/Logged'
import { Admin } from './pages/admin/Admin'
import { Context } from './context/LoggedState'
import NotFound from './components/notFound/NotFound'

export const App: React.FC = () => {
  const { state: { isLogged } } = useContext(Context)
  return (
    <div className='App'>
      <Header />
      <Background />
      <Routes>
        <Route path='/' element={<Home />} />
        {
          isLogged
            ? <>
              <Route path='/admin' element={<Admin />} />
              <Route path='/admin/:update/:id' element={<Admin />} />
            </>
            : null
        }
        <Route path='/login' element={
          <Logged>
            <Login />
          </Logged>
        }
        />
        <Route path='/register' element={
          <Logged>
            <Register />
          </Logged>
        } />
        <Route path='/product/:id' element={<Product />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div >
  )
}
