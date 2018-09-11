<template>
  <div>
    <p>时间簿</p>
    <buttomBar></buttomBar>
  </div>

</template>

<script>
  import buttomBar from '@/components/bottomBar'
  export default {
    name: "timebook",
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
