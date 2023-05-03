import { Schema, model } from 'mongoose'
import { type IMarca } from '../type'

const MarcaSchema: Schema = new Schema<IMarca>({
  name: {
    type: String,
    required: true
  },
  logo_url: {
    type: String,
    required: true
  }
})
MarcaSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Marca = model<IMarca>('Marca', MarcaSchema)

export default Marca
