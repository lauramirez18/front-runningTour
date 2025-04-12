<template>
  <div class="bg-fixed q-pa-lg flex flex-center form-container">
    <q-card class="q-pa-md q-mx-auto full-width card-form" style="max-width: 800px;">
      <!-- Imagen de la carrera -->
      <q-img src="/RUN-TOURRR.png" class="q-mb-md " style="border-radius: 0px; " />

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

                v-model="form.documentNumber"
                :rules="[val => !!val || 'Campo requerido']"
              />
              </div>
             
            </div>
            <div class="col-12 col-md-6 displayBlack">
              <div class="form-field">
                 <label for="nombre">Primer nombre</label>
              <q-input
                filled
                dense
                v-model="form.firstName"
                :rules="[val => !!val || 'Campo requerido']"
              />
            </div>
            <div class="col-12 col-md-6">
              <label for="">Segundo nombre</label>
              <q-input
                filled
                v-model="form.lastName"
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
                v-model="form.phone"
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
            <div class="col-12 col-md-6 displayBlack">
              <div class="form-field">
                <label for="contactoEmergencia">Nombre del contacto de emergencia</label>
              <q-input
                filled
                dense
                v-model="form.emergencyContactName"
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
                v-model="form.emergencyContactPhone"
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
                v-model="form.healthEntity"
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
                v-model="form.bloodType"
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
                label="Distancia"
                v-model="form.distance"
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
                v-model="form.gender"

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
                v-model="form.birthDate"
                :rules="[val => !!val || 'Campo requerido']"
              />
            </div>
            </div>
            <div class="col-12 col-md-6 displayBlack">
              <div class="form-field">
                 <label for="edad">Edad <span class="text-negative">*</span></label>
              <q-input
                filled
                dense
                type="number"
                v-model="form.age"
                :rules="[val => !!val || 'Campo requerido']"
              />
            </div>
            </div>
            <div class="col-12 col-md-6 displayBlack">
              <div class="form-field">
                 <label for="talla">Talla de camiseta</label>
              <q-select
                filled
                dense
                v-model="form.shirtSize"

                :options="['XS', 'S', 'M', 'L', 'XL', 'XXL']"
                :rules="[val => !!val || 'Campo requerido']"
              />
            </div>
            </div>
            <div class="col-12 col-md-6 displayBlack">
              <div class="form-field">
                 <label for="categoria">Categoría  <span class="text-negative">*</span></label>
              <q-select
                filled
                dense
                v-model="form.category"
                :options="['Juvenil', 'Élite', 'Master', 'Senior']"
                :rules="[val => !!val || 'Campo requerido']"
              />
            </div>
            </div>
          </div>
        </div>

        <div class="col-12 col-md-6">
              <q-btn
                filled
                :loading="loading2"
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
          <q-btn label="Inscribirme" :loading="loading" color="green" type="submit" />
        </div>
      </q-form>
    </q-card>
  </div>
</template>

<script setup>
import { ref, toRaw } from 'vue'
import { postData } from '../services/apiClient.js'
import { Notify } from 'quasar'
const formRef = ref();
const form = ref({});
const fileInput = ref(null);
const loading = ref(false);
const loading2 = ref(false);

 function OpenSearch(){
  fileInput.value.click()
  loading2.value= true;
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
 finally{
  loading2.value= false
 }

}


const onSubmit =async () => {
  try {
    loading.value = true
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
  finally{
    loading.value = false
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

*{
  font-family: "Montserrat", sans-serif;
}
.form-container {
  position: relative;
  min-height: 100vh;

  background-size: cover;
  background-position: center;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 20px 20px;
  margin: 0;



  
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

form label{
  
  font-size: 15px;
  font-weight: 400;
  color: rgb(103, 117, 124);
  display: block;
  
}


</style>
