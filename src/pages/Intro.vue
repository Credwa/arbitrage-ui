<template>
    <div class="intro">
      <div class="googleButtons">
        <button class="loginBtn loginBtn--google" @click="googleLogin">
          Login with Google
        </button>
      </div>
    <div class="inform">
      <h1>Arbitrage</h1>
      <br>
      <h3>
        Compare prices of foreign crypto-currency exchanges
      </h3>
    </div>
    </div>
</template>

<script>
const firebase = require('../config/firebaseInit');

export default {
  props: [],
  data() {
    return {};
  },
  methods: {
    googleLogin() {
      firebase.login();
    },
  },
  created() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.intro {
  color: #fff;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-around;
  align-items: center;
  align-content: center;
  height: 100vh;
  background-size: 100%;
  width: 100vw;
  background-image: url("../assets/graph-background.jpg");
}

.googleButtons {
  display: flex;
  flex-direction: column;
}

.loginBtn {
  box-sizing: border-box;
  position: relative;
  /* width: 13em;  - apply for fixed size */
  margin: 0.2em;
  padding: 0 15px 0 46px;
  border: none;
  text-align: left;
  line-height: 34px;
  white-space: nowrap;
  border-radius: 0.2em;
  font-size: 16px;
  color: #fff;
}
.loginBtn:before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 34px;
  height: 100%;
}
.loginBtn:focus {
  outline: none;
}
.loginBtn:active {
  box-shadow: inset 0 0 0 32px rgba(0, 0, 0, 0.1);
}
/* Google */
.loginBtn--google {
  /*font-family: "Roboto", Roboto, arial, sans-serif;*/
  background: #dd4b39;
}
.loginBtn--google:before {
  border-right: #bb3f30 1px solid;
  background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_google.png")
    6px 6px no-repeat;
}
.loginBtn--google:hover,
.loginBtn--google:focus {
  background: #e74b37;
}

/* Google */
.signUpBtn--google {
  /*font-family: "Roboto", Roboto, arial, sans-serif;*/
  background: #42a5f5;
}
.signUpBtn--google:before {
  border-right: #42a5f5 1px solid;
  background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_google.png")
    6px 6px no-repeat;
}
.signUpBtn--google:hover,
.signUpBtn--google:focus {
  background: #2196f3;
}
</style>
