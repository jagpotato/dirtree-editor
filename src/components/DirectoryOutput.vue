<template>
  <div class="directory-output">
    <span>{{outputText(node)}}</span>
    <DirectoryOutput v-show="node.isOpened" v-for="(child, index) in children(node)" :key="index" :node="child"></DirectoryOutput>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

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
  span {
    font-size: 20px;
  }
}
</style>
