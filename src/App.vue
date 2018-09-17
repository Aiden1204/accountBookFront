<template>
  <div id="app" >
      <router-view/>
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

</style>
