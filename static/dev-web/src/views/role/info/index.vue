<template>
  <div>
    <panel-title title="角色管理" is-line></panel-title>

    <el-row>
      <el-col :span="24">
        <el-button v-waves type="primary" icon="el-icon-plus" size="mini" @click="createRoleInfo">创 建</el-button>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-table v-loading="listLoading" :data="roleList" border fit ref="table" @selection-change="selectionChange">
          <el-table-column type="selection" width="55" fixed align="center"></el-table-column>
          <el-table-column prop="key" label="key" sortable fixed width="120"></el-table-column>
          <el-table-column prop="name" label="名称" sortable fixed width="120"></el-table-column>
          <el-table-column prop="desc" label="描述"></el-table-column>
          <el-table-column label="操作" fixed="right" align="right" width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="editRole(scope.row)">编辑</el-button>
              <el-button type="text" size="small" @click="deleteRole(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <table-foot :data-length="roleList.length"
                    @setSelection="setSelection"
                    @clearSelection="$refs.table.clearSelection()"
                    @toggleAllSelection="$refs.table.toggleAllSelection()"
                    ref="tableFoot"
        >
          <template slot="foot">
            <span>
              <el-button type="danger" icon="el-icon-delete"
                         :disabled="!selectedRoles.length" @click="deleteRole(selectedRoles)">删 除</el-button>
            </span>
          </template>
        </table-foot>
      </el-col>
    </el-row>

    <role-dialog ref="roleDialog" @getRoleList="getRoleList"></role-dialog>
  </div>
</template>

<script>
  import PanelTitle from '@/components/PanelTitle/PanelTitle'
  import TableFoot from '@/components/Table/Foot'

  import waves from '@/directive/waves'
  import {getIdFormArray} from '@/utils'
  import {getRoles, deleteRoles} from '@/api/users/role'

  import RoleDialog from './RoleDialog'
  import _ from 'lodash'

  export default {
    name: "index",
    directives: {
      waves
    },
    components: {
      PanelTitle,
      TableFoot,
      RoleDialog,
    },
    data() {
      return {
        roleList: [],
        listLoading: true,
        listQuery: {},

        selectedRoles: [],
      }
    },
    created() {
      this.getRoleList();
    },
    methods: {
      setSelection(val) {
        this.selectedRoles = getIdFormArray(val, 'id')
      },
      selectionChange(val) {
        this.$refs.tableFoot.selectionChange(val);
      },

      getRoleList() {
        getRoles(this.listQuery).then(response => {
          this.roleList = response._items;
          this.listLoading = false;
        })
      },

      createRoleInfo() {
        this.$refs.roleDialog.showRoleDialog();
      },
      deleteRole(row) {
        const role_id = _.isArray(row) ? row : [row.id];

        this.$confirm('此操作将删角色, 是否继续?', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;

          deleteRoles({id: role_id}).then(() => {
            this.getRoleList();
            this.listLoading = false;
            this.$message.success('删除成功');
          })
        }).catch(() => this.listLoading = false);
      },
      editRole(row) {
        this.$refs.roleDialog.showRoleDialog(row);
      }
    }
  }
</script>

<style scoped>

</style>
