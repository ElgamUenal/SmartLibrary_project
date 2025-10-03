<script setup>
import { ref, computed } from 'vue';
import { useMyStore } from './stores/myStore';
import { useRouter } from 'vue-router';

const leftDrawerOpen = ref(false);
const router = useRouter();
const myStore = useMyStore();

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

// Get unique years, authors, and categories from books
const years = computed(() => {
  const yearSet = new Set();
  myStore.daten.forEach(book => {
    if (book.jahr) {
      const year = new Date(book.jahr).getFullYear();
      yearSet.add(year);
    }
  });
  return Array.from(yearSet).sort((a, b) => b - a);
});

const authors = computed(() => {
  const authorSet = new Set();
  myStore.daten.forEach(book => {
    if (book.autor) {
      authorSet.add(book.autor);
    }
  });
  return Array.from(authorSet).sort();
});

const categories = [
  { id: 1, name: 'Softwareentwicklung' },
  { id: 2, name: 'English' },
  { id: 3, name: 'Deutsch' },
  { id: 4, name: 'Naturwissenschaften' },
  { id: 5, name: 'GGP' },
  { id: 6, name: 'Wirtschaft' },
  { id: 7, name: 'Medientechnik' },
  { id: 8, name: 'Netzwerktechnik' },
];

// Get reference to HomeView component
const homeViewRef = ref(null);

function filterByYear(year) {
  router.push('/');
  setTimeout(() => {
    const homeView = document.querySelector('.q-page-container');
    if (homeView && homeView.__vueParentComponent) {
      // This is a workaround - in a real app, you'd use a global state or event bus
      console.log('Filter by year:', year);
    }
  }, 100);
  leftDrawerOpen.value = false;
}

function filterByAuthor(author) {
  router.push('/');
  setTimeout(() => {
    console.log('Filter by author:', author);
  }, 100);
  leftDrawerOpen.value = false;
}

function filterByCategory(category) {
  router.push('/');
  setTimeout(() => {
    console.log('Filter by category:', category);
  }, 100);
  leftDrawerOpen.value = false;
}
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <div class="row items-center">
            <q-icon name="local_library" size="md" class="q-mr-sm" />
            <span>SmartLibrary</span>
          </div>
        </q-toolbar-title>

        <q-btn dense flat round icon="search" />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      side="left"
      bordered
      :width="280"
      :breakpoint="700"
    >
      <q-scroll-area class="fit">
        <q-list padding>
          <!-- Home Link -->
          <q-item clickable v-ripple to="/" exact>
            <q-item-section avatar>
              <q-icon name="home" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Startseite</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-my-md" />

          <!-- Filter by Year -->
          <q-expansion-item
            icon="calendar_today"
            label="Nach Jahr"
            header-class="text-primary"
          >
            <q-list padding>
              <q-item
                v-for="year in years"
                :key="year"
                clickable
                v-ripple
                @click="filterByYear(year)"
              >
                <q-item-section>
                  <q-item-label>{{ year }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-badge color="primary">
                    {{ myStore.daten.filter(b => new Date(b.jahr).getFullYear() === year).length }}
                  </q-badge>
                </q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item>

          <q-separator class="q-my-sm" />

          <!-- Filter by Author -->
          <q-expansion-item
            icon="person"
            label="Nach Autor"
            header-class="text-primary"
          >
            <q-list padding>
              <q-item
                v-for="author in authors"
                :key="author"
                clickable
                v-ripple
                @click="filterByAuthor(author)"
              >
                <q-item-section>
                  <q-item-label>{{ author }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-badge color="primary">
                    {{ myStore.daten.filter(b => b.autor === author).length }}
                  </q-badge>
                </q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item>

          <q-separator class="q-my-sm" />

          <!-- Filter by Category -->
          <q-expansion-item
            icon="category"
            label="Nach Kategorie"
            header-class="text-primary"
          >
            <q-list padding>
              <q-item
                v-for="category in categories"
                :key="category.id"
                clickable
                v-ripple
                @click="filterByCategory(category.id)"
              >
                <q-item-section>
                  <q-item-label>{{ category.name }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-badge color="primary">
                    {{ myStore.daten.filter(b => b.kid === category.id).length }}
                  </q-badge>
                </q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item>

          <q-separator class="q-my-md" />

          <!-- About Link -->
          <q-item clickable v-ripple to="/about">
            <q-item-section avatar>
              <q-icon name="info" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Über uns</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style>
@font-face {
  font-family: 'Montserrat';
  src: url('/fonts/Montserrat/Montserrat-Regular.ttf') format('truetype');
}

@font-face {
  font-family: 'Lora';
  src: url('/fonts/Lora/Lora-Regular.ttf') format('truetype');
}

@font-face {
  font-family: 'LibreBodoni';
  src: url('/fonts/LibreBodoni/LibreBodoni-Regular.ttf') format('truetype');
}

* {
  font-family: 'Montserrat';
}

.q-drawer {
  background: #fafafa;
}

.q-expansion-item {
  border-radius: 8px;
  margin: 4px 0;
}

.q-item {
  border-radius: 8px;
}
</style>