<template>
  <el-dialog :title="dialog.title" :visible.sync="dialog.visible" width="40%" :close-on-press-escape="false"
             :close-on-click-modal="false">

    <el-row style="margin-bottom: 20px; margin-top: -8px">
      <div class="pull-left">
        <div class="div_title">
          <span>菜品信息</span>
        </div>
      </div>
    </el-row>

    <el-row>
      <el-col :span="18">
        <el-form :model="form" :rules="rules" ref="form" label-width="100px">
          <el-form-item label="名称:" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="类型:" prop="type">
            <el-select v-model="form.type" placeholder="请选择">
              <el-option
                v-for="item in foodTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="价格:" prop="price">
            <el-input v-model="form.price"></el-input>
          </el-form-item>
          <el-form-item label="价格单位:" prop="price_unit">
            <el-input v-model="form.price_unit"></el-input>
          </el-form-item>

          <el-form-item label="显示首页:" prop="is_show_dash">
            <el-switch
              v-model="form.is_show_dash"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </el-form-item>

          <el-form-item label="描述:" prop="desc">
            <el-input type="textarea" :autosize="{ minRows: 4}" v-model="form.desc"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialog.visible = false">取 消</el-button>
      <el-button type="primary" @click="updateFoodInfo">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {updateFood, createFood} from '@/api/food/info'
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
          name: null,
          desc: null,
          type: null,
          price: null,
          price_unit: null,
          is_show_dash: false,
        },

        info_id: null,
        foodTypes: [],

        rules: {
          name: [
            {required: true, message: '请输入名称', trigger: 'blur'},
          ],
          type: [
            {required: true, message: '请选择菜品分类', trigger: 'blur'},
          ],
          price: [
            {required: true, message: '请选填写价格', trigger: 'blur'},
          ],
          price_unit: [
            {required: true, message: '请选填写价格单位', trigger: 'blur'},
          ],
        }
      }
    },
    methods: {
      setFoodType() {
        this.foodTypes = [{
          value: 'chives',
          label: '荤菜'
        }, {
          value: 'vegetarian',
          label: '素菜'
        }];
      },

      showInfoDialog(row = null) {
        this.dialog.visible = true;
        this.setFoodType();
        this.dialog.title = row ? '更新菜品' : '创建菜品';

        this.$nextTick(() => {
          if (row) {
            this.form = _.pick(row, Object.keys(this.form));
            this.$refs.form.clearValidate();
            this.info_id = row.id;
            return
          }
          this.info_id = null;
          this.$refs.form.resetFields();

        })
      },

      updateFoodInfo() {
        this.$refs['form'].validate(async (valid) => {
          if (!valid) return false;
          const params = {...this.form};
          params['price'] = Number(params['price']);
          if (!params['price']) {
            this.$message.error('价格请填写数字');
            return false
          }
          params['language'] = this.$store.getters.language;

          !this.info_id ?
            await createFood(params) :
            await updateFood(this.info_id, params);
          this.$message.success('更新成功');
          this.dialog.visible = false;
          this.$emit('getInfoList');
        });
      }
    }
  }
</script>

<style scoped>

</style>
