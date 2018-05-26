<template>
  <div id="editor">
    <ul v-for="(directory, index) in directories" :key="index">
      <TreeNode :node="directory"></TreeNode>
    </ul>
  </div>
</template>

<script>
import TreeNode from '@/components/TreeNode'
import {mapState} from 'vuex'

export default {
  name: 'Editor',
  computed: {
    ...mapState('editor', [
      'directories'
    ])
  },
  components: {
    TreeNode
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#editor {
  width: 50%;
  height: 100%;
  background-color: #00aa00;
}
</style>
