<template>
  <div class="bg-fixed q-pa-lg flex flex-center form-container">
    <q-card class="q-pa-md q-mx-auto full-width card-form" style="max-width: 800px;">
      <!-- Imagen de la carrera -->
     <q-card class="q-mb-md q-pa-none shadow-2" style="border-radius: 8px;">
       <q-img src="/banner1.jpg" class="q-mb-md" style="border-radius: 0px;" />
  <!-- <div class="row q-col-gutter-xs">
    <div class="col-xs-12 col-sm-6">
      <q-img
        src="/banner_formmm.jpg"
        class="rounded-borders"
      />
    </div>

    <div class="col-xs-12 col-sm-6">
      <q-img
        src="/banner_formmmm.jpg"
        class="rounded-borders"
      />
    </div>
  </div> -->
  
</q-card>

      <!-- QForm para validación -->
      <q-form @submit="onSubmit" @reset="onReset" ref="formRef">


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
          <q-card class="q-mb-md q-pa-none shadow-2" style="border-radius: 8px;">
       <q-img src="/banner_formmmm.jpg" class="q-mb-md" style="border-radius: 0px;" />
</q-card>

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
                <q-select filled dense v-model="form.distance" :options="['6K' , '12K', ]"
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
                <label for="edad">Edad</label>
                <q-input filled dense v-model="calculatedAge" readonly />
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
          </div>
        </div>
        <div class="q-mt-xl">
  <h4 class="text-bold q-mb-md text-h5">
    DATOS DE PAGO</h4>
 
  <div class="row q-col-gutter-md">
  
    <!-- totales -->
<q-space />
<div class="row justify-center q-mt-md">
  <div class="column items-center q-gutter-y-sm">
    <div class="text-h6 text-bold text-info">Valor Inscripción</div>
    <div class="text-h4 text-bold text-secondary">
      {{ formatPrice(priceInscription) }}
    </div>
  </div>
</div>
  </div>
  <q-card
  class="q-mb-md q-pa-lg shadow-2"
  style="margin: 30px 0px; border-radius: 10px;"
>
  <div class="flex flex-center q-mb-md">
    <q-icon name="warning" size="md" color="warning" class="q-mr-sm" />
    <span class="text-h6 text-bold text-positive">¡Importante!</span>
  </div>

  <div class="column items-center q-gutter-y-lg">
    <div class="row items-center justify-center q-gutter-x-md">
      <q-img
        src="https://ribgo.davivienda.com/assets/images/logo/logo-davivienda.png"
        style="width: 70px; height: 45px; object-fit: contain;"
        spinner-color="primary"
      />
      <div class="column items-center text-center">
        <div class="text-subtitle1 text-bold">
          <span class="text-negative">Pago por Cuenta corriente Davivienda</span>
        </div>
        <div class="text-caption">N.°: <strong>047969994343</strong></div>
        <div class="text-caption">
          Titular: <strong>Centro Comercial San Gil Plaza</strong>
        </div>
        <div class="text-caption">NIT: <strong>900.667.347-7</strong></div>
        <div class="text-caption q-mt-sm">
          Al consignar, usa la referencia: <strong>Local 1</strong>.
        </div>
      </div>
    </div>

    <q-separator class="full-width" style="max-width: 300px;" />

    <div class="row items-center justify-center q-gutter-x-md">
      <q-img
        src="logoo.png"
        style="width: 70px; height: 45px; object-fit: contain;"
        spinner-color="white"
      />
      <div class="column items-center text-center">
        <div class="text-subtitle1 text-bold">
          <span class="text-secondary">Pago Directo</span>
        </div>
        <div class="text-caption">
          También puedes pagar directamente en la <br />
          <strong>Oficina de Administración del Centro Comercial.</strong>
        </div>
      </div>
    </div>
  </div>
</q-card>
</div>

<div class="col-12 col-md-6 q-mt-md">
  <div class="flex justify-center items-center gap-2">
  <q-btn
    color="secondary"
    icon="cloud_upload"
    label="Subir comprobante de pago"
    @click="OpenSearch()"
    :loading="loading2"
    unelevated
    rounded
    no-caps
    class="q-px-lg animate-pulse"

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
    @cancel="cancelImage()"
    @change="searchImage"
  />
</div>

<q-card class="q-mb-md q-pa-md text-center" style="margin: 30px 0px; border-radius: 10px;">
  <div class="q-pa-md" style="background-color: #f5f5f5; border-radius: 8px;">
    <p class="text-subtitle2 text-bold q-mb-sm text-center">Aviso de Privacidad</p>
    <p class="text-caption text-grey-8 q-mb-none text-center">
      En cumplimiento de la <strong>ley 1581 de 2012 "Ley de protección de datos"</strong> , los datos anteriormente
      suministrados serán utilizados por Centro Comercial Sangil Plaza únicamente para los fines de la Carrera.
    </p>
  </div>

  <div class="q-mt-md">
    <p class="text-subtitle2 text-bold q-mb-sm text-center">Confirmación y Pago</p>
    <p class="text-caption text-grey-8 q-mb-none text-center q-px-md">
  ¡Ya casi terminas! Luego de subir tu comprobante, confirma tu registro haciendo clic en el botón <strong>"Inscribirme"</strong> para asegurar tu cupo en la carrera. ¡No te quedes por fuera!
</p>
  </div>
</q-card>
        <!-- Boton-->
        <div class="row justify-center q-mt-xl">
  <q-btn
    label="Inscribirme"
    :loading="loading"
    color="positive"
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
    <q-btn flat round @click="openLink('https://wa.me/573157836545')" color="white">
  <img src="https://pngimg.com/d/whatsapp_PNG21.png" alt="WhatsApp" style="width: 24px; height: 24px;" />
</q-btn>
<q-btn flat round @click="openLink('https://www.instagram.com/sangilplaza.co?igsh=c2N3dzlyYTdrOGk3')" color="white">
  <img src="https://png.pngtree.com/png-vector/20221018/ourmid/pngtree-instagram-social-platform-icon-png-image_6315976.png" alt="Instagram" style="width: 24px; height: 24px;" />
</q-btn>
  </div>

  <div class="text-caption q-mt-md">
    También puedes escribirnos a <span class="text-primary"> gerencia@sangilplaza.co</span>
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
      <q-btn flat label="Entendido"  outline color="primary" v-close-popup onclick="window.location.reload()" />

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
const form = ref({
  category: "N/A",
  birthDate: null,
  age: null,
});
const fileInput = ref(null);
const loading = ref(false);
const loading2 = ref(false);
const showSpam = ref(false)
const showConfirmation = ref(false);
const closeModalImage = ref(false);

const priceInscription = computed(() => {
  return form.value.distance === '6K' ? 65000 : 85000
})

// Propiedad computada para calcular la edad automáticamente
const calculatedAge = computed(() => {
  if (!form.value.birthDate) {
    return null;
  }
  
  // Parsea la fecha en formato DD-MM-YYYY
  const [day, month, year] = form.value.birthDate.split('-');
  const birthDate = new Date(`${year}-${month}-${day}`);
  const today = new Date();
  
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
});

// Propiedad computada para determinar la categoría
const calculatedCategory = computed(() => {
  const age = calculatedAge.value;
  if (age === null) {
    return null;
  }
  
  // Lógica de categoría según el banner
  if (age <= 17) {
    return 'Juvenil';
  } else {
    return 'Élite'; // Asumiendo que 18+ es la categoría Élite
  }
});

// Watcher para sincronizar los valores computados con el objeto `form`
watch(calculatedAge, (newAge) => {
  form.value.age = newAge;
});

watch(calculatedCategory, (newCategory) => {
  form.value.category = newCategory;
});



const total = computed(() => {
  if (!form.value.category) return 0; // aún no escoge categoría
  if (!form.value.shirt) return priceInscription.value; // aún no escoge si quiere camiseta

  if (form.value.shirt === "Si") {
    return priceInscription.value + priceShirt.value;
  } else {
    return priceInscription.value;
  }
});

function cancelImage(){
  loading2.value = false
} 

function OpenSearch() {
  fileInput.value.click()
  closeModalImage.value = true;
  loading2.value = true;
}

async function searchImage(event) {
  try {
    const file = event.target.files[0]
    console.log('event ', event);
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
    loading.value = true;
    const formIsValid = await formRef.value.validate();

    if (formIsValid) {
      // **Nueva validación para la imagen del comprobante**
      if (!form.value.image) {
        Notify.create({
          type: 'negative',
          message: 'El comprobante de pago es requerido.',
          icon: 'warning',
          position: 'top'
        });
        loading.value = false;
        return; // Detiene la ejecución si no hay imagen
      }

      form.value.total = total.value;
      console.log('Formulario válido:', form.value);
      const formData = new FormData();
      formData.append('image', form.value.image);
      formData.append('data', JSON.stringify(form.value));

      const response = await postData("/inscription/register", formData);
      
      Notify.create({
        type: 'positive',
        message: 'Registro exitoso'
      });
      showConfirmation.value = true;
      console.log(response.data);
    } else {
      throw new Error('Hay errores en el formulario');
    }
  } catch (error) {
    // Si la validación de la imagen falló en el backend, el error de Axios se capturará aquí
    let errorMessage = 'Registro fallido, intente nuevamente.';

    if (error.response && error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    }
    
    Notify.create({
      type: 'negative',
      message: errorMessage,
      timeout: 5000,
      icon: 'warning',
      position: 'top'
    });
    console.log(error);
  } finally {
    loading.value = false;
  }
};

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

/* .form-container {
  position: relative;
  min-height: 100vh;
  background-image: url("/fondddd.jpg");
  background-repeat: repeat;
  
  background-size: 200px 150px;
 
} */

.form-container {
  position: relative;
  min-height: 100vh;
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.7)),
    url("/fonddd.jpg");
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
  background-image: url("/banner_h4.png");
  background-repeat: no-repeat;
  background-size: cover;
  color: #fffdfd;
  padding: 20px;
  text-align: center;
  margin-bottom: 35px;
}

.animate-pulse {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(32, 177, 219, 0.7);
  }
  70% {
    transform: scale(1.05);
    box-shadow: 0 0 0 10px rgba(32, 177, 219, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(32, 177, 219, 0);
  }
}

form label {

  font-size: 15px;
  font-weight: 400;
  color: rgb(103, 117, 124);
  display: block;

}

.footer-form{
  background-image: url("/banner_h4.png");
  background-repeat: no-repeat;
  background-size: cover;
  color: white;
}
</style>
