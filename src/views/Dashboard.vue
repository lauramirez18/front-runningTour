<template>
    <div class="q-pa-lg dashboard-container">
        <!-- Sección de botones encima de factura-container -->
    <q-card-section class="q-pa-md flex justify-center ">

      <q-btn 
        color="warning"
        icon="hourglass_empty"
        label="pendientes"
        @click="data('earrings')"
        class="q-mx-sm"
        style=" font-weight: bold; "
      />
      <q-btn 
        color="positive"
        icon="check"
        label="Aprobadas"
        @click="data('approved')"
        class="q-mx-sm"
        style=" font-weight: bold; "
      />
    
      <q-btn 
        color="negative"
        icon="close"
        label="Rechazadas"
        @click="data('rejected')"
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
        <q-card class="" style="min-width: 400px; max-width: 90vw;">
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
    { name: 'fullName', label: 'Nombres', field: 'firstName', align: 'center' },
    { name: 'phone', label: 'Teléfono', field: 'phone', align: 'center' },
    { name: 'gmail', label: 'Correo', field: 'email', align: 'center' },
    { name: 'actions', label: 'Acciones', field: 'actions', align: 'center' }
  ]
  
  const rows = ref([]) // ← Aquí se cargarán los datos desde tu backend
  
  const mostrarModal = ref(false)
  const datosSeleccionados = ref({})
  const tableTittle = ref('')
  
  const verDetalles = (row) => {
    datosSeleccionados.value = row
    mostrarModal.value = true
  }

  
  async function update(id,state) {
    try {
      const convertState = Number(state)
      const response = await putData(`/inscription/update/${id}`,{
        data:{state:state}
      })
      console.log(response.data);
      const states={ 0:"earrings",1:"approved", 2:"rejected" }
      data(states[convertState])
      console.log("parametro", states[convertState]);
    } catch (error) {
      console.error('Error actualizando inscripciones:', error)
    }
  }


  async function data(state) {
    try {
      const response = await getData(`/inscription/data/${state}`)
      rows.value = response.data

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
    data('earrings')
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
  