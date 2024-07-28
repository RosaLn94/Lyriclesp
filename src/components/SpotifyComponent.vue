<template>
    <button @click="redirectToSpotify">Login con Spotify</button>
</template>
<script setup>
const redirectToSpotify = () => {
      const clientId = 'ccea0124add9444db12b2720043b8eb8';
      const redirectUri = 'http://localhost:5173/callback';
      const scopes = 'user-read-private user-read-email';
      const url = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${encodeURIComponent(scopes)}`;
      window.location.href = url;
    }
</script>