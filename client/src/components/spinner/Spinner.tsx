import React from 'react'
import './spinner.css'

const Spinner: React.FC = () => {
  return (
    <div className='wrapperSpinner'>
      <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
  )
}
export default React.memo(Spinner)
