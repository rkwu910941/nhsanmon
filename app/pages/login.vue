<script setup lang="ts">
const { loggedIn, fetch: refreshSession } = useUserSession()
const form = reactive({
  email: 'admin@admin.com',
  password: 'iamtheadmin'
})
const loading = ref(false)
const errorMessage = ref('')
watchEffect(async () => {
  if (loggedIn.value) {
    await navigateTo('/backendsys/profile')
  }
})
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
      <UCard>
        <template #header>
          <div class="text-center">
            <h1 class="text-2xl font-bold">會員登入</h1>
          </div>
        </template>
        <div class="space-y-4">
          <UAlert
            v-if="errorMessage"
            color="error"
            variant="soft"
            title="登入失敗"
            :description="errorMessage"
          />
          <div class="space-y-2">
            <label class="text-sm font-medium">Email</label>
            <UInput
              v-model="form.email"
              type="email"
              placeholder="請輸入 Email"
              size="lg"
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Password</label>
            <UInput
              v-model="form.password"
              type="password"
              placeholder="請輸入密碼"
              size="lg"
              @keyup.enter="login"
            />
          </div>
          <UButton
            block
            size="lg"
            color="primary"
            :loading="loading"
            @click="login"
          >
            登入
          </UButton>

        </div>
      </UCard>
    </div>
  </div>
</template>