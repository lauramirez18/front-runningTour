import { createRouter, createWebHistory } from 'vue-router'
import  MainLayout from '../layouts/MainLayout.vue'
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Login.vue'
import Form from '../views/Form.vue'

const routes = [
    {
        path: '/login',
        name: 'Login',
        component:Login,
    },
    {
        path: '',
        component: MainLayout,
        children:[
            {
                path: '',
                name: 'form',
                component: Form
              },
            {
                path:'/dashboard',
                name: 'Dashboard',
                component: Dashboard,
            },
            
            {
                path:'/form',
                name: 'Form',
                component: Form,
            },
        ]               

    },
    
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})
   