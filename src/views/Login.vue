<template>
    <q-page class="flex flex-center bg-grey-2">
      <q-card class="q-pa-lg shadow-2 rounded-borders" style="width: 100%; max-width: 400px;">
        <!-- Encabezado -->
        <div class="bg-green-700 text-white text-h5 text-center q-pa-sm">
          REPFORA
        </div>
  
        <div class="q-mt-md text-center">
          <q-img src="https://www.sena.edu.co/SiteAssets/logoSena.png" contain style="max-width: 100px;" />
          <div class="text-h6 q-mt-sm">LOGIN</div>
        </div>
  
        <!-- Formulario -->
        <q-form class="q-gutter-md q-mt-md">
          <q-select
            v-model="form.rol"
            :options="roles"
            label="Rol"
            dense outlined
            color="green"
          />
  
          <q-input
            v-model="form.usuario"
            label="Usuario"
            outlined
            dense
          />
  
          <q-input
            v-model="form.contrasena"
            label="Contraseña"
            type="password"
            outlined
            dense
          >
            <template v-slot:append>
              <q-icon :name="showPassword ? 'visibility' : 'visibility_off'" @click="showPassword = !showPassword" class="cursor-pointer" />
            </template>
          </q-input>
  
          <q-btn
            label="INICIAR SESIÓN"
            color="green"
            class="full-width"
            unelevated
          />
  
          <div class="text-center">
            <q-btn flat label="Olvidé mi contraseña" color="green" size="sm" />
          </div>
        </q-form>
      </q-card>
    </q-page>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const form = ref({
    rol: 'ADMINISTRADOR',
    usuario: '',
    contrasena: ''
  })
  
  const roles = ['ADMINISTRADOR', 'USUARIO', 'INVITADO']
  const showPassword = ref(false)
  </script>
  