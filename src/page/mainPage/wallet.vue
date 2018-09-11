<template>
  <div>
    <p>钱包</p>
    <buttomBar></buttomBar>
  </div>

</template>

<script>
    import buttomBar from '@/components/bottomBar'
    export default {
      name: "wallet",
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
