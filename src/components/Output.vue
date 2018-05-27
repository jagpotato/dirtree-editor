<template>
  <div id="output">
    {{directories}}
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'Output',
  computed: {
    ...mapState('editor', [
      'directories'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#output {
  width: 50%;
  height: 100%;
  background-color: #aaaaaa;
}
</style>
