<template>
  <div id="copy">
    <transition name="copy" @after-enter="removeMessage" :duration="1000">
      <span id="copy-message" v-show="isCopied">Copy!</span>
    </transition>
    <button id="copy-button" @click="copy" :data-clipboard-text="text">
      <svg style="width:24px;height:24px" viewBox="0 0 24 24">
        <path fill="#000000" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" />
      </svg>
    </button>
  </div>
</template>

<script>
import Clipboard from 'clipboard'
export default {
  name: 'CopyButton',
  data () {
    return {
      isCopied: false
    }
  },
  props: {
    text: String
  },
  methods: {
    copy () {
      const clip = new Clipboard('#copy-button')
      clip.on('success', (e) => {
        this.isCopied = true
      })
    },
    removeMessage () {
      this.isCopied = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#copy {
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  #copy-message {
    font-size: 13px;
    color: #28A745;
  }
  #copy-button {
    width: 30px;
    height: 30px;
    cursor: pointer;
    border: 0;
    outline: 0;
    padding: 0;
    background-color: transparent;
    display: flex;
    justify-content: center;
  }
}
.copy-enter-active, .copy-leave-active {
  transition: all 0.3s ease;
}
.copy-enter, .copy-leave-to {
  opacity: 0;
}
</style>
