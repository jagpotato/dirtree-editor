const state = {
  directories: [
    {name: 'aaa', children: [{name: 'ccc', children: [{name: 'ddd', children: []}]}]},
    {name: 'bbb', children: []}
  ]
}
const mutations = {
  add (state) {
  }
}
const actions = {
  print ({commit}, {node}) {
    console.log(node)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
