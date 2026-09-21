import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// import App from './App.vue'
import router from './router'
import {AppTsxDemo} from '@/AppTsxDemo.tsx'

const app = createApp(AppTsxDemo)

app.use(createPinia())
app.use(router)

app.mount('#app')
