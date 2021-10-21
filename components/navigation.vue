<template>
  <nav>
    <ul>
      <li class='title'>
        <CodableText text='pascalraszyk.de' />
      </li>
    </ul>
    <ul>
      <li>
        <a href='#'>
          <CodableText text='Home' />
        </a>
      </li>

      <li>
        <a href='#'>
          <CodableText text='Projects' />
        </a>
      </li>

      <li>
        <a href='#'>
          <CodableText text='Tech' />
        </a>
      </li>

      <li>
        <a href='#'>
          <CodableText text='Links' />
        </a>
      </li>
    </ul>
  </nav>
</template>
<script lang='ts'>
import Vue from 'vue'
import CodableText from './codable-text.vue';

export default Vue.extend({
  components: {CodableText}
})
</script>
<style lang='postcss' scoped>
nav, ul {
  @apply flex justify-between font-bold items-center;
}

.title {
  font-size: 24px;
}

ul {
  width: 100%;
  font-size: 16px;
}
</style>
