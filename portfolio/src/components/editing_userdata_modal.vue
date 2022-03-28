<template>
      <div class="modal">
        <div class="modal-content">
          <div class="modal-body">
            <p class="modal-title">ユーザーアイコンを選択</p>
            <p class="modal-text">ユーザーアイコン</p>
            <div class="modal-textbox">
              <ul>
                <li
                  v-for="iconData in this.iconsData"
                  :key="iconData.id">
                  <input
                    v-model="iconPath"
                    type="radio"
                    name="iconSelect"
                    :value="iconData.data().url"
                    class="sizeSelectSmall"><label :for="iconData.id">{{ iconData.data().url }}</label>
                </li>
              </ul>
            </div>
            <button class="ok-btn" @click="editUserData()">ユーザーデータを編集</button>
            <button class="cancel-btn" @click="closeModal()">キャンセル</button>
          </div>
        </div>
      </div>
</template>

<script>
import {
  doc,
  setDoc,
  collection,
  getFirestore,
  getDocs
 } from "firebase/firestore";

export default {
  name: 'EditingUserDataModal',
  data() {
    return {
      iconPath:'',
      iconsData: []
    }
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    },
    projectList() {
      return this.$store.getters.projectList;
    },
  },
  methods: {
    editUserData() {
      const editedUserData = {
        name: this.currentUser.name,
        address: this.currentUser.address,
        iconPath: this.iconPath,
        password: this.currentUser.password
      }
      setDoc(doc(getFirestore(), 'users', this.currentUser.id), editedUserData)
      .then(() => {
        getDocs(collection(getFirestore(), 'users'))
        .then((doc) => {
          console.log(doc)
          doc.forEach((value) => {
            if(value.id === this.currentUser.id) {
            const currentUserData = {
                id: value.id,
                name: value.data().name,
                address: value.data().address,
                password: value.data().password,
                iconPath: value.data().iconPath
            }
            this.$store.commit('updateCurrentUser', currentUserData);
            console.log(this.currentUser)
            }
          })
        })
        .catch(() => {
          console.log('データ取得失敗')
        })
      })
      .catch(() => {
        console.log('データ更新失敗')
      })

      this.projectList.forEach((project) => {

        project.projectMembers.forEach((memberData) => {
          if(memberData.name === this.currentUser.name) {
            memberData.iconPath = this.iconPath
          }

          const editedProjectData = {
            projectName: project.projectName,
            startDate: project.startDate,
            finishDate: project.finishDate,
            projectMembers: project.projectMembers
          }
          setDoc(doc(getFirestore(), 'projects', project.id), editedProjectData)
          .catch(() => {
            console.log('ストア「プロジェクト」更新失敗')
          })
        })

      })

      getDocs(collection(getFirestore(), 'projects'))
      .then((querySnapshot) => {
            const projectsData = []
            querySnapshot.forEach((doc) => {
              const projectData = {
                projectName: doc.data().projectName,
                startDate: doc.data().startDate,
                finishDate: doc.data().finishDate,
                projectMembers: doc.data().projectMembers,
                id: doc.id,
                showDeletingProjectModal: false,
                showEditingProjectModal: false,
              }
              projectsData.push(projectData)
            })
            this.$store.commit('updateProjectList', projectsData);
      })
      .catch(() => {
          console.log('ストア「プロジェクト」データ取得失敗')
      })

      this.$emit('closeEditingUserDataModal');
    },
    closeModal() {
      this.$emit('closeEditingUserDataModal');
    },
    hideUserNameError() {
      this.showUserNameError = false;
    }
  },
  created() {
    getDocs(collection(getFirestore(), 'icons'))
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.iconsData.push(doc);
        })
      }
    )
    .catch(() => {
      console.log('データ取得失敗');
    })
  }
}
</script>

<style scoped lang="scss">


.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.7);

  .modal-content {
    background-color: #fff;
    width: 500px;
    margin: 100px auto;
    border-radius: 10px;
    padding: 25px;

    @media screen and (max-width: 560px) {
      width: 90%;
    }

    .modal-body {
        width: 60%;
        margin: 0 auto;

      p.modal-title {
        text-align: center;
        font-weight: bold;
        font-size: 1.3em;
        color: #333333;
        margin-bottom: 30px;

        @media screen and (max-width: 560px) {
          font-size: 1.2em;
        }
      }

      p.modal-text {
        color: #333333;
        font-size: 0.8em;
        text-align: left;
        margin: 15px 0 5px 0;
      }

      p.modal-textbox {
        text-align: left;
        width: 100%;

        input {
          color: #333333;
          border: 1px #bbbbbb solid;
          line-height: 1.5em;
          border-radius: 3px;
          width: 100%;
        }

      }

      .ok-btn {
        display: block;
        margin: 30px auto 10px auto;
        background-color: #3a3a3a;
        padding: 10px 18px;
        border-radius: 3px;
        color: #fff;
        font-size: 0.8em;
        text-align: center;

        &:hover {
          opacity: 0.8;
        }

      }

      .cancel-btn {
        display: block;
        margin: 20px auto 0 auto;
        background-color: #3a3a3a;
        padding: 10px 18px;
        border-radius: 3px;
        color: #fff;
        font-size: 0.8em;
        text-align: center;

        &:hover {
          opacity: 0.8;
        }

      }

      p.error-messages {
        color: red;
        font-size: 0.8em;
      }

    }


  }

  }
</style>
