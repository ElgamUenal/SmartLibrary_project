<script setup>
import { useMyStore } from '../stores/myStore';

const myStore = useMyStore();
myStore.fetchdata(); 

const columns = [
  {
    name: "name",
    required: true,
    label: "Name",
    align: "left",
    field: 'name',
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