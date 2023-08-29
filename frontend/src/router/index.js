import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAccountStore } from '../stores/account'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: false }
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignupView.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/feed',
      name: 'feed',
      component: () => import('../views/FeedView.vue'),
      // beforeEnter: (to, from, next) => {
      //   const accountStore = useAccountStore()
      //   console.log(accountStore.user)
      //   if (to.meta.requiresAuth && !accountStore.user) return { name: 'home' }
      // },
      meta: { requiresAuth: true }
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue'),
      // beforeEnter: (to, from, next) => {
      //   const accountStore = useAccountStore()
      //   if (to.meta.requiresAuth && !accountStore.user) return '/'
      //   return next()
      // },
      meta: { requiresAuth: true }
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   const isAuthenticated = !!useAccountStore().user
//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     if (!isAuthenticated) {
//       next({ name: 'home' })
//     } else {
//       if (to.name !== 'feed' && to.name !== 'profile') {
//         next({ name: 'feed' })
//       } else {
//         next()
//       }
//     }
//   } else {
//     next()
//   }
// })

export default router
