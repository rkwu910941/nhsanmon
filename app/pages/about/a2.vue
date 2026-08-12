<script setup lang="ts">
const { loggedIn, user, clear, fetch: refreshSession } = useUserSession()
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
              <h1 class="text-2xl font-bold">會員系統首頁</h1>
              <p class="text-sm text-gray-500 mt-1">
                最小可跑登入範例
              </p>
            </div>
            <UBadge color="primary" variant="soft">
              Auth Demo
            </UBadge>
          </div>
        </template>
        <div class="space-y-4">
          <div v-if="loggedIn">
            <UAlert
              color="success"
              variant="soft"
              title="目前已登入"
              :description="`歡迎您，${user?.name || '會員'}`"
            />
            <div class="flex gap-3 mt-4">
              <UButton to="/profile">
                前往會員中心
              </UButton>
              <UButton color="neutral" variant="outline" @click="logout">
                登出
              </UButton>
            </div>
          </div>
          <div v-else>
            <UAlert
              color="warning"
              variant="soft"
              title="尚未登入"
              description="請先登入後再查看會員資料"
            />
            <div class="mt-4">
              <UButton to="/login">
                前往登入
              </UButton>
            </div>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>