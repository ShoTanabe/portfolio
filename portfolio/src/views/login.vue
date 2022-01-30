<template>
  <div class="container">
    <h2>ログイン</h2>
    <form class="login-form">
      <p v-if="failed" class="result-message">ログインできませんでした<br>メールアドレス、パスワードをご確認ください。</p>
      <div class="input-group">
        <div class="input-title">
          <label for="email">メールアドレス：</label>
        </div>
        <div class="input-area">
          <input type="email" id="email" v-model="address" @focus="resetResultMessage">
        </div>
      </div>
      <div class="input-group">
        <div class="input-title">
          <label for="password">パスワード：</label>
        </div>
        <div class="input-area">
          <input type="password" id="password" v-model="password" @focus="resetResultMessage">
        </div>
      </div>
      <div class="input-btn">
        <button class="stretched-link" type="button" @click="login">ログイン</button>
      </div>
      <div class="flex-container sns-btns">
        <div class="fb-btn"><i class="fab fa-facebook-f"></i> facebookでログイン</div>
        <div class="tw-btn"><i class="fab fa-twitter"></i> twitterでログイン</div>
      </div>
      <router-link to="/signup"><p class="sf-link">新規登録はこちらから</p></router-link>
    </form>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
  data() {
    return {
      address: '',
      password: '',
      failed: false
    }
  },
  methods: {
    login() {

      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.address, this.password)
        .then(() => {
          this.$store.commit('updateCurrentUserEmail', this.address);
          this.$router.push('/home');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log('ログイン失敗');
          console.log(errorCode);
          console.log(errorMessage);
          this.failed = true;
          this.address = '';
          this.password = '';
        });

    },
    resetResultMessage() {
      this.failed = false;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.result-message {
  color: red;
  text-align: center;
  font-size: 0.9em;
}

  .sns-btns {
    width: 410px;
    margin: 25px auto;
  }

  .fb-btn {
    background-color: #3b5998;
    color: #fff;
    padding: 10px;
    font-size: 0.9em;
    border-radius: 4px;
    width: 200px;
    text-align: center;
  }

  .tw-btn {
    margin-left: 10px;
    background-color: #00acee;
    color: #fff;
    padding: 10px;
    font-size: 0.9em;
    border-radius: 4px;
    width: 200px;
    text-align: center;
  }

</style>
