<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-input v-model="filter.name" placeholder="名称" style="width: 166px;" clearable></el-input>

        <el-button v-waves type="primary" icon="el-icon-search" @click="handleFilter">查 询</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-button icon="el-icon-plus" type="primary" @click="createRoomInfo">创 建</el-button>
      </el-col>
    </el-row>

    <room-dialog ref="roomDialog" @getRoomList="toGetRoomList"></room-dialog>
  </div>
</template>

<script>
  import waves from '@/directive/waves/index'
  import RoomDialog from './RoomDialog'


  export default {
    name: "FilterTable",
    directives: {waves},
    components: {
      RoomDialog
    },
    data() {
      return {
        filter: {
          name: null,
        }
      }
    },
    methods: {
      handleFilter() {
        const result = {};
        for (const [key, val] of Object.entries(this.filter)) {
          if (val) {
            result[key] = `like(\"%25${val}%25\")`
          }
        }

        this.$emit('filterRoom', result)
      },
      createRoomInfo() {
        this.$refs.roomDialog.showRoomDialog();
      },
      toGetRoomList() {
        this.$emit('getRoomList')
      }
    }
  }
</script>

<style scoped>

</style>
