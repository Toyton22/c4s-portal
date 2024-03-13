import { createRouter, createWebHistory } from 'vue-router'
import TopPage from '@/pages/index.vue'
import EventPage from '@/pages/events.vue'
import MemberPage from '@/pages/members.vue'
import EquipsPage from '@/pages/equips.vue'
import MyPage from '@/pages/mypage.vue'

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
    name: 'MemberPage',
    component: MemberPage
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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
