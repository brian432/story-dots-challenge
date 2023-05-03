import request from 'supertest'
import express from 'express'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import registerRouter from '../routes/register'

let app: express.Application
let mongoServer: MongoMemoryServer

beforeEach(async () => {
  mongoServer = await MongoMemoryServer.create()
  const mongoUri = mongoServer.getUri()
  await mongoose.connect(mongoUri)

  app = express()
  app.use(express.json())
  app.use('/register', registerRouter)
})

afterEach(async () => {
  await mongoose.disconnect()
  await mongoServer.stop()
})

describe('POST /register', () => {
  it('should return 200 when the username, password and isAdmin are correct', async () => {
    const response = await request(app)
      .post('/register')
      .send({
        username: 'testuser',
        password: 'password',
        isAdmin: true
      })
      .expect(201)

    expect(response.body.data.username).toEqual('testuser')
  })
})
