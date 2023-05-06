import User from '../models/Users'
import { validateRegister } from '../midlewares/validator'
import bcrypt from 'bcrypt'
import express, { type Request, type Response } from 'express'
import { type IUser } from '../type'

const registerRouter = express.Router()

registerRouter.post('/', validateRegister, async (req: Request, res: Response): Promise<void> => {
  const { body: { username, password, isAdmin } } = req
  try {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const uniqueUsername = await User.findOne({ username })
    if (uniqueUsername !== null) throw new Error('El usuario ya existe')

    const user = new User<IUser>({
      username,
      passwordHash,
      isAdmin
    })

    const savedUser: IUser = await user.save()
    res.status(201).json({
      status_code: 201,
      data: savedUser
    })
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).send({
        status_code: 400,
        error: err.message
      })
    }
  }
})
/** 
* @openapi
* /register:
*   post:
*     tags:
*       - login
*     summary: "registrar usuario"
*     description: Este endpoint es para registrar usuarios
*     requestBody:
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/register'
*     responses:
*       '201':
*         description: Retorna un objeto con el status_code y la informacion sobre el usurio registrado.
*       '400':
*         description: Retorna un objeto con el status_code y usuario duplicado
*     
*/

export default registerRouter
