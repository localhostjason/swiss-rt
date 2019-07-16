<template>
  <div>
    <panel-title title="菜品管理"></panel-title>


    <el-row>
      <el-col :span="24">
        <el-tabs v-model="status" type="border-card" @tab-click="handleClickTab">

          <el-tab-pane v-for="item in orderType" :label="item.label" :name="item.value" :key="item.value">

            <filter-table :status="status" @getInfoList="getInfoList" @filterInfo="filterInfo"></filter-table>

            <info-table :data="data"
                        :status="status"
                        :list-loading="listLoading"
                        @getInfoList="getInfoList"></info-table>
          </el-tab-pane>

        </el-tabs>
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
        filter: {},
        listLoading: true
      }
    },
    created() {
      this.getInfoList();
    },
    methods: {
      handleClickTab(tab) {
        this.status = tab.name;
        this.getInfoList();
      },

      async getInfoList() {
        const params = {...this.filter};
        params['language'] = this.$store.getters.language;

        if (this.status === 'originality') {
          params['type'] = ['chives', 'vegetarian']
        } else {
          params['type'] = ['chives_garnish', 'vegetarian_garnish']
        }

        const response = await getFood(params);
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
