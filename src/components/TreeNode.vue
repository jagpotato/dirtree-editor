<template>
  <li class="tree-node">
    <!-- <button v-if="node.isOpened" @click="toggleOpen">▽</button>
    <button v-else @click="toggleOpen">▷</button> -->
    <div class="folder" :class="{rootFolder: node.depth === 0}">
      <button class="open-button" @click="toggleOpen">
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
          <path v-if="node.isOpened" fill="#2c3e50" d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
          <path v-else fill="#2c3e50" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
        </svg>
      </button>
      <svg style="width:18px;height:18px" viewBox="0 0 24 24">
        <path fill="#f7da74" d="M10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6H12L10,4Z" />
      </svg>
      <span class="name" v-if="!node.isEditing" @dblclick="startEditing">{{node.name}}</span>
      <input type="text" class="name-editor" v-else @change="updateFolderName" :value="node.name">
      <button class="remove-button" @click.stop="removeNode" v-show="node.id > 0">
        <svg style="width:20px;height:20px" viewBox="0 0 24 24">
          <path fill="#429bf4" d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M7,13H17V11H7" />
        </svg>
      </button>
    </div>
    <ul v-show="node.isOpened">
      <li class="child-button" v-if="node.children.length === 0">
        <button @click.stop="addNode('child')">
          <svg style="width:20px;height:20px" viewBox="0 0 24 24">
            <path fill="#f44242" d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z" />
          </svg>
        </button>
      </li>
      <TreeNode v-else v-for="(child, index) in children(node)" :key="index" :node="child"></TreeNode>
    </ul>
    <div class="sibling-button" v-show="node.id > 0 && node.isLastChild">
      <button @click.stop="addNode('sibling')">
        <svg style="width:20px;height:20px" viewBox="0 0 24 24">
          <path fill="#f44242" d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z" />
        </svg>
      </button>
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
    },
    startEditing () {
      this.$store.dispatch('editor/startEditing', {
        node: this.node
      })
    },
    updateFolderName (event) {
      this.$store.dispatch('editor/updateFolderName', {
        node: this.node,
        name: event.target.value
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
button {
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  padding: 0;
}
$pathColor: #2c3e50;
$folderHeight: 30px;
ul {
  position: relative;
  &::before {
    content: '';
    width: 1px;
    height: calc(100% - 15px);
    position: absolute;
    top: 0;
    bottom: auto;
    right: auto;
    left: 30px;
    margin: auto;
    border-left: 1px dotted $pathColor;
  }
}
.folder:not(.rootFolder), .child-button, .sibling-button {
  position: relative;
  &::before {
    content: '';
    width: 30px;
    height: 1px;
    position: absolute;
    top: 0;
    bottom: 0;
    right: auto;
    left: -30px;
    margin: auto;
    border-top: 1px dotted $pathColor;
  }
}
.folder {
  height: $folderHeight;
  display: flex;
  align-items: center;
  .open-button {
    height: 100%;
    display: flex;
    align-items: center;
  }
  .name {
    cursor: default;
    font-size: 20px;
    height: 100%;
    display: flex;
    align-items: center;
    margin-left: 5px;
  }
  .name-editor {
    font-size: 20px;
  }
  .remove-button {
    height: 100%;
    margin-left: 10px;
    display: flex;
    align-items: center;
  }
}
.child-button, .sibling-button {
  height: $folderHeight;
  display: flex;
  align-items: center;
  button {
    margin-left: 5px;
  }
}
</style>
