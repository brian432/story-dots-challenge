import express, { type NextFunction, type Request, type Response } from 'express'
import Product from '../models/Products'
import { validateProduct } from '../midlewares/validator'
import { verifyTokenAndAdmin } from '../midlewares/verifyToken'
import mongoose from 'mongoose'
import { type IProduct } from '../type'

const productsRouter = express.Router()

// Crear productos

productsRouter.post('/', validateProduct, verifyTokenAndAdmin, async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
  const newProduct = new Product(req.body)
  try {
    const savedProduct: IProduct = await newProduct.save()
    res.status(200).json({
      status_code: 200,
      data: savedProduct
    })
  } catch (err: any) {
    res.status(400).send({
      status_code: 400,
      error: err.message
    })
  }
})

/** 
* @openapi
* /products:
*   post:
*     tags:
*       - products
*     summary: "Crear productos"
*     description: Este endpoint es para la creacion de productos. La propiedad "Marca" proviene de una peticion a la coleccion marca, se elige mediante un select y se coloca el id en el valor. Probar con el siguiente:ID 644ebd4617f9fd1a191ab511 o hacer una request al endpoint /marca y agregar la propiedad id
*     requestBody:
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/postProduct'
*     responses:
*       '200':
*         description: Retorna un objeto con el status_code y el producto creado.
*       '401':
*         description: Retorna el status_code y el error de falta de autorización
*       '403':
*         description: Retorna el status_code y el error de token invalido
*     security:
*       - bearerAuth: [] 
*/

// Actualizar productos
productsRouter.put('/:id', verifyTokenAndAdmin, async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
  const { params: { id } } = req
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid id')
    }
    const updateProducts = await Product.findByIdAndUpdate(id, {
      $set: req.body
    }, { new: true })
    if (updateProducts !== null) {
      res.status(200).json({
        status_code: 200,
        data: updateProducts
      })
    } else {
      throw new Error('id not found')
    }
  } catch (err: any) {
    res.status(400).send({
      status_code: 400,
      error: err.message
    })
  }
})

/** 
* @openapi
* /products/{id}:
*   put:
*     tags:
*       - products
*     summary: "Actualizar productos"
*     description: Este endpoint es para la actualizacion de productos, todas las casillas son opcionales, ninguna es requerida. La propiedad "Marca" proviene de una peticion a la coleccion marca, se elige mediante un select y se coloca el id en el valor. Probar con el siguiente:ID 644ebd4617f9fd1a191ab511 o hacer una request al endpoint /marca y agregar la propiedad id
*     parameters:
*        - name: id
*          in: path
*          description: id del producto
*          required: true
*          schema:
*            type: string
*     requestBody:
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/updateProduct'
*     responses:
*       '200':
*         description: Retorna un objeto con el status_code y el producto actualizado.
*       '401':
*         description: Retorna el status_code y el error de falta de autorización
*       '403':
*         description: Retorna el status_code y el error de token invalido
*     security:
*       - bearerAuth: [] 
*/

// Buscar productos por el id
productsRouter.get('/:id', async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
  const { params: { id } } = req
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid id')
    }
    const product: IProduct | null = await Product.findById(id).populate('marca')
    if (product !== null) {
      res.status(200).json({
        status_code: 200,
        data: product
      })
    } else {
      throw new Error('id not found')
    }
  } catch (err: any) {
    res.status(404).send({
      status_code: 404,
      error: err.message
    })
  }
})
/** 
* @openapi
* /products/{id}:
*   get:
*     tags:
*       - products
*     summary: "Obtener el producto por el ID"
*     description: Este endpoint es para obtener productos por el id
*     parameters:
*        - name: id
*          in: path
*          description: id del producto
*          required: true
*          schema:
*            type: string
*     responses:
*       '200':
*         description: Retorna el status_code y el producto solicitado
*       '40':
*         description: Retorna el status_code y el error de id invalido
*/

// Obetener todos los productos

productsRouter.get('/', async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
  const page = Number(req.query.page) || 0
  const skip = page * 8
  try {
    const products: IProduct[] = await Product.find().populate('marca').skip(skip).limit(8)
    const lengthProducts = await Product.find()
    res.status(200).json({
      status_code: 200,
      data: products,
      lengthData: lengthProducts.length
    })
  } catch (err: any) {
    res.status(404).send({
      status_code: 404,
      error: err.message
    })
  }
})
/** 
* @openapi
* /products:
*   get:
*     tags:
*       - products
*     summary: "Obtener todos los productos"
*     description: Este endpoint es para obtener todos los productos
*     responses:
*       '200':
*         description: Retorna el status_code y un array con todos los productos almacenados
*       '404':
*         description: Retorna el error not found
*/

// Eliminar productos por el id

productsRouter.delete('/:id', verifyTokenAndAdmin, async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
  const { params: { id } } = req
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid id')
    }
    const productDeleted: IProduct | null = await Product.findByIdAndDelete(id)
    if (productDeleted !== null) {
      res.status(200).json({
        status_code: 200,
        data: productDeleted
      })
    } else {
      throw new Error('id not found')
    }
  } catch (err: any) {
    res.status(404).send({
      status_code: 404,
      error: err.message
    })
  }
})

/** 
* @openapi
* /products/{id}:
*   delete:
*     tags:
*       - products
*     summary: "Eliminar producto"
*     description: Este endpoint es para la eliminacion de un producto por el id
*     parameters:
*        - name: id
*          in: path
*          description: id del producto
*          required: true
*          schema:
*            type: string
*     responses:
*       '200':
*         description: Retorna un objeto con el status_code y el producto eliminado.
*       '401':
*         description: Retorna el status_code y el error de falta de autorización
*       '403':
*         description: Retorna el status_code y el error de token invalido
*       '404':
*         description: Retorna el status_code y el error de ID invalido
*     security:
*       - bearerAuth: [] 
*/

export default productsRouter
