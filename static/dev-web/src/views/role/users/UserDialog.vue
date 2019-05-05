<template>
  <el-dialog :title="dialog.title" :visible.sync="dialog.visible" width="40%" :close-on-press-escape="false"
             :close-on-click-modal="false">

    <el-row style="margin-bottom: 20px; margin-top: -8px">
      <div class="div_title"><span>账号信息</span></div>
    </el-row>

    <el-row>
      <el-col :span="21">
        <el-form :model="form" :rules="formRules" ref="form" label-width="120px">
          <el-form-item label="账号:" prop="username">
            <el-input v-model="form.username" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item label="角色:" prop="role" v-if="form.username !== 'admin'">
            <el-select v-model="form.role" placeholder="请选择">
              <el-option v-for="item in roles" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="密码:" prop="password" v-if="!user_id">
            <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码:" prop="checkPassword" v-if="!user_id">
            <el-input type="password" v-model="form.checkPassword" placeholder="请输入确认密码"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialog.visible = false">取 消</el-button>
      <el-button type="primary" @click="updateUserInfo">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import _ from 'lodash'
  import {updateUser, createUser} from '@/api/users/users'
  import {getRoles} from '@/api/users/role'

  export default {
    name: "EditUserDialog",
    data() {
      const validatePass = (rule, value, callback) => {
        if (!value) callback(new Error('请输入密码'));
        if (this.form.checkPassword !== '') this.$refs.form.validateField('checkPassword');
        callback();
      };
      const validatePass2 = (rule, value, callback) => {
        if (!value) callback(new Error('请再次输入密码'));
        if (value !== this.form.password) callback(new Error('两次输入密码不一致!'));
        callback();
      };

      return {
        dialog: {
          title: null,
          visible: false,
        },

        roles: [],

        user_id: null,
        form: {
          username: null,
          role: null,
          password: null,
          checkPassword: null
        },

        formRules: {
          username: [{required: true, message: '请输入用户', trigger: 'blur'}],
          role: [{required: true, message: '请输入角色', trigger: 'blur'}],
          password: [
            {validator: validatePass, trigger: 'blur'}
          ],
          checkPassword: [
            {validator: validatePass2, trigger: 'blur'}
          ],
        }
      }
    },
    methods: {
      showUserDialog(row = null) {
        this.dialog.visible = true;
        this.dialog.title = row ? `修改账号【${row.username}】` : '创建账号';
        this.getRolesList();

        this.$nextTick(() => {
          this.$refs.form.clearValidate();
          if (!row) {
            this.$refs.form.resetFields();
            this.user_id = null;
            return
          }

          this.user_id = row.id;
          this.form = _.pick(row, Object.keys(this.form));
          this.form.role = row.role ? row.role.id : null;

        })
      },

      getRolesList() {
        getRoles().then(response => {
          this.roles = response._items;
        })
      },

      updateUserInfo() {
        this.$refs['form'].validate(async (valid) => {
          if (!valid) return false;
          const params = {...this.form};
          if (this.user_id) {
            delete params.password;
            delete params.checkPassword
          } else {
            delete params.checkPassword
          }

          this.user_id ?
            await updateUser(this.user_id, params) :
            await createUser(params);

          this.$message.success('更新成功');
          this.dialog.visible = false;
          this.$emit('getUsersList')
        })
      }
    }
  }
</script>

<style scoped>

</style>
