import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from '@/router'
import { App } from '@/App.tsx'
import '@/assets/styles/main.scss'
import 'uno.css'
// import 'virtual:uno.css'
// @ts-ignore
// import '@svgoStore'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
