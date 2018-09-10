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
        // $vm.ifShow = true;
        store.state.waittingShow = true;
      },
      off() {
        // $vm.ifShow = false;
        store.state.waittingShow = false;
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
