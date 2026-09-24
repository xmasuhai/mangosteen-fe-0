import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/assets/styles/main.scss'
import router from '@/router'
import {App} from '@/App.tsx'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
