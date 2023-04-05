<script lang="ts">
  import { Gif } from '../types/GifType';

  export default {
    data() {
      return {
        gifs: [] as Gif[],
        searchedGifs: [] as Gif[],
        search: '',
        isLoading: false,
        offset: 0,
        notFoundMessage: false
      };
    },
    mounted() {
      this.fetchData();

      window.addEventListener('scroll', () => {
        const scrollPosition = window.innerHeight + window.scrollY;
        if (scrollPosition >= document.body.offsetHeight && !this.isLoading) {
            this.fetchData();
            console.log('yolo!')
        }
      });
    },

    methods: {
      async fetchData() {
      const API_KEY = 'QSdGAaJ4Dg890KIwaLaU3xbl0Ax3Jytb';
      let initialUrl = `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&offset=${this.offset}&limit=20`;
      let searchUrl = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q='${this.search}'`;
      let notFoundUrl = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag='NotFound'`;
      this.isLoading = true;

      try {
        let response = await fetch(this.search ? searchUrl : initialUrl);
        let data = await response.json();

        if (data.data.length === 0) { 
          response = await fetch(notFoundUrl);
          data = await response.json();
          this.notFoundMessage = true;
          this.searchedGifs = [data.data];
        } 
        
        else if (this.search) {
          this.gifs = [];
          this.offset = 0;
          this.notFoundMessage = false;
          this.searchedGifs = data.data;
        } 
        
        else {
          this.notFoundMessage = false;
          this.searchedGifs = [];
          this.gifs.push(...data.data);
          this.offset += 20;
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    }
   }
  }
</script>

<template>
  <v-container class="my-container">
    <v-row no-gutters class="search-box">
      <a href="/" >
        <img 
          class="logo" 
          src="../assets/logo-light.png" 
          alt="logo"
        >
      </a>

      <v-text-field 
        v-model="search" 
        type="text" 
        @input="fetchData" 
        placeholder="Search all the GIFs"
        class="bg-surface-variant rounded-t search-bar"
        hide-details
        @keyup.enter="fetchData"
      >
        <v-icon icon="mdi-magnify" class="icon-search"/>
      </v-text-field>  
    </v-row>

    <p v-if="notFoundMessage" class="not-found">
      <b>No GIFs found for "{{ search }}"</b>
    </p>
    
    <v-row no-gutters>
      <v-slide-y-transition class="py-0" group>
        <v-col 
          v-for="gif in (searchedGifs.length ? searchedGifs : gifs)" 
          :key="gif.id"
        >
          <router-link :to="{ name: 'GifCard', params: { id: gif.id }}">
            <v-card class="pa-2 ma-2 bg-surface-variant v-card">
              <img 
                :src="gif.images.fixed_height.url" 
                :alt="gif.title" 
                class="gif-image"
              >
            </v-card>
          </router-link>
        </v-col>
      </v-slide-y-transition>
    </v-row>
  </v-container>

  <div v-if="isLoading">
      <img src="../assets/Loader.gif" alt="Loading..." class="loader"> 
  </div>
</template>

<style scoped>
  .icon-search {
    margin-right: 10px;
  }
  .search-box {
    padding: 0 8px;
    margin-bottom: 10px;
  }
  .v-card {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  #scroll-trigger {
    height: 50px;
  }
  .not-found {
    color: rgb(207, 207, 207)
  }
</style>
