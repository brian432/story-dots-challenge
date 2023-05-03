import React from 'react'
import { type ILogin } from '../../types'
import { Field, Form, Formik } from 'formik'
import { loginSchema } from '../../utils/yup'
import { Link } from 'react-router-dom'
import '../auth.css'
import { useLogin } from '../../query-hooks/useLogin'

export const Login: React.FC = () => {
  const { mutate } = useLogin()
  const initialValues: ILogin = {
    username: '',
    password: ''
  }
  return (
    <main className='auth'>
      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
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
              <div className='divButton'>
                <button type='submit' className='btn'>Iniciar sesión</button>
                <Link className="linkAuth" to="/register">Registrarse</Link>
              </div>
            </Form>
          )
        }
      </Formik>
    </main>
  )
}
