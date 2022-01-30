<template>
    <div class="header clearfix">
      <div class="header-left">
        <p class="user-name">{{currentUserName}} 様</p>
      </div>
      <div class="header-right">
        <div class="logout-btn" @click="logout">ログアウト</div>
      </div>
    </div>
</template>

<script>
import { getAuth,signOut } from "firebase/auth";
import {
  collection,
  getFirestore,
  getDocs
  } from "firebase/firestore";

export default {
  name: 'HomeHeader',
  data() {
    return {
      userList: [],
    }
  },
  methods: {
    logout() {
      const auth = getAuth();
      signOut(auth).then(() => {
          this.$router.push('/');
      }).catch((error) => {
        console.log(error);
      });
    }
  },
  computed: {
    currentUserName() {
      const currentUserEmail = this.$store.getters.currentUserEmail;
      let UserName = 'ユーザー名を取得できません';
      this.userList.forEach((value) => {
        if(value.address === currentUserEmail) {
          UserName = value.name;
        }
        return UserName;
      });
      return UserName;
    }
  },
  created() {
    getDocs(collection(getFirestore(), 'users'))
      .then((querySnapshot) => {
        querySnapshot.forEach(doc => {
          this.userList.push(doc.data());
        });
      })
      .catch(() => {
        console.log('storeアクセス失敗')
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .header {
    height: 50px;
    border-bottom: solid 1px #333333;

    .header-left {
      width: 50%;
      float: left;
      text-align: center;
      line-height: 50px;

      .user-name {
        font-size: 0.9em;
      }

    }
    .header-right {
      width: 50%;
      float: right;
      text-align: center;
    }
    .logout-btn {
      color: #fff;
      background-color: #d1d1d1;
      border-radius: 4px;
      width: 90px;
      font-size: 0.7em;
      padding: 8px;
      margin: 10px auto 0 auto;
      cursor: pointer;
    }
  }
</style>
