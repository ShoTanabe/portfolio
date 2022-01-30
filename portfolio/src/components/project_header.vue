<template>
    <div class="header clearfix">
      <div class="header-left">
        <p class="project-name">プロジェクト名</p>
        <p class="work-period">開始日～終了日</p>
      </div>
      <div class="header-right">
        <div class="home-btn">プロジェクト一覧へ</div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'ProjectHeader'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .header {
    height: 50px;

    .header-left {
      width: 50%;
      float: left;
      text-align: center;
      line-height: 25px;
      font-size: 0.8em;


    }
    .header-right {
      width: 50%;
      float: right;
      text-align: center;
    }
    .home-btn {
      color: #fff;
      background-color: #d1d1d1;
      border-radius: 4px;
      width: 120px;
      font-size: 0.7em;
      padding: 8px;
      margin: 10px auto 0 auto;
      cursor: pointer;
    }
  }
</style>
