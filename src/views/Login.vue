<template>
    <q-page class="bg-login flex flex-center ">
      <q-card class="q-pa-lg shadow-4 card-container">
  
        <!-- Encabezado -->
        <div class="text-center q-mb-md">
          
            <img height="100px" src="/logoo.png" alt="Logo"></img>
        
         
        
        </div>
  
        <!-- Botones -->
        <q-card-actions align="center" class="q-gutter-sm q-mb-sm">
            <q-btn 
            label="ADMINISTRADOR" 
            color="secondary"
            outline 
            @click="mostrarLogin = true" 
          />
          <q-btn 
            label="INSCRIPCIÓN" 
            color="warning"
            outline 
            text-color="amber-10"
            @click="redirigirAInscripcion" 
          />
        </q-card-actions>
  
        <!-- Formulario de login -->
        <q-slide-transition>
          <div v-if="mostrarLogin" class="animated-login">
            <q-form @submit.prevent="iniciarSesion" class="q-gutter-md q-mt-sm form-wrapper">
  
              <q-input
                v-model="user"
                label="Usuario"
                outlined
                dense
               
                :rules="[val => !!val && val.trim().length > 0 || 'Campo obligatorio']"
                :prefix="`👤`"
                class="input-field align-center"
              />
  
              <q-input
                v-model="password"
                label="Contraseña"
                :type="showPassword ? 'text' : 'password'"
                outlined
                dense
               
                :rules="[val => !!val && val.trim().length > 0 || 'Campo obligatorio']"
                :prefix="`🔒`"
                class="input-field"
              >
                <template v-slot:append>
                  <q-icon
                    :name="showPassword ? 'visibility' : 'visibility_off'"
                    class="cursor-pointer pulse-icon"
                    style="color: black;"
                    @click="showPassword = !showPassword"
                  />
                </template>
              </q-input>
              <q-card-actions align="center" class="q-gutter-sm q-mt-sm">
                <q-btn
                :loading="loading"
                label="INICIAR SESIÓN"
                unelevated
                type="submit"
                color="secondary"
                
              />
              </q-card-actions>
              
            </q-form>
          </div>
        </q-slide-transition>
  
      </q-card>
    </q-page>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { Notify } from 'quasar'
  import {postData} from '../services/apiClient.js'
  import {useStore} from '../store/store.js'
  const store = useStore();
  const router = useRouter()
  
  const mostrarLogin = ref(false)
  const loading = ref(false);
  const user = ref('')
  const password = ref('')
  const showPassword = ref(false)
  
  const redirigirAInscripcion = () => {
    router.push('/form')
  }
  
  const iniciarSesion =async () => {
   try {
    loading.value = true
    if (!user.value || !password.value) {
      Notify.create({
        type: 'negative',
        message: 'Por favor completa todos los campos'
      })
      return
    }
    const response = await postData("/user/login",{
      user:user.value.trim().toLowerCase(),
      password:password.value.trim()
    });
    store.set_Token(response.token)
    Notify.create({
      type: 'positive',
      message: 'Inicio de sesión exitoso'
    })
    router.replace("/dashboard")
   } catch (error) {
    Notify.create({
      type: 'negative',
      message: 'Inicio de sesión fallido'
    })
    console.log(error);
   }
   finally{
    loading.value = false
   }
  }
  </script>
  

  
<style scoped>
*{
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  color: white;
}

  .bg-login {
 position: relative;
  min-height: 100vh;
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)),
    url("/fondddd.jpg");
  background-repeat: repeat;
  background-size: 200px 150px;

}
   

  .card-container {
    width: 100%;
    max-width: 350px;
    box-shadow: 0 0  10px rgb(245, 121, 19); /* Verde lima con difuminado */
    border: none;
    backdrop-filter: blur(8px);
    background: rgba(255, 255, 255, 0.95);
    padding: 50px 16px;
    border-radius: 12px;
    background-color: rgb(219, 219, 219);
  }
  
  .form-wrapper {
    display: flex;
    flex-direction: column;
    padding: 0 8px;
  }
  
  .input-field {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-self: center;
    width: 100%;
    max-width: 80%;
    padding: 0 4px;
    background-color: white;
    
  }
  

 
 
    .animated-login {
  animation: fadeSlide 0.6s ease;
}

@keyframes fadeSlide {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
  
  </style>
  