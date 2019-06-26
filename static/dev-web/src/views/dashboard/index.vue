<template>
  <div class="dashboard-container">
    <panel-title title="首页图片设置" is-line></panel-title>

    <el-row>
      <el-button v-waves type="primary" icon="el-icon-upload2" @click="uploadDash">上传图片</el-button>
      <el-button type="danger" :disabled="!multipleSelection.length" icon="el-icon-delete"
                 @click="deletePicture(multipleSelection)">删除
      </el-button>
    </el-row>
    <el-row>
      <el-table v-loading="loading" :data="picture" border fit @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" fixed="left"></el-table-column>
        <el-table-column prop="img_name" label="图片名称" width="120" fixed="left"></el-table-column>
        <el-table-column prop="img_url" label="图片地址" width="150">
          <template slot-scope="scope">
            <span>{{scope.row.img_url}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="time" label="上传时间" width="150"></el-table-column>

        <el-table-column label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" @click="uploadDash([scope.row], scope.row.id)">编辑</el-button>
            <el-button type="text" @click="deletePicture(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>

    <upload-file ref="uploadFile" @reload="getDashPicture"></upload-file>
  </div>
</template>

<script>
  import PanelTitle from '@/components/PanelTitle/PanelTitle'
  import waves from '@/directive/waves/index'

  import {mapGetters} from 'vuex'
  import UploadFile from '@/views/common/UploadFile'

  import {getPicture} from '@/api/picture'

  import {getIdFormArray} from '@/utils'

  import _ from 'lodash'
  import {deletePicture} from '@/api/picture'

  export default {
    name: 'Dashboard',
    directives: {
      waves
    },
    components: {
      PanelTitle,
      UploadFile
    },
    computed: {
      ...mapGetters([
        'language'
      ])
    },
    data() {
      return {
        picture: [],
        multipleSelection: [],
        loading: true
      }
    },
    created() {
      this.getDashPicture();
    },
    methods: {
      async getDashPicture() {
        const params = {
          language: this.$store.getters.language
        };
        const response = await getPicture(params);
        this.picture = response._items;
        this.loading = false;
      },
      handleSelectionChange(val) {
        this.multipleSelection = getIdFormArray(val, 'id');
      },
      uploadDash(show = [], id = '') {
        this.$refs.uploadFile.showUploadFileDialog(show, id)
      },

      deletePicture(row) {
        const rows = _.isArray(row) ? row : [row.id];
        if (!rows.length) {
          this.$message.error('请选择一个图片列表');
          return false;
        }

        this.$confirm('此操作将删除图片, 是否继续?', '提示', {
          type: 'warning'
        }).then(async () => {
          this.loading = true;
          for (const pid of rows) {
            await deletePicture(pid);
          }
          this.getDashPicture();
          this.loading = false;
          this.$message.success('删除成功');

        }).catch(() => this.loading = false);
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .el-row {
    .el-col {
      margin: 10px 0;
    }
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .box-card {
  }
</style>

