<template>
  <div class="dashboard-container">
    <panel-title title="首页图片设置" :is-line="line"></panel-title>

    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :lg="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>首页图片</span>
            <el-divider direction="vertical"></el-divider>
            <span class="text-gray" style="font-size: 12px">中文</span>
          </div>
          <div class="text item">

          </div>

        </el-card>
      </el-col>

      <el-col :xs="24" :sm="24" :lg="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>首页图片</span>
            <el-divider direction="vertical"></el-divider>
            <span class="text-gray" style="font-size: 12px">英文</span>
          </div>
          <div class="text item">

          </div>

        </el-card>
      </el-col>

      <el-col :xs="24" :sm="24" :lg="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>首页图片</span>
            <el-divider direction="vertical"></el-divider>
            <span class="text-gray" style="font-size: 12px">德文</span>
          </div>
          <div class="text item">

          </div>

        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import PanelTitle from '@/components/PanelTitle/PanelTitle'


  export default {
    name: 'Dashboard',
    components: {
      PanelTitle
    },
    data() {
      return {
        line: false
      }
    }
  }
</script>

<!--<style rel="stylesheet/scss" lang="scss">-->
<!--@import './dash.scss';-->

<!--.dashboard-container {-->
<!--background-color: #f2f2f2;-->
<!--position: absolute;-->
<!--width: 100%;-->
<!--height: 100%;-->
<!--overflow: auto;-->

<!--}-->

<!--</style>-->

<style rel="stylesheet/scss" lang="scss" scoped>
  .el-row {
    .el-col {
      margin: 10px 0;
    }
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .box-card {
  }
</style>

