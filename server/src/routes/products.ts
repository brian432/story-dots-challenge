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

export default productsRouter
