import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

export const HouseSchema = new Schema({
  bedrooms: { type: String, required: true },
  bathrooms: { type: String, required: true },
  year: { type: Number, required: true, min: 1750 },
  price: { type: Number, required: true, min: 1 },
  levels: { type: Number, default: 1 },
  description: { type: String, default: 'No Description Provided' },
  imgUrl: { type: String },
  creatorId: { type: ObjectId, required: true, ref: 'Profile' }
}, { timestamps: true, toJSON: { virtuals: true } })

HouseSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Profile',
  foreignField: '_id',
  justOne: true
})
