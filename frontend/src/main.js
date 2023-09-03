import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useAccountStore } from './stores/account'

const app = createApp(App)

app.use(createPinia())

const accountStore = useAccountStore()
await accountStore.fetchUser()

app.use(router)


app.mount('#app')
