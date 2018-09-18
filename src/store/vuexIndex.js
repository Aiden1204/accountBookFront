import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    localAlertShow: false, //控制alert框
    waittingShow:false, //控制waitting层
    routerParama:"wallet" //控制返回到底部哪个页面
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
    },
    //控制返回到底部哪个页面
    changeRouterParama(state,payload){
      state.routerParama = payload.text;
    }
  }
});

export default store
