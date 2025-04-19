
<template>
  <q-layout view="hHh lpR fff">

    <q-header elevated class="bg-dark text-white" height-hint="98" v-show="$route.path !== '/' && $route.path !== '/' && $route.path !== '/login' && $route.path !== '/form'">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="/logo.jpg">
          </q-avatar>
          <strong>  JIRETH SPORT</strong>
        </q-toolbar-title>
        <q-space/>
        <q-btn icon="logout" @click="CerrarSesion()">
           <q-tooltip>Cerrar Sesion</q-tooltip>
        </q-btn>
       
      </q-toolbar>

    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-dark text-grey-9 q-pa-sm text-center text-caption">
  <q-toolbar class="q-pa-none justify-center">
    <div class="text-caption text-center">
      |Formulario Desarrollado por <strong>Andres Felipe Sierra</strong> y <strong>Laura Ramirez</strong> | © {{ new Date().getFullYear() }}
    </div>
  </q-toolbar>
</q-footer>

  </q-layout>
</template>

<script setup>
import { Notify } from 'quasar';
import { useRouter } from 'vue-router';
const router = useRouter()

function CerrarSesion() {
    localStorage.removeItem("store")
    Notify.create({
      type: 'positive',
      message: 'Cierre de sesion exitoso'
    })
    router.replace("/login")
}

</script>

