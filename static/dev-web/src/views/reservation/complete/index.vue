<template>
  <div>
    <panel-title title="已预约" is-line></panel-title>

    <complete-filter @filterOrders="filterOrders"></complete-filter>

    <complete-table :page-query="listQuery.pageQuery"
                   :total="total"
                   :data="data"
                   :list-loading="loading"
                   @getOrderList="getOrderList"></complete-table>
  </div>
</template>

<script>
  import PanelTitle from '@/components/PanelTitle/PanelTitle'
  import CompleteFilter from './CompleteFilter'
  import CompleteTable from './CompleteTable'

  import {getOrder} from '@/api/order'

  export default {
    name: "index",
    components: {
      CompleteFilter,
      CompleteTable,
      PanelTitle,
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
      this.getOrderList();
    },
    methods: {
      async getOrderList() {
        const params = {...this.listQuery};
        params.argsQuery['is_completed'] = true;

        const response = await getOrder(params, {room: true});
        this.data = response._items;
        this.total = response._meta.total;

        this.loading = false;
      },
      filterOrders(args) {
        this.listQuery.argsQuery = args;
        this.listQuery.pageQuery.page = 1;
        this.getOrderList();
      }
    }
  }
</script>

<style scoped>

</style>
