Gmail	rk wu <rkwu910941@gmail.com>
jjj
吳榮鯤 <910941@taishinbank.com.tw>	2026年8月12日 上午11:50
收件者: "rkwu910941@gmail.com" <rkwu910941@gmail.com>
「完整可跑的 會員登入 範例」

2026-08-12 11:28:24

AI

可以，這次我建議您用「Nuxt 4 + Nuxt UI + NuxtHub + nuxt-auth-utils」來做會員登入範例。

原因是：

1.   Nuxt 官方文件有提供以 nuxt-auth-utils 實作 session / authentication 的做法

2.   它使用加密 cookie 保存 session，不一定要先做完整資料庫 session table

3.   很適合先做「可跑的登入 / 登出 / 保護頁面」最小版本

另外，nuxt-auth-utils 官方也明確說明：

·         可用 npx nuxi module add auth-utils 安裝

·         需要 NUXT_SESSION_PASSWORD

·         前端可用 useUserSession()

·         伺服器端可用 setUserSession()、受保護路由可用 requireUserSession()

下面我直接給您「完整可跑的會員登入範例」。 這個版本包含：

功能

說明

登入頁

輸入 email / password

Session

使用 cookie session

會員資訊頁

顯示目前登入者

登出

清除 session

API 保護

未登入不可存取會員資料 API

UI

使用 Nuxt UI 元件

NuxtHub

保留模組整合，可做後續擴充

以下提供完整文字內容，您可自行複製使用。

如您希望調整報告格式、簡報大綱、表格架構或其他需求，我也可以協助優化。

==================== 一、安裝套件

建立專案後，安裝需要的模組：

bash複製

npm create nuxt@latest my-member-app

cd my-member-app

 

npm install @nuxt/ui zod

npx nuxi module add hub

npx nuxi module add auth-utils

依 Nuxt 官方 recipe 與模組文件，auth-utils 是推薦的 session 驗證方式之一。

==================== 二、專案結構

bash複製

my-member-app/

├─ app/

│  ├─ app.vue

│  ├─ middleware/

│  │  └─ auth.ts

│  └─ pages/

│     ├─ index.vue

│     ├─ login.vue

│     └─ profile.vue

├─ server/

│  └─ api/

│     ├─ login.post.ts

│     ├─ logout.post.ts

│     └─ me.get.ts

├─ assets/

│  └─ css/

│     └─ main.css

├─ .env

├─ nuxt.config.ts

└─ package.json

==================== 三、nuxt.config.ts

ts複製

export default defineNuxtConfig({

  modules: [

    '@nuxt/ui',

    '@nuxthub/core',

    'nuxt-auth-utils'

  ],

 

  css: ['~/assets/css/main.css'],

 

  devtools: {

    enabled: true

  },

 

  compatibilityDate: '2026-01-01'

})

==================== 四、.env

nuxt-auth-utils 需要 session password，而且官方要求至少 32 個字元。

env複製

NUXT_SESSION_PASSWORD=your-super-secret-password-with-32-chars-min

例如：

env複製

NUXT_SESSION_PASSWORD=this-is-a-demo-secret-password-123456

==================== 五、assets/css/main.css

css複製

body {

  background: #f9fafb;

}

==================== 六、app/app.vue

vue複製

<template>

  <UApp>

    <NuxtPage />

  </UApp>

</template>

==================== 七、登入 API server/api/login.post.ts

這裡先用「寫死帳號密碼」做最小可跑版本。 這種方式很適合先確認流程可正常運作。

Nuxt 官方 recipe 也是以 /api/login + setUserSession() 示範登入流程。

ts複製

import { z } from 'zod'

 

const bodySchema = z.object({

  email: z.string().email(),

  password: z.string().min(8)

})

 

export default defineEventHandler(async (event) => {

  const { email, password } = await readValidatedBody(event, bodySchema.parse)

 

  if (email === 'admin@admin.com' && password === 'iamtheadmin') {

    await setUserSession(event, {

      user: {

        id: 1,

        name: 'Demo Admin',

        email: 'admin@admin.com',

        role: 'admin'

      }

    })

 

    return {

      success: true

    }

  }

 

  throw createError({

    statusCode: 401,

    statusMessage: '帳號或密碼錯誤'

  })

})

測試帳號：

欄位

值

Email

admin@admin.com

Password

iamtheadmin

==================== 八、登出 API server/api/logout.post.ts

ts複製

export default defineEventHandler(async (event) => {

  await clearUserSession(event)

 

  return {

    success: true

  }

})

==================== 九、取得目前會員資料 API server/api/me.get.ts

官方文件提到可用 requireUserSession() 來保護 API，確保使用者必須已登入。

ts複製

export default defineEventHandler(async (event) => {

  const session = await requireUserSession(event)

 

  return {

    loggedIn: true,

    user: session.user

  }

})

==================== 十、登入頁 app/pages/login.vue

這頁包含：

1.   帳號密碼輸入

2.   登入送出

3.   成功後跳轉

4.   失敗顯示錯誤

vue複製

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

    await navigateTo('/profile')

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

    await navigateTo('/profile')

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

  <div class="min-h-screen flex items-center justify-center p-6">

    <div class="w-full max-w-md">

      <UCard>

        <template #header>

          <div class="text-center">

            <h1 class="text-2xl font-bold">會員登入</h1>

            <p class="text-sm text-gray-500 mt-1">

              Nuxt 4 + Nuxt UI + NuxtHub + Auth Utils

            </p>

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

 

          <div class="rounded-lg bg-gray-50 p-3 text-sm text-gray-600">

            <p class="font-medium mb-1">測試帳號</p>

            <p>Email: admin@admin.com</p>

            <p>Password: iamtheadmin</p>

          </div>

        </div>

      </UCard>

    </div>

  </div>

</template>

==================== 十一、首頁 app/pages/index.vue

這頁做簡單入口與導頁。

vue複製

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

==================== 十二、會員中心頁 app/pages/profile.vue

這頁會呼叫受保護 API /api/me。 如果沒登入，會被 middleware 導去登入頁。

vue複製

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

==================== 十三、登入保護 middleware app/middleware/auth.ts

使用 useUserSession() 檢查登入狀態。 若未登入，導回 /login。

ts複製

export default defineNuxtRouteMiddleware(async () => {

  const { loggedIn, fetch } = useUserSession()

 

  if (!loggedIn.value) {

    await fetch()

  }

 

  if (!loggedIn.value) {

    return navigateTo('/login')

  }

})

==================== 十四、package.json 參考

版本請以您實際安裝到的版本為準，這裡是示意：

json複製

{

  "name": "my-member-app",

  "private": true,

  "type": "module",

  "scripts": {

    "dev": "nuxt dev",

    "build": "nuxt build",

    "preview": "nuxt preview"

  },

  "dependencies": {

    "@nuxt/ui": "^4.0.0",

    "@nuxthub/core": "^0.10.0",

    "nuxt": "^4.0.0",

    "nuxt-auth-utils": "^0.5.30",

    "zod": "^4.0.0"

  }

}

==================== 十五、執行方式

bash複製

npm install

npm run dev

執行後操作流程：

步驟

操作

1

先開啟 /login

2

輸入測試帳號密碼

3

登入成功後跳到 /profile

4

可看到會員資料

5

點擊登出後回到登入頁

==================== 十六、這個版本的重點

項目

說明

驗證方式

Cookie session

Session 儲存

nuxt-auth-utils 封裝

前端 session 狀態

useUserSession()

設定登入 session

setUserSession()

受保護 API

requireUserSession()

適用場景

內部系統、Demo、會員中心 PoC

==================== 十七、如果您想做成「真的會員系統」

目前這版是「固定帳密示範」。 如果要變成正式版，下一步通常會做這些：

功能

作法

會員註冊

建立 users table

密碼雜湊

使用 hash，不可存明碼

會員登入

由 DB 查 email，驗證 password hash

權限控管

user / admin role

忘記密碼

email token 流程

登入紀錄

紀錄 IP、時間、裝置

多角色頁面

middleware 判斷 role

==================== 十八、我建議的下一版

如果您要更接近實務，我下一則可以直接幫您補成：

版本

內容

DB 會員版

使用 NuxtHub Database 儲存 users

註冊 + 登入版

login / register / logout 全流程

後台會員管理版

會員列表、角色欄位、停權狀態

RBAC 版

admin / user 權限分流

企業內部登入版

員編、部門、角色欄位

如果您要，我下一則可以直接產出： 「Nuxt 4 + Nuxt UI + NuxtHub + Database 的 會員註冊 / 登入 完整範例」

也就是：

1.   users 資料表

2.   註冊 API

3.   登入 API

4.   密碼雜湊

5.   會員中心

6.   登出

7.   路由保護

如果您願意，我可以直接接著貼「含資料庫的正式版會員登入範例」。

2026-08-12 11:29:30

 

 

 

我要刷台新
不管刷什麼，刷台新，聰明!

 

吳榮鯤

台新國際商業銀行 資訊服務處

系統支援部 系統管理二組

 TEL : (02)87989999 EXT : 6220 

台北市內湖區舊宗路二段207號6樓

 

本郵件及附件未經台新新光金控同意，台端不得就其內容為複製、重製、轉載或公開散佈等，亦不得任意洩露予他人；若台端並非受文之當事人，除應立即聯繫發信人或承辦人知悉外，並請將該等文件自台端的電腦系統中予以刪除，否則如有前述重製或洩漏等情事，台端並須負所有民刑事法律責任。謝謝您的協助!
Unless otherwise agreed by TS Financial Holding Co., Ltd., the content of this mail or any information hereof should not be in any form used, copied, remade, downloaded, publicized or disclosed to others. In the event that you are not the addressee, please advise the sender or related personnel and delete this mail or any other backup in your computer system.  We hereby advise you that any unauthorised action mentioned above may result in civil or criminal liability.  Thank you for your kind cooperation.

