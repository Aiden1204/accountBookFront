import waitting from './waitting.vue'
import store from '../store/vuexIndex.js'
let $vm;

export default {
  install(Vue, options) {
    if (!$vm) {
      const _waitting = Vue.extend(waitting);

      $vm = new _waitting({
        el: document.createElement('div')
      });

      document.body.appendChild($vm.$el);
    }

    $vm.ifShow = false;

    let _waitting = {
      on() {
        store.commit('waittingOn');
      },
      off() {
        store.state.waittingShow = false;
        store.commit('waittingOff');
      }
    };

    if (!Vue.$waitting) {
      Vue.$waitting = _waitting;
    }

    Vue.mixin({
      created() {
        this.$waitting = Vue.$waitting;
      }
    })
  }
}
