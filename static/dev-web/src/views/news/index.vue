<template>
  <div>
    <panel-title title="新闻资讯" is-line></panel-title>

    <news-filter @filterNews="filterNews" @getNewsList="getNewsList"></news-filter>

    <news-table :page-query="listQuery.pageQuery"
                :total="total"
                :data="data"
                :list-loading="loading"
                @getNewsList="getNewsList"></news-table>
  </div>

</template>

<script>
  import PanelTitle from '@/components/PanelTitle/PanelTitle'
  import NewsFilter from './NewsFilter'
  import NewsTable from './NewsTable'

  import {getNews} from '@/api/news'


  export default {
    name: "index",
    components: {
      PanelTitle,
      NewsFilter,
      NewsTable
    },
    data() {
      return {
        data: [],
        loading: true,
        total: 0,
        listQuery: {
          argsQuery: {},
          pageQuery: {
            page: 1,
            max_results: 10
          },
        }
      }
    },
    created() {
      this.getNewsList();
    },
    methods: {
      async getNewsList() {
        const params = {...this.listQuery};
        params.argsQuery['language'] = this.$store.getters.language;

        const response = await getNews(params);
        this.data = response._items;
        this.total = response._meta.total;

        this.loading = false;
      },
      filterNews(args) {
        this.listQuery.argsQuery = args;
        this.listQuery.pageQuery.page = 1;
        this.getNewsList();
      }
    }
  }
</script>

<style scoped>

</style>
