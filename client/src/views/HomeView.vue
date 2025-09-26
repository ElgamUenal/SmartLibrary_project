<template>
  <div class="q-pa-md">
    <q-table
      :rows="myStore.daten"
      :columns="columns"
      row-key="isbn"
      flat
      bordered
      hide-header
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td>
            <img
              :src="props.row.bild"
              alt="Cover"
              style="height: 100px; border-radius: 6px"
            />
          </q-td>

          <q-td>
            <div><strong>Titel:</strong> {{ props.row.titel }}</div>
            <div><strong>Autor:</strong> {{ props.row.autor }}</div>
            <div><strong>Jahr:</strong> {{ props.row.jahr }}</div>
            <div><strong>Verlag:</strong> {{ props.row.verlag }}</div>
            <div><strong>ISBN:</strong> {{ props.row.isbn }}</div>
            <div><strong>Beschreibung:</strong> {{ props.row.beschreibung }}</div>
          </q-td>

          <q-td>
            <q-badge
              :color="props.row.status === 'verfügbar' ? 'green' : 'red'"
              :label="props.row.status"
              align="center"
              class="q-mt-sm"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { useMyStore } from '../stores/myStore';

const myStore = useMyStore();
myStore.fetchdata();

const columns = [
  { name: 'bild', label: 'Bild', field: 'bild' },
  { name: 'details', label: 'Details', field: 'titel' },
  { name: 'status', label: 'Status', field: 'status' },
];
</script>

<style scoped>
.q-table img {
  object-fit: cover;
}
</style>
