<template>
  <div class="all">
    <div class="topBar cl">
      <span class="fl noSelect" @click="goBack()">取消</span>
      <span class="fr noSelect" @click="goComplete()">完成</span>
    </div>
    <div class="title">
      <div>
        <img src="@/assets/img/example.svg" alt="" class="">
        <span class="noSelect">一般</span>
      </div>
      <span class="noSelect number">0.00</span>
    </div>
    <div class="textInput">
      <textarea name="" v-model="remarks" placeholder="请写点什么..." maxlength="300"></textarea>
    </div>
  </div>
</template>
<script>
    export default {
      name: "addLogRemarks",
      data(){
        return {
          remarks:""
        }
      },
      methods:{
        // 取消按钮
        goBack:function () {
          this.$router.go(-1);
        },
        // 完成按钮
        goComplete:function () {
          console.log(this.remarks);
          this.$router.push({
            path:"/log/addLog",
            params:{
              remarks:this.remarks
            }
          });
        }
      }
    }
</script>

<style scoped lang="scss">
  .all {
    padding: 0 0.5rem;
  }
  .topBar {
    border-bottom:1px solid #b6b6b6;
    span{
      display: inline-block;
      text-align: center;
      font-size: 0.28rem;
      padding: 0.25rem 0;
    }
  }
  .title {
    height: 1rem;
    padding: 0.1rem 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom:1px solid #b6b6b6;
    >div {
      display: flex;
      align-items: center;
      >span {
        padding-left: 0.15rem;
      }
    }
    img {
      width: 0.7rem;
      height: 0.7rem;
      display: inline-block;
      border: 0.03rem solid #fd7469;
      border-radius: 50%;
      padding: 0.1rem;
    }
    .number {
      right: 0;
    }
  }

  .textInput {
    padding-top: 0.2rem;
    textarea {
      resize:none;
      outline:none;
      border: none;
      width: 100%;
      height: 6rem;
    }
  }
</style>
