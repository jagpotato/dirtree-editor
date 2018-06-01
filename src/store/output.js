const state = {}
const getters = {
  // indent (state) {
  //   return (depth) => {
  //     return depth * 50 + 'px'
  //   }
  // },
  outputText (state, getters, rootState, rootGetters) {
    /*
    return (directory) => {
      let text = ''
      for (let i = 0; i < directory.depth; i++) {
        if (i === directory.depth - 1) {
          if (directory.isLastChild === true) {
            // text += '└─'
            text += '`--'
          } else {
            // text += '├─'
            text += '|--'
          }
        } else {
          if (rootGetters['editor/parent'](directory).isLastChild === false) {
            // text += '│'
            text += '|\u0020'
          }
        }
      }
      text += directory.name
      return text
    }
    */
    return (directory) => {
      let text = directory.name
      if (directory.depth === 0) return text
      text = (directory.isLastChild === true) ? '`-- ' + text : '|-- ' + text
      const space = '    '
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
