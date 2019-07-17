<template>
  <el-row>
    <el-col :span="24">
      <el-input v-model="filter.title" placeholder="标题" style="width: 150px;" clearable></el-input>

      <el-button v-waves type="primary" @click="selectUsers">
        <i class="el-icon-search"></i>
        <span>查 询</span>
      </el-button>

      <el-button v-waves type="success" @click="createNews">
        <i class="el-icon-plus"></i>
        <span>创 建</span>
      </el-button>
    </el-col>

    <create-news-dialog ref="news_dialog" @getNewsList="toGetNewsList"></create-news-dialog>
  </el-row>
</template>

<script>
  import waves from '@/directive/waves'
  import CreateNewsDialog from './CreateNewsDialog'

  export default {
    name: "NewsFilter",
    directives: {
      waves
    },
    components: {
      CreateNewsDialog
    },
    data() {
      return {
        filter: {
          title: null,
        },
      }
    },
    methods: {
      selectUsers() {
        const params = {...this.filter};
        let result = {};
        for (const [key, val] of Object.entries(params)) {
          if (val) result[key] = `like(\"%25${val}%25\")`
        }
        this.$emit('filterNews', result)
      },

      createNews() {
        this.$refs.news_dialog.showNewsDialog()
      },

      toGetNewsList() {
        this.$emit('getNewsList')
      }
    }
  }
</script>
