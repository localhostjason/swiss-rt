<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-table v-loading="loading" :data="data" ref="table" border fit @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="50" align="center" fixed="left"></el-table-column>
          <el-table-column prop="name" label="名称" sortable width="130"></el-table-column>
          <el-table-column prop="desc" label="描述"></el-table-column>

          <el-table-column label="操作" align="right" width="">
            <template slot-scope="scope">
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

      <type-dialog ref="typeDialog" @getTypeList="toGetTypeList"></type-dialog>
    </el-row>
  </div>
</template>

<script>
  import TableFoot from '@/components/Table/Foot'
  import {getIdFormArray} from '@/utils'
  import _ from 'lodash'

  import {deleteFoodTypeInfo} from '@/api/food/type'
  import TypeDialog from './TypeDialog'

  export default {
    name: "RoomTable",
    components: {
      TypeDialog,
      TableFoot
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

        selectedRooms: []
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
        this.$confirm('此操作将永久删除菜品分类, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const data = _.isArray(row) ? row : [row.id];

          this.loading = true;
          for (const room_id of data) {
            await deleteFoodTypeInfo(room_id)
          }
          this.loading = false;
          this.$message.success('删除成功');
          this.$emit('getTypeList')

        }).catch(() => this.loading = false);
      },

      editTypeDialog(row) {
        this.$refs.typeDialog.showTypeDialog(row);
      },

      toGetTypeList() {
        this.$emit('getTypeList');
      }
    }
  }
</script>

<style scoped>

</style>
