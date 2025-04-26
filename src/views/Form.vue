<template>
  <div class="bg-fixed q-pa-lg flex flex-center form-container">
    <q-card class="q-pa-md q-mx-auto full-width card-form" style="max-width: 800px;">
      <!-- Imagen de la carrera -->
      <q-img src="/banner_form.jpg" class="q-mb-md" style="border-radius: 0px;" />

      <!-- QForm para validación -->
      <q-form @submit="onSubmit" @reset="onReset" ref="formRef">

        <h4 class="text-bold q-mb-md text-h5">INFORMACIÓN INSCRIPCIÓN</h4>
        <q-card
  class=" q-mb-md col-12 q-pa-md shadow-2 " style="margin: 30px 0px ;">
  <p class="text-bold text-h6 text-center text-negative">💲Valor Inscripción💲</p>
 
  <div class="flex flex-center q-mt-md">
  <div class="row items-center q-col-gutter-md q-pa-md ">
    
    <!-- Categoria Juvenil -->
    <div class="col-xs-12 col-sm-6 row no-wrap items-center ">
      <q-img
        src="https://cdn-icons-png.freepik.com/512/3885/3885009.png?ga=GA1.1.2009471626.1731785676"
        style="width: 60px; height: 60px;"
        spinner-color="primary"
      />
      <div class="q-ml-md">
        <div class="text-subtitle2 text-bold">Categoria <span class="text-secondary"> Juvenil </span></div>
        <div class="text-caption">Femenino - Masculino  </div>
        <div class="text-caption">Valor: <strong>20.000</strong></div>
      </div>
    </div>

    <!-- Categoria Abierta -->
    <div class="col-xs-12 col-sm-6 row no-wrap items-center categoria-card">
      <q-img
        src="https://cdn-icons-png.freepik.com/512/2829/2829825.png?ga=GA1.1.2009471626.1731785676"
        style="width: 60px; height: 60px;"
        spinner-color="positive"
      />
      <div class="q-ml-md">
        <div class="text-subtitle2 text-bold">Categoria <span class="text-positive"> Abierta </span></div>
        <div class="text-caption">Femenino - Masculino </div>
        <div class="text-caption">Valor: <strong>25.000</strong></div>
      </div>
    </div>

  </div>
</div>

  <q-separator class="q-my-md" />
  <p class="text-bold text-h6 text-center text-negative" style="margin: 0;">💲Valor Camiseta💲</p>
<p class="text-center text-caption">Adicional al valor de la Inscripción</p>

<div class="flex flex-center q-mt-md">
  <div class="row items-center q-col-gutter-md q-pa-md ">
    
    <!-- Categoria Juvenil -->
    <div class="col-xs-12 col-sm-6 row no-wrap items-center ">
      <q-img
        src="https://cdn-icons-png.freepik.com/512/1445/1445116.png?ga=GA1.1.2009471626.1731785676"
        style="width: 60px; height: 60px;"
        spinner-color="primary"
      />
      <div class="q-ml-md">
        <div class="text-subtitle2 text-bold">Camiseta con Mangas</div>
        <div class="text-caption">Valor: <strong>40.000</strong></div>
      </div>
    </div>

    <!-- Categoria Abierta -->
    <div class="col-xs-12 col-sm-6 row no-wrap items-center categoria-card">
      <q-img
        src="https://cdn-icons-png.freepik.com/512/1445/1445117.png?ga=GA1.1.2009471626.1731785676"
        style="width: 60px; height: 60px;"
        spinner-color="positive"
      />
      <div class="q-ml-md">
        <div class="text-subtitle2 text-bold">Camiseta sin Mangas</div>
        <div class="text-caption">Valor: <strong>35.000</strong></div>
      </div>
    </div>

  </div>
</div>


</q-card>
        <!-- Sección 1: Datos del participante -->
        <div>
          <h4 class="text-bold q-mb-md text-h5">DATOS DEL PARTICIPANTE</h4>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6 displayBlack ">
              <div class="form-field">
                <label for="firstName">Nombres <span class="text-negative">*</span></label>
                <q-input filled dense v-model="form.firstName" :rules="[val => !!val || 'Campo requerido']" />
              </div>
              <div class="col-12 col-md-6">
                <label for="lastName">Apellidos <span class="text-negative">*</span></label>
                <q-input filled dense v-model="form.lastName" :rules="[val => !!val || 'Campo requerido']" />
              </div>
            </div>

            <div class="col-12 col-md-6 displayBlack">
              <div class="form-field">
                <label for="documento">Número de documento <span class="text-negative">*</span></label>
                <q-input filled dense v-model="form.documentNumber" :rules="[
    val => !!val || 'Campo requerido',
    val => /^[0-9]+$/.test(val) || 'Solo se permiten números',
    val => val.length >= 6 || 'Debe tener al menos 6 dígitos',
    val => val.length <= 12 || 'No debe superar los 12 dígitos'
  ]" />
              </div>
              <div class="form-field">
                <label for="phone">Teléfono <span class="text-negative">*</span></label>
                <q-input filled dense v-model="form.phone" :rules="[val => !!val || 'Campo requerido']" />
              </div>

            </div>
            <div class="col-12 col-md-6 displayBlack">
              <div class="form-field">
                <label for="email">Correo electrónico <span class="text-negative">*</span></label>
                <q-input filled dense v-model="form.email" :rules="[
                  val => !!val || 'Campo requerido',
                  val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'Correo no válido'
                ]" />
              </div>
            </div>
            <div class="col-12 col-md-6 displayBlack">
              <div class="form-field">
                <label for="organization">Grupo / Empresa / Institución al que pertenece
                   </label>

                <q-input filled label="opcional" dense v-model="form.organization" />
              </div>

            </div>

            <div class="col-12 col-md-6">
              <div class="form-field">
                <label for="address">Dirección <span class="text-negative">*</span></label>
              </div>
              <q-input filled dense v-model="form.address" />
            </div>
            <div class="col-12 col-md-6 residence">
              <label for="residence">¿Reside en Colombia? <span class="text-negative">*</span></label>
              <q-select filled dense v-model="form.livesInColombia" :options="['Si', 'No']"
                :rules="[val => !!val || 'Campo requerido']" />
             
            </div>
          </div>
        </div>
        <!-- Sección 2: Datos de emergencia -->
        <div class="q-mt-xl">
          <h4 class="text-bold q-mb-md text-h5">DATOS DE EMERGENCIA</h4>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6 displayBlack">
              <div class="form-field">
                <label for="emergencyContactName">Nombre del contacto de emergencia <span
                    class="text-negative">*</span></label>
                <q-input filled dense v-model="form.emergencyContactName"
                  :rules="[val => !!val || 'Campo requerido']" />
              </div>
            </div>
            <div class="col-12 col-md-6 displayBlack">
              <div class="form-field">
                <label for="emergencyContactPhone">Teléfono del contacto de emergencia <span
                    class="text-negative">*</span></label>
                <q-input filled dense v-model="form.emergencyContactPhone"
                  :rules="[val => !!val || 'Campo requerido']" />
              </div>
            </div>
            <div class="col-12  displayBlack">
              <div class="form-field">
                <label for="eps">EPS a la que pertenece <span class="text-negative">*</span></label>
                <q-input filled dense v-model="form.healthEntity" />
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
                <label for="sangre">Tipo de sangre <span class="text-negative">*</span></label>
                <q-select filled dense v-model="form.bloodType"
                  :options="['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-']"
                  :rules="[val => !!val || 'Campo requerido']" />
              </div>
            </div>
            <div class="col-12 col-md-6 displayBlack">
              <div class="form-field">
                <label for="distancia">Distancia</label>
                <q-select filled dense v-model="form.distance" :options="['5K']"
                  :rules="[val => !!val || 'Campo requerido']" />
              </div>
            </div>
            <div class="col-12 col-md-6 displayBlack">
              <div class="form-field">
                <label for="gender">Género <span class="text-negative">*</span></label>
                <q-select filled dense v-model="form.gender" :options="['Femenino', 'Masculino']"
                  :rules="[val => !!val || 'Campo requerido']" />
              </div>
            </div>
            <div class="col-12 col-md-6 displayBlack">
              <div class="form-field">
                <label for="birthDate">Fecha de nacimiento <span class="text-negative">*</span></label>
                <q-input filled dense v-model="form.birthDate" readonly :rules="[val => !!val || 'Campo requerido']">
                  <template #append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="form.birthDate" mask="DD-MM-YYYY" />
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </div>
            <div class="col-12 col-md-6 displayBlack">
              <div class="form-field">
                <label for="edad">Edad <span class="text-negative">*</span></label>
                <q-input filled dense type="number" v-model="form.age" :rules="[val => !!val || 'Campo requerido']" />
              </div>
            </div>
           
            <div class="col-12 col-md-6 displayBlack">
              <div class="form-field">
                <label for="categoria">Categoría <span class="text-negative">*</span></label>
                <q-select filled dense v-model="form.category" :options="['Juvenil', 'Abierta']"
                  :rules="[val => !!val || 'Campo requerido']" />
              </div>
            </div>
          </div>
        </div>

        <div class="q-mt-xl">
  <h4 class="text-bold q-mb-md text-h5">
    DATOS DE PAGO</h4>
 
  <div class="row q-col-gutter-md">
    <!-- Pregunta si quiere camiseta -->
    <div class="col-12 displayBlack">
      <div class="form-field">
        <label for="talla">¿Desea adquirir camiseta del evento? <span class="text-negative">*</span></label>
        <q-select
          filled
          dense
          v-model="form.shirt"
          :options="['Si', 'No']"
          @update:model-value="total"
          :rules="[val => !!val || 'Campo requerido']"
        />
      </div>
    </div>

    <!-- Talla de camiseta (solo si la respuesta es "Si") -->

    <div class="col-12 displayBlack"
      v-if="form.shirt === 'Si'">
      <div class="form-field">
        <label for="talla">¿Desea la camiseta con Mangas? <span class="text-negative">*</span></label>
        <q-select
          filled
          dense
          v-model="form.shirtWithSleeves"
          :options="['Si', 'No']"
          @update:model-value="total"
          :rules="[val => !!val || 'Campo requerido']"
        />
      </div>
    </div>

    <div
      class="col-12  displayBlack"
      v-if="form.shirt === 'Si'">
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
    <!-- totales -->
<q-space />
<div class="row justify-end q-mt-md q-gutter-md">
  <!-- Columna de etiquetas -->
  <div class="column items-end text-right">
    <div class="text-bold text-info">Valor Inscripción</div>
    <div class="text-bold text-info" v-show="form.shirt === 'Si'">Valor Adicional Camiseta</div>
    <div class="text-bold text-secondary text-h6">Valor Total</div>
  </div>

  <!-- Columna de separadores, opcional -->
  <div class="column items-center text-bold">
    <div>➡️</div>
    <div v-show="form.shirt === 'Si'">➡️</div>
    <div style="margin-top: 5px;">➡️</div>
  </div>

  <!-- Columna de valores -->
  <div class="column items-end text-bold ">
    <div class="text-info">{{ formatPrice(priceInscription) }}</div>
    <div class="text-info" v-show="form.shirt === 'Si'">{{ formatPrice(priceShirt) }}</div>
    <div class="text-secondary" style="margin-top:5px ;">{{ formatPrice(total) }}</div>
  </div>
</div>

  </div>
  <q-card
  class=" q-mb-md col-12 q-pa-md shadow-2 " style="margin: 30px 0px ;">
  <p class="text-bold text-h6 text-center text-negative">⚠️Importante⚠️</p>
 
  <div class="row items-center q-col-gutter-md">
    <!-- Nequi -->
    <div class="col-xs-12 col-sm-6 row items-center">
      <q-img
        src="https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/052021/nequi.jpg?czuScT8k4x122TD.nTrAG7ZQqCwQCdSW&itok=1TKWVgjS"
        style="width: 50px; height: 50px; ;"
        spinner-color="primary"
      />
      <div class="q-ml-md">
        <div class="text-subtitle2 text-bold">Pago por <span class="text-accent">Nequi </span> </div>
        <div class="text-caption">Número: <strong >3164110047</strong></div>
        <div class="text-caption">Titular: <strong>Cristian Vesga</strong></div>
      </div>
    </div>

    <!-- Daviplata -->
    <div class="col-xs-12 col-sm-6 row items-center">
      <q-img
        src="https://sunegocio.daviplata.com/sites/default/files/styles/original/public/2023-11/af2be4165905879.Y3JvcCwxNDAwLDEwOTUsMCwxNTI.png?itok=Fn_Y_HIf"
        style="width: 50px; height: 40px;"
        spinner-color="white"
      />
      <div class="q-ml-md">
        <div class="text-subtitle2 text-bold">Pago por <span class="text-negative">Daviplata</span></div>
        <div class="text-caption">Número: <strong>3164110047</strong></div>
        <div class="text-caption">Titular: <strong>Cristian Vesga</strong></div>
      </div>
    </div>
  </div>
</q-card>
</div>

<div class="col-12 col-md-6 q-mt-md">
  <div class="flex justify-center items-center gap-2">
  <q-btn
    color="dark"
    icon="cloud_upload"
    label="Subir comprobante de pago"
    @click="OpenSearch()"
    :loading="loading2"
    unelevated
    rounded
    no-caps
    class="q-px-lg"
  />
  <span 
    v-show="showSpam" 
    class="q-ml-sm text-caption"
    :class="form.image ? 'text-positive' : 'text-negative'"
    style="
      display: inline-flex;
      align-items: center;
      padding: 4px 8px;
      border-radius: 4px;
      background-color: rgba(0,0,0,0.05);
      border-left: 3px solid;
    "
    :style="{
      'border-color': form.image ? '#21BA45' : '#C10015'
    }"
  >
    <q-icon 
      :name="form.image ? 'check_circle' : 'error'" 
      size="sm" 
      class="q-mr-xs"
    />
    {{ form.image ? "Imagen cargada correctamente" : "Error al cargar imagen" }}
  </span>
</div>
  <input
    ref="fileInput"
    type="file"
    accept="image/*"
    style="display: none"
    @change="searchImage"
  />
</div>

        <!-- Boton-->
        <div class="row justify-center q-mt-xl">
  <q-btn
    label="Inscribirme"
    :loading="loading"
    color="primary"
    type="submit"
    unelevated
    no-caps
    size="lg"
    class="q-px-xl text-white text-bold"
    icon="check_circle"
  />
</div>
<!-- Footer -->
<div class="q-mt-xl q-pt-lg text-center footer-form">
  <div class="text-subtitle2">¿Tienes preguntas o necesitas ayuda?</div>
  <div class="text-caption q-mt-xs">Contáctanos por nuestras redes sociales o escríbenos directamente:</div>

  <div class="q-mt-md row justify-center q-gutter-md">
    <q-btn
      round
      flat
      icon="facebook"
      color="blue-7"
      @click="openLink('https://www.facebook.com/jireh.sangil?rdid=gfiRL00CtTelI6eX&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1AHjr6uPQS%2F#')"
    />
    <q-btn flat round @click="openLink('https://wa.me/573164110047')" color="white">
  <img src="https://pngimg.com/d/whatsapp_PNG21.png" alt="WhatsApp" style="width: 24px; height: 24px;" />
</q-btn>
<q-btn flat round @click="openLink('https://www.instagram.com/jireth_sport_365?igsh=bTU0bHMya3o4bzVz')" color="white">
  <img src="https://png.pngtree.com/png-vector/20221018/ourmid/pngtree-instagram-social-platform-icon-png-image_6315976.png" alt="Instagram" style="width: 24px; height: 24px;" />
</q-btn>
  </div>

  <div class="text-caption q-mt-md">
    También puedes escribirnos a <span class="text-primary">Jirethsport365@gmail.com</span>
  </div>
</div>
      </q-form>
    </q-card>
    <!-- Dialog de confirmación -->
<q-dialog v-model="showConfirmation">
  <q-card class="q-pa-md text-center  " style="max-width: 400px;">
    <q-card-section>
      <q-icon name="check_circle" color="green" size="56px" class="q-mb-md" />
      <div class="text-h6 text-bold">¡Inscripción completada!</div>
      <div class="text-subtitle2 q-mt-sm">
        Gracias por tu Inscripción. 
        Nos vemos en la carrera.🏃‍♀️🏃‍♂️
      </div>
      <div class="text-caption q-mt-sm text-grey-9">
        Tu comprobante será revisado en un plazo de 2 a 3 días hábiles.<br>
        Te notificaremos al correo que registraste. Revisa tu bandeja de entrada y spam en Gmail.
      </div>
    </q-card-section>

    <q-card-actions align="center">
      <q-btn flat label="Entendido"  outline color="primary" v-close-popup />
    </q-card-actions>
  </q-card>
</q-dialog>
  </div>
</template>

<script setup>
import { ref, watch, computed} from 'vue'
import { postData } from '../services/apiClient.js'
import { Notify } from 'quasar'
const formRef = ref();
const form = ref({});
const fileInput = ref(null);
const loading = ref(false);
const loading2 = ref(false);
const showSpam = ref(false)
const showConfirmation = ref(false);

const priceInscription = computed(() => {
  return form.value.category === 'Juvenil' ? 20000 : 25000
})

const priceShirt = computed(() => {
  if (form.value.shirt === 'No') return 0
  return form.value.shirtWithSleeves === 'Si' ? 40000 : 35000
})
function OpenSearch() {
  fileInput.value.click()
  loading2.value = true;
}



const total = computed(() => {
  if (!form.value.category) return 0; // aún no escoge categoría
  if (!form.value.shirt) return priceInscription.value; // aún no escoge si quiere camiseta

  if (form.value.shirt === "Si") {
    return priceInscription.value + priceShirt.value;
  } else {
    return priceInscription.value;
  }
});




async function searchImage(event) {
  try {
    const file = event.target.files[0]
    if (file) {
      form.value.image = file
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
    console.log("image load failure", error);
  }
  finally {
    loading2.value = false
    showSpam.value = true
  }

}


const onSubmit = async () => {
    try {
    loading.value = true
    const success = await formRef.value.validate()
    if (success) {
      form.value.total = total.value;
      console.log('Formulario válido:', form.value)
      const formData = new FormData()
      formData.append('image', form.value.image)
      formData.append('data',JSON.stringify(form.value))
      const response = await postData("/inscription/register",formData);
      Notify.create({
        type: 'positive',
        message: 'Registro exitoso'
      })
      showConfirmation.value = true;
   /*    formRef.value.reset(); */
      console.log(response.data);
    }
    else {
      throw new Error('Hay errores en el formulario')
    }
  } catch (error) {
    Notify.create({
      type: 'negative',
      message: 'Registro fallido , intente nuevamente'
    })
    console.log(error);
  }
  finally {
    loading.value = false
  }
}

const onReset = () => {
  formRef.value.resetValidation()
  showSpam.value = false
  Object.keys(form.value).forEach(key => {
    if (typeof form.value[key] === 'boolean') {
      form.value[key] = true
    } else {
      form.value[key] = ''
    }
  })
}

// formatear precio
const formatPrice = (price) => {
  return price.toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })
}

function openLink(url) {
  window.open(url, '_blank')
}


</script>

<style scoped>
* {
  font-family: "Montserrat", sans-serif;
}

.form-container {
  position: relative;
  min-height: 100vh;
  background-image: url("/fond.jpg");
  background-repeat: repeat;
  background-size: 200px 150px;
 
}

.card-form {
  background-color: white;
  border-radius: 10px;
  position: relative;
  z-index: 1;
}

h4 {
  background-image: url("/fondoo.png");
  background-repeat: no-repeat;
  background-size: cover;
  color: #fffdfd;
  padding: 20px;
  text-align: center;
  margin-bottom: 35px;
}



form label {

  font-size: 15px;
  font-weight: 400;
  color: rgb(103, 117, 124);
  display: block;

}

.footer-form{
  background-image: url("/fondoo.png");
  background-repeat: no-repeat;
  background-size: cover;
  color: white;
}
</style>
