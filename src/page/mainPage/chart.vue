<template>
  <div>
    <p>图表</p>
    <buttomBar></buttomBar>
  </div>

</template>

<script>
  import buttomBar from '@/components/bottomBar'
  export default {
    name: "chart",
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
