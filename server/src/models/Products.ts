import { Schema, model } from 'mongoose'
import { type IProduct } from '../type'

const ProductSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  description: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 500
  },
  image_url: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  marca: {
    type: Schema.Types.ObjectId,
    ref: 'Marca',
    required: true
  }
}, { timestamps: true }
)

ProductSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Product = model<IProduct>('Product', ProductSchema)

export default Product
