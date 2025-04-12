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
            <div class="col-12 col-md-6">
              <q-input
                filled
                label="Número de documento"
                v-model="form.documentNumber"
                :rules="[val => !!val || 'Campo requerido']"
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                filled
                label="Primer nombre"
                v-model="form.firstName"
                :rules="[val => !!val || 'Campo requerido']"
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                filled
                label="Segundo nombre"
                v-model="form.lastName"
                :rules="[val => !!val || 'Campo requerido']"
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                filled
                label="Teléfono"
                v-model="form.phone"
                :rules="[val => !!val || 'Campo requerido']"
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                filled
                label="Correo electrónico"
                v-model="form.email"
                :rules="[
                  val => !!val || 'Campo requerido',
                  val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'Correo no válido'
                ]"
              />
            </div>
            <div class="col-12">
              <q-toggle v-model="form.livesInColombia" label="¿Reside en Colombia?" color="green" />
            </div>
            <div class="col-12 col-md-6">
              <q-input filled label="Dirección" v-model="form.address" />
            </div>
            <div class="col-12 col-md-6">
              <q-input filled label="Grupo / Empresa / Institución" v-model="form.organization" />
            </div>
          </div>
        </div>

        <!-- Sección 2: Datos de emergencia -->
        <div class="q-mt-xl">
          <h4 class="text-bold q-mb-md text-h5">DATOS DE EMERGENCIA</h4>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <q-input
                filled
                label="Nombre del contacto de emergencia"
                v-model="form.emergencyContactName"
                :rules="[val => !!val || 'Campo requerido']"
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                filled
                label="Teléfono del contacto de emergencia"
                v-model="form.emergencyContactPhone"
                :rules="[val => !!val || 'Campo requerido']"
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                filled
                label="EPS a la que pertenece"
                v-model="form.healthEntity"
              />
            </div>
          </div>
        </div>

        <!-- Sección 3: Datos de la carrera -->
        <div class="q-mt-xl">
          <h4 class="text-bold q-mb-md text-h5">DATOS DE LA CARRERA</h4>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <q-select
                filled
                label="Tipo de sangre"
                v-model="form.bloodType"
                :options="['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-']"
                :rules="[val => !!val || 'Campo requerido']"
              />
            </div>
            <div class="col-12 col-md-6">
              <q-select
                filled
                label="Distancia"
                v-model="form.distance"
                :options="['5K', '10K', '21K']"
                :rules="[val => !!val || 'Campo requerido']"
              />
            </div>
            <div class="col-12 col-md-6">
              <q-select
                filled
                label="Género"
                v-model="form.gender"
                :options="['Femenino', 'Masculino', 'Otro']"
                :rules="[val => !!val || 'Campo requerido']"
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                filled
                label="Fecha de nacimiento"
                type="date"
                v-model="form.birthDate"
                :rules="[val => !!val || 'Campo requerido']"
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input
                filled
                label="Edad"
                type="number"
                v-model="form.age"
                :rules="[val => !!val || 'Campo requerido']"
              />
            </div>
            <div class="col-12 col-md-6">
              <q-select
                filled
                label="Talla de camiseta"
                v-model="form.shirtSize"
                :options="['XS', 'S', 'M', 'L', 'XL', 'XXL']"
                :rules="[val => !!val || 'Campo requerido']"
              />
            </div>
            <div class="col-12 col-md-6">
              <q-select
                filled
                label="Categoría"
                v-model="form.category"
                :options="['Juvenil', 'Élite', 'Master', 'Senior']"
                :rules="[val => !!val || 'Campo requerido']"
              />
            </div>
          </div>
        </div>

        <div class="col-12 col-md-6">
              <q-btn
                filled
                label="Comprobante"
                @click="OpenSearch()"
              />
              <input
                ref="fileInput"
                type="file"
                accept="image/*"
                style="display: none"
                @change="searchImage"
              />
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
import { ref, toRaw } from 'vue'
import { postData } from '../services/apiClient.js'
import { Notify } from 'quasar'
const formRef = ref()
const form = ref({})
const fileInput = ref(null)

 function OpenSearch(){
  fileInput.value.click()
}

async function searchImage (event){
 try {
  const file = event.target.files[0]
  if(file){
    const formData = new FormData()
    formData.append('image', file)
    const response = await postData("/upload/images",formData)
    form.value.proofImage = response.imageUrl
    Notify.create({
        type: 'positive',
        message: 'Imagen cargada corretamente'
      })
  }
 } catch (error) {
  Notify.create({
        type: 'negative',
        message: 'Error al carga imagen , intente nuevamente'
      })
  console.log("image load failure",error);
 }

}


const onSubmit =async () => {
  try {
    const success = await formRef.value.validate()
    if (success) {
      console.log('Formulario válido:', form.value)
      const response = await postData("/inscription",{
        data:toRaw(form.value)
      });
      Notify.create({
        type: 'positive',
        message: 'Registro exitoso'
      })
      console.log(response.data);
    }    
    else {
      throw new Error('Hay errores en el formulario')
    }  } catch (error) {
      Notify.create({
        type: 'negative',
        message: 'Registro fallido , intente nuevamente'
      })
   console.log(error); 
  }
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
h4 {
  background-image: url("/banner.png");
  background-repeat: no-repeat;
  background-size: cover;
  color: #fffdfd;
  padding: 10px;
}
</style>
