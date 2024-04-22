import { createApp } from 'vue'
import { createPinia } from 'pinia'
//引入elementplus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(createPinia())
app.use(router)
//使用element-plus
app.use(ElementPlus)

app.mount('#app')



