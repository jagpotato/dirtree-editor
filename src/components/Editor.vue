<template>
  <div id="editor">
    <!-- <ul>
      <li v-for="(directory, index) in root" :key="index" :style="{marginLeft: indent(directory.depth)}">
        {{directory.name}}
      </li>
    </ul> -->
    <ul>
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
  width: 50%;
  height: 100%;
  background-color: #00aa00;
}
</style>
