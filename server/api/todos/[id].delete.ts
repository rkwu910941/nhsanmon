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

  const deleted = await db
    .delete(schema.todos)
    .where(eq(schema.todos.id, id))
    .returning()

  if (deleted.length === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Todo not found'
    })
  }

  return {
    success: true,
    todo: deleted[0]
  }
})