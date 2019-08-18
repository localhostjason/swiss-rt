<template>
  <el-dialog :title="dialog.title" :visible.sync="dialog.visible" width="40%" :close-on-press-escape="false"
             :close-on-click-modal="false">

    <el-row style="margin-bottom: 20px; margin-top: -8px">
      <div class="pull-left">
        <div class="div_title">
          <span>房间信息</span>
        </div>
      </div>
    </el-row>

    <el-row>
      <el-col :span="18">
        <el-form :model="form" :rules="rules" ref="form" label-width="100px">
          <el-form-item label="名称:" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="起订人数:" prop="limit_number">
            <el-input v-model="form.limit_number"></el-input>
          </el-form-item>
          <el-form-item label="简介:" prop="limit_number">
            <el-input
              type="textarea"
              :autosize="{ minRows: 5}"
              placeholder="请输入简介"
              v-model="form.desc"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialog.visible = false">取 消</el-button>
      <el-button type="primary" @click="updateRoomInfo">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {updateRoom, createRoom} from '@/api/room'
  import _ from 'lodash'

  export default {
    name: "RoomDialog",
    data() {
      return {
        dialog: {
          title: '',
          visible: false,
        },
        form: {
          limit_number: null,
          name: null,
          desc: null,
        },

        room_id: null,

        rules: {
          limit_number: [
            {required: true, message: '请输入起订人数', trigger: 'blur'},
          ],
          name: [
            {required: true, message: '请输入名称', trigger: 'blur'},
          ],
        }
      }
    },
    methods: {
      showRoomDialog(row = null) {
        this.dialog.visible = true;
        this.dialog.title = row ? `更新房间【${row.name}】` : '创建房间';

        this.$nextTick(() => {
          this.room_id = row ? row.id : null;
          this.form = _.pick(row, Object.keys(this.form))
        })
      },
      updateRoomInfo() {
        this.$refs['form'].validate(async (valid) => {
          if (!valid) return false;
          const params = {...this.form};
          if (params.limit_number) {
            params.limit_number = Number(params.limit_number)
          }
          params['language'] = this.$store.getters.language;

          !this.room_id ?
            await createRoom(params) :
            await updateRoom(this.room_id, params);

          this.$message.success('更新成功');
          this.dialog.visible = false;
          this.$emit('getRoomList');
        });
      }
    }
  }
</script>

<style scoped>

</style>
