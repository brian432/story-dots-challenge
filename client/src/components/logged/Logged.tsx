import React, { useContext } from 'react'

import { Navigate } from 'react-router-dom'
import { Context } from '../../context/LoggedState'
interface Props {
  // eslint-disable-next-line no-undef
  children: JSX.Element
}

export const Logged: React.FC<Props> = ({ children }) => {
  const { state } = useContext(Context)
  if (state.isLogged) {
    return <Navigate to="/" replace={true} />
  }

  return children
}
