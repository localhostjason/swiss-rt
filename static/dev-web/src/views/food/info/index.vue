<template>
  <div>
    <panel-title title="菜品管理"></panel-title>


    <filter-table @getInfoList="getInfoList" @filterInfo="filterInfo"></filter-table>

    <info-table :data="data" :list-loading="listLoading"
                @getInfoList="getInfoList"></info-table>
  </div>
</template>

<script>
  import PanelTitle from '@/components/PanelTitle/PanelTitle'

  import FilterTable from './FilterTable'
  import InfoTable from './InfoTable'

  import {getFood} from '@/api/food/info'

  export default {
    name: "index",
    components: {
      PanelTitle,
      FilterTable,
      InfoTable
    },
    data() {
      return {
        data: [],
        filter: {},
        listLoading: true
      }
    },
    created() {
      this.getInfoList();
    },
    methods: {
      async getInfoList() {
        const response = await getFood(this.filter);
        this.data = response._items;
        this.listLoading = false;
      },

      filterInfo(params) {
        this.filter = {...params};
        this.getInfoList();
      }
    }
  }
</script>

<style scoped>

</style>
