<template>
  <div class="all">
    <div class="topBar cl">
      <span class="fl noSelect" @click="goBack()">取消</span>
      <span class="fr noSelect" @click="goComplete()">完成</span>
    </div>
    <div class="title">
      <div>
        <img :src="expensesList[categoryIndex].imgUrl" alt="" class="">
        <span class="noSelect">{{expensesList[categoryIndex].title}}</span>
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
          remarks:"", //备注
          categoryIndex:0, //上个页面所选的index
          expensesList:[] //类别列表
        }
      },
      methods:{
        // 取消按钮
        goBack:function () {
          this.$router.push({
            name:"addLog",
            params:{
              categoryIndex:this.categoryIndex,
              expensesList:this.expensesList
            }
          });
        },
        // 完成按钮
        goComplete:function () {
          this.$router.push({
            name:"addLog",
            params:{
              remarks:this.remarks,
              categoryIndex:this.categoryIndex,
              expensesList:this.expensesList
            }
          });
        }
      },
      beforeMount:function(){
        // 上个页面传来的参数
        this.remarks = this.$route.params.remarks;
        this.categoryIndex = this.$route.params.categoryIndex;
        this.expensesList = this.$route.params.expensesList;
      },
      mounted:function () {

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
