<template>
  <div>
    <panel-title title="基础设置"></panel-title>

    <el-row>
      <el-col :span="8">
        <fieldset>
          <h5 style="margin-bottom: 15px">基本信息</h5>

          <el-form :model="form" :rules="rules" ref="form" label-width="100px">

            <el-form-item label="餐桌数量:" prop="tables">
              <el-input type="number" v-model.number="form.tables"></el-input>
            </el-form-item>
            <el-form-item label="座位数量:" prop="seats">
              <el-input type="number" v-model.number="form.seats"></el-input>
            </el-form-item>
            <el-form-item label="人数:" prop="people">
              <el-input type="number" v-model.number="form.people"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="saveSetting">保 存</el-button>
            </el-form-item>
          </el-form>
        </fieldset>
      </el-col>
    </el-row>
  </div>

</template>

<script>
  import PanelTitle from '@/components/PanelTitle/PanelTitle'
  import {getSetting, updateSetting, createSetting} from '@/api/setting'
  import _ from 'lodash'

  export default {
    name: "index",
    components: {
      PanelTitle
    },
    data() {
      return {
        setting_id: null,

        form: {
          people: null,
          seats: null,
          tables: null,
        },
        rules: {
          people: [
            {required: true, message: '请输入人数', trigger: 'blur'},
          ],
          seats: [
            {required: true, message: '请输入座位数量', trigger: 'blur'},
          ],
          tables: [
            {required: true, message: '请输入餐桌数量', trigger: 'blur'},
          ],
        }
      }
    },
    created() {
      this.getSettingInfo();
    },
    methods: {
      async getSettingInfo() {
        const params = {
          name: 'setting'
        };
        const response = await getSetting(params);
        const info = response._items.length ? response._items[0] : null;
        this.setting_id = info ? info.id : null;
        this.form = _.pick(JSON.parse(info.value || '{}'), Object.keys(this.form))
      },

      saveSetting() {
        this.$refs['form'].validate(async (valid) => {
          if (!valid) return false;
          const params = {
            name: 'setting',
            value: JSON.stringify(this.form)
          };

          this.setting_id ?
            await updateSetting(this.setting_id, params) :
            await createSetting(params);

          this.$message.success('更新成功');
          this.getSettingInfo();
        });
      }

    }
  }
</script>

<style scoped>

</style>
