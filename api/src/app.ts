import fastify, { FastifyInstance } from 'fastify'
import { ZodError } from 'zod'
import cors from '@fastify/cors'

import { env } from './env'
import { tasksRoutes } from "./http/controllers/tasks/routes"


class FastifyApplication {
  public fastifyInstance: FastifyInstance

  constructor() {
    this.fastifyInstance = fastify({})
    this.defineMiddlewares()
    this.defineRouters()
  }

  private defineMiddlewares() {

    
    this.fastifyInstance.register(cors, {
      origin: true,
    })
    this.fastifyInstance.setErrorHandler((error, _, reply) => {
      if (error instanceof ZodError) {
        return reply
          .status(400)
          .send({ message: 'Validation error.', issues: error.format() })
      }
    
      if (env.NODE_ENV !== 'production') {
        console.log(error)
      }
    
      return reply.status(500).send({ message: 'Internal server error' })
    })
  }

  private defineRouters() {
    this.fastifyInstance.register(tasksRoutes)
  }
}


export default new FastifyApplication().fastifyInstance