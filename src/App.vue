<template>
  <div id="app" >
    <router-view @waittingOn="waittingOn" @waittingOff="waittingOff" @_alert="_alert"/>
    <waitting ref="waitting"></waitting>
    <localAlert ref="localAlert" :message="message"></localAlert>
  </div>
</template>

<script>
  import localAlert from '@/components/localAlert.vue'
  import waitting from '@/components/waitting.vue'

  export default {
    name: 'App',
    data() {
      return{
       message:""
      }
    },
    components:{
      "localAlert":localAlert,
      "waitting":waitting
    },
    methods:{
      // 打开遮罩层
      waittingOn:function () {
        this.$refs.waitting.on();
      },
      // 关闭遮罩层
      waittingOff:function () {
        this.$refs.waitting.off();
      },
      _alert:function (message) {
        this.message = message;
        this.$refs.localAlert.on();
      }
    }
  }
</script>

<style>

</style>
