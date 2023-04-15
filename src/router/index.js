import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../components/Admin/Dashboard/Dashboard.vue'
import UserIndex from '../components/Admin/Users/UserIndex.vue'
import ClientIndex from '../components/Admin/Clients/ClientIndex.vue'
import MembershipIndex from '../components/Admin/Memberships/MembershipIndex.vue'
import InstructorIndex from '../components/Admin/Instructors/InstructorIndex.vue'
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: '/admin',
  linkActiveClass: "active-link",
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        name: 'Dashboard'
      }
    },
    {
      path: '/users',
      name: 'users',
      component: UserIndex,
      meta: {
        name: 'Usuarios'
      }
    },
    {
      path: '/clients',
      name: 'clients',
      component: ClientIndex,
      meta: {
        name: 'Clientes'
      }
    },
    {
      path: '/memberhsips',
      name: 'memberships',
      component: MembershipIndex,
      meta: {
        name: 'Membresías'
      }
    },
    {
      path: '/instructors',
      name: 'instructors',
      component: InstructorIndex,
      meta: {
        name: 'Instructores'
      }
    },
  ]
})

export default router
