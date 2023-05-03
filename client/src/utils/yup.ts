import * as yup from 'yup'
const required = '* Campo requerido'

export const userSchema = yup.object().shape({
  username: yup.string().min(3, 'Ingrese mas de 2 caracteres').required(required),
  password: yup.string().min(3, 'Ingrese mas de 2 caracteres').required(required),
  isAdmin: yup.boolean().required(required)
})

export const loginSchema = yup.object().shape({
  username: yup.string().min(3, 'Ingrese mas de 2 caracteres').required(required),
  password: yup.string().min(3, 'Ingrese mas de 2 caracteres').required(required)
})

export const productSchema = yup.object().shape({
  name: yup.string().min(3, 'Ingrese mas de 2 caracteres').required(required),
  description: yup.string().min(3, 'Ingrese mas de 2 caracteres').required(required),
  price: yup.number().min(1, 'Ingrese un numero').required(required),
  image_url: yup.string().required(required),
  marca: yup.string().required(required)
})

export const updateSchema = yup.object().shape({
  name: yup.string().min(3, 'Ingrese mas de 2 caracteres'),
  description: yup.string().min(3, 'Ingrese mas de 2 caracteres'),
  price: yup.number(),
  image_url: yup.string(),
  marca: yup.string()
})
