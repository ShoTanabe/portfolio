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
        <div class="fb-btn" @click="facebookLogin"><i class="fab fa-facebook-f"></i> facebookでログイン</div>
        <div class="tw-btn" @click="twitterLogin"><i class="fab fa-twitter"></i> twitterでログイン</div>
      </div>
      <router-link to="/signup"><p class="sf-link">新規登録はこちらから</p></router-link>
    </form>
  </div>
</template>

<script>
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  TwitterAuthProvider,
  FacebookAuthProvider
  } from "firebase/auth";
import {
  collection,
  addDoc,
  getFirestore,
  getDocs
  } from "firebase/firestore";

export default {
  data() {
    return {
      address: '',
      password: '',
      failed: false,
      userList: []
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
    },
    twitterLogin() {
      const provider = new TwitterAuthProvider();

      const auth = getAuth();
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
          // You can use these server side with your app's credentials to access the Twitter API.
          const credential = TwitterAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          const secret = credential.secret;

          console.log(token);
          console.log(secret);

          // The signed-in user info.
          const user = result.user;

          getDocs(collection(getFirestore(), 'users'))
            .then((querySnapshot) => {
              this.userList = [];
              querySnapshot.forEach(doc => {
                this.userList.push(doc.data());
              });
              const list = this.userList;
              if(list.some(list => list.address === user.email) === false){
                const userData = {
                  name: user.displayName,
                  address: user.email,
                  password: '',
                  iconPath: user.photoURL
                }
                addDoc(collection(getFirestore(), 'users'), userData)
                .then(() => {
                  this.$store.commit('updateCurrentUserEmail', user.email);
                  this.$router.push('/home');
                  }
                )
                .catch(() => {
                  console.log('store失敗')
                })
              } else {
                this.$store.commit('updateCurrentUserEmail', user.email);
                this.$router.push('/home');
              }
            })
            .catch(() => {
              console.log('storeアクセス失敗')
            })

          // ...
        }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;

          console.log(errorCode);
          console.log(errorMessage);

        });

    },
    facebookLogin() {
      const provider = new FacebookAuthProvider();
      const auth = getAuth();
      signInWithPopup(auth, provider)
        .then((result) => {
          // The signed-in user info.
          const user = result.user;
          console.log(user);

          // This gives you a Facebook Access Token. You can use it to access the Facebook API.

          getDocs(collection(getFirestore(), 'users'))
            .then((querySnapshot) => {
              this.userList = [];
              querySnapshot.forEach(doc => {
                this.userList.push(doc.data());
              });
              console.log(this.userList);
              const list = this.userList;
              if(list.some(list => list.address === user.email) === false){
                const userData = {
                  name: user.displayName,
                  address: user.email,
                  password: '',
                  iconPath: user.photoURL
                }
                addDoc(collection(getFirestore(), 'users'), userData)
                .then(() => {
                  this.$store.commit('updateCurrentUserEmail', user.email);
                  this.$router.push('/home');
                  }
                )
                .catch(() => {
                  console.log('store失敗')
                })
              } else {
                this.$store.commit('updateCurrentUserEmail', user.email);
                this.$router.push('/home');
              }
            })
            .catch(() => {
              console.log('storeアクセス失敗')
            })

        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);

        });

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
    cursor: pointer;
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
    cursor: pointer;
  }

</style>
