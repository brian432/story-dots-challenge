import request from 'supertest'
import express from 'express'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import marcasRouter from '../routes/marca'
import * as dotenv from 'dotenv'
import { type IMarca, type IMarcaWithToJSON } from '../type'
import Marca from '../models/Marca'
dotenv.config()

const { SECRET } = process.env

let app: express.Application
let mongoServer: MongoMemoryServer
let adminToken: string
let notAdmin: string

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create()
  const mongoUri = mongoServer.getUri()
  await mongoose.connect(mongoUri)

  app = express()
  app.use(express.json())
  app.use('/marcas', marcasRouter)
  adminToken = jwt.sign({ isAdmin: true }, SECRET as string, { expiresIn: '24h' })
  notAdmin = jwt.sign({ isAdmin: false }, SECRET as string, { expiresIn: '24h' })
})

afterAll(async () => {
  await mongoose.disconnect()
  await mongoServer.stop()
})

describe('marcasRouter', () => {
  describe('GET /marcas', () => {
    it('should return 200 and an array of marcas', async () => {
      await Marca.create({ name: 'TestGetMarca1', logo_url: 'dasdsa' })
      await Marca.create({ name: 'TestGetMarca2', logo_url: 'dsadasd' })

      const response = await request(app)
        .get('/marcas')
        .expect(200)

      expect(response.body.data.length).toEqual(2)
      expect(response.body.data[0]).toMatchObject({ name: 'TestGetMarca1' })
    })
  })
  describe('GET /marcas/:id', () => {
    it('should return 200 and the marca with the specified id', async () => {
      const savedMarca: IMarcaWithToJSON = await Marca.create({ name: 'TestGetIdMarca', logo_url: 'dsadsada' })

      const response = await request(app)
        .get(`/marcas/${savedMarca._id}`)
        .expect(200)

      expect(response.body.data).toMatchObject(savedMarca?.toJSON())
    })

    it('should return 404 when the marca with the specified id does not exist', async () => {
      const response = await request(app)
        .get('/marcas/123456789012345678901234')
        .expect(404)

      expect(response.body.error).toEqual('id not found')
    })
  })
  describe('POST /marcas', () => {
    let marcaData: IMarca
    beforeEach(() => {
      marcaData = { name: 'TestPostMarca', logo_url: 'sdsadsa' }
    })
    it('should return 200 and the saved marca when the marca is valid and the user is an admin', async () => {
      const response = await request(app)
        .post('/marcas')
        .send(marcaData)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200)
      const savedMarca: IMarcaWithToJSON | null = await Marca.findOne({ name: 'TestPostMarca' })
      expect(response.body.data).toMatchObject(savedMarca?.toJSON())
    })
    it('should return 403 when the user is not an admin', async () => {
      const response = await request(app)
        .post('/marcas')
        .send(marcaData)
        .set('Authorization', 'Bearer ' + notAdmin)
        .expect(403)

      expect(response.body.error).toEqual('You are not alowed!')
    })

    it('should return 403 when the user is no registered', async () => {
      const response = await request(app)
        .post('/marcas')
        .send(marcaData)
        .set('Authorization', 'Bearer ' + 'dsadasdasd')
        .expect(403)

      expect(response.body.error).toEqual('Token missing or invalid!')
    })

    it('should return 401 when the Authorization property is not inclused', async () => {
      const response = await request(app)
        .post('/marcas')
        .send(marcaData)
        .expect(401)

      expect(response.body.error).toEqual('You are not authenticated!')
    })
  })
})
