<template>
  <div class="main">
    <!--logo-->
    <img src="../assets/img/logo.png" alt="" class="loginLogo">
    <!--账号密码输入框-->
    <div class="myInputBox cl">
      <label for="username">Username</label>
      <div class="myInput">
        <input type="text" name="username" id="username" maxlength="10" v-model="username">
        <img src="../assets/img/x.png" :class="usernameIcon ? 'iconHide' : ''" @click="clearInput('username')"/>
      </div>
      <label for="password">Password</label>
      <div class="myInput">
        <input type="password" name="password" id="password" maxlength="10" v-model="password">
        <img src="../assets/img/x.png" :class="passwordIcon ? 'iconHide' : ''" @click="clearInput('password')"/>
      </div>
      <span class="forgetPass">忘记密码</span>
    </div>
    <!--登录按钮-->
    <span class="loginBtn" @click="loginSubmit()">登录</span>
    <!--注册按钮-->
    <p class="newUser">新用户？<span class="register">注册</span></p>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
      name: "login",
      data() {
        return{
          username:"",
          password:""
        }
      },
      computed:{
        // 判断用户名是否输入
        usernameIcon:function() {
          if(this.username != ""){
            return false;
          }else {
            return true
          }
        },
        // 判断密码是否输入
        passwordIcon:function() {
          if(this.password != ""){
            return false;
          }else {
            return true
          }
        }
      },
      methods:{
        // 清空账号密码输入框的内容
        clearInput:function (value) {
          switch (value){
            case "username":
              this.username = "";
              break;
            case "password":
              this.password = "";
              break;
          }
        },
        loginSubmit:function () {
          let self = this;
          axios.get('http://localhost:3000/test', {

          })
            .then(function (response) {
              console.log(response.data);
              if(response.data.flag === "1"){
                console.log("22222");
                self.$router.push('mainPage');
              }
            })
            .catch(function (error) {
              console.log(error);
            });
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

  .forgetPass {
    color: #777;
    font-size: 0.24rem;
    display: block;
    float: right;
    margin-top: 0.2rem;
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

  .newUser {
    font-size: 0.24rem;
    text-align: center;
    color: #777;
    margin-top: 0.6rem;
  }

  .register {
    color: #fd5b5f;
  }

</style>
