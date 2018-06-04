<template>
  <div id="output">
    <CopyButton :text="copyText(directories)"></CopyButton>
    <DirectoryOutput id="output-tree" :node="directories[0]"></DirectoryOutput>
  </div>
</template>

<script>
import CopyButton from '@/components/CopyButton'
import DirectoryOutput from '@/components/DirectoryOutput'
import {mapState, mapGetters} from 'vuex'

export default {
  name: 'Output',
  computed: {
    ...mapState('editor', [
      'directories'
    ]),
    ...mapGetters('output', [
      'copyText'
    ])
  },
  components: {
    CopyButton,
    DirectoryOutput
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#output {
  width: 48%;
  height: 98%;
  position: relative;
  background-color: #fafafa;
  border: 1px solid #d9d9d9;
  overflow: auto;
  #output-tree {
    padding: 10px;
  }
}
@media screen and (max-width: 480px) {
  #output {
    width: 98%;
    height: 48%;
  }
}
</style>
