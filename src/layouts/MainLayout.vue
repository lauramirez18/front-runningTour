
<template>
  <q-layout view="hHh lpR fff">

    <q-header elevated class="bg-dark text-white" height-hint="98" v-show="$route.path !== '/' && $route.path !== '/' && $route.path !== '/login' && $route.path !== '/form'">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="/logo.jpg">
          </q-avatar>
          <span class="text-h5 text-weight-bold">JIRETH SPORT</span>
        </q-toolbar-title>
      </q-toolbar>

    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-black-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          
          <div>Title</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>