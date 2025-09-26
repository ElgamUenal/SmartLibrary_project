<script setup>
import { useMyStore } from '../stores/myStore';

const myStore = useMyStore();
myStore.fetchdata(); 

const columns = [
  {
    name: "titel",
    required: true,
    label: "titel",
    align: "left",
    field: 'titel',
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "jahr",
    required: true,
    label: "jahr",
    align: "left",
    field: 'jahr',
    format: (val) => `${val}`,
    sortable: true,
  },

  {
    name: "verlag",
    required: true,
    label: "verlag",
    align: "left",
    field: 'verlag',
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "isbn",
    required: true,
    label: "isbn",
    align: "left",
    field: 'isbn',
    format: (val) => `${val}`,
    sortable: true,
  },
  
  {
    name: "anzahl",
    required: true,
    label: "anzahl",
    align: "left",
    field: 'anzahl',
    format: (val) => `${val}`,
    sortable: true,
  },

  
  
];
</script>

<template>
  <div class="q-pa-md">
    <q-table
      title="Test"
      :rows= "myStore.daten"
      :columns="columns"
      row-key="name"
    />
  </div>
</template>