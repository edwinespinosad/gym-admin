import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../components/Admin/Dashboard/Dashboard.vue'
import UserIndex from '../components/Admin/Users/UserIndex.vue'
import ClientIndex from '../components/Admin/Clients/ClientIndex.vue'
import MembershipIndex from '../components/Admin/Memberships/MembershipIndex.vue'
import InstructorIndex from '../components/Admin/Instructors/InstructorIndex.vue'
import ExpensesIndex from '../components/Admin/Expenses/ExpensesIndex.vue'
import RoutinesIndex from '../components/Instructor/Routines/RoutinesIndex.vue'
import MealIndex from '../components/Instructor/Meal/MealIndex.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: '/admin',
  linkActiveClass: "active-link",
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      beforeEnter: (to, from, next) => {
        let role = localStorage.getItem('role')
        if (role === '3') {
          next({
            name: 'clients',
            replace: true
          })
        } else {
          next();
        }
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        name: 'Dashboard'
      },
      beforeEnter: (to, from, next) => {
        let role = localStorage.getItem('role')
        if (role === '3') {
          next({
            name: 'clients',
            replace: true
          })
        } else {
          next();
        }
      }
    },
    {
      path: '/users',
      name: 'users',
      component: UserIndex,
      meta: {
        name: 'Usuarios'
      },
      beforeEnter: (to, from, next) => {
        let role = localStorage.getItem('role')
        if (role === '3') {
          next({
            name: 'clients',
            replace: true
          })
        } else {
          next();
        }
      }
    },
    {
      path: '/clients',
      name: 'clients',
      component: ClientIndex,
      meta: {
        name: 'Clientes'
      },
      beforeEnter: (to, from, next) => {
        let role = localStorage.getItem('role')
        if (role === '3') {
          next({
            name: 'clients',
            replace: true
          })
        } else {
          next();
        }
      }
    },
    {
      path: '/memberhsips',
      name: 'memberships',
      component: MembershipIndex,
      meta: {
        name: 'Membresías'
      },
      beforeEnter: (to, from, next) => {
        let role = localStorage.getItem('role')
        if (role === '3') {
          next({
            name: 'clients',
            replace: true
          })
        } else {
          next();
        }
      }
    },
    {
      path: '/instructors',
      name: 'instructors',
      component: InstructorIndex,
      meta: {
        name: 'Instructores'
      },
      beforeEnter: (to, from, next) => {
        let role = localStorage.getItem('role')
        if (role === '3') {
          next({
            name: 'clients',
            replace: true
          })
        } else {
          next();
        }
      }
    },
    {
      path: '/expenses',
      name: 'expenses',
      component: ExpensesIndex,
      meta: {
        name: 'Gastos'
      },
      beforeEnter: (to, from, next) => {
        let role = localStorage.getItem('role')
        if (role === '3') {
          next({
            name: 'clients',
            replace: true
          })
        } else {
          next();
        }
      }
    },
    {
      path: '/routines',
      name: 'routines',
      component: RoutinesIndex,
      meta: {
        name: 'Rutinas'
      }
    },
    {
      path: '/meals',
      name: 'meals',
      component: MealIndex,
      meta: {
        name: 'Comidas'
      }
    },
  ]
})

export default router
