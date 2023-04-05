<script lang="ts">
import { Gif } from '../types/GifType';

export default {
   data() {
    return {
      gif: {} as Gif,
      id: this.$route.query.gif_id as string
    };
  },
  mounted() {
    if (typeof this.$route.query.gif_id === 'string' 
      && this.$route.query.gif_id.length > 0) {
      this.loadGif(this.$route.query.gif_id);
    }
  },

  methods: {
    loadGif(gif_id: string) {
      const API_KEY = 'QSdGAaJ4Dg890KIwaLaU3xbl0Ax3Jytb';

      fetch(`https://api.giphy.com/v1/gifs/${gif_id}?api_key=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
          this.gif = data.data;
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
}
</script>

<template>
  <div class="user-info">
    <router-link :to="{ name: 'MainPage' }">
      <img src="../assets/logo-light.png" alt="logo">
    </router-link>

    <router-link :to="{ name: 'GifCard', params: { id: id }}">
      <v-icon icon="mdi-arrow-left-circle" class="icon-search"/>
      Back to GIF
    </router-link>
    
    <p class="username">
      <b>{{ gif.user ? gif.user.username : '' }}</b>
    </p>
    
    <div>
      <img 
        v-if="gif.user" 
        :src="gif.user.avatar_url" 
        :alt="gif.title" 
        class="avatar"
      >
    </div>

    <a 
      v-if="gif.user" 
      :href="gif.user.profile_url" 
      target="_blank"
    >
      User Link
    </a>
  </div>
</template>

<style scoped>
  .avatar {
    width: 200px;
    height: 200px;
    margin: 20px 0;
  }
  .user-info {
    max-width: 500px;
    min-width: 320px;
    background-color: rgb(18, 18, 18);
    color: rgb(207, 207, 207);
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px 0;
    padding: 10px 0;
  }
  .icon-search {
    margin: 20px 0;
  }
</style>