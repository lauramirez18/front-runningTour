<template>
  <q-page class="container">
    <transition name="fade-scale">
      <div class="card  q-mx-auto shadow-2 bg-white-1 q-pa-md" v-show="show">
        <div>
          <q-img src="/banner_h4.png" class="q-mb-md" style="height: 60px;" />
        </div>
        <q-icon name="check_circle" size="100px" color="primary" class="q-mb-md" />
        <h2 class="text-h5 text-bold q-mb-md text-black">¡Gracias por tu interés en nuestra carrera Corre Pingo San Gil!</h2>

        <q-banner dense class="bg-grey-2 text-grey-9 q-pa-md q-mb-lg" rounded>
          <q-icon name="info" size="24px" class="q-mr-sm text-primary"  />
          <span class="text-subtitle1">
            Las <strong>inscripciones están agotadas</strong>. Hemos alcanzado el límite de participantes.
          </span>
        </q-banner>

        <p class="text-body1 q-mb-md bg-white ">
          Te esperamos en nuestra próxima edición. ¡Prepárate para vivir otra emocionante experiencia deportiva!
        </p>

        <q-separator class="q-my-lg" />
        <div class="padre">
         <div class="bg-white q-pa-lg rounded-borders shadow-2 cuadro" style="max-width: 500px; width: 100%;">
          <div class="text-h6 text-primary q-mb-md text-bold">Organiza:</div>
          <q-avatar size="100px" class="q-mb-sm">
            <img  src="/logo.jpg" alt="Logo">
          </q-avatar>
          <div class="text-subtitle2 ">
            <strong>JIRETH SPORT 365</strong><br>
            <strong>Cristian Vesga</strong><br>
              <q-icon name="mail" class="q-mr-xs" /> jirethsport365@gmail.com<br>
            <q-icon name="phone" class="q-mr-xs" />  316 411 0047
          </div>
        </div>    
        </div>
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

       
      </div>
    </transition>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const show = ref(false)

onMounted(() => {
  setTimeout(() => {
    show.value = true
  }, 100) // Pequeño retardo para animación de entrada
})
</script>

<style scoped>
.container {
  min-height: 100vh;
  background-image: url("/fond.jpg");
  background-repeat: repeat;
  background-size: 200px 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

.card {
 
  border-radius: 10px;
  max-width: 800px;
  width: 100%;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.padre{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

}

.cuadro{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.footer-form{
  background-image: url("/banner_h4.png");
  background-repeat: no-repeat;
  background-size: cover;
  color: white;
}

/* Animaciones personalizadas */
.fade-scale-enter-active {
  transition: all 0.6s ease;
}
.fade-scale-leave-active {
  transition: all 0.3s ease;
  opacity: 0;
  transform: scale(0.9);
}
.fade-scale-enter-from {
  opacity: 0;
  transform: scale(0.9);
}
.fade-scale-enter-to {
  opacity: 1;
  transform: scale(1);
}


</style>
