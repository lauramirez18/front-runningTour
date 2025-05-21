<template>
    <div class="q-pa-lg dashboard-container">
        <div class="row justify-end">
    <q-card
      class="my-card q-pa-sm shadow-3 "
      style="width: 100px; background-color: #000; color: #99ff43;">
      <div style="font-size: 10px;">
        <div>
          <div class=" text-weight-bold text-center">Total Inscritos</div>
          <div class="text-h5 text-bold text-center">{{ totalParticipants }}</div>
        </div>
      </div>
    </q-card>
  </div>
        <!-- Sección de botones encima de factura-container -->
        <q-card-section class="q-pa-md flex justify-center q-gutter-md">
  <div class="column items-center">
    <q-btn 
      color="warning"
      icon="hourglass_empty"
      label="Pendientes"
      @click="data('earrings'); btnStatus = 'earrings'"
      style="font-weight: bold;"
      
    />
  </div>

  <div class="column items-center">
    <q-btn 
      color="positive"
      icon="check"
      label="Aprobadas"
      @click="data('approved'); btnStatus = 'approved'"
      style="font-weight: bold;"
    />
  </div>

  <div class="column items-center">
    <q-btn 
      color="negative"
      icon="close"
      label="Rechazadas"
      @click="data('rejected'); btnStatus = 'rejected'"
      style="font-weight: bold;"
    />
  </div>

    <div class="column items-center">
    <q-btn 
      color="positive"
      icon="download"
      label="Excel"
      @click="downloadExcel()"
      :loading="loading"
      style="font-weight: bold;"
    />
  </div>
   <div class="column items-center">
    <q-btn 
      label="Enviar correos de entrega de kit"
      color="primary"
      :loading="enviando"
      @click="enviarCorreos"
    />
    <q-banner v-if="mensaje" class="q-mt-md" dense>
      {{ mensaje }}
    </q-banner>
  </div>
  
</q-card-section>
        <q-card>
            

        
            <q-card-section class="row items-center q-col-gutter-md q-pb-none">
  <!-- Título -->
  <div class="col-12 col-md-4 text-center">
    <div class="text-h6 text-bold text-secondary">
      {{ tableTittle }}
    </div>
  </div>

  <!-- Contador -->
  <div class="col-12 col-md-4 text-center">
    <q-badge
  color="dark"
  class=" q-pa-sm flex column items-center justify-center bg-gradient shadow-4"
>
<div class=" text-weight-bold" style="font-size: 10px;">Total</div>
<div class="text-h6 text-weight-bold">{{ registeredParticipants }}</div>
</q-badge>
  </div>

 <!-- Búsqueda por cédula -->
 <div class="col-12 col-md-4">
    <q-input
      dense
      filled
      v-model="searchDni"
      label="Buscar por cédula o por nombre"
      debounce="300"
      clearable
      type="text"
      color="dark"
    />
  </div>
</q-card-section>
  
        <q-card-section>
          <q-table
            separator="cell"
            :rows="filteredRows"
            :columns="columns"
            row-key="_id"
            flat
            bordered
            :pagination="{ rowsPerPage: 10 }"
            class="custom-table"
          >
            <!-- Encabezado personalizado -->
            <template v-slot:header="props">
              <q-tr class="bg-black text-white text-bold">
                <q-th v-for="col in props.cols" :key="col.name" :props="props" class="header-table">
                  {{ col.label }}
                </q-th>
              </q-tr>
            </template>
            <template v-slot:body-cell-fullName="props">
  <q-td :props="props">
    {{ props.row.firstName }} {{ props.row.lastName }}
  </q-td>
</template>
<template v-slot:body-cell-shirt="props">
  <q-td :props="props">
    <q-badge
      :color="props.row.shirt.toLowerCase() === 'si' || props.row.shirt.toLowerCase() === 'sí' ? 'green' : 'red'"
      text-color="white"
      class=" q-pa-sm"
    >
      {{ props.row.shirt }}
    </q-badge>
  </q-td>
</template>


<template v-slot:body-cell-shirtWithSleeves="props">
    <q-td :props="props" class="text-h6">
      <q-icon
        :name="props.row.shirtWithSleeves === 'Si' ? 'check_circle' : 'cancel'"
        :color="props.row.shirtWithSleeves === 'Si' ? 'green' : 'red'"
        size="sm"
      />
    </q-td>
  </template>

  <template v-slot:body-cell-total="props">
  <q-td :props="props">
    {{ formatPrice(props.row.total) }}
  </q-td>
</template>
  
            <!-- Acciones -->
            <template v-slot:body-cell-actions="props">
              <q-td class="text-center">
                <q-btn
                  size="sm"
                  flat
                  round
                  color="info"
                  icon="visibility"
                  
                  @click="verDetalles(props.row)">
                  <q-tooltip>Ver detalles</q-tooltip>
                </q-btn>
                <q-btn
                  size="sm"
                  flat
                  round
                  color="green"
                  icon="check"
                :loading="loadingMap.accepted[props.row._id] === true"
                  v-show="props.row.state == 2 || props.row.state == 0"
                  class="q-ml-sm "
                  @click="update(props.row._id,'1') ; sendEmail(props.row.email, 'accepted','Confirmacion inscripcion',props.row._id)">
                  <q-tooltip>Aprobar</q-tooltip>
                </q-btn>

                <q-btn
                size="sm"
  flat
  round
  color="red"
  icon="close"
  v-show="props.row.state == 1 || props.row.state == 0"
  :loading="loadingMap.refused[props.row._id] === true"
  class="q-ml-sm"
  @click="abrirDialogoRechazo(props.row)"
>
                  <q-tooltip>Rechazar</q-tooltip>
                </q-btn>
              </q-td>
            </template>
          </q-table>
        </q-card-section>
      </q-card>
  
      <!-- Modal de Detalles -->
      <q-dialog v-model="mostrarModal">
  <q-card style="min-width: 400px; max-width: 50vw;" class="q-pa-md bg-grey-1 rounded-borders shadow-10">
    
    <!-- Encabezado -->
    <q-card-section class="bg-dark text-white flex items-center rounded-borders">
      <div class="text-h6 text-bold">Detalles del Participante</div>
      <q-space />
      <q-btn icon="close" flat round dense @click="mostrarModal = false" class="text-white" />
    </q-card-section>

    <!-- Contenido -->
    <q-card-section>
      <div class="q-gutter-md">

        <div class="row q-col-gutter-sm">

          <div class="col-12 col-sm-6">
            <q-item>
              <q-item-section avatar><q-icon name="person" color="primary" /></q-item-section>
              <q-item-section>
                <q-item-label class="text-bold">Nombre</q-item-label>
                <q-item-label caption>{{ datosSeleccionados.firstName }} {{ datosSeleccionados.lastName }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>

          <div class="col-12 col-sm-6">
            <q-item>
              <q-item-section avatar><q-icon name="badge" color="primary" /></q-item-section>
              <q-item-section>
                <q-item-label class="text-bold">Documento</q-item-label>
                <q-item-label caption>{{ datosSeleccionados.documentNumber }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>

          <div class="col-12 col-sm-6">
            <q-item>
              <q-item-section avatar><q-icon name="call" color="primary" /></q-item-section>
              <q-item-section>
                <q-item-label class="text-bold">Teléfono</q-item-label>
                <q-item-label caption>{{ datosSeleccionados.phone }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>

          <div class="col-12 col-sm-6">
            <q-item>
              <q-item-section avatar><q-icon name="email" color="primary" /></q-item-section>
              <q-item-section>
                <q-item-label class="text-bold">Correo</q-item-label>
                <q-item-label caption>{{ datosSeleccionados.email }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>
          <div class="col-12 col-sm-6">
            <q-item>
              <q-item-section avatar><q-icon name="home" color="primary" /></q-item-section>
              <q-item-section>
                <q-item-label class="text-bold">Dirección</q-item-label>
                <q-item-label caption>{{ datosSeleccionados.address  }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>
          <div class="col-12 col-sm-6">
            <q-item>
              <q-item-section avatar><q-icon name="home" color="primary" /></q-item-section>
              <q-item-section>
                <q-item-label class="text-bold">Residencia</q-item-label>
                <q-item-label caption>{{ datosSeleccionados.livesInColombia ? "Colombia" : "Extranjera" }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>
          <div class="col-12 col-sm-6">
            <q-item>
              <q-item-section avatar><q-icon name="home" color="primary" /></q-item-section>
              <q-item-section>
                <q-item-label class="text-bold">Comunidad/Team</q-item-label>
                <q-item-label caption>{{ datosSeleccionados.organization }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>
          <div class="col-12 col-sm-6">
            <q-item>
              <q-item-section avatar><q-icon name="wc" color="primary" /></q-item-section>
              <q-item-section>
                <q-item-label class="text-bold">Género</q-item-label>
                <q-item-label caption>{{ datosSeleccionados.gender }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>
          <div class="col-12 col-sm-6">
            <q-item>
              <q-item-section avatar><q-icon name="event" color="primary" /></q-item-section>
              <q-item-section>
                <q-item-label class="text-bold">Fecha de nacimiento</q-item-label>
                <q-item-label caption>{{ datosSeleccionados.birthDate }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>
          <div class="col-12 col-sm-6">
            <q-item>
              <q-item-section avatar><q-icon name="calendar_today" color="primary" /></q-item-section>
              <q-item-section>
                <q-item-label class="text-bold">Edad</q-item-label>
                <q-item-label caption>{{ datosSeleccionados.age }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>
          <div class="col-12 col-sm-6">
            <q-item>
              <q-item-section avatar><q-icon name="bloodtype" color="primary" /></q-item-section>
              <q-item-section>
                <q-item-label class="text-bold">Tipo de sangre</q-item-label>
                <q-item-label caption>{{ datosSeleccionados.bloodType }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>
          <div class="col-12 col-sm-6">
            <q-item>
              <q-item-section avatar><q-icon name="healing" color="primary" /></q-item-section>
              <q-item-section>
                <q-item-label class="text-bold">EPS</q-item-label>
                <q-item-label caption>{{ datosSeleccionados.healthEntity }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>
          <div class="col-12 col-sm-6">
            <q-item>
              <q-item-section avatar><q-icon name="emergency" color="primary" /></q-item-section>
              <q-item-section>
                <q-item-label class="text-bold">Contacto de Emergencia</q-item-label>
                <q-item-label caption>{{ datosSeleccionados.emergencyContactName }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>
          <div class="col-12 col-sm-6">
            <q-item>
              <q-item-section avatar><q-icon name="emergency" color="primary" /></q-item-section>
              <q-item-section>
                <q-item-label class="text-bold">Telefono de Emergencia</q-item-label>
                <q-item-label caption>{{ datosSeleccionados.emergencyContactPhone }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>

          <div class="col-12 col-sm-6">
            <q-item>
              <q-item-section avatar><q-icon name="checkroom" color="primary" /></q-item-section>
              <q-item-section>
                <q-item-label class="text-bold">Camiseta</q-item-label>
                <q-item-label caption>{{ datosSeleccionados.shirt }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>

          <div class="col-12 col-sm-6">
            <q-item>
              <q-item-section avatar><q-icon name="checkroom" color="primary" /></q-item-section>
              <q-item-section>
                <q-item-label class="text-bold">Camiseta Con Mangas</q-item-label>
                <q-item-label caption>{{datosSeleccionados.shirtWithSleeves }}</q-item-label>
              </q-item-section>
            </q-item>
            </div>

            <div class="col-12 col-sm-6">
            <q-item>
              <q-item-section avatar><q-icon name="checkroom" color="primary" /></q-item-section>
              <q-item-section>
                <q-item-label class="text-bold">Talla camiseta</q-item-label>
                <q-item-label caption>{{datosSeleccionados.shirtSize }}</q-item-label>
              </q-item-section>
            </q-item>
            </div>

          <div class="col-12 ">
            <q-item>
              <q-item-section avatar><q-icon name="attach_money" color="primary" /></q-item-section>
              <q-item-section>
                <q-item-label class="text-bold">Total</q-item-label>
                <q-item-label caption>{{formatPrice(datosSeleccionados.total) }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>

          <div class="col-12">
            <q-item v-if="datosSeleccionados.rejectionReason ">
              <q-item-section>
  <q-item-label class="text-negative row items-center justify-center">
    <q-icon name="report_problem" class="q-mr-sm" />
    Motivo del Rechazo:
  </q-item-label>
  <q-item-label caption class="q-ml-lg text-center">{{ datosSeleccionados.rejectionReason }}</q-item-label>
</q-item-section>
    </q-item>
          </div>
          
         
            <div class="col-12">
                <q-item>     
  <q-item-section avatar>
    <q-icon name="receipt_long" color="primary" />
  </q-item-section>
  <q-item-section>
    <q-item-label class="text-bold"> Comprobante de pago</q-item-label>
    <q-item-label >
      <q-img
        :src="datosSeleccionados.proofImage"
        alt="Comprobante de pago"
        style="max-width: 50px;  cursor: pointer;"
        @click="imagenAmpliada = true"
      />
      <div class="q-mt-sm">
          <a
            :href="datosSeleccionados.proofImage"
            target="_blank"
            rel="noopener noreferrer"
            class=" text-dark text-caption"
          >Abrir</a>
        </div>
    </q-item-label>
  </q-item-section>
</q-item>
            </div>
       
       
        </div>
        

      </div>
    </q-card-section>
  </q-card>
</q-dialog>

<q-dialog v-model="imagenAmpliada">
      <q-img
        :src="datosSeleccionados.proofImage" 
        fit="contain"
        spinner-color="primary"
        :ratio="1"
      />
</q-dialog>

<q-dialog v-model="dialogMotivo" persistent>
  <q-card class="q-pa-md bg-grey-1" style="min-width: 400px;">
    <q-card-section>
      <div class="text-h6 ">Motivo del Rechazo</div>
    </q-card-section>

    <q-card-section>
      <q-input
        type="textarea"
        label="Explica por qué fue rechazado"
        v-model="motivoRechazo"
        outlined
        autogrow
        dense
      />
    </q-card-section>

    <q-card-actions align="right">
      <q-btn flat label="Cancelar" color="grey" @click="dialogMotivo = false" />
      <q-btn flat label="Rechazar" color="red" @click="confirmarRechazo" :disable="!motivoRechazo.trim()" />
    </q-card-actions>
  </q-card>
</q-dialog>


    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed, normalizeClass } from 'vue'
  import apiClient from '../plugins/axios.js'
  import { getData, postData, putData } from '../services/apiClient.js'
  import { Notify } from 'quasar'
  import { date } from 'quasar'
 
  
  const columns = computed(() =>{
    const baseColumns = [
      {name: "createdAt", label: "Fecha de Elaboración", align: "center", field: row => date.formatDate(row.createdAt, 'DD/MM/YYYY'), sortable: true},
      { name: 'documentNumber', label: 'Documento', field: 'documentNumber', align: 'left' },
      { name: 'fullName', label: 'Nombres', field: 'firstName', align: 'center' },
      { name: 'category', label: 'Categoría', field: 'category', align: 'center' },
      { name: 'shirt', label: 'Camiseta', field: 'shirt', align: 'center' },
      {name: 'shirtWithSleeves', label: 'C. con Mangas',field: 'shirtWithSleeves',align: 'center'},
      {name:'shirtSize', label: 'Talla Camiseta', field: 'shirtSize', align: 'center'},
      { name: 'total', label: 'Total', field: 'total', align: 'center' },
      { name: 'actions', label: 'Acciones', field: 'actions', align: 'center' }
 ]
      if(btnStatus.value === 'rejected'){
        baseColumns.splice(baseColumns.length - 1, 0, { name: 'rejectionReason', label: 'Motivo del Rechazo', field: 'rejectionReason', align: 'center' })
      }

    return baseColumns
   
  });
   
  
  const rows = ref([]) // ← Aquí se cargarán los datos desde tu backend
  const loadingMap = ref({
    accepted:{},
    refused:{}
  })
  
  const mostrarModal = ref(false)
  const datosSeleccionados = ref({})
  const btnStatus = ref('earrings')
  const tableTittle = ref('')
  const searchDni = ref('')
  const imagenAmpliada = ref(false)
  const registeredParticipants = ref(0)
  const totalParticipants = ref(0)
  const motivoRechazo = ref('')
const dialogMotivo = ref(false)
const rowRechazo = ref(null)
const loading = ref(false)
const enviando = ref(false)
const mensaje = ref('')


// Enviar correos de entrega de kit
const enviarCorreos = async () => {
  enviando.value = true
  mensaje.value = ''
  try {
    const res = await postData('/emailKit/enviar-correos-kit')
    mensaje.value = res
  } catch (err) {
    mensaje.value = '❌ Ocurrió un error al enviar los correos.'
    console.error(err)
  } finally {
    enviando.value = false
  }
}

  

async function downloadExcel() {
  loading.value = true
  try {
    const response = await apiClient.get("/inscription/report",{
      responseType: "blob", // ¡Importante! Esto hace que Axios devuelva un Blob
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const a = document.createElement("a");
    a.href = url;
    a.download = "inscripciones.xlsx";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    Notify.create({
      type: 'positive',
      message: '✅ Reporte descargado con éxito'
    })

    console.log("✅ Reporte descargado con éxito");
  } catch (error) {
    console.error("❌ Error al descargar el reporte:", error);
  }
  loading.value = false
}


  const filteredRows = computed(() => {
  if (!searchDni.value) return rows.value
  const search = searchDni.value.toLowerCase()
  return rows.value.filter(row =>
    row.documentNumber.toLowerCase().includes(search) ||
    `${row.firstName} ${row.lastName}`.toLowerCase().includes(search)
  )
})

function abrirDialogoRechazo(row) {
  rowRechazo.value = row
  motivoRechazo.value = ''
  dialogMotivo.value = true
}

async function confirmarRechazo() {
  dialogMotivo.value = false
  const row = rowRechazo.value
  try {
    loadingMap.value.refused[row._id] = true

    await putData(`/inscription/update/${row._id}`, {
      data: {
        state: '2',
        rejectionReason: motivoRechazo.value // Envíalo al backend
      }
    })

    await sendEmail(
      row.email,
      'refused',
      'Rechazo inscripción',
      row._id,
      motivoRechazo.value // Aquí también se lo pasas si tu backend lo acepta
    )

   /*  alert('positive', `Rechazo guardado y correo enviado a ${row.email}`) */

    data(btnStatus.value)
  } catch (error) {
    console.error('Error al guardar motivo de rechazo', error)
    alert('negative', 'Error al guardar el rechazo')
  } finally {
    loadingMap.value.refused[row._id] = false
  }
}


  const verDetalles = (row) => {
    datosSeleccionados.value = row
    mostrarModal.value = true
  }

  async function sendEmail(to,status, title, rowId, rejectionReason){
    try {
      loadingMap.value[status][rowId] = true
      console.log("razon rechazo", rejectionReason);
      const response = await postData("/email/sendEmail",{
        to:to,
        subject:title,
        status:status,
        rejectionReason:rejectionReason
      })
      if(status === 'accepted'){
      alert('positive',`Se a enviado un correo de ${title} a ${to}`)
      }
      else{
      alert('positive',`Se a enviado un correo de ${title} a ${to}`)
      }
      console.log(response.message);
    console.log("alerta tipo", status);

    } catch (error) {
      console.log("error al enviar email");
    }
    finally{
      loadingMap.value[status][rowId] = false
    }
  }

  async function fullInscriptions() {
    try {
      const response = await getData("/inscription/full")
        totalParticipants.value = response.data.length
      console.log("data de todas las inscripciones mas conteo", response.data.length);
    } catch (error) {
      console.log("error trayendo toda la info de inscripciones");
    }
  }

  
  async function update(id,state) {
    
    try {
      const response = await putData(`/inscription/update/${id}`,{
        data:{state:state}
      })
      console.log(response.data);
      data(btnStatus.value);
      console.log("btn status" , btnStatus.value);
    } catch (error) {
      console.error('Error actualizando inscripciones:', error)
    }
  }

  function alert (type,message){
    Notify.create({
        type:type,
        message:message
      })
  }

  async function data(state) {
    try {
      const response = await getData(`/inscription/data/${state}`)
      rows.value = response.data
      registeredParticipants.value = response.data.length
        console.log(`DATA DE ${state}`, rows.value.length);

      const titles = {
      earrings: ' ⌛Panel de Inscripciones pendientes',
      approved: ' ✅Panel de Inscripciones aprobadas',
      rejected: ' ❌Panel de Inscripciones rechazadas'

    }

      tableTittle.value = titles[state] || 'Panel de Inscripciones pendientes'
    } catch (error) {
      console.error('Error cargando inscripciones:', error)
    }
  }

  function formatPrice(value) {
  if (!value) return '$0';
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  }).format(value);
}
  
  onMounted(()=>{
    data('earrings'),
    fullInscriptions()
  })
  </script>
  
  <style scoped>
  

  .dashboard-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
   
  }

  .header-table {
    font-weight: bold;
  }
  .custom-table {
    border-radius: 12px;
    overflow: hidden;
  }
  .q-table thead {
    font-size: 15px;
    text-transform: uppercase;
    
  }
  .q-table tbody tr:hover {
    background-color: #e0f2e9;
  }
  </style>
  