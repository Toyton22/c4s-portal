import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import TopPage from "@/pages/index.vue"

createApp(App).use(router).mount('#app')

export default new router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'TopPage',
      title: "トップ",
      component: TopPage
    }
  ]
})