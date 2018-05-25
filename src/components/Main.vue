<template>
  <div id="main">
    <Editor></Editor>
    <Output></Output>
  </div>
</template>

<script>
import Editor from '@/components/Editor'
import Output from '@/components/Output'
import {mapState} from 'vuex'

export default {
  name: 'Main',
  computed: {
    ...mapState('editor', [
      'potato'
    ])
  },
  components: {
    Editor,
    Output
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#main {
  width: 100%;
  height: 100%;
  display: flex;
}
</style>
