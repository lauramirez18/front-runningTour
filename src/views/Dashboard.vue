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
      />
      <q-btn 
        color="positive"
        icon="check"
        label="Aprobadas"
        @click="data('approved') ; btnStatus = 'approved'"
        class="q-mx-sm"
      />
    
      <q-btn 
        color="negative"
        icon="close"
        label="Rechazadas"
        @click="data('rejected') ; btnStatus = 'rejected'"
        class="q-mx-sm"
      />
      

  </q-card-section>
        <q-card class="q-pa-md shadow-2xl rounded-xl bg-white">
        
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h5 text-bold text-primary">Panel de Inscripciones</div>
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
                <q-th v-for="col in props.cols" :key="col.name" :props="props">
                  {{ col.label }}
                </q-th>
              </q-tr>
            </template>
  
            <!-- Acciones -->
            <template v-slot:body-cell-actions="props">
              <q-td class="text-center">
                <q-btn
                  size="sm"
                  flat
                  round
                  color="primary"
                  icon="visibility"
                  @click="verDetalles(props.row)"
                />
                <q-btn
                  size="sm"
                  flat
                  round
                  color="green"
                  icon="check"
                  class="q-ml-sm"
                  @click="update(props.row._id,'1')"
                />
                <q-btn
                  size="sm"
                  flat
                  round
                  color="red"
                  icon="close"
                  class="q-ml-sm"
                  @click="update(props.row._id,'2')"
                />
              </q-td>
            </template>
          </q-table>
        </q-card-section>
      </q-card>
  
      <!-- Modal de Detalles -->
      <q-dialog v-model="mostrarModal">
        <q-card class="bg-dark text-white" style="min-width: 400px; max-width: 90vw;">
          <q-card-section class="bg-green text-black flex items-center">
            <div class="text-h6 text-bold">Detalles del Participante</div>
            <q-space />
            <q-btn icon="close" flat round dense @click="mostrarModal = false" />
          </q-card-section>
  
          <q-card-section>
            <q-list bordered class="rounded-borders">
              <q-item v-for="(value, key) in datosSeleccionados" :key="key">
                <q-item-section>
                  <q-item-label class="text-bold text-uppercase">{{ key }}</q-item-label>
                  <q-item-label caption>{{ value }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { getData, putData } from '../services/apiClient.js'
 
  
  const columns = [
    { name: 'documentNumber', label: 'Documento', field: 'documentNumber', align: 'left' },
    { name: 'firstName', label: 'Nombres', field: 'firstName', align: 'left' },
    { name: 'lastName', label: 'Apellidos', field: 'lastName', align: 'left' },
    { name: 'phone', label: 'Teléfono', field: 'phone', align: 'left' },
    { name: 'gmail', label: 'Correo', field: 'email', align: 'left' },
    { name: 'actions', label: 'Acciones', field: 'actions', align: 'center' }
  ]
  
  const rows = ref([]) // ← Aquí se cargarán los datos desde tu backend
  
  const mostrarModal = ref(false)
  const datosSeleccionados = ref({})
  const btnStatus = ref('earrings')
  
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
  