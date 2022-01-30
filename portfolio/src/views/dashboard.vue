<template>
  <div class="container">
    <HomeHeader></HomeHeader><br>
    <ProjectHeader></ProjectHeader>
    <div class="clearfix switch-search-container">
      <div class="switch-area">
        <SwitchBtn
          @changeSortType="changeSortType"></SwitchBtn>
      </div>
      <div class="search-area">
        <SearchBox></SearchBox>
      </div>
    </div>
    <div>
      <h2>タスク一覧</h2>
      <div v-if="showDateSortedTasks">
        <p class="sort-type">- 日付ごと -</p>
        <div class="tasks-area">
          <p class="scheduled-date"><i class="fas fa-star"></i> 9月14日</p>
          <div class="task-card clearfix">
            <div class="card-left">
              <div class="name-period">
                <p class="task-name">タスク名</p>
                <p class="work-period">開始時刻 ～ 終了時刻</p>
              </div>
              <div class="user-icons">担当者：</div>
            </div>
            <div class="card-right">
              <div class="close-btn">
                <i class="fas fa-times"></i>
              </div>
              <div class="opt-btn">
                <i class="fas fa-cog"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="showLeaderSortedTasks">
        <p class="sort-type">- 担当者ごと -</p>
        <div class="tasks-area">
          <p class="scheduled-date"><i class="fas fa-star"></i> 大島チーフ</p>
          <div class="task-card clearfix">
            <div class="card-left">
              <div class="name-period">
                <p class="task-name">タスク名</p>
                <p class="work-period">開始時刻 ～ 終了時刻</p>
              </div>
              <div class="user-icons">担当者：</div>
            </div>
            <div class="card-right">
              <div class="close-btn">
                <i class="fas fa-times"></i>
              </div>
              <div class="opt-btn">
                <i class="fas fa-cog"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="create-task-btn">
        <i class="fas fa-plus"></i> タスクを追加
      </div>
    </div>
  </div>
</template>

<script>
import HomeHeader from '@/components/home_header.vue'
import ProjectHeader from '@/components/project_header.vue'
import SwitchBtn from '@/components/switch_btn.vue'
import SearchBox from '@/components/search_box.vue'

export default {
  components: {
    HomeHeader,
    ProjectHeader,
    SwitchBtn,
    SearchBox
  },
  data() {
    return {
      showDateSortedTasks: true,
      showLeaderSortedTasks: false,
    }
  },
  methods: {
    changeSortType(status) {
      if(status === false) {
        this.showDateSortedTasks = true;
        this.showLeaderSortedTasks = false;
      } else {
        this.showDateSortedTasks = false;
        this.showLeaderSortedTasks = true;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

  .container {
    h2 {
      margin: 60px 0 0 0;
      font-size: 1.6em;
    }

    .sort-type {
      font-size: 0.9em;
      text-align: center;
      margin: 5px 0 60px 0;
    }

    .scheduled-date {
      font-size: 1.4em;
      font-weight: bold;
      margin: 0 0 20px 15px;
      color: #333333;
    }

    .switch-search-container{
      margin-top: 60px;

      .switch-area {
        width: 35%;
        float: left;
      }

      .search-area {
        width: 65%;
        float: left;
      }
    }

    .switch-area {
      width: 50%;
      float: left;
    }

    .search-area {
      width: 50%;
      float: left;
    }

  .create-task-btn {
      width: 240px;
      margin: 30px auto 10px auto;
      border-radius: 25px;
      border: 1px solid #5c5c5c;
      background-color: #5c5c5c;
      color: #fff;
      text-align: center;
      padding: 15px;
      cursor: pointer;

      &:hover {
        border: 1px solid #5c5c5c;
        color: #5c5c5c;
        background-color: #fff;
      }
  }

  .task-card {
    border: solid #305baa 2px;
    border-radius: 5px;
    cursor: pointer;
    position: relative;

    .card-left {
      display: flex;
      width: 95%;
      padding: 30px;

      @media screen and (max-width: 760px) {
        display: block;
        width: 100%;
        padding: 15px;
      }

      .name-period {
        width: 40%;

        @media screen and (max-width: 760px) {
          width: 90%;
          text-align: center;
        }

        .task-name {
          margin-top: 20px;
          font-size: 1.3em;
          font-weight: bold;
          color: #444444;
        }

        .work-period {
          margin: 10px;
          font-size: 0.9em;
        }
      }

      .user-icons {
        margin: 0 10px 0 50px ;
        padding: 30px 20px;
        width: 60%;

        @media screen and (max-width: 760px) {
          text-align: center;
          margin: 0 0 15px 0;
          padding: 0;
          width: 90%;
        }
      }
    }


    &:hover {
      border: solid 2px #fff;
      box-shadow: 0 0 5px #333333;
    }

      .close-btn{
        position: absolute;
        right: 10px;
        top: 10px;
        font-size: 1.6em;
        color: #444444;

        &:hover {
          color: #bbbbbb;
        }
      }
      .opt-btn{
        position: absolute;
        right: 10px;
        bottom: 10px;
        font-size: 1.6em;
        color: #444444;

        &:hover {
          color: #bbbbbb;
        }
      }
  }


  }



</style>
