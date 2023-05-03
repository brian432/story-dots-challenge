import express from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'
import connect from './mongo'
import productsRouter from './routes/products'
import loginRouter from './routes/login'
import registerRouter from './routes/register'
import marcasRouter from './routes/marca'

const app = express()
app.use(cors())
app.use(express.json())
dotenv.config()

const {
  PORT
} = process.env
app.use(express.static('../client/dist'));
app.use('/register', registerRouter)
app.use('/login', loginRouter)
app.use('/products', productsRouter)
app.use('/marcas', marcasRouter)

app.listen(PORT, async (): Promise<void> => {
  console.log(`Server running on port ${PORT}`)
  await connect()
})
