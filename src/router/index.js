import { createRouter, createWebHistory } from 'vue-router'
import TopPage from '@/pages/index.vue'
import EventPage from '@/pages/events.vue'
import ArticlePage from '@/pages/article.vue'
import EquipsPage from '@/pages/equips.vue'
import MyPage from '@/pages/mypage.vue'
import AdminPage from '@/pages/admin.vue'

const routes = [
  {
    path: '/',
    name: 'TopPage',
    component: TopPage
  },
  {
    path: '/events',
    name: 'EventPage',
    component: EventPage
  },
  {
    path: '/members',
    name: 'ArticlePage',
    component: ArticlePage
  },
  {
    path: '/equips',
    name: 'EquipsPage',
    component: EquipsPage
  },
  {
    path: '/mypage',
    name: 'MyPage',
    component: MyPage
  },
  {
    path: '/admin',
    name: 'AdminPage',
    component: AdminPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
