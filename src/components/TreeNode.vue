<template>
  <li id="tree-node">
    {{node.name}}
    <button @click.stop="addChild">add</button>
    <button @click.stop="deleteNode">delete</button>
    <ul>
      <TreeNode v-for="(child, index) in children(node)" :key="index" :node="child"></TreeNode>
    </ul>
  </li>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'TreeNode',
  props: {
    node: Object
  },
  methods: {
    addChild () {
      this.$store.dispatch('editor/addChild', {
        node: this.node
      })
    },
    deleteNode () {
      this.$store.dispatch('editor/deleteNode', {
        node: this.node
      })
    }
  },
  computed: {
    ...mapGetters('editor', [
      'children'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
