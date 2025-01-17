import { Auth0Provider } from '@bcwdev/auth0provider'
import { carsService } from '../services/CarsService'
import BaseController from '../utils/BaseController'

export class CarsController extends BaseController {
  constructor() {
    super('api/cars')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      // you cant do this unless you are logged in
      // GateKeeper: All things beyond this point must be logged in
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.remove)
  }

  async getAll(req, res, next) {
    try {
      // capture the data from the query
      const query = req.query
      // send to the service
      const cars = await carsService.getAll(query)
      return res.send(cars)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const car = await carsService.getById(req.params.id)
      return res.send(car)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      // NEVER TRUST THE CLIENT TO TELL YOU WHO THEY ARE
      // req.userInfo is the creds validated by auth0 token
      req.body.creatorId = req.userInfo.id
      const car = await carsService.create(req.body)
      return res.send(car)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      // DONT TRUST THE USER
      req.body.creatorId = req.userInfo.id
      // attach the id incase its not there
      req.body.id = req.params.id
      const car = await carsService.edit(req.body)
      return res.send(car)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      const userId = req.userInfo.id
      const carId = req.params.id
      await carsService.remove(carId, userId)
      res.send('Successfully Deleted')
    } catch (error) {
      next(error)
    }
  }
}
