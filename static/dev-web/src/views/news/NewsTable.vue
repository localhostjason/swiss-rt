<template>
  <el-row>
    <el-col :span="24">
      <el-table v-loading="loading" :data="data" border fit ref="table" @selection-change="selectionChange">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="title" label="标题" width="150"></el-table-column>
        <el-table-column prop="time" label="时间" width="150"></el-table-column>
        <el-table-column prop="number" label="图片" width="80"></el-table-column>
        <el-table-column prop="budget" label="图片地址" width="120"></el-table-column>
        <el-table-column prop="dinner_time" label="简单描述" width="150"></el-table-column>
        <el-table-column prop="phone" label="详情">
          <template slot-scope="scope">

          </template>
        </el-table-column>

        <el-table-column label="操作" align="right" width="150">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="deleteNews(scope.row)">编辑</el-button>
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
  </el-row>
</template>

<script>
  import TableFoot from '@/components/Table/Foot'
  import {getIdFormArray} from '@/utils'
  import {dateFormat} from '@/filters'
  import {deleteNews} from '@/api/news'

  import _ from 'lodash'

  export default {
    name: "NewsTable",
    components: {
      TableFoot,
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
        default: () => {}
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
        loading: this.listLoading
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
            await deleteNews({id: result});
            this.$emit('getNewsList');
            this.loading = false;
            this.$message.success('删除成功');
          } catch (e) {
            this.loading = false;
          }

        }).catch(() => console.log('no delete'));
      },
    }
  }
</script>

<style scoped>

</style>
