<template>
  <div>
    <panel-title title="待确认" is-line></panel-title>

    <confirm-filter @filterOrders="filterOrders"></confirm-filter>

    <confirm-table :page-query="listQuery.pageQuery"
                   :total="total"
                   :data="data"
                   :list-loading="loading"
                   @getOrderList="getOrderList"></confirm-table>
  </div>
</template>

<script>
  import PanelTitle from '@/components/PanelTitle/PanelTitle'
  import ConfirmFilter from './ConfirmFilter'
  import ConfirmTable from './ConfirmTable'

  import {getOrder} from '@/api/order'

  export default {
    name: "index",
    components: {
      PanelTitle,
      ConfirmFilter,
      ConfirmTable
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
        params.argsQuery['is_completed'] = false;

        const response = await getOrder(params, {room: true});
        this.data = response._items.map(val => {
          this.$set(val, 'visible', false);
          return val
        });
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
