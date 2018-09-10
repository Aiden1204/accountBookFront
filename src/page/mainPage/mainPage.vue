<template>
  <div>
    <p>{{test}}</p>
    <div class="bottomBar">
      <div class="lBtn">

      </div>
      <div class="rBtn">

      </div>
      <div class="mBtn">

      </div>
    </div>
  </div>

</template>

<script>
    export default {
      name: "mainPage",
      data(){
        return{

        }
      },
      computed:{
        test(){
          // return this.$store.state.count;
          return 123;
        }
      }
    }
</script>

<style scoped>
  .bottomBar {
    height: 1rem;
    width: 100%;
    background-color: blue;
    position: fixed;
    bottom: 0;
  }
</style>
