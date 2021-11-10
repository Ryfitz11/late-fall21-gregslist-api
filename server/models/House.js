import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

export const HouseSchema = new Schema({
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  year: { type: Number, required: true, min: 1250 },
  price: { type: Number, required: true, min: 1 },
  levels: { type: Number, default: 1 },
  description: { type: String, default: 'No Description Provided' },
  imgUrl: { type: String },
  creatorId: { type: ObjectId, required: true, ref: 'Profile' }
}, { timestamps: true, toJSON: { virtuals: true } })

// REVIEW used when the scheema has a creatorId
HouseSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Profile',
  foreignField: '_id',
  justOne: true
})
