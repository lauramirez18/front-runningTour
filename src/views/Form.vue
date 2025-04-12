<template>
  <div class="bg-fixed q-pa-lg flex flex-center form-container">
    <q-card class="q-pa-md q-mx-auto full-width card-form" style="max-width: 800px;">
      <q-img src="/RUN-TOUR.png" class="q-mb-md" />

      <!-- QForm para validación -->
      <q-form @submit="onSubmit" @reset="onReset" ref="formRef">

        <!-- Sección 1: Datos del participante -->
        <div>
          <h4 class="text-bold q-mb-md text-h5">DATOS DEL PARTICIPANTE</h4>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6 displayBlack ">
              <div class="form-field">
                 <label for="documento">Número de documento</label>
              <q-input
                filled
                dense
                v-model="form.documento"
                :rules="[val => !!val || 'Campo requerido']"
              />
              </div>
             
            </div>
            <div class="col-12 col-md-6 displayBlack">
              <div class="form-field">
                 <label for="nombre">Nombres completos</label>
              <q-input
                filled
                dense
                v-model="form.nombre"
                :rules="[val => !!val || 'Campo requerido']"
              />
            </div>
            </div>
            <div class="col-12 col-md-6 displayBlack">
              <div class="form-field">
                 <label for="telefono">Teléfono</label>
              <q-input
                filled
                dense
                v-model="form.telefono"
                :rules="[val => !!val || 'Campo requerido']"
              />
              </div>
            </div>
            <div class="col-12 col-md-6 displayBlack">
              <div class="form-field">
                 <label for="email">Correo electrónico</label>
              <q-input
                filled
                dense
                v-model="form.email"
                :rules="[
                  val => !!val || 'Campo requerido',
                  val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'Correo no válido'
                ]"
              />
            </div>
            </div>
            <div class="col-12">
              <q-toggle v-model="form.resideColombia" label="¿Reside en Colombia?" color="primary" />
            </div>
            <div class="col-12 col-md-6 displayBlack">
              <div class="form-field">
                 <label for="direccion">Dirección</label>
              <q-input filled dense v-model="form.direccion" />
            </div>
            </div>
            <div class="col-12 col-md-6 displayBlack">
              <div class="form-field">
                 <label for="grupo">Grupo / Empresa / Institución</label>
              <q-input filled dense v-model="form.grupo" />
            </div>
          </div>
          </div>
        </div>

        <!-- Sección 2: Datos de emergencia -->
        <div class="q-mt-xl">
          <h4 class="text-bold q-mb-md text-h5">DATOS DE EMERGENCIA</h4>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6 displayBlack">
              <div class="form-field">
                 <label for="contactoEmergencia">Nombre del contacto de emergencia</label>
              <q-input
                filled
                dense
                v-model="form.contactoEmergencia"
                :rules="[val => !!val || 'Campo requerido']"
              />
            </div>
            </div>
            <div class="col-12 col-md-6 displayBlack">
              <div class="form-field">
                 <label for="telefonoEmergencia">Teléfono del contacto de emergencia</label>
              <q-input
                filled
                dense
                v-model="form.telefonoEmergencia"
                :rules="[val => !!val || 'Campo requerido']"
              />
            </div>
            </div>
            <div class="col-12 col-md-6 displayBlack">
              <div class="form-field">
                 <label for="eps">EPS a la que pertenece</label>
              <q-input
                filled
                dense
                v-model="form.eps"
              />
            </div>
            </div>
          </div>
        </div>

        <!-- Sección 3: Datos de la carrera -->
        <div class="q-mt-xl">
          <h4 class="text-bold q-mb-md text-h5">DATOS DE LA CARRERA</h4>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6 displayBlack">
              <div class="form-field">
                 <label for="sangre">Tipo de sangre</label>
              <q-select
                filled
                dense
                v-model="form.sangre"
                :options="['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-']"
                :rules="[val => !!val || 'Campo requerido']"
              />
            </div>
            </div>
            <div class="col-12 col-md-6 displayBlack">
              <div class="form-field">
                 <label for="distancia">Distancia</label>
              <q-select
                filled
                dense
                v-model="form.distancia"
                :options="['5K', '10K', '21K']"
                :rules="[val => !!val || 'Campo requerido']"
              />
            </div>
            </div>
            <div class="col-12 col-md-6 displayBlack">
              <div class="form-field">
                 <label for="genero">Género</label>
              <q-select
                filled
                dense
                v-model="form.genero"
                :options="['Femenino', 'Masculino', 'Otro']"
                :rules="[val => !!val || 'Campo requerido']"
              />
              </div>
            </div>
            <div class="col-12 col-md-6 displayBlack">
              <div class="form-field">
                 <label for="fechaNacimiento">Fecha de nacimiento</label>
              <q-input
                filled
                dense
                type="date"
                v-model="form.fechaNacimiento"
                :rules="[val => !!val || 'Campo requerido']"
              />
            </div>
            </div>
            <div class="col-12 col-md-6">
              <q-input
                filled
                label="Edad"
                type="number"
                v-model="form.edad"
                :rules="[val => !!val || 'Campo requerido']"
              />
            </div>
            <div class="col-12 col-md-6 displayBlack">
              <div class="form-field">
                 <label for="talla">Talla de camiseta</label>
              <q-select
                filled
                dense
                v-model="form.talla"
                :options="['XS', 'S', 'M', 'L', 'XL', 'XXL']"
                :rules="[val => !!val || 'Campo requerido']"
              />
            </div>
            </div>
            <div class="col-12 col-md-6 displayBlack">
              <div class="form-field">
                 <label for="categoria">Categoría</label>
              <q-select
                filled
                dense
                v-model="form.categoria"
                :options="['Juvenil', 'Élite', 'Master', 'Senior']"
                :rules="[val => !!val || 'Campo requerido']"
              />
            </div>
            </div>
          </div>
        </div>

        <!-- Botones -->
        <div class="row justify-end q-mt-xl">
          <q-btn label="Cancelar" flat class="q-mr-sm" color="grey" type="reset" />
          <q-btn label="Inscribirme" color="green" type="submit" />
        </div>
      </q-form>
    </q-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const formRef = ref()

const form = ref({
  documento: '',
  nombre: '',
  telefono: '',
  email: '',
  resideColombia: true,
  direccion: '',
  grupo: '',
  contactoEmergencia: '',
  telefonoEmergencia: '',
  eps: '',
  sangre: '',
  distancia: '',
  genero: '',
  fechaNacimiento: '',
  edad: '',
  talla: '',
  categoria: ''
})

const onSubmit = () => {
  formRef.value.validate().then(success => {
    if (success) {
      console.log('Formulario válido:', form.value)
      // Aquí podrías enviar los datos a una API o backend
    } else {
      console.log('Hay errores en el formulario')
    }
  })
}

const onReset = () => {
  formRef.value.resetValidation()
  Object.keys(form.value).forEach(key => {
    if (typeof form.value[key] === 'boolean') {
      form.value[key] = true
    } else {
      form.value[key] = ''
    }
  })
}
</script>

<style scoped>

*{
  font-family: "Montserrat", sans-serif;
}
.form-container {
  position: relative;
  min-height: 100vh;
  background-image: url("/fondooo.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  background-attachment: fixed;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;



  
}
.card-form {
  background-color: white;
  border-radius: 10px;
  position: relative;
  z-index: 1;
}

.displayBlack{
   display: block;
}


h4 {
  background-image: url("/banner.png");
  background-repeat: no-repeat;
  background-size: cover;
  color: #fffdfd;
  padding: 10px;
}

form label{
  
  font-size: 15px;
  font-weight: 400;
  color: rgb(103, 117, 124);
  
}
</style>
