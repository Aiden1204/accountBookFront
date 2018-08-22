import waitting from './waitting.vue'

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
        $vm.ifShow = true;
      },
      off() {
        $vm.ifShow = false;
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
