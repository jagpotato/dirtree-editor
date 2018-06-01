<template>
  <div id="output">
    <!-- <ul>
      <DirectoryOutput :node="directories[0]"></DirectoryOutput>
    </ul> -->
    <CopyButton id="copy-button" :text="copyText(directories)"></CopyButton>
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
  background-color: #f2f2f2;
  border: 1px solid #d9d9d9;
  overflow: auto;
  #copy-button {
    position: absolute;
    top: 0;
    right: 0;
    outline: 0;
  }
  #output-tree {
    padding: 10px;
  }
}
</style>
