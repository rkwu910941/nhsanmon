import { z } from 'zod'

const bodySchema = z.object({
  email: z.email(),
  password: z.string().min(8)
})

export default defineEventHandler(async (event) => {
  const { email, password } = await readValidatedBody(event, bodySchema.parse)

  if (email === 'admin@admin.com' && password === 'iamtheadmin') {
    await setUserSession(event, {
      user: {
        id: 1,
        name: 'Demo Admin',
        email: 'admin@admin.com',
        role: 'admin'
      }
    })

    return {
      success: true
    }
  }

  throw createError({
    statusCode: 401,
    statusMessage: '帳號或密碼錯誤'
  })
})