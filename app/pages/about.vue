<template>
  <nav class="flex bg-indigo-200 h-18">
    <UNavigationMenu
     :items="items"
     orientation="horizontal"
     variant="link"
     color="primary"
     highlight
     highlight-color="primary"
     class="w-full justify-center"
     :ui="{
      link: 'hover:bg-blue-300 data-[active=true]: bg-amber-300'
     }"
    />
  </nav>
  <!--  -->
  <main>
    <NuxtPage />
  </main>
</template>

<script lang='ts' setup>
definePageMeta({
  layout: 'about-layout'
})
import type { NavigationMenuItem } from '@nuxt/ui'

const items: NavigationMenuItem[] = [
  { label: 'A1', icon: 'i-lucide-hard-drive', to: '/about/a1' },
  { label: 'A2', icon: 'i-lucide-hard-drive', to: '/about/a2' },
  { label: 'A3', icon: 'i-lucide-hard-drive', to: '/about/a3' },
  { label: 'A4', icon: 'i-lucide-hard-drive', to: '/about/a4' },
  { label: 'HOME', icon: 'i-lucide-home', to: '/'}
]
</script>