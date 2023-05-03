import request from 'supertest'
import jwt from 'jsonwebtoken'
import express from 'express'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import productsRouter from '../routes/products'
import Product from '../models/Products'
import Marca from '../models/Marca'
import { type IProduct, type IMarcaWithToJSON, type IProductWithToJSON } from '../type'

const { SECRET } = process.env
let app: express.Application
let mongoServer: MongoMemoryServer
let adminToken: string
let notAdmin: string

beforeEach(async () => {
  mongoServer = await MongoMemoryServer.create()
  const mongoUri = mongoServer.getUri()
  await mongoose.connect(mongoUri)

  adminToken = jwt.sign({ isAdmin: true }, SECRET as string, { expiresIn: '24h' })
  notAdmin = jwt.sign({ isAdmin: false }, SECRET as string, { expiresIn: '24h' })

  app = express()
  app.use(express.json())
  app.use('/products', productsRouter)
})

afterEach(async () => {
  await mongoose.disconnect()
  await mongoServer.stop()
})

describe('productsRouter', () => {
  let savedMarca: IMarcaWithToJSON
  let savedProduct: IProductWithToJSON | any // no encontre la solucion
  let expectedProduct: IProductWithToJSON
  let productData: IProduct

  beforeEach(async () => {
    savedMarca = await Marca.create({ name: 'adidas', logo_url: 'adsadsada' })
    savedProduct = await Product.create({
      name: 'TestProduct',
      description: 'TestDescription',
      image_url: 'TestUrl',
      price: 75,
      marca: savedMarca._id // esta propiedad es una referencia al modelo marca pòr eso creamos primero una marca antes de crear un producto
    })
    expectedProduct = {
      ...savedProduct.toJSON(),
      marca: savedMarca.toJSON(),
      createdAt: savedProduct.createdAt.toISOString(),
      updatedAt: savedProduct.updatedAt.toISOString()
    }
    productData = {
      name: 'TestPostProduct',
      description: 'TestDescription',
      image_url: 'TestUrl',
      price: 75,
      marca: savedMarca._id
    }
  })
  afterEach(async () => {
    await Marca.deleteMany({})
    await Product.deleteMany({})
  })
  describe('GET /products', () => {
    it('should return 200 and an array of products', async () => {
      const response = await request(app)
        .get('/products')
        .expect(200)

      expect(response.body.data.length).toEqual(1)
      expect(response.body.data[0]).toMatchObject({ name: 'TestProduct' })
    })
  })
  describe('GET /producst/:id', () => {
    it('should return 200 and the product with the specified id', async () => {
      const response = await request(app)
        .get(`/products/${savedProduct._id}`)
        .expect(200)

      expect(response.body.data).toMatchObject(expectedProduct)
    })

    it('should return 404 when the product with the specified id does not exist', async () => {
      const response = await request(app)
        .get('/products/123456789012345678901234')
        .expect(404)

      expect(response.body.error).toEqual('id not found')
    })
    it('should return 404 when the product with id does not valid', async () => {
      const response = await request(app)
        .get('/products/1dsadsadsaddsa')
        .expect(404)

      expect(response.body.error).toEqual('Invalid id')
    })
  })
  describe('POST /products', () => {
    it('should return 200 and the saved product when the product is valid and the user is an admin', async () => {
      const response = await request(app)
        .post('/products')
        .send(productData)
        .set('Authorization', 'Bearer ' + adminToken)
        .expect(200)

      const savedProductData: IProductWithToJSON | null = await Product.findOne({ name: 'TestPostProduct' })
      if (savedProductData !== null) {
        const expectedProductData: IProductWithToJSON = {
          ...savedProductData.toJSON(),
          marca: savedMarca._id?.toString(),
          createdAt: savedProductData?.createdAt.toISOString(),
          updatedAt: savedProductData?.updatedAt.toISOString()
        }
        expect(response.body.data).toMatchObject(expectedProductData)
      }
    })
    it('should return 403 when the user is not an admin', async () => {
      const response = await request(app)
        .post('/products')
        .send(productData)
        .set('Authorization', 'Bearer ' + notAdmin)
        .expect(403)

      expect(response.body.error).toEqual('You are not alowed!')
    })
    it('should return 403 when the user is no registered', async () => {
      const response = await request(app)
        .post('/products')
        .send(productData)
        .set('Authorization', 'Bearer ' + 'dsadasdasd')
        .expect(403)

      expect(response.body.error).toEqual('Token missing or invalid!')
    })
    it('should return 401 when the Authorization property is not inclused', async () => {
      const response = await request(app)
        .post('/products')
        .send(productData)
        .expect(401)

      expect(response.body.error).toEqual('You are not authenticated!')
    })
  })
  describe('PUT /products/:id', () => {
    it('should return 200 and an product data actualizated', async () => {
      const updateData = { name: 'NewName' }
      const response = await request(app)
        .put(`/products/${savedProduct._id}`)
        .set('Authorization', 'Bearer ' + adminToken)
        .send(updateData)
        .expect(200)
      const newProduct: IProductWithToJSON | null = await Product.findById(savedProduct._id)
      if (newProduct !== null) {
        const expectedProduct: IProductWithToJSON = {
          ...newProduct.toJSON(),
          marca: savedMarca._id?.toString(),
          createdAt: newProduct.createdAt.toISOString(),
          updatedAt: newProduct.updatedAt.toISOString()
        }
        expect(response.body.data).toMatchObject(expectedProduct)
      }
    })
    it('should return 403 when the user is not an admin', async () => {
      const updateData = { name: 'NewName' }
      const response = await request(app)
        .put(`/products/${savedProduct._id}`)
        .send(updateData)
        .set('Authorization', 'Bearer ' + notAdmin)
        .expect(403)

      expect(response.body.error).toEqual('You are not alowed!')
    })
    it('should return 401 when the Authorization property is not inclused', async () => {
      const updateData = { name: 'NewName' }
      const response = await request(app)
        .put(`/products/${savedProduct._id}`)
        .send(updateData)
        .expect(401)

      expect(response.body.error).toEqual('You are not authenticated!')
    })
  })
  describe('DELETE /products', () => {
    it('should return 200 and an a data product delete', async () => {
      const response = await request(app)
        .delete(`/products/${savedProduct._id}`)
        .set('Authorization', 'Bearer ' + adminToken)
        .expect(200)

      const expectedProductDelete: IProductWithToJSON = {
        ...savedProduct.toJSON(),
        marca: savedMarca._id?.toString(),
        createdAt: savedProduct.createdAt.toISOString(),
        updatedAt: savedProduct.updatedAt.toISOString()
      }
      expect(response.body.data).toMatchObject(expectedProductDelete)
    })
    it('should return 403 when the user is not an admin', async () => {
      const response = await request(app)
        .delete(`/products/${savedProduct._id}`)
        .set('Authorization', 'Bearer ' + notAdmin)
        .expect(403)

      expect(response.body.error).toEqual('You are not alowed!')
    })
    it('should return 401 when the Authorization property is not inclused', async () => {
      const response = await request(app)
        .delete(`/products/${savedProduct._id}`)
        .expect(401)

      expect(response.body.error).toEqual('You are not authenticated!')
    })
  })
})
