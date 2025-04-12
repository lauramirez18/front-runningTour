<template>
    <q-layout view="lhh lpR fFf">
  
      <q-header elevated class="bg-primary text-white" height-hint="98"  v-show="$route.path !== '/' && $route.path !== '/' && $route.path !== '/login' && $route.path !== '/form'">
        <q-toolbar>
          <q-toolbar-title>
            <q-avatar>
              <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
            </q-avatar>
            Title
          </q-toolbar-title>
          <q-space/>
          <q-btn icon="logout" @click="CerrarSesion()">Cerrar Sesion</q-btn>
        </q-toolbar>
  
        <q-tabs align="left">
          <q-route-tab to="/Approved" label="aprobados" />
          <q-route-tab to="/Pendent" label="pendientes" />
          <q-route-tab to="/Disapproved" label="desaprobados" />
        </q-tabs>
      </q-header>
  
      <q-page-container>
        <router-view />
      </q-page-container>
  
      <q-footer bordered class="bg-black-8 text-white">
        <q-toolbar>
         
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