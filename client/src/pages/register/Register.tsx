import React from 'react'
import { type IRegisterPost } from '../../types'
import { Field, Form, Formik } from 'formik'
import { userSchema } from '../../utils/yup'
import { Link } from 'react-router-dom'
import '../auth.css'
import { useCreateUser } from '../../query-hooks/useCreateUser'

export const Register: React.FC = () => {
  const { mutate } = useCreateUser()
  const initialValues: IRegisterPost = {
    username: '',
    password: '',
    isAdmin: false
  }
  return (
    <main className='auth'>
      <Formik
        initialValues={initialValues}
        validationSchema={userSchema}
        onSubmit={(values, { resetForm }) => {
          mutate(values)
          resetForm()
        }}
      >
        {
          ({ errors, touched }) => (
            <Form className='formWrapper'>
              <div className='inputsContainer'>
                {errors.username && touched.username ? <span className='errorColor'>{errors.username}</span> : null}
                <Field name="username" className={errors.username && touched.username && 'campo-obligatorio'} spellCheck="false" />
                <label htmlFor='username' className='label'>Nombre de usuario</label>
              </div>
              <div className='inputsContainer'>
                {errors.password && touched.password && <span className='errorColor'>{errors.password}</span>}
                <Field name="password" className={errors.password && touched.password && 'campo-obligatorio'} type="password" spellCheck="false" />
                <label htmlFor='password' className='label'>Password</label>
              </div>
              {/* <div className='inputsContainer checkbox'>
                <label htmlFor='isAdmin' className='label'>Administrador</label>
                <Field name="isAdmin" type='checkbox'className={errors.isAdmin && touched.isAdmin && 'campo-obligatorio'} spellCheck="false" />
              </div> */}
              <div className='divButton'>
                <button type='submit' className='btn'>Registrarse</button>
                <Link className="linkAuth" to="/login">Iniciar sesión</Link>
              </div>
            </Form>
          )
        }
      </Formik>
    </main>
  )
}
