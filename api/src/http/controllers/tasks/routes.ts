import { FastifyInstance } from 'fastify'

import { create } from './create'
import { fetch } from './fetch'
import { deleteTask } from "./delete"
import { toggleStatus } from "./toggleStatus"

export async function tasksRoutes(app: FastifyInstance) {
  app.get('/tasks', fetch)
  app.post('/tasks', create)
  app.delete('/tasks/:id', deleteTask)
  app.patch('/tasks/:id', toggleStatus)
}
