import { createRouter, createWebHistory } from 'vue-router'
import  MainLayout from '../layouts/MainLayout.vue'
import Approved from '../views/Approved.vue'
import Pendent from '../views/Pendent.vue'
import Disapproved from '../views/Disapproved.vue'
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
                path:'/approved',
                name: 'Approved',
                component: Approved,
            },
            {
                path:'/pendent',
                name: 'Pendent',
                component: Pendent,
            },
            {
                path:'/disapproved',
                name: 'Disapproved',
                component: Disapproved,
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
   