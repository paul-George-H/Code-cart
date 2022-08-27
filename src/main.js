import { createApp } from 'vue'
import App from './App.vue'

import './index.css'
import './assets/css/bootstrap.css'
// 导入 axios
import axios from 'axios'

const app = createApp(App)
// 配置请求的根路径
axios.defaults.baseURL = 'https://www.escook.cn'
// 将 axios 挂载为全局的 $http 自定义属性
app.config.globalProperties.$http = axios

app.mount('#app')
