<template>
  <div class='console'>
    <div class='scrollbuffer'>
      <div class='line' v-for='message in scrollBuffer'>
        <div class='flex items-center'>
          <div class='command-prefix'>$</div>
          <div class='command'>{{ message.command}}</div>
        </div>
        <div class='alt'>{{ message.result }}</div>
      </div>
      <div class='bottom'></div>
    </div>
    <div class='prompt'>
      <span class='prefix'>$</span>
      <input type='text' placeholder="Enter command or type help..." v-model='text' @keyup.enter='submit'/>
    </div>
  </div>
</template>
<script lang='ts'>
import Vue from 'vue'

export default Vue.extend({
  name: "Console",
  data(){
    return {
      text: '',
      scrollBuffer: []
    }
  },
  methods: {
    async submit(){
      const [command, ...args] = this.text.split(' ');
      this.text = '';
      const result = await this.evaluate(command, args);
      this.scrollBuffer = [...this.scrollBuffer, { command, result }];
      console.log(this.scrollBuffer, command, args);
      this.$nextTick(() => {
        document.querySelector('.scrollbuffer .bottom').scrollIntoView();
      });
    },
    async evaluate(command, args){
      switch (command){
        case "whoami":
          return 'guest';

        case "ls":
          return 'README.md  PICTURE.jpg'
      }
    }
  }
})
</script>
<style scoped lang='postcss'>
  .console {
    @apply shadow-2xl bg-gray-800 text-white rounded-2xl my-10 flex flex-col p-4;
    height: 300px;
  }

  .console .scrollbuffer {
    @apply overflow-auto;
    max-height: 260px;
  }

  .console .prompt {
    @apply flex text-xl my-2;
    height: 40px;
  }

  .console .prefix {
    @apply text-xl pr-2 relative;
    top: 6px;
  }

  .console .prompt input {
    @apply bg-transparent text-lg text-white w-full outline-none border-none;
    height: 40px;
  }

  .command, .command-prefix {
    @apply text-lg;
  }

  .command-prefix {
    @apply text-xl pr-2 relative;
  }

  .alt {
    @apply text-gray-400 mb-3;
  }
</style>
