// ------ setup version -------
import { defineStore } from 'pinia';
import { ref } from 'vue';
import  axios from  'axios'
import axios from 'axios';
export const useMyStore = defineStore('myStore', () => {
  const message = ref('Viel Erfolg!');
  const daten = ref([]);

  async function fetchdata() {
    const res = await axios.get('http://localhost:3000/library');
    daten.value = res.data;
  }

  async function addBook(item) {
    const payload = {
      isbn: item.isbn,
      anzahl: item.anzahl,
      entlehnung: null,
      verlag: item.verlag,
      jahr: `${item.jahr}-01-01`, // PostgreSQL timestamp-kompatibel
      titel: item.titel,
      status: item.status,
      bild: item.bildFile ? item.bildFile.name : 'default_cover.jpg', // Fallback-Bild
      administrator: 'admin',
      sid: 1,
      autor: item.autor,
      kid: item.kategorie, // muss 1 oder 2 sein
      beschreibung: item.beschreibung,
    };
    const res = await axios.post('http://localhost:3000/library/create', payload);
    daten.value.push(res.data.buch);
  }

  async function deleBook(item) {
    await axios.delete(`http://localhost:3000/library/delete/${item.id}`);
    daten.value = daten.value.filter(b=> b.id != item.id)

  }

  return { message, daten, fetchdata, addBook, deleBook };
});
