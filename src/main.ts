import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

import { createRouter, createWebHistory } from 'vue-router'

import MainPage from './components/MainPage.vue';
import GifCard from './components/GifCard.vue';
import UserCard from './components/UserCard.vue';

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    }
  },
})

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {path: '/Zoiex/', name: 'MainPage', component: MainPage, props: true},
    {path: '/Zoiex/gifcard/:id', name: 'GifCard', component: GifCard, props: true},
    {path: '/Zoiex/user/:user', name: 'UserCard', component: UserCard, props: true}
  ]
})

createApp(App).use(router).use(vuetify).mount('#app')
