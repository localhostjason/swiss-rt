<template>
  <el-row>
    <el-col :span="24">
      <el-input v-model="filter.name" placeholder="房间名称" style="width: 166px;" clearable></el-input>

      <el-button v-waves type="primary" icon="el-icon-search" @click="handleFilter">查 询</el-button>
    </el-col>
  </el-row>
</template>

<script>
  import waves from '@/directive/waves/index'

  export default {
    name: "StoryTableFilter",
    directives: {waves},
    data() {
      return {
        filter: {
          name: null,
        }
      }
    },
    methods: {
      handleFilter() {
        const result = {};
        for (const [key, val] of Object.entries(this.filter)) {
          if (val) {
            result[key] = `like(\"%25${val}%25\")`
          }
        }
        this.$emit('filterStory', result)
      },

    }
  }
</script>
