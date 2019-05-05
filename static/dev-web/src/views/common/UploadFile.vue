<template>
  <el-dialog title="上传图片" :visible.sync="dialog.visible" width="60%" :close-on-press-escape="false"
             :close-on-click-modal="false">

    <el-row style="margin-bottom: 20px; margin-top: -8px">
      <div class="div_title"><span>图片信息</span></div>
    </el-row>

    <el-row>
      <el-col :span="15" :offset="3">
        <!--{{fileList}}-->
        <el-upload
          ref="upload"
          :action="actionUrl"
          :headers="headers"
          :file-list="fileList"
          list-type="picture-card"
          :data="extraData"
          :auto-upload="false"
          :on-success="handleSuccess"
          :on-error="handleError"
          :on-change="handleChange"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" title="详情" append-to-body>
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialog.visible = false">取 消</el-button>
      <el-button type="primary" @click="uploadFile" :disabled="disabled">上 传</el-button>
    </div>
  </el-dialog>

</template>

<script>
  import {getToken} from '@/utils/auth'

  export default {
    name: "UploadFile",
    props: ['name'],
    data() {
      return {
        dialog: {
          title: '上传文件',
          visible: false,
        },

        fileList: [],
        extraData: {
          remove_id: null
        },

        commodity_id: null,
        disabled: true,
        headers: {
          Authorization: `Bearer ${getToken()}`
        },

        dialogImageUrl: '',
        dialogVisible: false
      }
    },
    computed: {
      actionUrl() {
        return `${process.env.File_API}/import/img/${this.commodity_id}`
      }
    },
    methods: {
      showUploadFileDialog(row) {
        this.dialog.visible = true;
        this.$nextTick(() => {
          this.fileList = row.imgs;
          this.commodity_id = row.id;

          this.extraData.remove_id = null;
        })
      },


      uploadFile() {
        this.$refs.upload.submit();
      },

      handleRemove(file, fileList) {
        if (file.id) {
          this.extraData.remove_id = file.id;
          // deleteCommodityImg(file.id).then(response => {
          //   this.$message.success('删除成功');
          //   this.$emit('getCommodityList');
          // })
        }

        this.fileList = fileList;
        this.disabled = !fileList.length
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },


      handleChange(file, fileList) {
        this.fileList = fileList;
        this.disabled = !fileList.length
      },
      handleSuccess(response, file, fileList) {
        if (!response.success) {
          this.$message.error(response.errmsg);
          return
        }

        this.fileList = fileList;
        this.disabled = !fileList.length;
        this.dialog.visible = false;

        this.$message.success('上传成功');
        this.$emit('getCommodityList');
      },
      handleError(err, file, fileList) {
        this.$message.error(JSON.stringify(err));
      }
    }
  }
</script>

<style scoped>

</style>
