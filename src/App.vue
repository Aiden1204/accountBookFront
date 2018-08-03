<template>
  <div id="app" >
    <router-view @waittingOn="waittingOn" @waittingOff="waittingOff" @_alert="_alert"/>
    <waitting ref="waitting"></waitting>
    <localAlert ref="localAlert" :message="message" :callback="callback"></localAlert>
  </div>
</template>

<script>
  import localAlert from '@/components/localAlert.vue'
  import waitting from '@/components/waitting.vue'

  export default {
    name: 'App',
    data() {
      return{
       message:"",
       callback:null
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
      // 打开提示框
      _alert:function (message,callback) {
        this.message = message;  //提示语
        this.callback = callback;  //点确定后的回调函数，默认为空
        this.$refs.localAlert.on();
      }
    }
  }
</script>

<style>

</style>
