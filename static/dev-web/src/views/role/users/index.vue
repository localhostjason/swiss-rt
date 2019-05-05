<template>
  <div>
    <panel-title title="账号管理" is-line></panel-title>

    <users-filter @filterUsers="filterUsers" @getUsersList="getUsersList"></users-filter>

    <users-table :page-query="listQuery.pageQuery"
                 :total="total"
                 :user-list="userList"
                 @getUsersList="getUsersList"></users-table>

  </div>
</template>

<script>
  import PanelTitle from '@/components/PanelTitle/PanelTitle'
  import UsersFilter from './UsersFilter'
  import UsersTable from './UsersTable'

  import {getUsers} from '@/api/users/users'

  export default {
    name: "index",
    components: {
      PanelTitle,
      UsersFilter,
      UsersTable
    },
    data() {
      return {
        userList: [],
        total: 0,
        listQuery: {
          argsQuery: {},
          pageQuery: {
            page: 1,
            max_results: 10
          },
        }
      }
    },
    created() {
      this.getUsersList();
    },
    methods: {
      getUsersList() {
        const params = {...this.listQuery};
        const username = this.$store.getters.username;
        if (username !== 'admin') {
          params.argsQuery['username'] = '!=admin'
        }

        const embedded = {
          role: true
        };
        getUsers(params, embedded).then(response => {
          this.userList = response._items;
          this.total = response._meta.total;
        })
      },
      filterUsers(params) {
        this.listQuery.pageQuery.page = 1;
        const result = {};
        for (const [key, val] of Object.entries(params)) {
          if (val) {
            result[key] = key === 'role' ? val : `like(\"%25${val}%25\")`;
          }
        }
        this.listQuery.argsQuery = {...result};
        this.getUsersList();
      }
    }
  }
</script>
