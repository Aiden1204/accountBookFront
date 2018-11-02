<template>
  <div id="app" >
    <transition :name="$store.state.states">
        <router-view class="childView"></router-view>
    </transition>
  </div>
</template>

<script>

  export default {
    name: 'App',
    data() {
      return{
       message:"",
       callback:null
      }
    },
    components:{

    },
    methods:{

    }
  }
</script>

<style scoped lang="scss">
  .turn-left-enter {
    transform: translate3d(-100%, 0, 0);
    z-index: 9999;
  }
  .turn-left-leave-to {
    /* transform: translate3d(-20%, 0, 0); */
    /*z-index: 999;*/
  }
  .turn-left-enter-active{
    transition: transform 2s ease;
    /*z-index: 9999;*/
  }
  .turn-left-leave-active {
    transition: transform 2s ease;
    /*z-index: 999;*/
  }

  .childView {
    height: 100%;
    /*transition: transform 10s ease;*/
  }
</style>
