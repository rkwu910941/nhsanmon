<script setup lang="ts">
  const { loggedIn, fetch: refreshSession } = useUserSession()

  //響應式變數定義
  const form = reactive({
    email: '',
    password: ''
  })
  const loading = ref(false)
  const errorMessage = ref('')

  //登入成功跳轉方法定義
  watchEffect(async () => {
    if (loggedIn.value) {
      await navigateTo('/backendsys/profile')
    }
  })

  //登入方法內容定義
  const login = async () => {
    errorMessage.value = ''
    try {
      loading.value = true
      await $fetch('/api/login', {
        method: 'POST',
        body: form
      })
      await refreshSession()
      await navigateTo('/backendsys/profile')
    } catch (error: any) {
      errorMessage.value =
        error?.data?.statusMessage ||
        error?.data?.message ||
        '登入失敗'
    } finally {
      loading.value = false
    }
  }
</script>

<template>
  <div class="min-h-200 flex items-center justify-center p-6">
    <div class="w-full max-w-md">
      <UCard class="dark:ring-white ring-black" :ui="{ header: 'border-black dark:border-white', body:'border-b border-black' , footer:'border-black'}">
        <template #header>
          <div class="text-center">
            <h1 class="text-2xl font-bold">後台登入</h1>
          </div>
        </template>
        <div class="space-y-4">
          <UAlert
            v-if="errorMessage"
            color="error"
            variant="soft"
            title="登入失敗"
            class="dark:bg-red-200"
            :description="errorMessage"
          />
          <div class="space-y-2">
            <label class="text-sm font-medium pr-8">Email</label>
            <UInput
              v-model="form.email"
              type="email"
              placeholder="請輸入 Email"
              size="lg"
              :ui="{base: 'ring-black dark:ring-white w-70'}"
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium pr-2">Password</label>
            <UInput
              v-model="form.password"
              type="password"
              placeholder="請輸入密碼........"
              size="lg"
              @keyup.enter="login"
              :ui="{base: 'ring-black dark:ring-white w-70'}"
            />
          </div>
          <UButton
            block
            size="lg"
            color="primary"
            :loading="loading"
            @click="login"
            class="dark:text-black dark:bg-gray-400"
          >
            登入
          </UButton>
        </div>
      </UCard>
    </div>
  </div>
</template>