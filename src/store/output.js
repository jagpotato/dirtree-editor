const state = {}
const getters = {
  outputText (state, getters, rootState, rootGetters) {
    return (directory) => {
      let text = directory.name
      if (directory.depth === 0) return text
      text = (directory.isLastChild === true) ? '`-- ' + text : '|-- ' + text
      const space = '      '
      let parentId = directory.parent
      while (parentId >= 0) {
        directory = rootGetters['editor/parent'](directory)
        if (directory.isLastChild === false) {
          text = '|' + space + text
        } else {
          text = (parentId === 0) ? '  ' + text : space + text
        }
        parentId = directory.parent
      }
      return text
    }
  },
  copyText (state, getters, rootState, rootGetters) {
    return (directories) => {
      const text = []
      const search = (directory) => {
        if (directory.children.length === 0) {
          text.push(getters.outputText(directory))
        } else {
          text.push(getters.outputText(directory))
          rootGetters['editor/children'](directory).forEach((child) => {
            search(child)
          })
        }
      }
      search(directories[0])
      return text.join('\n')
    }
  }
}
const mutations = {}
const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
