import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import express, { type Request, type Response } from 'express'
import User from '../models/Users'
import { validateLogin } from '../midlewares/validator'
import { type UserToken } from '../type'
const {
  SECRET
} = process.env

const loginRouter = express.Router()

loginRouter.post('/', validateLogin, async (req: Request, res: Response): Promise<Response> => {
  const { body: { username, password } } = req
  try {
    const user = await User.findOne({ username })

    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(password, user.passwordHash)

    if (!((user !== null) && passwordCorrect)) {
      throw new Error('invalid username or password')
    };

    const userForToken: UserToken = {
      id: user._id,
      isAdmin: user.isAdmin
    }
    const token = jwt.sign(userForToken, SECRET as string, { expiresIn: '1d' })

    return res.status(200)
      .json({
        status_code: 200,
        data: {
          token,
          username: user.username,
          id: user._id
        }
      })
  } catch (err: any) {
    return res.status(401).send({
      status_code: 401,
      error: err.message
    })
  }
})

/** 
* @openapi
* /login:
*   post:
*     tags:
*       - login
*     summary: "logear usuario"
*     description: Este endpoint es para logear a los usuarios
*     requestBody:
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/login'
*     responses:
*       '200':
*         description: Retorna un objeto con 2 propiedades, el status_code y la informacion del usuario en la propiedad "data".
*       '401':
*         description: Usuario y/o contraseña invalida.
*       '400':
*         description: Propiedades faltantes
*/

export default loginRouter
