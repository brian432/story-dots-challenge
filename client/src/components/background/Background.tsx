import React from 'react'
import './backgorund.css'

const Background: React.FC = () => {
  return (
    <>
      <div className='backgroundImage'></div>
      <div className='backgroundMove'></div>
    </>
  )
}
export default React.memo(Background)
