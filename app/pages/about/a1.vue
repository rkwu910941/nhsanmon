<script setup lang="ts">
type Todo = {
  id: number
  title: string
  completed: boolean
  createdAt: string
  updatedAt: string
}

const title = ref('')
const editingId = ref<number | null>(null)
const editingTitle = ref('')
const saving = ref(false)

const {
  data: todos,
  pending,
  refresh
} = await useFetch<Todo[]>('/api/todos')

async function addTodo() {
  const value = title.value.trim()

  if (!value) {
    return
  }

  saving.value = true

  try {
    await $fetch('/api/todos', {
      method: 'POST',
      body: {
        title: value
      }
    })

    title.value = ''
    await refresh()
  } finally {
    saving.value = false
  }
}

async function toggleTodo(todo: Todo) {
  await $fetch(`/api/todos/${todo.id}`, {
    method: 'PATCH',
    body: {
      completed: !todo.completed
    }
  })

  await refresh()
}

function startEdit(todo: Todo) {
  editingId.value = todo.id
  editingTitle.value = todo.title
}

function cancelEdit() {
  editingId.value = null
  editingTitle.value = ''
}

async function saveEdit(id: number) {
  const value = editingTitle.value.trim()

  if (!value) {
    return
  }

  await $fetch(`/api/todos/${id}`, {
    method: 'PATCH',
    body: {
      title: value
    }
  })

  cancelEdit()
  await refresh()
}

async function deleteTodo(id: number) {
  await $fetch(`/api/todos/${id}`, {
    method: 'DELETE'
  })

  await refresh()
}
</script>

<template>
  <UContainer class="py-10">
    <div class="mx-auto max-w-2xl space-y-6">
      <header>
        <h1 class="text-3xl font-bold">
          Todo List
        </h1>

        <p class="text-muted">
          NuxtHub + Drizzle CRUD 範例
        </p>
      </header>

      <UCard>
        <form
          class="flex gap-2"
          @submit.prevent="addTodo"
        >
          <UInput
            v-model="title"
            class="flex-1"
            placeholder="輸入待辦事項"
            icon="i-lucide-list-todo"
          />

          <UButton
            type="submit"
            label="新增"
            icon="i-lucide-plus"
            :loading="saving"
          />
        </form>
      </UCard>

      <UCard>
        <div
          v-if="pending"
          class="py-6 text-center text-muted"
        >
          載入中...
        </div>

        <div
          v-else-if="!todos?.length"
          class="py-6 text-center text-muted"
        >
          目前沒有 Todo
        </div>

        <div
          v-else
          class="divide-y divide-default"
        >
          <div
            v-for="todo in todos"
            :key="todo.id"
            class="flex items-center gap-3 py-3"
          >
            <UCheckbox
              :model-value="todo.completed"
              @update:model-value="toggleTodo(todo)"
            />

            <div class="min-w-0 flex-1">
              <template v-if="editingId === todo.id">
                <form
                  class="flex gap-2"
                  @submit.prevent="saveEdit(todo.id)"
                >
                  <UInput
                    v-model="editingTitle"
                    class="flex-1"
                    autofocus
                  />

                  <UButton
                    type="submit"
                    color="success"
                    variant="soft"
                    icon="i-lucide-check"
                  />

                  <UButton
                    type="button"
                    color="neutral"
                    variant="ghost"
                    icon="i-lucide-x"
                    @click="cancelEdit"
                  />
                </form>
              </template>

              <template v-else>
                <p
                  class="truncate"
                  :class="{
                    'text-muted line-through': todo.completed
                  }"
                >
                  {{ todo.title }}
                </p>
              </template>
            </div>

            <template v-if="editingId !== todo.id">
              <UButton
                color="neutral"
                variant="ghost"
                icon="i-lucide-pencil"
                aria-label="編輯"
                @click="startEdit(todo)"
              />

              <UButton
                color="error"
                variant="ghost"
                icon="i-lucide-trash-2"
                aria-label="刪除"
                @click="deleteTodo(todo.id)"
              />
            </template>
          </div>
        </div>
      </UCard>
    </div>
  </UContainer>
</template>