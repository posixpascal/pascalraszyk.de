<template>
  <main>
    <Navigation />
    <nuxt-child/>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import Navigation from '~/components/navigation.vue'

export default Vue.extend({
  components: {Navigation},
})
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
main {
  font-family: 'Space Mono', monospace;
  max-width: 960px;
  margin: 0 auto;
  padding: 40px 0;
}
</style>
