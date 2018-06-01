<template>
  <div id="output">
    <!-- <ul>
      <DirectoryOutput :node="directories[0]"></DirectoryOutput>
    </ul> -->
    <DirectoryOutput id="output-tree" :node="directories[0]"></DirectoryOutput>
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
  width: 48%;
  height: 98%;
  background-color: #f2f2f2;
  border: 1px solid #d9d9d9;
  overflow: auto;
  #output-tree {
    padding: 10px;
  }
}
</style>
