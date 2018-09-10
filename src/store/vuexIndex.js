import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    localAlertShow: false,
    waittingShow:false
  }
});

export default store
