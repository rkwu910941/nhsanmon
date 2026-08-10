<template>
  <div class="flex flex-col items-center">
    <p class="my-12 text-4xl text-gray-600 dark:text-white">
      isFullscreen: {{ isFullscreen }}
    </p>
    <button
      class="rounded bg-blue-500 px-4 py-2 font-medium text-white"
      @click="toggle"
    >
      {{ isFullscreen ? '取消全螢幕':'啟用全螢幕' }}
    </button>
  </div>
</template>
 
<script lang='ts' setup>
  const { isFullscreen, toggle } = useFullscreen()
 </script>
