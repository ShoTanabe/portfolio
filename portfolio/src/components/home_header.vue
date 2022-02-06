<template>
    <div class="header clearfix">
      <div class="header-left">
        <img :src="currentUserIcon" alt="" class="user-icon">
        <p class="user-name">{{currentUserName}} 様</p>
      </div>
      <div class="header-right">
        <div class="logout-btn" @click="logout">ログアウト</div>
      </div>
    </div>
</template>

<script>
import {
  getAuth,
  signOut
  } from "firebase/auth";
import {
  collection,
  getFirestore,
  getDocs
  } from "firebase/firestore";
import {
  getStorage,
  ref,
  getDownloadURL
  } from "firebase/storage";

export default {
  name: 'HomeHeader',
  data() {
    return {
      userList: [],
      noImage: '',
      userIcon: ''
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
      });
      return UserName;
    },
    currentUserIcon() {
      const currentUserEmail = this.$store.getters.currentUserEmail;
      let userIcon = this.noImage;
      this.userList.forEach((value) => {
        if(value.address === currentUserEmail) {
          userIcon = value.iconPath;
        }
        if(userIcon === '') {
          userIcon = this.noImage;
        }
      });
      return userIcon;
    },
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

    getDownloadURL(ref(getStorage(), 'icon/no-image.png'))
    .then((url) => {
      this.noImage = url;
      console.log(this.noImage);
    })
    .catch((error) => {
      console.log(error);
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .header {
    height: 55px;
    padding-bottom: 5px;
    border-bottom: solid 1px #333333;

    .header-left {
      width: 50%;
      float: left;
      text-align: center;
      line-height: 50px;
      display: flex;
      justify-content: center;

      .user-icon {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }

      .user-name {
        font-size: 0.9em;
        margin-left: 15px;
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
