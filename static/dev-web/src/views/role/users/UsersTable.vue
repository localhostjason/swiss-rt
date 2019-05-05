<template>
  <el-row>
    <el-col :span="24">
      <el-table v-loading="listLoading" :data="userList" border fit ref="table" @selection-change="selectionChange">
        <el-table-column type="selection" width="55" fixed align="center"></el-table-column>
        <el-table-column prop="username" label="账号" sortable fixed width="180"></el-table-column>
        <el-table-column prop="role" label="角色" width="200">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.role && scope.row.username !== 'admin'">{{scope.row.role.name}}</el-tag>
            <el-tag v-if="scope.row.username === 'admin'">内置管理员</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="login_ip" label="登录IP" width="120"></el-table-column>
        <el-table-column prop="login_time" label="登录时间" width="150"></el-table-column>
        <el-table-column prop="first_seen" label="创建时间" width="100">
          <template slot-scope="scope">
            <span>{{scope.row.first_seen | dateFormat('YYYY-MM-DD')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="desc" label="描述"></el-table-column>

        <el-table-column label="操作" fixed="right" align="right" width="100">
          <template slot-scope="scope">
            <div>
              <el-button type="text" size="small" @click="changePassword(scope.row)">修改密码</el-button>
            </div>
            <div>
              <el-button type="text" size="small" @click="editUser(scope.row)">编辑</el-button>
              <el-button type="text" size="small" @click="deleteUser(scope.row)"
                         :disabled="scope.row.username === 'admin'">删除
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <table-foot :data-length="userList.length"
                  @setSelection="setSelection"
                  @clearSelection="$refs.table.clearSelection()"
                  @toggleAllSelection="$refs.table.toggleAllSelection()"
                  ref="tableFoot"
      >
        <template slot="foot">
            <span>
              <el-button type="danger" icon="el-icon-delete"
                         :disabled="!selectedUsers.length" @click="deleteUser(selectedUsers)">删 除</el-button>
            </span>
        </template>
      </table-foot>
    </el-col>
    <el-col :span="24" style="margin-top: 10px">
      <el-pagination :current-page="pageQuery.page" :page-sizes="[10,20,30, 40]" :page-size="pageQuery.max_results"
                     :total="total" background layout="total, sizes, prev, pager, next, jumper"
                     @size-change="changeSize" @current-change="changePage"></el-pagination>
    </el-col>


    <user-dialog ref="userDialog" @getUsersList="toGetUsersList"></user-dialog>

    <change-password-dialog ref="passwordDialog"></change-password-dialog>
  </el-row>
</template>

<script>
  import TableFoot from '@/components/Table/Foot'
  import {getIdFormArray} from '@/utils'
  import {dateFormat} from '@/filters'
  import {deleteUsers} from '@/api/users/users'

  import UserDialog from './UserDialog'
  import ChangePasswordDialog from '@/views/common/ChangePasswordDialog'

  import _ from 'lodash'

  export default {
    name: "UsersTable",
    components: {
      TableFoot,
      UserDialog,
      ChangePasswordDialog
    },
    filters: {
      dateFormat
    },
    props: {
      userList: {
        type: Array,
        required: true
      },
      pageQuery: {
        type: Object,
        required: true
      },
      total: {
        required: true
      }
    },
    watch: {
      userList(val) {
        this.listLoading = val && val.length ? !Boolean(val.length) : false;
      }
    },
    computed: {
      admin_id() {
        const admin = this.userList.filter(value => value.username === 'admin');
        return admin.length ? admin[0].id : null
      }
    },
    data() {
      return {
        listLoading: false,
        selectedUsers: [],
      }
    },
    methods: {
      changeSize(params_limit) {
        this.pageQuery.max_results = params_limit;
        this.$emit('getUsersList')
      },
      changePage(params_page) {
        this.pageQuery.page = params_page;
        this.$emit('getUsersList')
      },

      setSelection(val) {
        this.selectedUsers = getIdFormArray(val, 'id')
      },
      selectionChange(val) {
        this.$refs.tableFoot.selectionChange(val);
      },

      deleteUser(row) {
        const user_id = _.isArray(row) ? row : [row.id];
        const index = user_id.findIndex(value => value === this.admin_id);
        if (index > -1)
          user_id.splice(index, 1);

        this.$confirm('此操作将删用户, 是否继续?', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;

          deleteUsers({id: user_id}).then(() => {
            this.$emit('getUsersList');
            this.listLoading = false;
            this.$message.success('删除成功, admin用户将无法删除');
          })
        }).catch(() =>  this.listLoading = false);
      },
      editUser(row = {}) {
        this.$refs.userDialog.showUserDialog(row);
      },

      toGetUsersList() {
        this.$emit('getUsersList');
      },


      changePassword(row) {
        this.$refs.passwordDialog.showChangePasswordDialog(row);
      }
    }
  }
</script>

<style scoped>

</style>
