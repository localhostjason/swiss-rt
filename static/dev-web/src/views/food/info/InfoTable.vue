<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-table v-loading="loading" :data="data" ref="table" border fit @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="50" align="center" fixed="left"></el-table-column>
          <el-table-column prop="name" label="菜名称" sortable width="130"></el-table-column>
          <el-table-column prop="type_value" label="类型" sortable width="130"></el-table-column>
          <el-table-column prop="price" label="价格" sortable width="100"></el-table-column>
          <el-table-column prop="price_unit" label="价格单位" width="100"></el-table-column>
          <el-table-column prop="is_show_dash" label="显示首页" width="100">
            <template slot-scope="scope">
              <el-tag type="success" v-if="scope.row.is_show_dash">显示</el-tag>
              <el-tag v-else>不显示</el-tag>
            </template>
          </el-table-column>
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
          <el-table-column prop="desc" label="描述"></el-table-column>

          <el-table-column label="操作" align="right" width="180">
            <template slot-scope="scope">
              <el-button type="text" @click="uploadDash([scope.row], scope.row.id)">上次图片
              </el-button>
              <el-button @click="editTypeDialog(scope.row)" type="text" size="small">编 辑</el-button>
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
      <el-col :span="24" style="margin-top: 10px">
        <el-pagination :current-page="pageQuery.page" :page-sizes="[10,20,30, 40]" :page-size="pageQuery.max_results"
                       :total="total" background layout="total, sizes, prev, pager, next, jumper"
                       @size-change="changeSize" @current-change="changePage"></el-pagination>
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
      data: {
        type: Array,
        required: true
      },
      listLoading: {
        type: Boolean,
        default: true
      },
      pageQuery: {
        type: Object,
        required: true,
        default: () => {}
      },
      total: {
        required: true
      },
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
      changeSize(params_limit) {
        this.pageQuery.max_results = params_limit;
        this.$emit('getInfoList')
      },
      changePage(params_page) {
        this.pageQuery.page = params_page;
        this.$emit('getInfoList')
      },

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
          for (const food_id of data) {
            await deleteFoodInfo(food_id)
          }
          this.loading = false;
          this.$message.success('删除成功');
          this.$emit('getInfoList')

        }).catch(() => this.loading = false);
      },

      editTypeDialog(row) {
        this.$refs.infoDialog.showInfoDialog(row);
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
