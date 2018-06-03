<template>
  <div id="editor">
    <ul id="tree">
      <TreeNode :node="directories[0]"></TreeNode>
    </ul>
  </div>
</template>

<script>
import TreeNode from '@/components/TreeNode'
import {mapState, mapGetters} from 'vuex'

export default {
  name: 'Editor',
  computed: {
    ...mapState('editor', [
      'directories'
    ]),
    ...mapGetters('editor', [
      'root'
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
  width: 48%;
  height: 98%;
  background-color: #fafafa;
  border: 1px solid #d9d9d9;
  overflow: auto;
}
#tree {
  padding: 0;
  margin: 0;
  padding: 10px;
}
</style>
