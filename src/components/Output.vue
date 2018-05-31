<template>
  <div id="output">
    <!-- <ul>
      <DirectoryOutput :node="directories[0]"></DirectoryOutput>
    </ul> -->
    <DirectoryOutput :node="directories[0]"></DirectoryOutput>
  </div>
</template>

<script>
import DirectoryOutput from '@/components/DirectoryOutput'
import {mapState} from 'vuex'

export default {
  name: 'Output',
  computed: {
    ...mapState('editor', [
      'directories'
    ])
  },
  components: {
    DirectoryOutput
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
