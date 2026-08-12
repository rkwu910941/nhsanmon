<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})
const { data, pending, error, refresh } = await useFetch('/api/me')
const { clear, fetch: refreshSession } = useUserSession()
const logout = async () => {
  await $fetch('/api/logout', {
    method: 'POST'
  })
  await clear()
  await refreshSession()
  await navigateTo('/login')
}
</script>

<template>
  <div class="min-h-screen p-6">
    <div class="mx-auto max-w-3xl">
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-2xl font-bold">會員中心</h1>
              <p class="text-sm text-gray-500 mt-1">
                受保護頁面範例
              </p>
            </div>
            <div class="flex gap-2">
              <UButton variant="outline" color="neutral" @click="refresh()">
                重新整理
              </UButton>
              <UButton color="error" variant="soft" @click="logout">
                登出
              </UButton>
            </div>
          </div>
        </template>
        <div v-if="pending" class="space-y-3">
          <USkeleton class="h-6 w-full" />
          <USkeleton class="h-6 w-2/3" />
          <USkeleton class="h-32 w-full" />
        </div>
        <UAlert
          v-else-if="error"
          color="error"
          variant="soft"
          title="載入失敗"
          :description="error.message"
        />
        <div v-else class="space-y-4">
          <UAlert
            color="success"
            variant="soft"
            title="驗證成功"
            description="您已成功登入並存取受保護會員資料"
          />
          <UCard>
            <template #header>
              <div class="font-semibold">會員資料</div>
            </template>
            <pre class="rounded bg-gray-50 p-4 text-sm overflow-auto">{{ data }}</pre>
          </UCard>
        </div>
      </UCard>
    </div>
  </div>
</template>