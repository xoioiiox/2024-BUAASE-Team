import { createApp } from 'vue'
import { createPinia } from 'pinia'

import ElementPlus from 'element-plus' //全局引入
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

axios.defaults.baseURL = 'http://60.205.14.77:8998/';

app.use(VueAxios,axios);
app.use(createPinia())
app.use(router)
app.use(ElementPlus)

app.mount('#app')
