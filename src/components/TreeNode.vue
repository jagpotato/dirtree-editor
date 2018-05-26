<template>
  <li id="tree-node" @click.stop="click">
    {{node.name}}
    <ul>
      <TreeNode v-for="(child, index) in node.children" :key="index" :node="child"></TreeNode>
    </ul>
  </li>
</template>

<script>
// import {mapActions} from 'vuex'
export default {
  name: 'TreeNode',
  props: {
    node: Object
  },
  methods: {
    click () {
      this.$store.dispatch('editor/print', {
        node: this.node
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
