<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-table v-loading="loading" :data="data" ref="table" border fit @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="50" align="center" fixed="left"></el-table-column>
          <el-table-column prop="id" label="ID" sortable width="80"></el-table-column>
          <el-table-column prop="name" label="名称" sortable width="130"></el-table-column>
          <el-table-column prop="limit_number" label="起订人数" width="100"></el-table-column>
          <el-table-column prop="img_url" label="图片" width="60">
            <template slot-scope="scope">
              <img :src="pre_url + scope.row.img_url" width="35px" height="25px" v-if="scope.row.img_url">
            </template>
          </el-table-column>
          <el-table-column prop="img_url" label="图片地址" width="250">
            <template slot-scope="scope">
              <span>{{scope.row.img_url}}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="right" width="">
            <template slot-scope="scope">
              <el-button type="text" @click="uploadDash([scope.row], scope.row.id)">上次图片</el-button>
              <el-button @click="editRoomDialog(scope.row)" type="text" size="small">编 辑</el-button>
              <el-button type="text" size="small" @click="deleteRooms(scope.row)">删 除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <table-foot :data-length="data.length"
                    @setSelection="setSelection"
                    @clearSelection="$refs.table.clearSelection()"
                    @toggleAllSelection="$refs.table.toggleAllSelection()"
                    ref="tableFoot"
        >
          <template slot="foot">
            <span>
              <el-button type='danger' plain :disabled="!selectedRooms.length"
                         @click="deleteRooms(selectedRooms)">删 除</el-button>
            </span>
          </template>
        </table-foot>
      </el-col>

      <room-dialog ref="roomDialog" @getRoomList="toGetRoomList"></room-dialog>
    </el-row>

    <upload-file ref="uploadFile" type="room" @reload="toGetRoomList"></upload-file>
  </div>
</template>

<script>
  import TableFoot from '@/components/Table/Foot'
  import {getIdFormArray} from '@/utils'
  import _ from 'lodash'

  import {deleteRoom} from '@/api/room'
  import RoomDialog from './RoomDialog'
  import UploadFile from '@/views/common/UploadFile'


  export default {
    name: "RoomTable",
    components: {
      RoomDialog,
      TableFoot,
      UploadFile
    },
    props: {
      data: {
        type: Array,
        required: true
      },
      listLoading: {
        type: Boolean,
        default: true
      }
    },
    watch: {
      listLoading(val) {
        this.loading = val;
      },
    },
    data() {
      return {
        loading: this.listLoading,

        selectedRooms: [],
        pre_url: process.env.VUE_APP_FILE_API,
      };
    },
    methods: {
      handleSelectionChange(val) {
        this.$refs.tableFoot.selectionChange(val);
      },
      setSelection(val) {
        this.selectedRooms = getIdFormArray(val, 'id');
      },
      deleteRooms(row) {
        this.$confirm('此操作将永久删除房间, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const data = _.isArray(row) ? row : [row.id];

          this.loading = true;
          for (const room_id of data) {
            await deleteRoom(room_id)
          }
          this.loading = false;
          this.$message.success('删除成功');
          this.$emit('getRoomList')

        }).catch(() => {
        });
      },

      editRoomDialog(row) {
        this.$refs.roomDialog.showRoomDialog(row);
      },

      toGetRoomList() {
        this.$emit('getRoomList');
      },

      uploadDash(show_list, show_id) {
        this.$refs.uploadFile.showUploadFileDialog(show_list.filter(val => val.img_url), show_id)
      },
    }
  }
</script>

<style scoped>

</style>
