<template>
  <el-row>
    <el-col :span="24">
      <el-input v-model="filter.phone" placeholder="手机号" style="width: 150px;" clearable></el-input>
      <el-input v-model="filter.email" placeholder="电子邮箱" style="width: 150px;" clearable></el-input>

      <el-button v-waves type="primary" @click="selectUsers">
        <i class="el-icon-search"></i>
        <span>查 询</span>
      </el-button>
    </el-col>
  </el-row>
</template>

<script>
  import waves from '@/directive/waves'

  export default {
    name: "ConfirmFilter",
    directives: {
      waves
    },
    data() {
      return {
        filter: {
          phone: null,
          email: null,
        },
      }
    },
    methods: {
      selectUsers() {
        const params = {...this.filter};
        let result = {};
        for (const [key, val] of Object.entries(params)) {
          if (val) result[key] = `like(\"%25${val}%25\")`
        }
        this.$emit('filterOrders', result)
      },
    }
  }
</script>
