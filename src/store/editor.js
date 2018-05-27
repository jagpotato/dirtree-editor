const state = {
  id: 3,
  directories: [
    {id: 0, name: 'aaa', parent: -1, children: [1, 2]},
    {id: 1, name: 'bbb', parent: 0, children: [3]},
    {id: 2, name: 'ccc', parent: 0, children: []},
    {id: 3, name: 'ddd', parent: 1, children: []}
  ]
}
const getters = {
  // indent (state) {
  //   return (depth) => {
  //     return depth * 50 + 'px'
  //   }
  // },
  // root (state) {
  //   return state.directories.filter((value) => {
  //     return value.depth === 0
  //   })
  // },
  children (state) {
    return directory => directory.children.map(id => state.directories.find(item => item.id === id))
  }
}

const mutations = {
  addChild (state, node) {
    state.id++
    state.directories.find(item => item.id === node.id).children.push(state.id)
    state.directories.push({id: state.id, name: 'ggg', parent: node.id, children: []})
  },
  deleteNode (state, node) {
    const parent = state.directories.find(item => item.id === node.parent)
    // filter
    parent.children = parent.children.filter(item => item !== node.id)
    state.directories = state.directories.filter(item => item.id !== node.id)
    // indexOfで検索してsplice
    // parent.children.splice(parent.children.indexOf(node.id), 1)
    // state.directories.splice(state.directories.findIndex((item) => {
    //   return item.id === node.id
    // }), 1)
  }
}
const actions = {
  addChild ({commit}, {node}) {
    commit('addChild', node)
  },
  deleteNode ({commit}, {node}) {
    commit('deleteNode', node)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
