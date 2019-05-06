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
          <el-form-item label="类型:" prop="food_type">
            <el-select v-model="form.food_type" placeholder="请选择">
              <el-option
                v-for="item in foodTypes"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
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

  import {getFoodType} from '@/api/food/type'

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
          food_type: null,
        },

        info_id: null,
        foodTypes: [],

        rules: {
          name: [
            {required: true, message: '请输入名称', trigger: 'blur'},
          ],
          food_type: [
            {required: true, message: '请选择菜品分类', trigger: 'blur'},
          ],
        }
      }
    },
    methods: {
      showInfoDialog(row = null) {
        this.dialog.visible = true;
        this.dialog.title = row ? '更新菜品' : '创建菜品';

        this.$nextTick(() => {
          this.info_id = row ? row.id : null;
          this.form = _.pick(row, Object.keys(this.form));

          this.getFoodTypeList()
        })
      },
      async getFoodTypeList() {
        const response = await getFoodType();
        this.foodTypes = response._items;
      },

      updateFoodInfo() {
        this.$refs['form'].validate(async (valid) => {
          if (!valid) return false;
          const params = {...this.form};

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
