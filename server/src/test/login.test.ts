import request from 'supertest'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import express from 'express'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import loginRouter from '../routes/login'
import * as dotenv from 'dotenv'
import { type UserToken } from '../type'
dotenv.config()

const { SECRET } = process.env

let app: express.Application
let mongoServer: MongoMemoryServer
let token: string
let userForToken: UserToken

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create()
  const mongoUri = mongoServer.getUri()
  await mongoose.connect(mongoUri)

  userForToken = {
    id: new mongoose.Types.ObjectId(),
    isAdmin: true
  }
  token = jwt.sign(userForToken, SECRET as string, { expiresIn: '1d' })

  const testUser = {
    _id: userForToken.id,
    username: 'testuser',
    passwordHash: await bcrypt.hash('password', 10),
    isAdmin: true
  }
  await mongoose.model('User').create(testUser)

  app = express()
  app.use(express.json())
  app.use('/login', loginRouter)
})

afterAll(async () => {
  await mongoose.model('User').deleteMany({})
  await mongoose.disconnect()
  await mongoServer.stop()
  token = ''
})

describe('POST /login', () => {
  it('should return 200 and a token when the username and password are correct', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        username: 'testuser',
        password: 'password'
      })
      .expect(200)

    expect(response.body.data.token).toEqual(token)
    expect(response.body.data.username).toEqual('testuser')
  })

  it('should return 401 when the username or password are incorrect', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        username: 'wronguser',
        password: 'wrongpassword'
      })
      .expect(401)

    expect(response.body.error).toEqual('invalid username or password')
  })

  it('should return 400 when the username or password or typeof incorrect', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        username: 45,
        password: ['wrongpassword']
      })
      .expect(400)

    expect(response.body.error.username.msg).toEqual('must contain a string')
  })
})
