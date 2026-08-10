<template>
  <UHeader class="bg-red-900">
    <!--公司LOGO-->
    <template #title>
      <NuxtLink to="/">
        <img src="~/assets/images/TSB-logo.png" class="h-5 w-22 pr-2" />
      </NuxtLink>
      <span class="h-6 text-yellow-200 tracking-tighter">
        SAN Monitor
      </span>
    </template>

    <!--中央導覽列-->
    <template #default>
        <UNavigationMenu
          :items="items"
          variant="pill"
          :ui="{
            link: 'text-[16px] text-gray-50 data-active:text-gray-700 dark:data-active:text-gray-50 dark:text-gray-50',
            linkLeadingIcon: 'dark:text-gray-50',
            label: 'text-gray-50'
          }"
        />
    </template>

    <!--靠右的功能按鈕-->
    <template #right>
      <UTooltip text="切換暗黑模式" :ui="{ content: 'text-base text-white bg-black dark:bg-white dark:text-black'}">
        <UColorModeButton color="primary" variant="ghost" size="xl" class="hover:bg-red-700" />
      </UTooltip>
      <UTooltip text="進入後台系統" :ui="{ content: 'text-base text-white bg-black dark:bg-white dark:text-black'}">
        <UButton color="primary" variant="ghost" to="/login" icon="i-lucide-log-in" size="xl" class="hover:bg-red-700" />
      </UTooltip>

    </template>
  </UHeader>
</template>

<script lang='ts' setup>
  import { tooltip } from '#build/ui';
import type { NavigationMenuItem } from '@nuxt/ui'

  const route = useRoute()
  // const colorMode = useColorMode()

  const items = computed<NavigationMenuItem[]>(() => [
    {
      label: '內湖機房',
      to: '/nhsite',
      active: route.path.startsWith('/nhsite'),
      icon: 'i-lucide-building-2'
    },
    {
      label: '龍潭機房',
      to: '/ltsite',
      active: route.path.startsWith('/ltsite'),
      icon: 'i-lucide-building-2'
    },
    {
      label: '關於SAN',
      to: '/about',
      active: route.path.startsWith('/about'),
      icon: 'i-lucide-book-open-text'
    }
])

</script>