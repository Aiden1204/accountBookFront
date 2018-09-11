<template>
  <div>
    <p>我的</p>
    <buttomBar></buttomBar>
  </div>

</template>

<script>
  import buttomBar from '@/components/bottomBar'
  export default {
    name: "me",
    data(){
      return{

      }
    },
    computed:{

    },
    components:{
      'buttomBar':buttomBar
    }
  }
</script>

<style scoped>

</style>
