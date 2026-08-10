<template>
  <div style="background-image: linear-gradient(135deg, #eab308 35%, #f59e0b 100%)"
    class="flex min-h-screen items-center text-white">
    <div class="mx-auto flex flex-wrap items-center p-4">
      <div class="w-full p-4 text-center lg:w-1/2">
        <div class="text-[12rem] font-semibold">{{ error.statusCode }}</div>
      </div>
      <div class="w-full p-4 text-center lg:w-1/2 lg:text-left">
        <div class="mb-4 text-3xl font-medium">！發生了一些意外 🙁</div>
        <div class="mb-8 text-lg">{{ error.message }}</div>
        <button type="button"
          class="rounded border border-white px-4 py-2 hover:bg-gray-50 hover:bg-opacity-10 active:bg-opacity-20"
          @click="handleError">
          清除錯誤後回到首頁
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
  defineProps({ error: Object })

  const handleError = () => clearError({ redirect: '/' })
</script>