<template>
  <el-row>
    <el-col :span="24">
      <el-table v-loading="loading" :data="data" border fit ref="table" @selection-change="selectionChange">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="room.name" label="房间" width="150"></el-table-column>
        <el-table-column prop="number" label="用餐人数" width="80"></el-table-column>
        <el-table-column prop="budget" label="人均预算" width="120"></el-table-column>
        <el-table-column prop="dinner_time" label="用餐时间" width="150"></el-table-column>
        <el-table-column prop="phone" label="手机号" width="120"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="avoid_food" label="忌口"></el-table-column>

        <el-table-column label="操作" align="right" width="150">
          <template slot-scope="scope">
            <el-popover
              placement="top"
              width="160"
              v-model="scope.row.visible">
              <p>确定吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="scope.row.visible = false">取消</el-button>
                <el-button type="primary" size="mini" @click="updateOrder(scope.row)">确定</el-button>
              </div>
              <el-button slot="reference" type="text">确认</el-button>
            </el-popover>

            <span class="text-explode">|</span>

            <el-button type="text" size="small" @click="deleteOrder(scope.row)">删除</el-button>
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
              <el-button type="danger" icon="el-icon-delete"
                         :disabled="!selectedOrders.length" @click="deleteOrder(selectedOrders)">删 除</el-button>
            </span>
        </template>
      </table-foot>
    </el-col>
    <el-col :span="24" style="margin-top: 10px">
      <el-pagination :current-page="pageQuery.page" :page-sizes="[10,20,30, 40]" :page-size="pageQuery.max_results"
                     :total="total" background layout="total, sizes, prev, pager, next, jumper"
                     @size-change="changeSize" @current-change="changePage"></el-pagination>
    </el-col>
  </el-row>
</template>

<script>
  import TableFoot from '@/components/Table/Foot'
  import {getIdFormArray} from '@/utils'
  import {dateFormat} from '@/filters'
  import {deleteOrder, updateOrder} from '@/api/order'

  import _ from 'lodash'

  export default {
    name: "ConfirmTable",
    components: {
      TableFoot,
    },
    filters: {
      dateFormat
    },
    props: {
      data: {
        type: Array,
        required: true
      },
      pageQuery: {
        type: Object,
        required: true
      },
      total: {
        required: true
      },
      listLoading: {
        required: true,
        default: true
      }
    },
    data() {
      return {
        selectedOrders: [],
        loading: this.listLoading
      }
    },
    watch: {
      listLoading(val) {
        this.loading = val
      }
    },
    methods: {
      changeSize(params_limit) {
        this.pageQuery.max_results = params_limit;
        this.$emit('getOrderList')
      },
      changePage(params_page) {
        this.pageQuery.page = params_page;
        this.$emit('getOrderList')
      },

      setSelection(val) {
        this.selectedOrders = getIdFormArray(val, 'id')
      },
      selectionChange(val) {
        this.$refs.tableFoot.selectionChange(val);
      },

      deleteOrder(row) {
        const result = _.isArray(row) ? row : [row.id];

        this.$confirm('此操作将删用户, 是否继续?', '提示', {
          type: 'warning'
        }).then(async () => {
          this.loading = true;

          try {
            await deleteOrder({id: result});
            this.$emit('getOrderList');
            this.loading = false;
            this.$message.success('删除成功');
          } catch (e) {
            this.loading = false;
          }

        }).catch(() => console.log('no delete'));
      },


      async updateOrder(row) {
        await updateOrder(row.id, {is_completed: true});
        this.$message.success('更新成功');
        this.$emit('getOrderList');
      },
    }
  }
</script>

<style scoped>

</style>
