import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/marketplace',
      name: 'marketplace',
      component: () => import('../views/MarketplaceView.vue'),
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import('../views/ChatView.vue'),
    },
    {
      path: '/notifications',
      name: 'notifications',
      component: () => import('../views/NotificationsView.vue'),
    },
    {
      path: '/friends',
      name: 'friends',
      component: () => import('../views/FriendsView.vue'),
    },
    {
      path: '/provider/:id',
      name: 'provider-profile',
      component: () => import('../views/ProviderProfileView.vue'),
    },
    {
      path: '/provider/:id/book',
      name: 'order-confirmation',
      component: () => import('../views/OrderConfirmationView.vue'),
    },
    {
      path: '/provider/:id/track',
      name: 'order-tracking',
      component: () => import('../views/OrderTrackingView.vue'),
    },
    {
      path: '/provider/:id/review',
      name: 'order-review',
      component: () => import('../views/ReviewView.vue'),
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/auth/SignUpView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/LoginView.vue'),
    },
    {
      path: '/onboarding',
      component: () => import('../views/onboarding/OnboardingLayout.vue'),
      redirect: '/onboarding/step-1',
      children: [
        {
          path: 'step-1',
          name: 'onboarding-source',
          component: () => import('../views/onboarding/Step1Source.vue'),
        },
        {
          path: 'step-2',
          name: 'onboarding-categories',
          component: () => import('../views/onboarding/Step2Categories.vue'),
        },
        {
          path: 'step-3',
          name: 'onboarding-services',
          component: () => import('../views/onboarding/Step3Services.vue'),
        },
        {
          path: 'step-4',
          name: 'onboarding-invite',
          component: () => import('../views/onboarding/Step4Invite.vue'),
        },
      ],
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

// Navigation guard to keep store state in sync with router path if user navigates manually
router.beforeEach((to) => {
  if (to.path.startsWith('/onboarding/step-')) {
    const stepMatch = to.path.match(/\/onboarding\/step-(\d+)/)
    if (stepMatch && stepMatch[1]) {
      const step = parseInt(stepMatch[1], 10)
      // Dynamic import to avoid circular dependency
      import('@/stores/onboarding').then(({ useOnboardingStore }) => {
        const store = useOnboardingStore()
        store.setStep(step)
      })
    }
  }
})

export default router
