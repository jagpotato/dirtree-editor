<template>
  <div id="main" @click="closeTextBox">
    <Editor></Editor>
    <Output></Output>
  </div>
</template>

<script>
import Editor from '@/components/Editor'
import Output from '@/components/Output'

export default {
  name: 'Main',
  methods: {
    closeTextBox (event) {
      this.$store.dispatch('editor/closeTextBox', {
        target: event.target
      })
    }
  },
  components: {
    Editor,
    Output
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#main {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
@media screen and (max-width: 480px) {
  #main {
    flex-direction: column;
  }
}
</style>
