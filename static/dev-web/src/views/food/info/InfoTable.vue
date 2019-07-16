<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-table v-loading="loading" :data="data" ref="table" border fit @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="50" align="center" fixed="left"></el-table-column>
          <el-table-column prop="name" label="菜名称" sortable width="130"
                           v-if="status === 'originality'"></el-table-column>
          <el-table-column prop="name" label="配菜名称" sortable width="130" v-else></el-table-column>
          <el-table-column prop="type_value" label="类型" sortable width="130"></el-table-column>
          <el-table-column prop="price" label="价格" sortable width="100"
                           v-if="status === 'originality'"></el-table-column>
          <el-table-column prop="img_url" label="图片" width="60" v-if="status === 'originality'">
            <template slot-scope="scope">
              <img :src="pre_url + scope.row.img_url" width="35px" height="25px" v-if="scope.row.img_url">
            </template>
          </el-table-column>
          <el-table-column prop="img_url" label="图片地址" width="250" v-if="status === 'originality'">
            <template slot-scope="scope">
              <span>{{scope.row.img_url}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="desc" label="描述"></el-table-column>

          <el-table-column label="操作" align="right" width="180">
            <template slot-scope="scope">
              <el-button type="text" @click="uploadDash([scope.row], scope.row.id)" v-if="status==='originality'">上次图片
              </el-button>
              <el-button @click="editTypeDialog(scope.row, status)" type="text" size="small">编 辑</el-button>
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

      <info-dialog ref="infoDialog" @getInfoList="toGetInfoList"></info-dialog>
    </el-row>

    <upload-file ref="uploadFile" type="food" @reload="toGetInfoList"></upload-file>
  </div>
</template>

<script>
  import TableFoot from '@/components/Table/Foot'
  import {getIdFormArray} from '@/utils'
  import _ from 'lodash'

  import {deleteFoodInfo} from '@/api/food/info'
  import InfoDialog from './InfoDialog'

  import UploadFile from '@/views/common/UploadFile'


  export default {
    name: "RoomTable",
    components: {
      InfoDialog,
      TableFoot,
      UploadFile
    },
    props: {
      status: {
        type: String,
        required: true
      },
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
        this.$confirm('此操作将永久删除菜品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const data = _.isArray(row) ? row : [row.id];

          this.loading = true;
          for (const room_id of data) {
            await deleteFoodInfo(room_id)
          }
          this.loading = false;
          this.$message.success('删除成功');
          this.$emit('getInfoList')

        }).catch(() => this.loading = false);
      },

      editTypeDialog(row) {
        this.$refs.infoDialog.showInfoDialog(row, status);
      },

      toGetInfoList() {
        this.$emit('getInfoList');
      },

      uploadDash(show_list, show_id) {
        this.$refs.uploadFile.showUploadFileDialog(show_list.filter(val => val.img_url), show_id)
      },
    }
  }
</script>

<style scoped>

</style>
