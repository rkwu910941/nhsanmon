export default defineEventHandler(async (event) => {
  try {
    // 讀取環境變數（第三方 API 配置）
    const apiKey = useRuntimeConfig().apiSecretKey
    const baseURL = useRuntimeConfig().public.apiBase

    // 呼叫第三方 API
    const response = await fetch(`${baseURL}/users`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw createError({
        statusCode: response.status,
        statusMessage: 'Failed to fetch from external API',
      })
    }

    const data = await response.json()
    return data
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: (error as Error).message,
    })
  }
})