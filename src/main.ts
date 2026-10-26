import '@/polyfills/temporal.ts'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from '@/router'
import { App } from '@/App.tsx'
import '@/assets/styles/main.scss'
import '@svgoStore'
// vendors
import 'uno.css'
// import 'virtual:uno.css'
import 'vant/lib/index.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
