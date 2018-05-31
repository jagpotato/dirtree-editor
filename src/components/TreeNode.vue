<template>
  <li id="tree-node">
    <button v-if="node.isOpened" @click="toggleOpen">▽</button>
    <button v-else @click="toggleOpen">▷</button>
    {{node.id}}
    <button @click.stop="removeNode" v-show="node.id > 0">×</button>
    <ul v-show="node.isOpened">
      <li v-if="node.children.length === 0">
        <button @click.stop="addNode('child')">+</button>
      </li>
      <TreeNode v-else v-for="(child, index) in children(node)" :key="index" :node="child"></TreeNode>
    </ul>
    <div v-show="node.id > 0 && node.isLastChild">
      <button @click.stop="addNode('sibling')">+</button>
    </div>
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
    addNode (relation) {
      this.$store.dispatch('editor/addNode', {
        node: this.node,
        relation: relation
      })
    },
    removeNode () {
      this.$store.dispatch('editor/removeNode', {
        node: this.node
      })
    },
    toggleOpen () {
      this.$store.dispatch('editor/toggleOpen', {
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
