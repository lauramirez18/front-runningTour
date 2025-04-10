import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { Quasar } from 'quasar'
import {router} from './router/routes.js'
import 'quasar/src/css/index.sass'
import '@quasar/extras/material-icons/material-icons.css'

const app = createApp(App)
app.use(Quasar, {
    plugins: {}, 
  })

app.use(router)
app.mount('#app')
