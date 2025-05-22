import { createRouter, createWebHistory } from 'vue-router'
import  MainLayout from '../layouts/MainLayout.vue'
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Login.vue'
import Form from '../views/Form.vue'
import ClosedForm from '../views/ClosedForm.vue'

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
                name: 'closeForm',
                component: ClosedForm,
              },
              
            {
                path:'/dashboard',
                name: 'Dashboard',
                component: Dashboard,
            },
            
           /*  {
                path:'/form',
                name: 'Form',
                component: Form,
            }, */
            
            {
                path:'/form',
                name: 'closedForm',
                component:  ClosedForm,
            }, 
        ]               

    },
    
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})