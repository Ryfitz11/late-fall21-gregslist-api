import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

export const JobSchema = new Schema({
  company: { type: String, required: true },
  position: { type: String, required: true },
  salary: { type: Number, min: 1 },
  description: { type: String, default: 'No Description Provided' },
  creatorId: { type: ObjectId, required: true, ref: 'Profile' }
}, { timestamps: true, toJSON: { virtuals: true } })

// the fake property creator so we can populate and get the data from the relationship
JobSchema.virtual('creator', {
  // what property on this object is it defined on
  localField: 'creatorId',
  // what collection do you want to pull from
  ref: 'Profile',
  // what is the property on that collection object
  foreignField: '_id',
  // safety clause for one to many
  justOne: true
})
