<script lang="ts">
import { Gif } from '../types/GifType';

export default {
  props: ['id'],
  data() {
    return {
      gif: {} as Gif,
      gifs: [] as Gif[],
      isLoading: false,
    };
  },
  created() {
    this.loadGif(this.id);
  },
  mounted() {
    this.loadGifs();
  },

  methods: {
    loadGif(id: string) {
      const API_KEY = 'QSdGAaJ4Dg890KIwaLaU3xbl0Ax3Jytb';
      this.isLoading = true;

      fetch(`https://api.giphy.com/v1/gifs/${id}?api_key=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
          this.gif = data.data;
          this.isLoading = false;
        })
        .catch(error => {
            console.error(error);
        });
    },

    loadGifs() {
      const API_KEY = 'QSdGAaJ4Dg890KIwaLaU3xbl0Ax3Jytb';

      fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
          this.gifs = data.data.filter((gif: Gif) => gif.id !== this.gif.id);
        })
        .catch(error => {
          console.error(error);
        });
    }
  },
};
</script>

<template>
  <div class="my-container gif-info">
    <router-link :to="{ name: 'MainPage' }">
      <img src="../assets/logo-light.png" alt="logo" class="logo-gif-page">
    </router-link>
    
    <p class="gif-title"><b>{{gif.title}}</b></p>
    
    <img
      :src="gif.images.original.url" 
      :alt="gif.title" 
      class="gif-image"
    >

    <div v-if="isLoading">
      <img src="../assets/Loader.gif" alt="Loading..." class="loader"> 
    </div>
    
    <p v-if="gif.user">GIF uploaded by user:</p>

    <router-link v-if="gif.user" :to="{ 
        name: 'UserCard', 
        params: { user: gif.user.username }, 
        query: { gif_id: gif.id } }"
    >
      <p class="user-title">
         <b>{{gif.user.username}}</b> 
      </p>
    </router-link>

    <p v-else class="user-title">
      GIF uploaded by service: <a href="https://giphy.com/" target="_blank">giphy.com</a>
    </p>
  
    <v-carousel 
      hide-delimiters 
      height="200"
      cycle
      interval="4000"
      class="carousel"
    >
      <v-carousel-item>
        <img :src="gif.images.fixed_height.url" alt="initial-gif">
      </v-carousel-item>

      <v-carousel-item
        v-for="gif in gifs"
        :key="gif.id"
        @click="loadGif(gif.id)"
        class="carousel-item"
      >
        <router-link :to="{ name: 'GifCard', params: { id: gif.id }}">
          <img :src="gif.images.fixed_height.url" alt="gif" class="carousel-gif">
        </router-link>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<style scoped>
.mdi-chevron-right {
  width: 10px;
}
.carousel {
  margin: 20px 0;
  max-width: 500px;
}
.gif-info {
  color: rgb(207, 207, 207);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
  padding: 10px 0;
  border-radius: 4px;
}
.gif-image {
  margin: 10px 0;
}
.gif-title {
  margin: 20px 0;
}
.user-title {
  margin-bottom: 20px;
}
</style>