<template>
  <el-dialog :title="dialog.title" :visible.sync="dialog.visible" :close-on-press-escape="false"
             :close-on-click-modal="false">

    <el-row style="margin-bottom: 20px; margin-top: -8px">
      <div class="div_title"><span>新闻信息</span></div>
    </el-row>

    <el-row>
      <el-col :span="21">
        <el-form :model="form" :rules="formRules" ref="form" label-width="120px">
          <el-form-item label="标题:" prop="title">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="时间:" prop="time">
            <el-date-picker
              v-model="form.time"
              align="right"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="简单描述:" prop="desc">
            <el-input type="textarea" v-model="form.desc" :autosize="{ minRows: 5}"></el-input>
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
  import {updateNews, createNews} from '@/api/news'
  import {pickerOptions2} from '@/utils'

  export default {
    name: "CreateNewsDialog",
    data() {
      return {
        pickerOptions: pickerOptions2,
        dialog: {
          title: null,
          visible: false,
        },

        news_id: null,
        form: {
          time: null,
          title: null,
          language: this.$store.getters.language,
          desc: null
        },

        formRules: {
          title: [{required: true, message: '请输入标题', trigger: 'blur'}],
          time: [{required: true, message: '请输入时间', trigger: 'blur'}],
        }
      }
    },
    methods: {
      showNewsDialog(row = null) {
        this.dialog.visible = true;
        this.dialog.title = row ? `修改新闻【${row.title}】` : '创建新闻资讯';

        this.$nextTick(() => {
          this.$refs.form.clearValidate();
          if (!row) {
            this.$refs.form.resetFields();
            this.news_id = null;
            return
          }

          this.news_id = row.id;
          this.form = _.pick(row, Object.keys(this.form));
        })
      },

      updateUserInfo() {
        this.$refs['form'].validate(async (valid) => {
          if (!valid) return false;
          const params = {...this.form};

          this.news_id ?
            await updateNews(this.news_id, params) :
            await createNews(params);

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
