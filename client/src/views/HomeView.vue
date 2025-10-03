<template>
  <div class="q-pa-md">
    <!-- Add Book Button -->
    <div class="row justify-end q-mb-md">
      <q-btn
        color="primary"
        icon="add"
        label="Neues Buch hinzufuegen"
        @click="showAddDialog = true"
      />
    </div>

    <!-- Original Table View -->
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
              src="http://localhost:3000/images/apartment-hotel-painted-building.jpg"
              alt="Cover"
              style="height: 100px; border-radius: 6px"
            />
          </q-td>

          <q-td>
            <div><strong>Titel:</strong> {{ props.row.titel }}</div>
            <div><strong>Autor:</strong> {{ props.row.autor }}</div>
            <div><strong>Jahr:</strong> {{ formatYear(props.row.jahr) }}</div>
            <div><strong>Verlag:</strong> {{ props.row.verlag }}</div>
            <div><strong>ISBN:</strong> {{ props.row.isbn }}</div>
            <div><strong>Beschreibung:</strong> {{ props.row.beschreibung }}</div>
          </q-td>

          <q-td>
            <q-badge
              :color="props.row.status === 'verfuegbar' ? 'green' : 'red'"
              :label="props.row.status"
              align="center"
              class="q-mt-sm"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <!-- Add Book Dialog -->
    <q-dialog v-model="showAddDialog" persistent>
      <q-card style="min-width: 350px; max-width: 600px">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Neues Buch hinzufuegen</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <!-- ISBN Scanner -->
          <div class="q-mb-md">
            <q-btn
              color="secondary"
              icon="qr_code_scanner"
              label="ISBN scannen"
              @click="scanISBN"
              class="full-width"
            />
          </div>

          <q-separator class="q-mb-md" />

          <!-- Book Form -->
          <q-form @submit="addBook" class="q-gutter-md">
            <q-input
              v-model="newBook.isbn"
              label="ISBN *"
              filled
              :rules="[val => !!val || 'ISBN ist erforderlich']"
            >
              <template v-slot:append>
                <q-btn
                  flat
                  dense
                  icon="search"
                  @click="fetchBookInfo"
                  :loading="fetchingInfo"
                />
              </template>
            </q-input>

            <q-input
              v-model="newBook.titel"
              label="Titel *"
              filled
              :rules="[val => !!val || 'Titel ist erforderlich']"
            />

            <q-input
              v-model="newBook.autor"
              label="Autor *"
              filled
              :rules="[val => !!val || 'Autor ist erforderlich']"
            />

            <q-input
              v-model="newBook.jahr"
              label="Jahr *"
              type="number"
              filled
              :rules="[val => !!val || 'Jahr ist erforderlich']"
            />

            <q-input
              v-model="newBook.verlag"
              label="Verlag *"
              filled
              :rules="[val => !!val || 'Verlag ist erforderlich']"
            />

            <q-select
              v-model="newBook.kategorie"
              :options="categories"
              label="Kategorie *"
              filled
              emit-value
              map-options
              :rules="[val => !!val || 'Kategorie ist erforderlich']"
            />

            <q-input
              v-model="newBook.anzahl"
              label="Anzahl *"
              type="number"
              filled
              :rules="[val => !!val || 'Anzahl ist erforderlich']"
            />

            <q-input
              v-model="newBook.beschreibung"
              label="Beschreibung"
              type="textarea"
              filled
              rows="3"
            />

            <q-file
              v-model="newBook.bildFile"
              label="Buchcover"
              filled
              accept="image/*"
            >
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>
            </q-file>

            <q-select
              v-model="newBook.status"
              :options="['verfuegbar', 'ausgeliehen']"
              label="Status"
              filled
            />

            <div class="row q-gutter-sm justify-end">
              <q-btn label="Abbrechen" color="grey" flat v-close-popup />
              <q-btn
                label="Buch hinzufuegen"
                type="submit"
                color="primary"
                :loading="adding"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useMyStore } from '../stores/myStore';
import { useQuasar } from 'quasar';

const myStore = useMyStore();
const $q = useQuasar();

myStore.fetchdata();

const columns = [
  { name: 'bild', label: 'Bild', field: 'bild' },
  { name: 'details', label: 'Details', field: 'titel' },
  { name: 'status', label: 'Status', field: 'status' },
];

const showAddDialog = ref(false);
const adding = ref(false);
const fetchingInfo = ref(false);

const categories = [
  { label: 'Softwareentwicklung', value: 1 },
  { label: 'English', value: 2 },
  { label: 'Deutsch', value: 3 },
  { label: 'Naturwissenschaften', value: 4 },
  { label: 'GGP', value: 5 },
  { label: 'Wirtschaft', value: 6 },
  { label: 'Medientechnik', value: 7 },
  { label: 'Netzwerktechnik', value: 8 },
];

const newBook = ref({
  isbn: '',
  titel: '',
  autor: '',
  jahr: new Date().getFullYear(),
  verlag: '',
  kategorie: null,
  anzahl: 1,
  beschreibung: '',
  bildFile: null,
  status: 'verfuegbar'
});

function formatYear(date) {
  if (!date) return '';
  return new Date(date).getFullYear().toString();
}

function scanISBN() {
  $q.dialog({
    title: 'ISBN Scanner',
    message: 'Kamera-basiertes Scannen wuerde hier implementiert werden. Fuer jetzt bitte ISBN manuell eingeben.',
    prompt: {
      model: '',
      type: 'text',
      label: 'ISBN'
    },
    cancel: true,
    persistent: false
  }).onOk(isbn => {
    newBook.value.isbn = isbn;
    fetchBookInfo();
  });
}

async function fetchBookInfo() {
  fetchingInfo.value = true;
  
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    $q.notify({
      type: 'info',
      message: 'In einer echten Anwendung wuerden hier Buchdaten von einer ISBN-API geladen werden.',
      position: 'top'
    });
  } finally {
    fetchingInfo.value = false;
  }
}

async function addBook() {
  adding.value = true;
  
  try {
    await myStore.addBook(newBook.value);
    
    $q.notify({
      type: 'positive',
      message: 'Buch erfolgreich hinzugefuegt!',
      position: 'top'
    });
    
    newBook.value = {
      isbn: '',
      titel: '',
      autor: '',
      jahr: new Date().getFullYear(),
      verlag: '',
      kategorie: null,
      anzahl: 1,
      beschreibung: '',
      bildFile: null,
      status: 'verfuegbar'
    };
    
    showAddDialog.value = false;
    
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: 'Fehler beim Hinzufuegen des Buches',
      position: 'top'
    });
  } finally {
    adding.value = false;
  }
}
</script>

<style scoped>
.q-table img {
  object-fit: cover;
}
</style>