<template>
  <el-dialog :title="dialog.title" :visible.sync="dialog.visible" width="40%" :close-on-press-escape="false"
             :close-on-click-modal="false">

    <el-row style="margin-bottom: 20px; margin-top: -8px">
      <div class="div_title"><span>角色信息</span></div>
    </el-row>

    <el-row>
      <el-col :span="21">
        <el-form :model="form" :rules="formRules" ref="form" label-width="120px">
          <el-form-item label="名称:" prop="name">
            <el-input v-model="form.name" placeholder="请输入名称"></el-input>
          </el-form-item>
          <el-form-item label="描述:" prop="desc">
            <el-input v-model="form.desc" type="textarea" :rows="2"></el-input>
          </el-form-item>
          <el-form-item label="菜单:">
            <el-tree ref="tree" :check-strictly="checkStrictly"
                     :data="routesData"
                     :props="defaultProps"
                     show-checkbox
                     node-key="path"
                     class="permission-tree"></el-tree>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialog.visible = false">取 消</el-button>
      <el-button type="primary" @click="updateRoleInfo">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {createRole, updateRole} from '@/api/users/role'
  import path from 'path'

  import {asyncRoutes} from '@/router/index'
  import {deepClone} from '@/utils'
  import _ from 'lodash'

  export default {
    name: "RoleDialog",
    data() {
      return {
        dialog: {
          title: null,
          visible: false,
        },

        role_id: null,
        form: {
          key: null,
          name: null,
          desc: null,
          routes: []
        },

        formRules: {
          name: [{required: true, message: '请输入角色', trigger: 'blur'}],
        },

        routes: [],
        checkStrictly: false,
        defaultProps: {
          children: 'children',
          label: 'title'
        }
      }
    },
    computed: {
      routesData() {
        return this.routes
      }
    },
    methods: {

      showRoleDialog(row = null) {
        this.dialog.visible = true;
        this.dialog.title = row ? `修改角色【${row.name}】` : '创建角色';
        this.routes = this.generateRoutes(deepClone([...asyncRoutes]));

        this.$nextTick(() => {
          this.$refs.form.clearValidate();

          if (!row) {
            this.role_id = null;
            this.$refs.form.resetFields();
            return
          }

          this.form = _.pick(deepClone(row), Object.keys(this.form));
          this.role_id = row.id;
          const routes = this.generateRoutes(JSON.parse(this.form.routes || '[]'));
          this.$refs.tree.setCheckedNodes(this.generateArr(routes));
          // set checked state of a node not affects its father and child nodes
          this.checkStrictly = false;
        })
      },
      generateArr(routes) {
        let data = [];
        routes.forEach(route => {
          data.push(route);
          if (route.children) {
            const temp = this.generateArr(route.children);
            if (temp.length > 0) {
              data = [...data, ...temp]
            }
          }
        });
        return data
      },

      updateRoleInfo() {
        this.$refs['form'].validate((valid) => {
          if (!valid) return false;

          this.confirmRole();
        })
      },

      // Reshape the routes structure so that it looks the same as the sidebar
      generateRoutes(routes, basePath = '/') {
        const res = [];

        for (let route of routes) {
          // skip some route
          if (route.hidden) {
            continue
          }

          const onlyOneShowingChild = this.onlyOneShowingChild(route.children, route);

          if (route.children && onlyOneShowingChild && !route.alwaysShow) {
            route = onlyOneShowingChild
          }

          const data = {
            path: path.resolve(basePath, route.path),
            title: route.meta && route.meta.title
          };

          // recursive child routes
          if (route.children) {
            data.children = this.generateRoutes(route.children, data.path)
          }
          res.push(data)
        }
        return res
      },

      // reference: src/view/layout/components/Sidebar/SidebarItem.vue
      onlyOneShowingChild(children = [], parent) {
        let onlyOneChild = null;
        const showingChildren = children.filter(item => !item.hidden);

        // When there is only one child route, the child route is displayed by default
        if (showingChildren.length === 1) {
          onlyOneChild = showingChildren[0];
          onlyOneChild.path = path.resolve(parent.path, onlyOneChild.path);
          return onlyOneChild
        }

        // Show parent if there are no child route to display
        if (showingChildren.length === 0) {
          onlyOneChild = {...parent, path: '', noShowingChildren: true};
          return onlyOneChild
        }

        return false
      },


      generateTree(routes, basePath = '/', checkedKeys) {
        const res = [];

        for (const route of routes) {
          const routePath = path.resolve(basePath, route.path);

          // recursive child routes
          if (route.children) {
            route.children = this.generateTree(route.children, routePath, checkedKeys)
          }

          if (checkedKeys.includes(routePath) || (route.children && route.children.length >= 1)) {
            res.push(route)
          }
        }
        return res
      },

      getRoutesPath(routes) {
        if (!routes || !routes.length) return false;
        let rss = [];
        for (const info of routes) {
          if (info.children) {
            info.children.forEach((v, index) => {
              rss.push(v.path);
            });
          }
          if (info.path)
            rss.push(info.path);
          if (info.children)
            this.getRoutesPath(info.children);
        }
        return rss
      },

      async confirmRole() {
        const checkedKeys = this.$refs.tree.getCheckedKeys();
        this.form.routes = this.generateTree(deepClone(this.routes), '/', checkedKeys);

        const r = this.getRoutesPath(this.form.routes);
        console.log(3, r);

        if (this.role_id) {
          this.form.routes = JSON.stringify(this.form.routes);
          this.form.routes_map = JSON.stringify(r);
          await updateRole(this.role_id, this.form);
          this.$message.success('更新成功');
        } else {
          this.form.key = this.form.name;
          this.form.routes = JSON.stringify(this.form.routes);
          this.form.routes_map = JSON.stringify(r);
          await createRole(this.form);
          this.$message.success('创建成功');
        }

        this.dialog.visible = false;
        this.$emit('getRoleList');
      },
    }
  }
</script>


<style lang="scss" scoped>
  .app-container {
    .roles-table {
      margin-top: 30px;
    }
    .permission-tree {
      margin-bottom: 30px;
    }
  }
</style>
