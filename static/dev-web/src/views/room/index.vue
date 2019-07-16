<template>
  <div>
    <panel-title title="房间管理"></panel-title>


    <filter-table @getRoomList="getRoomList" @filterRoom="filterRoom"></filter-table>

    <room-table :data="rooms" :list-loading="listLoading"
                @getRoomList="getRoomList"></room-table>


  </div>
</template>

<script>
  import PanelTitle from '@/components/PanelTitle/PanelTitle'

  import FilterTable from './FilterTable'
  import RoomTable from './RoomTable'

  import {getRoom} from '@/api/room'

  export default {
    name: "index",
    components: {
      PanelTitle,
      FilterTable,
      RoomTable,
    },
    data() {
      return {
        rooms: [],
        filter: {},
        listLoading: true
      }
    },
    created() {
      this.getRoomList();
    },
    methods: {
      async getRoomList() {
        const sorts = '-id';
        const params = {...this.filter};
        params['language'] = this.$store.getters.language;
        const response = await getRoom(params, {}, sorts);
        this.rooms = response._items;
        this.listLoading = false;
      },

      filterRoom(params) {
        this.filter = {...params};
        this.getRoomList();
      }
    }
  }
</script>

<style scoped>

</style>
