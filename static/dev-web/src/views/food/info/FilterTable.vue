<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-input v-model="filter.name" placeholder="名称" style="width: 166px;" clearable></el-input>

        <el-button v-waves type="primary" icon="el-icon-search" @click="handleFilter">查 询</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-button icon="el-icon-plus" type="primary" @click="createInfo">创 建</el-button>
      </el-col>
    </el-row>

    <info-dialog ref="infoDialog" @getInfoList="toGetInfoList"></info-dialog>
  </div>
</template>

<script>
  import waves from '@/directive/waves/index'
  import InfoDialog from './InfoDialog'


  export default {
    name: "FilterTable",
    directives: {waves},
    components: {
      InfoDialog
    },
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

        this.$emit('filterInfo', result)
      },
      createInfo() {
        this.$refs.infoDialog.showInfoDialog();
      },
      toGetInfoList() {
        this.$emit('getInfoList')
      }
    }
  }
</script>

<style scoped>

</style>
