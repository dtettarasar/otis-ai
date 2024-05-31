import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import AllUserArticlesView from '@/views/AllUserArticlesView.vue'
import ArticleView from '@/views/ArticleView.vue'
import CreateArticleView from '@/views/CreateArticleView.vue'
import EditArticleView from '@/views/EditArticleView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import UserAccountView from '@/views/UserAccountView.vue'
import SuccessPaymentView from '@/views/SuccessPaymentView.vue'
import CancelPaymentView from '@/views/CancelPaymentView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/all-user-article',
      name: 'all user article',
      component: AllUserArticlesView
    },
    {
      path: '/view-article',
      name: 'view article',
      component: ArticleView
    },
    {
      path: '/create-article',
      name: 'create article',
      component: CreateArticleView
    },
    {
      path: '/edit-article',
      name: 'edit article',
      component: EditArticleView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/user-account',
      name: 'user account',
      component: UserAccountView
    },
    {
      path: '/success-payment',
      name: 'success payment',
      component : SuccessPaymentView
    },
    {
      path: '/cancel-payment',
      name: 'cancel payment',
      component: CancelPaymentView
    }
  ]
})

export default router
