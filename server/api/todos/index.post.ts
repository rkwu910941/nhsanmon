import { db, schema } from '@nuxthub/db'
import { createError, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody<{
    title?: string
  }>(event)

  const title = body.title?.trim()

  if (!title) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Todo title is required'
    })
  }

  const now = new Date()

  const [todo] = await db
    .insert(schema.todos)
    .values({
      title,
      completed: false,
      createdAt: now,
      updatedAt: now
    })
    .returning()

  return todo
})