<template>
    <div>
      <h1>User Profile</h1>
      <div v-if="profile">
        <p>Name: {{ profile.display_name }}</p>
        <p>Email: {{ profile.email }}</p>
        <p>Country: {{ profile.country }}</p>
        <!-- Mostrar más información según sea necesario -->
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        profile: null
      }
    },
    async created() {
      const accessToken = localStorage.getItem('spotify_access_token');
      if (accessToken) {
        try {
          const response = await axios.get('https://api.spotify.com/v1/me', {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          });
          this.profile = response.data;
        } catch (error) {
          console.error('Error fetching profile', error);
        }
      } else {
        this.$router.push('/');
      }
    }
  }
  </script>