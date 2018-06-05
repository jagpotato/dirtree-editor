const state = {
  id: 4,
  directories: [
    {id: 0, name: 'root', parent: -1, children: [], depth: 0, isOpened: true, isEditing: false, isLastChild: true}
  ],
  isEditing: false
}
const getters = {
  root (state) {
    return state.directories.filter(item => item.parent === -1)
  },
  children (state) {
    return directory => directory.children.map(id => state.directories.find(item => item.id === id))
  },
  parent (state) {
    return directory => state.directories.find(item => item.id === directory.parent)
  },
  sibling (state, getters) {
    // return directory => getters.children(getters.parent(directory))
    return directory => getters.children(getters.parent(directory)).filter(child => child.id !== directory.id)
  },
  descendants (state, getters) {
    return (directory) => {
      const descendant = []
      const search = (children) => {
        if (children.length === 0) {
        } else {
          children.forEach((child) => {
            descendant.push(child)
            search(getters.children(child))
          })
        }
      }
      search(getters.children(directory))
      return descendant
    }
  }
}

const mutations = {
  addChild (state, {node, children}) {
    state.id++
    // 子追加
    const directory = state.directories.find(item => item.id === node.id)
    if (children.length > 0) children[children.length - 1].isLastChild = false
    directory.children.push(state.id)
    state.directories.push({id: state.id, name: 'New', parent: node.id, children: [], depth: node.depth + 1, isOpened: false, isEditing: false, isLastChild: true})
  },
  addSibling (state, {node, parent}) {
    state.id++
    // 兄弟追加
    const directory = state.directories.find(item => item.id === node.id)
    directory.isLastChild = false
    parent.children.push(state.id)
    state.directories.push({id: state.id, name: 'New', parent: node.parent, children: [], depth: parent.depth + 1, isOpened: false, isEditing: false, isLastChild: true})
  },
  removeNode (state, {node, parent, sibling, descendants}) {
    if (sibling.length > 0) sibling[sibling.length - 1].isLastChild = true
    parent.children = parent.children.filter(item => item !== node.id)
    state.directories = state.directories.filter(item => item.id !== node.id && descendants.every(descendant => descendant.id !== item.id))
  },
  toggleOpen (state, {node, children}) {
    const directory = state.directories.find(item => item.id === node.id)
    directory.isOpened = !directory.isOpened
  },
  enableEditing (state, node) {
    const directory = state.directories.find(item => item.id === node.id)
    directory.isEditing = true
    state.isEditing = true
  },
  disableEditing (state) {
    state.directories.find(directory => directory.isEditing === true).isEditing = false
    state.isEditing = false
  },
  updateFolderName (state, {node, name}) {
    const directory = state.directories.find(item => item.id === node.id)
    directory.isEditing = false
    state.isEditing = false
    directory.name = (/^[\s]+$/.test(name) || name === '') ? 'New' : name
  }
}
const actions = {
  addNode ({commit, getters}, {node, relation}) {
    switch (relation) {
      case 'child':
        commit('addChild', {node, children: getters.children(node)})
        break
      case 'sibling':
        commit('addSibling', {node, parent: getters.parent(node)})
        break
      default: break
    }
  },
  removeNode ({commit, getters}, {node}) {
    commit('removeNode', {node, parent: getters.parent(node), sibling: getters.sibling(node), descendants: getters.descendants(node)})
  },
  toggleOpen ({commit, getters}, {node}) {
    commit('toggleOpen', {node, children: getters.children(node)})
  },
  startEditing ({commit}, {node}) {
    commit('enableEditing', node)
  },
  updateFolderName ({commit}, {node, name}) {
    commit('updateFolderName', {node, name})
  },
  closeTextBox ({commit}, {target}) {
    if (state.isEditing === true && target.className !== 'name-editor') {
      commit('disableEditing')
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
