import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class JobsService {
  // set the query to either the data passed or default to {} (match all)
  async getAll(query = {}) {
    // find looks for all objects that match the provided object pattern
    // if passed an empty object, will find all items
    // populate goes and gets extra data based on the property provided, given it is a relationship
    const jobs = await dbContext.Jobs.find(query).populate('creator', 'name picture')
    return jobs
  }

  async getById(id) {
    const job = await dbContext.Jobs.findById(id).populate('creator', 'name picture')
    if (!job) {
      throw new BadRequest('Invalid Car Id')
    }
    return job
  }

  async create(body) {
    const job = await dbContext.Jobs.create(body)
    return job
  }

  async edit(body) {
    // check that the job exists
    const job = await this.getById(body.id)
    // check if the job is yours
    if (job.creatorId.toString() !== body.creatorId) {
      throw new Forbidden('This is not your job')
    }
    // findOne allows to check multiple properties
    const update = dbContext.Jobs.findOneAndUpdate({ _id: body.id, creatorId: body.creatorId }, body, { new: true })
    return update
  }

  async remove(jobId, userId) {
    // use getById because it will already handle the null check and throw an error if its a badId
    const job = await this.getById(jobId)
    // NOTE the job creatorId is type ObjectId, it cannot be compared to a string
    // convert toString and you are all set
    if (job.creatorId.toString() !== userId) {
      throw new Forbidden('This is not your job')
    }
    await dbContext.Jobs.findByIdAndDelete(jobId)
  }
}

export const jobsService = new JobsService()
