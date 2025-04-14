<template>
    <div class="q-pa-lg dashboard-container">
        <!-- Sección de botones encima de factura-container -->
    <q-card-section class="q-pa-md flex justify-center ">

      <q-btn 
        color="warning"
        icon="hourglass_empty"
        label="pendientes"
        @click="data('earrings') ; btnStatus = 'earrings'"
        class="q-mx-sm"
        style=" font-weight: bold; "
      />
      <q-btn 
        color="positive"
        icon="check"
        label="Aprobadas"
        @click="data('approved') ; btnStatus = 'approved'"
        class="q-mx-sm"
        style=" font-weight: bold; "
      />
    
      <q-btn 
        color="negative"
        icon="close"
        label="Rechazadas"
        @click="data('rejected') ; btnStatus = 'rejected'"
        class="q-mx-sm"
        style=" font-weight: bold; "
      />
      

  </q-card-section>
        <q-card class="q-pa-md shadow-2xl rounded-xl bg-white">
        
        <q-card-section class="row items-center  q-pb-none">
          <div class="text-h5 text-bold text-secondary text-center ">{{ tableTittle }}</div>
          <q-space />
        </q-card-section>
  
        <q-card-section>
          <q-table
            :rows="rows"
            :columns="columns"
            row-key="documentNumber"
            flat
            bordered
            :pagination="{ rowsPerPage: 10 }"
            hide-bottom
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
                  class="q-ml-sm"
                  @click="update(props.row._id,'1')">
                  <q-tooltip>Aprobar</q-tooltip>
                </q-btn>

                <q-btn
                  size="sm"
                  flat
                  round
                  color="red"
                  icon="close"
                  class="q-ml-sm"
                  @click="update(props.row._id,'2')">
                  <q-tooltip>Rechazar</q-tooltip>
                </q-btn>
              </q-td>
            </template>
          </q-table>
        </q-card-section>
      </q-card>
  
      <!-- Modal de Detalles -->
      <q-dialog v-model="mostrarModal">
  <q-card style="min-width: 400px; max-width: 50vw;" class="q-pa-md bg-grey-1 rounded-borders">
    
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
       
          <!-- Puedes seguir agregando más campos aquí -->
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
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { getData, putData } from '../services/apiClient.js'
 
  
  const columns = [
    { name: 'documentNumber', label: 'Documento', field: 'documentNumber', align: 'left' },
    { name: 'fullName', label: 'Nombres', field: 'firstName', align: 'center' },
    { name: 'phone', label: 'Teléfono', field: 'phone', align: 'center' },
    { name: 'gmail', label: 'Correo', field: 'email', align: 'center' },
    { name: 'actions', label: 'Acciones', field: 'actions', align: 'center' }
  ]
  
  const rows = ref([]) //  datos del backend
  
  const mostrarModal = ref(false)
  const datosSeleccionados = ref({})
  const btnStatus = ref('earrings')
  const tableTittle = ref('')
  const imagenAmpliada = ref(false)
  

  const verDetalles = (row) => {
    datosSeleccionados.value = row
    mostrarModal.value = true
  }

  async function fullInscriptions() {
    try {
      const response = await getData("/inscription/full")
      console.log("data de todas las inscripciones mas conteo", response.data);
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


  async function data(state) {
    try {
      const response = await getData(`/inscription/data/${state}`)
      rows.value = response.data
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
  