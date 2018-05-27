const state = {
  id: 4,
  directories: [
    {id: 0, name: 'aaa', parent: -1, children: [1, 2], isOpened: true, isLastChild: false},
    {id: 1, name: 'bbb', parent: 0, children: [3, 4], isOpened: true, isLastChild: false},
    {id: 2, name: 'ccc', parent: 0, children: [], isOpened: true, isLastChild: true},
    {id: 3, name: 'ddd', parent: 1, children: [], isOpened: true, isLastChild: false},
    {id: 4, name: 'eee', parent: 1, children: [], isOpened: true, isLastChild: true}
  ]
}
const getters = {
  // indent (state) {
  //   return (depth) => {
  //     return depth * 50 + 'px'
  //   }
  // },
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
    return directory => getters.children(getters.parent(directory))
  },
  descendants (state, getters) {
    return (directory) => {
      const descendant = []
      const search = (children) => {
        if (children.length === 0) {
          return 0
        } else {
          children.forEach((child) => {
            descendant.push(child)
            return search(getters.children(child))
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
    state.directories.push({id: state.id, name: 'New', parent: node.id, children: [], isOpened: false, isLastChild: true})
  },
  addSibling (state, {node, parent, sibling}) {
    state.id++
    // 兄弟追加
    sibling[sibling.length - 1].isLastChild = false
    parent.children.push(state.id)
    state.directories.push({id: state.id, name: 'New', parent: node.parent, children: [], isOpened: false, isLastChild: true})
  },
  deleteNode (state, {node, parent, descendants}) {
    parent.children = parent.children.filter(item => item !== node.id)
    state.directories = state.directories.filter(item => item.id !== node.id && descendants.every(descendant => descendant.id !== item.id))
  },
  toggleOpen (state, {node, children}) {
    const directory = state.directories.find(item => item.id === node.id)
    directory.isOpened = !directory.isOpened
  }
}
const actions = {
  addNode ({commit, getters}, {node, relation}) {
    switch (relation) {
      case 'child':
        commit('addChild', {node, children: getters.children(node)})
        break
      case 'sibling':
        commit('addSibling', {node, parent: getters.parent(node), sibling: getters.sibling(node)})
        break
      default: break
    }
  },
  deleteNode ({commit, getters}, {node}) {
    commit('deleteNode', {node, parent: getters.parent(node), children: getters.children(node), descendants: getters.descendants(node)})
  },
  toggleOpen ({commit, getters}, {node}) {
    commit('toggleOpen', {node, children: getters.children(node)})
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
