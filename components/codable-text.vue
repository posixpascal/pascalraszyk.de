<template>
  <div>
    {{ shadowText }}
  </div>
</template>
<script lang='ts'>
import Vue from 'vue'

export default Vue.extend({
  data(){
    return {
      shadowText: "",
      interval: null,
      shadowIndex: 0
    }
  },
  props: {
    text: {
      required: true
    }
  },
  watch: {
    "text": {
      immediate: true,
      handler()
      {
        this.shadowIndex = 0;
        this.shadowText = Array.from({ length: this.text.length }).map(char => this.randomChar()).join('');

        this.interval = setInterval(() => {
          if (this.shadowIndex > this.text.length){
            clearInterval(this.interval);
            return;
          }

          if (Math.random() < 0.30) {
            this.setShadowChar(this.shadowIndex, this.text[this.shadowIndex]);
            this.shadowIndex++;
            return;
          }

          this.setShadowChar(this.shadowIndex, this.randomChar());
        }, 50)
      }
    }
  },
  methods: {
    setShadowChar(index, char){
      const chars = this.shadowText.split('');
      chars[index] = char;
      this.shadowText = chars.join('');
    },
    randomChar(){
      const randomCharCode = (60 + (Math.random() * 55)).toFixed(0);
      return String.fromCharCode([randomCharCode])
    }
  }
})
</script>
