<template>
  <div class="flex">
    <USidebar
      v-model:open="isOpen"
      collapsible="none"
      variant="sidebar"
      title="內湖機房設備列表"
      description=""
      side="left"
      class=""
      :ui="{
        root: 'h-273 bg-gray-500 dark:bg-gray-300',
        header: '',
        container: '',
        inner: '',
        body: '',
        title: 'text-white font-bold text-xl dark:text-gray-800',
        footer: ''
      }"
      :style="{
        '--sidebar-width': '13rem'
      }">
      <template #header></template>
      <template #default>
        <UNavigationMenu
          :items="items"
          orientation="vertical"
          :popover="false"
          :ui="{
            link: 'text-[16px] text-gray-50 data-active:text-gray-700 dark:data-active:text-gray-50 dark:text-gray-800',
            linkLeadingIcon: 'dark:text-gray-800',
            label: 'text-gray-50'
          }"
        />
      </template>
    </USidebar>
    <main class="flex-1">
      <div>
       <NuxtPage />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
  import type { NavigationMenuItem } from '@nuxt/ui'
  const isOpen = ref(true)
  const route = useRoute()
  const items = computed<NavigationMenuItem[]>(() => [
    {
      label: '光纖磁碟系統',
      icon: 'i-material-symbols-storage',
      to: '/nhsite/storage',
      defaultOpen: true,
      children: [
        {
          label: 'HDS',
          to: '/nhsite/storage/hds',
          active: route.path.startsWith('/nhsite/storage/hds')
        },
        {
          label: 'HPE',
          to: '/nhsite/storage/hpe',
          active: route.path.startsWith('/nhsite/storage/hpe')
        },
        {
          label: 'DELL/EMC',
          to: '/nhsite/storage/emc',
          active: route.path.startsWith('/nhsite/storage/emc')
        },
        {
          label: 'FUJI',
          to: '/nhsite/storage/fuji',
          active: route.path.startsWith('/nhsite/storage/fuji')
        }
      ]
    },
    {
      label: '光纖交換器',
      icon: 'i-material-symbols-switch',
      to: '/nhsite/switch',
      defaultOpen: true,
      children: [
        {
          label: 'CISCO',
          to: '/nhsite/switch/cisco',
          active: route.path.startsWith('/nhsite/switch/cisco')
        },
        {
          label: 'BROCADE',
          to: '/nhsite/switch/brocade',
          active: route.path.startsWith('/nhsite/switch/brocade')
        }
      ]
    }
  ])


</script>
