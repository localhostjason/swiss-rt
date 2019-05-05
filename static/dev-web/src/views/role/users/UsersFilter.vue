<template>
  <el-row>
    <el-col :span="24">
      <el-input v-model="filter.username" placeholder="账号" style="width: 150px;" clearable></el-input>
      <el-input v-model="filter.nickname" placeholder="昵称" style="width: 150px;" clearable></el-input>
      <!--<el-input v-model="filter.role" placeholder="角色" style="width: 120px;" clearable></el-input>-->
      <el-select v-model="filter.role" clearable placeholder="角色">
        <el-option v-for="item in roles" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <el-button v-waves type="primary" @click="selectUsers">
        <i class="el-icon-search"></i>
        <span>查 询</span>
      </el-button>

      <el-button v-waves type="success" @click="createUserInfo">
        <i class="el-icon-plus"></i>
        <span>创 建</span>
      </el-button>
    </el-col>

    <user-dialog ref="userDialog" @getUsersList="toGetUsersList"></user-dialog>
  </el-row>
</template>

<script>
  import waves from '@/directive/waves'
  import UploadFile from '@/views/common/UploadFile'

  import UserDialog from './UserDialog'
  import {getRoles} from '@/api/users/role'

  export default {
    name: "UsersFilter",
    directives: {
      waves
    },
    components: {
      UploadFile,
      UserDialog
    },
    data() {
      return {
        filter: {
          username: null,
          nickname: null,
          role: null,
        },

        roles: []
      }
    },
    created() {
      this.getRoleList()
    },
    methods: {
      getRoleList() {
        getRoles().then(response => {
          this.roles = response._items;
        })
      },
      selectUsers() {
        this.$emit('filterUsers', this.filter)
      },
      toGetUsersList() {
        this.$emit('getUsersList');
      },
      createUserInfo() {
        this.$refs.userDialog.showUserDialog();
      }
    }
  }
</script>
