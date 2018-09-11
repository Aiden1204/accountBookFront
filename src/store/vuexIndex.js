import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    localAlertShow: false, //控制alert框
    waittingShow:false //控制waitting层
  },
  mutations: {
    // 开启alert框
    localAlertOn (state) {
      state.localAlertShow = true;
    },
    // 关闭alert框
    localAlertOff (state) {
      state.localAlertShow = false;
    },
    // 开启waitting层
    waittingOn(state){
      state.waittingShow = true;
    },
    // 关闭waiting层
    waittingOff(state){
      state.waittingShow = false;
    }
  }
});

export default store
