<template>
    <div>
      <p>Authenticating...</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    async created() {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
  
      if (code) {
        try {
          const response = await axios.post('https://accounts.spotify.com/api/token', null, {
            params: {
              grant_type: 'authorization_code',
              code: code,
              redirect_uri: 'http://localhost:5173/callback',
              client_id: 'ccea0124add9444db12b2720043b8eb8',
              client_secret: '76761c8da906427ca9c7136416b47d9b',
            },
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          });
  
          const accessToken = response.data.access_token;
          localStorage.setItem('spotify_access_token', accessToken);
          this.$router.push('/profile');
        } catch (error) {
          console.error('Error exchanging code for token', error);
        }
      } else {
        console.error('Authorization code not found');
      }
    }
  }
  </script>
  