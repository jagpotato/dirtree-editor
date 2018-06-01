<template>
  <div class="directory-output">
    <!-- <span v-if="node.id > 0">
      <span v-if="!parent(node).isLastChild" v-for="n in node.depth - 1" :key="n">
        <span v-if="n === 1">&nbsp;|</span>
        <span v-else>&nbsp;&nbsp;&nbsp;&nbsp;|</span>
      </span>
      <span v-else>
        <span v-if="n === 1">&nbsp;|</span>
        <span v-else>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
      </span>
      <span v-if="node.isLastChild">
        <span v-if="node.depth === 1">&nbsp;`-^-</span>
        <span v-else>&nbsp;&nbsp;&nbsp;`-^-</span>
      </span>
      <span v-else>
        <span v-if="node.depth === 1">&nbsp;|-^-</span>
        <span v-else>&nbsp;&nbsp;&nbsp;|-^-</span>
      </span>
    </span> -->
    <!-- {{node.name}} -->
    <!-- <pre>{{outputText(node)}}</pre> -->
    <span>{{outputText(node)}}</span>
    <DirectoryOutput v-show="node.isOpened" v-for="(child, index) in children(node)" :key="index" :node="child"></DirectoryOutput>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'DirectoryOutput',
  props: {
    node: Object
  },
  computed: {
    ...mapGetters('editor', [
      'parent',
      'children'
    ]),
    ...mapGetters('output', [
      'outputText'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.directory-output {
  white-space: pre;
}
</style>
