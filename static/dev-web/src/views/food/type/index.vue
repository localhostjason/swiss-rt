<template>
  <div>
    <panel-title title="菜品分类"></panel-title>


    <filter-table @getTypeList="getTypeList" @filterType="filterType"></filter-table>

    <type-table :data="types" :list-loading="listLoading"
                @getTypeList="getTypeList"></type-table>
  </div>
</template>

<script>
  import PanelTitle from '@/components/PanelTitle/PanelTitle'

  import FilterTable from './FilterTable'
  import TypeTable from './TypeTable'

  import {getFoodType} from '@/api/food/type'

  export default {
    name: "index",
    components: {
      PanelTitle,
      FilterTable,
      TypeTable
    },
    data() {
      return {
        types: [],
        filter: {},
        listLoading: true
      }
    },
    created() {
      this.getTypeList();
    },
    methods: {
      async getTypeList() {
        const response = await getFoodType(this.filter);
        this.types = response._items;
        this.listLoading = false;
      },

      filterType(params) {
        this.filter = {...params};
        this.getTypeList();
      }
    }
  }
</script>

<style scoped>

</style>
