import { type Types, type Schema } from 'mongoose'

// types schemas

export interface IMarca {
  name: string
  logo_url: string
  _id?: Schema.Types.ObjectId
}

export interface IProduct {
  name: string
  description: string
  image_url: string
  price: number
  marca?: Schema.Types.ObjectId
  _id?: Schema.Types.ObjectId
}

export interface IUser {
  username: string
  passwordHash: string
  isAdmin: boolean
}

// types routers

export interface UserToken {
  id: Types.ObjectId
  isAdmin: boolean
}

// types testing

export interface IMarcaWithToJSON extends IMarca {
  toJSON: () => any
}

export interface ICustomDate extends Date {
  toISOString: () => string
}

export interface IProductWithToJSON extends IProduct {
  toJSON: () => any
  createdAt: ICustomDate
  updatedAt: ICustomDate
}
