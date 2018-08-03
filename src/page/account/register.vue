<template>
  <div class="main">
    <!--logo-->
    <img src="../../assets/img/logo.png" alt="" class="loginLogo">
    <!--账号密码输入框-->
    <div class="myInputBox cl">
      <label for="username">Username</label>
      <div class="myInput">
        <input type="text" name="username" id="username" maxlength="10" v-model="username">
        <img src="../../assets/img/x.png" :class="usernameIcon ? 'iconHide' : ''" @click="clearInput('username')"/>
      </div>
      <label for="password">Password</label>
      <div class="myInput">
        <input type="password" name="password" id="password" maxlength="10" v-model="password">
        <img src="../../assets/img/x.png" :class="passwordIcon ? 'iconHide' : ''" @click="clearInput('password')"/>
      </div>
      <label for="rePassword">RePassword</label>
      <div class="myInput">
        <input type="password" name="rePassword" id="rePassword" maxlength="10" v-model="rePassword">
        <img src="../../assets/img/x.png" :class="rePasswordIcon ? 'iconHide' : ''" @click="clearInput('rePassword')"/>
      </div>
    </div>
    <!--注册按钮-->
    <span class="loginBtn" @click="registerSubmit()">注册</span>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "register",
    data() {
      return{
        username:"",
        password:"",
        rePassword:""
      }
    },
    components:{

    },
    computed:{
      // 判断用户名是否输入
      usernameIcon:function() {
        return (this.username === "" || this.username === undefined || this.username === null);
      },
      // 判断密码是否输入
      passwordIcon:function() {
        return (this.password === "" || this.password === undefined || this.password === null);
      },
      // 判断重复密码是否输入
      rePasswordIcon:function() {
        return (this.rePassword === "" || this.rePassword === undefined || this.rePassword === null);
      }
    },
    methods:{
      // 清空输入框的内容
      clearInput:function (value) {
        switch (value){
          case "username":
            this.username = "";
            break;
          case "password":
            this.password = "";
            break;
          case "rePassword":
            this.rePassword = "";
            break;
        }
      },
      // 注册提交
      registerSubmit:function () {
        // this.$emit('waittingOn');
        // this.$emit('_alert','test message',function () {
        //   console.log("22222");
        // });
        // 字段验证
        if(this.usernameIcon){
          this.$emit('_alert','请输入用户名');
        } else if(this.passwordIcon){
          this.$emit('_alert','请输入密码');
        } else if(this.rePasswordIcon){
          this.$emit('_alert','请重复密码');
        } else if(!(this.password === this.rePassword)){
          this.$emit('_alert','两次密码不一致');
        } else {
          let self = this;
          // 开始提交
          // this.$emit('waittingOn');
          axios.post('http://localhost:3000/users/register', {
            params:{
              username:this.username,
              password:this.password,
              rePassword:this.rePassword
            }
          })
            .then(function (response) {
              console.log(response);
              if(response.data.returnCode === '999999'){
                self.$emit('_alert',response.data.errMessage);
                self.username = "";
                self.password = "";
                self.rePassword = "";
              } else if(response.data.returnCode === '000000'){
                self.$router.push('/account/login');
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      }
    }
  }
</script>

<style scoped>
  .main {
    width: 100%;
    font-size: 0.36rem;
  }

  .loginLogo {
    width: 1.98rem;
    height: 1.98rem;
    display: block;
    margin: 1.68rem auto 0 auto;
  }

  .myInputBox {
    width: 5.25rem;
    margin: 0 auto;
  }

  .myInputBox label {
    display: block;
    color: #777;
    margin-top: 0.2rem;
  }

  .myInput {
    position: relative;
    width: 5.25rem;
    border-bottom: 1px solid #ccc;
    margin-top: 0.2rem;
  }

  .myInput input {
    display: inline-block;
    color: #777;
    width: 4.75rem;
    border: none;
    outline:medium;
    padding-bottom: 0.1rem;
    font-size: 0.36rem;
  }

  .myInput img {
    position: absolute;
    width: 0.24rem;
    height: 0.24rem;
    top: 50%;
    margin-top: -0.12rem;
    right: 0;
  }

  .iconHide {
    display: none;
  }

  .loginBtn {
    display: block;
    width: 5.28rem;
    height: 0.87rem;
    line-height: 0.87rem;
    text-align: center;
    margin: 0.6rem auto 0 auto;
    background: -webkit-linear-gradient(left, #fd9a66 , #fd5b5f); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #fd9a66, #fd5b5f); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #fd9a66, #fd5b5f); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #fd9a66 , #fd5b5f); /* 标准的语法 */
    border-radius: 0.435rem;
    color: #fff;
    box-shadow: -0.05rem 0.15rem 0.5rem #fd9a66;
  }


</style>
