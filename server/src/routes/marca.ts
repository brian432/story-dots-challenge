import express, { type NextFunction, type Request, type Response } from 'express'
import Marca from '../models/Marca'
import { validateMarca } from '../midlewares/validator'
import { verifyTokenAndAdmin } from '../midlewares/verifyToken'
import mongoose from 'mongoose'
import { type IMarca } from '../type'

const marcasRouter = express.Router()

marcasRouter.post('/', validateMarca, verifyTokenAndAdmin, async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
  const newMarca = new Marca(req.body)
  try {
    const savedProduct: IMarca = await newMarca.save()
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
marcasRouter.get('/:id', async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
  const { params: { id } } = req
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid id')
    }
    const marcas = await Marca.findById(id)

    if (marcas !== null) {
      res.status(200).json({
        status_code: 200,
        data: marcas
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

marcasRouter.get('/', async (_req: Request, res: Response, _next: NextFunction): Promise<void> => {
  try {
    const marcas = await Marca.find()
    res.status(200).json({
      status_code: 200,
      data: marcas
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
* /marcas:
*   get:
*     tags:
*       - marcas
*     summary: "Obtener todos las marcas"
*     description: Este endpoint es para obtener todas las marcas
*     responses:
*       '200':
*         description: Retorna el status_code y un array con todos las marcas almacenados
*       '404':
*         description: Retorna el error not found
*/

export default marcasRouter
