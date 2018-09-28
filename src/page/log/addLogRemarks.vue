<template>
  <div class="all">
    <div class="topBar cl">
      <span class="fl noSelect" @click="goBack()">取消</span>
      <span class="fr noSelect" @click="goComplete()">完成</span>
    </div>
    <div class="title">
      <div>
        <img :src="list[index].imgUrl" alt="" class="">
        <span class="noSelect">{{list[index].title}}</span>
      </div>
      <span class="noSelect number">{{money}}</span>
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
          index:0, //上个页面所选的index
          list:[], //类别列表
          status:"", //收入or支出
          expensiveIndex:-1, //支出选项的index
          incomeIndex:-1, //收入选项的index
          expensesList:[], //支出类别列表
          incomeList:[], //收入类别列表
          expensiveImgUrl:'', //支出图片的地址
          incomeImgUrl:'', //收入图片的地址
          money:'' //金额
        }
      },
      methods:{
        // 取消按钮
        goBack:function () {
          this.$router.push({
            name:"addLog",
            params:{
              status:this.status, //收入or支出
              expensiveIndex:this.expensiveIndex, //支出选项的index
              incomeIndex:this.incomeIndex, //收入选项的index
              expensiveImgUrl:this.expensiveImgUrl, //支出图片的地址
              incomeImgUrl:this.incomeImgUrl, //收入图片的地址
              expensesList:this.expensesList, //支出类别列表
              incomeList:this.incomeList, //收入类别列表
              money:this.money //金额
            }
          });
        },
        // 完成按钮
        goComplete:function () {
          this.$router.push({
            name:"addLog",
            params:{
              remarks:this.remarks,
              status:this.status, //收入or支出
              expensiveIndex:this.expensiveIndex, //支出选项的index
              incomeIndex:this.incomeIndex, //收入选项的index
              expensesList:this.expensesList, //支出类别列表
              incomeList:this.incomeList, //收入类别列表
              expensiveImgUrl:this.expensiveImgUrl, //支出图片的地址
              incomeImgUrl:this.incomeImgUrl, //收入图片的地址
              money:this.money //金额
            }
          });
        }
      },
      beforeMount:function(){
        // 上个页面传来的参数
        if(this.$route.params.status === '支出'){
          this.index = this.$route.params.expensiveIndex;
          this.list = this.$route.params.expensesList;
        } else if(this.$route.params.status === '收入'){
          this.index = this.$route.params.incomeIndex;
          this.list = this.$route.params.incomeList;
        }
        this.remarks = this.$route.params.remarks;
        this.status = this.$route.params.status; //收入or支出
        this.expensiveIndex = this.$route.params.expensiveIndex; //支出选项的index
        this.incomeIndex = this.$route.params.incomeIndex; //收入选项的index
        this.expensiveImgUrl = this.$route.params.expensiveImgUrl; //支出图片的地址
        this.incomeImgUrl = this.$route.params.incomeImgUrl; //收入图片的地址
        this.expensesList = this.$route.params.expensesList;//支出类别列表
        this.incomeList = this.$route.params.incomeList; //收入类别列表
        this.money = this.$route.params.money; //金额
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
