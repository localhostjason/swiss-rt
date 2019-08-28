<template>
  <div>
    <panel-title title="菜品管理"></panel-title>


    <el-row>
      <el-col :span="24">

        <filter-table @getInfoList="getInfoList" @filterInfo="filterInfo"></filter-table>

        <info-table :data="data"
                    :list-loading="listLoading"
                    :page-query="filter.pageQuery"
                    :total="total"
                    @getInfoList="getInfoList"></info-table>
      </el-col>
    </el-row>

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
      const orderType = [
        {value: 'originality', label: '创意菜'},
        {value: 'surprised', label: '惊喜菜'},
      ];

      return {
        orderType,
        status: 'originality',
        data: [],
        total: 0,
        filter: {
          argsQuery: {},
          pageQuery: {
            page: 1,
            max_results: 10
          },
        },
        listLoading: true
      }
    },
    created() {
      this.getInfoList();
    },
    methods: {

      async getInfoList() {
        const params = {...this.filter};
        params.argsQuery['language'] = this.$store.getters.language;

        if (this.status === 'originality') {
          params.argsQuery['type'] = ['chives', 'vegetarian']
        } else {
          params.argsQuery['type'] = ['chives_garnish', 'vegetarian_garnish']
        }

        const response = await getFood(params);
        this.data = response._items;
        this.total = response._meta.total;
        this.listLoading = false;
      },

      filterInfo(params) {
        this.filter.argsQuery = params;
        this.filter.pageQuery.page = 1;
        this.getInfoList();
      }
    }
  }
</script>

<style scoped>

</style>
