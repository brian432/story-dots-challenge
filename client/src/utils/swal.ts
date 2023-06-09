// import { type NavigateFunction } from 'react-router-dom'
import { type NavigateFunction } from 'react-router-dom'
import Swal, { type SweetAlertResult } from 'sweetalert2'

export const swalAlert = async (title: string, text: string = 'Intentelo nuevamente'): Promise<SweetAlertResult> => {
  return await Swal.fire({
    title,
    text,
    width: '400px',
    timer: 5000,
    timerProgressBar: true,
    confirmButtonText: 'Aceptar'
  })
}

export const swalSuccess = async (title: string, navigate: NavigateFunction): Promise<SweetAlertResult> => {
  return await Swal.fire({
    title,
    width: '400px',
    timer: 5000,
    timerProgressBar: true,
    confirmButtonText: 'Aceptar'
  }).then(result => {
    if (result.isConfirmed) {
      if (title === 'Producto agregado correctamente') return result
    }
    navigate('/login')
    return result
  })
}
