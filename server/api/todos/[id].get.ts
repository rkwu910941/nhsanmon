import { db, schema } from '@nuxthub/db'
import { eq } from 'drizzle-orm'
import {
  createError,
  getRouterParam
} from 'h3'

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))

  if (!Number.isInteger(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid todo id'
    })
  }

  const [todo] = await db
    .select()
    .from(schema.todos)
    .where(eq(schema.todos.id, id))
    .limit(1)

  if (!todo) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Todo not found'
    })
  }

  return todo
})