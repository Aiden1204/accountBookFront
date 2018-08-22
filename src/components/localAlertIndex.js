import localAlert from './localAlert.vue'

let $vm;

export default {
  install(Vue, options) {
    if (!$vm) {
      const LocalAlert = Vue.extend(localAlert);

      $vm = new LocalAlert({
        el: document.createElement('div')
      });

      document.body.appendChild($vm.$el);
    }

    $vm.ifShow = false;

    let _alert = {
      on(text,callback) {
        $vm.ifShow = true;
        $vm.message = text;
        $vm.callback = callback;
      }
    };

    if (!Vue.$alert) {
      Vue.$alert = _alert;
    }

    Vue.mixin({
      created() {
        this.$alert = Vue.$alert;
      }
    })
  }
}
