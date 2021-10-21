<template>
 <aside>
   Currently Playing
 </aside>
</template>
<script lang='ts'>
import Vue from 'vue'
import CodableText from './codable-text.vue';

export default Vue.extend({
  name: "Spotify",
  data(){
    return {}
  },
  async created(){
    const res = await this.$spotify.getCurrentTrack();
    console.log(res);
  }
})
</script>
<style lang='postcss' scoped>

</style>
