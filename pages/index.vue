<template>
  <div>
    <Console />
    <Spotify />
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import Console from '../components/console.vue'
import Spotify from '../components/spotify.vue'

export default Vue.extend({
  components: { Console, Spotify }
})
</script>
