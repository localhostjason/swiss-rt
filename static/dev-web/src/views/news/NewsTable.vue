<template>
  <el-row>
    <el-col :span="24">
      <el-table v-loading="loading" :data="data" border fit ref="table" @selection-change="selectionChange">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="title" label="标题" width="150"></el-table-column>
        <el-table-column prop="time" label="时间" width="150"></el-table-column>
        <el-table-column prop="img_url" label="图片" width="60">
          <template slot-scope="scope">
            <img :src="pre_url + scope.row.img_url" width="35px" height="25px" v-if="scope.row.img_url">
          </template>
        </el-table-column>
        <el-table-column prop="img_url" label="图片地址">
          <template slot-scope="scope">
            <span>{{scope.row.img_url}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="dinner_time" label="简单描述" width="100">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.desc">有</el-tag>
            <el-tag v-else type="warning">无</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="资讯详情" width="100">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.detail">有</el-tag>
            <el-tag v-else type="warning">无</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="right" width="180">
          <template slot-scope="scope">
            <el-button type="text" @click="uploadDash([scope.row], scope.row.id)">上次图片</el-button>
            <el-button type="text" size="small" @click="editNews(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="deleteNews(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <table-foot :data-length="data.length"
                  @setSelection="setSelection"
                  @clearSelection="$refs.table.clearSelection()"
                  @toggleAllSelection="$refs.table.toggleAllSelection()"
                  ref="tableFoot"
      >
        <template slot="foot">
            <span>
              <el-button type="danger" icon="el-icon-delete"
                         :disabled="!selectedNews.length" @click="deleteNews(selectedNews)">删 除</el-button>
            </span>
        </template>
      </table-foot>
    </el-col>
    <el-col :span="24" style="margin-top: 10px">
      <el-pagination :current-page="pageQuery.page" :page-sizes="[10,20,30, 40]" :page-size="pageQuery.max_results"
                     :total="total" background layout="total, sizes, prev, pager, next, jumper"
                     @size-change="changeSize" @current-change="changePage"></el-pagination>
    </el-col>

    <create-news-dialog ref="news_dialog" @getNewsList="toGetNewsList"></create-news-dialog>

    <upload-file ref="uploadFile" type="news" @reload="toGetNewsList"></upload-file>

  </el-row>
</template>

<script>
  import TableFoot from '@/components/Table/Foot'
  import {getIdFormArray} from '@/utils'
  import {dateFormat} from '@/filters'
  import {deleteNewsInfo} from '@/api/news'

  import UploadFile from '@/views/common/UploadFile'


  import _ from 'lodash'

  import CreateNewsDialog from './CreateNewsDialog'


  export default {
    name: "NewsTable",
    components: {
      TableFoot,
      CreateNewsDialog,
      UploadFile,
    },
    filters: {
      dateFormat
    },
    props: {
      data: {
        type: Array,
        required: true
      },
      pageQuery: {
        type: Object,
        required: true,
        default: () => {
        }
      },
      total: {
        required: true
      },
      listLoading: {
        required: true,
        default: true
      }
    },
    data() {
      return {
        selectedNews: [],
        loading: this.listLoading,
        pre_url: process.env.VUE_APP_FILE_API,
      }
    },
    watch: {
      listLoading(val) {
        this.loading = val
      }
    },
    methods: {
      changeSize(params_limit) {
        this.pageQuery.max_results = params_limit;
        this.$emit('getNewsList')
      },
      changePage(params_page) {
        this.pageQuery.page = params_page;
        this.$emit('getNewsList')
      },

      setSelection(val) {
        this.selectedNews = getIdFormArray(val, 'id')
      },
      selectionChange(val) {
        this.$refs.tableFoot.selectionChange(val);
      },

      deleteNews(row) {
        const result = _.isArray(row) ? row : [row.id];

        this.$confirm('此操作将删新闻资讯, 是否继续?', '提示', {
          type: 'warning'
        }).then(async () => {
          this.loading = true;

          try {
            for (const nid of result) {
              await deleteNewsInfo(nid);
            }
            this.$emit('getNewsList');
            this.loading = false;
            this.$message.success('删除成功');
          } catch (e) {
            this.loading = false;
          }

        }).catch(() => console.log('no delete'));
      },

      editNews(row) {
        this.$refs.news_dialog.showNewsDialog(row)
      },
      toGetNewsList() {
        this.$emit('getNewsList');
      },

      uploadDash(show_list, show_id) {
        this.$refs.uploadFile.showUploadFileDialog(show_list.filter(val => val.img_url), show_id)
      },
    }
  }
</script>

<style scoped>

</style>
