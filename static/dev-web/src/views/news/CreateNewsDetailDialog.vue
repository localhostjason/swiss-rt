<template>
  <el-dialog :title="dialog.title" :visible.sync="dialog.visible" :close-on-press-escape="false"
             :close-on-click-modal="false">

    <el-row style="margin-bottom: 20px; margin-top: -8px">
      <div class="div_title"><span>新闻资讯详情信息</span></div>
    </el-row>

    <el-row>
      <el-col :span="23">
        <el-form :model="form" :rules="formRules" ref="form" label-width="70px">
          <el-form-item label="内容:" prop="detail">
            <el-input type="textarea" v-model="form.detail" :autosize="{ minRows: 10}"></el-input>
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
  import {updateNews} from '@/api/news'

  export default {
    name: "CreateNewsDetail",
    data() {
      return {
        dialog: {
          title: null,
          visible: false,
        },

        news_id: null,
        form: {
          detail: null,
        },

        formRules: {
          detail: [{required: true, message: '请输入内容', trigger: 'blur'}],
        }
      }
    },
    methods: {
      showNewsDetailDialog(row) {
        this.dialog.visible = true;
        this.dialog.title = row.detail ? `修改新闻资讯【${row.title}】详情` : '创建新闻资讯详情';

        this.$nextTick(() => {
          this.$refs.form.clearValidate();
          this.news_id = row.id;
          this.form.detail = row.detail;
        })
      },

      updateUserInfo() {
        this.$refs['form'].validate(async (valid) => {
          if (!valid) return false;
          const params = {...this.form};

          await updateNews(this.news_id, params);

          this.$message.success('更新成功');
          this.dialog.visible = false;
          this.$emit('getNewsList')
        })
      }
    }
  }
</script>

<style scoped>

</style>
