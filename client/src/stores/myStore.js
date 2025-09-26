// ------ setup version -------
import { defineStore } from 'pinia';
import { ref } from 'vue';
import  axios from  'axios'
export const useMyStore = defineStore('myStore', () => {
  const message = ref('Viel Erfolg!');
  const daten= ref([]);

  async function fetchdata() {
    const res = await axios.get('http://localhost:3000/library'); 
    daten.value= res.data; 
  }
  return { message, daten, fetchdata };
});

// ------ option version -------
// import { defineStore } from 'pinia';
//
// export const useMyStore = defineStore('myStore', {
//   state: () => ({ message: 'Viel Erfolg!' }),
//   getters: {},
//   actions: {},
// });
