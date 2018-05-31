import Vue from 'vue'
import Vuex from 'vuex'
import editor from './editor'
import output from './output'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    editor,
    output
  }
})
