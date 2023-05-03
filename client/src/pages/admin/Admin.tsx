import React from 'react'
import './admin.css'
import { useCreateProducts } from '../../query-hooks/useCreateProducts'
import { type IProductPost, type IMarcas } from '../../types'
import { Field, Form, Formik } from 'formik'
import { productSchema, updateSchema } from '../../utils/yup'
import { uploadFiles } from '../../firebase/config'
import { useGetMarcas } from '../../query-hooks/useGetMarcas'
import Spinner from '../../components/spinner/Spinner'
import { swalAlert } from '../../utils/swal'
import { useParams } from 'react-router-dom'
import { usePutProduct } from '../../query-hooks/useUpdateProducts'

export const Admin: React.FC = () => {
  const { mutate, isLoading } = useCreateProducts()
  const { id } = useParams()
  const { mutate: mutateUpdate, isLoading: isLoadingUpdate } = usePutProduct()
  const { data } = useGetMarcas()

  const handleSubmit = async (values: IProductPost): Promise<void> => { // Enviando la imagen a firebase
    if (values?.image_url) {
      try {
        const result = await uploadFiles(values.image_url)
        if (result !== null) {
          id
            ? mutateUpdate({ values: { ...values, image_url: result }, id })
            : mutate({
              ...values,
              image_url: result
            })
        }
      } catch (error) {
        swalAlert('Error al ingresar la imagen')
      }
    } else {
      if (id) return mutateUpdate({ values, id })
    }
  }

  const initialValues: IProductPost = {
    name: '',
    description: '',
    image_url: '',
    price: 0,
    marca: ''
  }

  if (isLoading || isLoadingUpdate) return <Spinner />

  return (
    <main className='auth formProduct'>
      <h1>{id ? 'Actualizar' : 'Crear Producto'}</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={id ? updateSchema : productSchema}
        onSubmit={(values, { resetForm }) => {
          const filteredValues = Object.entries(values).filter(([_key, value]) => value)// evaluo las propiedades con valores vacios y las elimino del objeto resultante para actualizar el producto solo con las propiedades ===true
          const result = Object.fromEntries(filteredValues)

          handleSubmit(result as IProductPost)
          resetForm()
        }}
      >
        {
          ({ errors, touched, setFieldValue }) => (
            <Form className='formWrapper'>
              <div className='inputsContainer'>
                {errors.name && touched.name ? <span className='errorColor'>{errors.name}</span> : null}
                <Field name="name" className={errors.name && touched.name && 'campo-obligatorio'} spellCheck="false" />
                <label htmlFor='name' className='label'>Nombre del producto</label>
              </div>
              <div className='inputsContainer'>
                {errors.description && touched.description && <span className='errorColor'>{errors.description}</span>}
                <Field name="description" className={errors.description && touched.description && 'campo-obligatorio'} spellCheck="false" />
                <label htmlFor='description' className='label'>Descripcion</label>
              </div>
              <div className='inputsContainer'>
                {errors.price && touched.price && <span className='errorColor'>{errors.price}</span>}
                <Field name="price" className={errors.price && touched.price && 'campo-obligatorio'} type="number" spellCheck="false" />
                <label htmlFor='price' className='label'>Precio</label>
              </div>
              <div className='inputsContainer'>
                <input
                  type='file'
                  onChange={(e: any) => {
                    setFieldValue('image_url', e.target.files[0])
                  }}
                  name="image_url"
                  className='custom-file-input'
                />
                <label htmlFor='image_url' className='label'>Url de la imagen</label>
              </div>
              <div className='inputsContainer'>
                {errors.marca && touched.marca && <span className='errorColor'>{errors.marca}</span>}
                <Field name="marca" id='selectForm' className={errors.marca && touched.marca && 'campo-obligatorio'} spellCheck="false" as="select" >
                  <option>Seleccionar marca</option>
                  {
                    data?.map(({ name, id }: IMarcas) => (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    ))
                  }
                </Field>
                <label htmlFor='marca' className='label'>marca</label>
              </div>
              <div className='divButton'>
                <button type='submit' className='btn'>{id ? 'Actualizar' : 'Crear producto'}</button>
              </div>
            </Form>
          )
        }
      </Formik>
    </main>
  )
}
