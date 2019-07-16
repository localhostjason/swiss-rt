<template>
  <div>
    <panel-title title="联系我们"></panel-title>

    <el-row>
      <el-col :span="8">
        <fieldset>
          <h5 style="margin-bottom: 15px">基本信息</h5>

          <el-form :model="form" :rules="rules" ref="form" label-width="100px">
            <el-form-item label="省份:" prop="province">
              <el-select v-model="form.province" @change="changeProvince">
                <el-option
                  v-for="item in province"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="城市:" prop="city">
              <el-select v-model="form.city" @change="changeCity">
                <el-option
                  v-for="item in city"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="区县:" prop="area">
              <el-select v-model="form.area">
                <el-option
                  v-for="item in area"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="详细地址:" prop="address">
              <el-input v-model="form.address"></el-input>
            </el-form-item>

            <el-form-item label="电话:" prop="phone">
              <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="邮编:" prop="zip">
              <el-input v-model="form.zip"></el-input>
            </el-form-item>
            <el-form-item label="传真:" prop="fax">
              <el-input v-model="form.fax"></el-input>
            </el-form-item>
            <el-form-item label="邮箱:" prop="email">
              <el-input v-model="form.email"></el-input>
            </el-form-item>


            <el-form-item>
              <el-button type="primary" @click="saveContact">保 存</el-button>
            </el-form-item>
          </el-form>
        </fieldset>
      </el-col>
    </el-row>


  </div>
</template>

<script>
  import PanelTitle from '@/components/PanelTitle/PanelTitle'
  import {getProvince, getArea, getCity} from '@/vendor/address'

  import {getContact, updateContact, createContact} from '@/api/contact'
  import _ from 'lodash'

  export default {
    name: "index",
    components: {
      PanelTitle
    },
    data() {
      return {
        province: getProvince(),
        city: getCity(),
        area: getArea(),

        form: {
          language: this.$store.getters.language,
          province: null,
          city: null,
          area: null,
          address: null,
          phone: null,
          zip: null,
          fax: null,
          email: null,
        },
        cid: null,

        rules: {
          province: [
            {required: true, message: '请输入省份', trigger: 'blur'},
          ],
          city: [
            {required: true, message: '请输入城市', trigger: 'blur'},
          ],
          area: [
            {required: true, message: '请输入区域', trigger: 'blur'},
          ],
          address: [
            {required: true, message: '请输入详细地址', trigger: ['blur', 'change']},
          ],
          phone: [
            {required: true, message: '请输入电话号码', trigger: ['blur', 'change']},
          ],
          zip: [
            {required: true, message: '请输入邮编', trigger: ['blur', 'change']},
          ],
          fax: [
            {required: true, message: '请输入传真号码', trigger: ['blur', 'change']},
          ],
          email: [
            {required: true, message: '请输入邮箱', trigger: ['blur', 'change']},
          ]
        }
      }
    },
    created() {
      this.getContactInfo()
    },
    methods: {
      changeProvince(code) {
        console.log(getCity(code));
        this.form.city = null;
        this.form.area = null;
        this.city = getCity(code);

        this.form.city = this.city[0].code;

        this.area = getArea(this.form.city);
        this.form.area = this.area[0].code
      },
      changeCity(code) {
        this.form.area = null;
        this.area = getArea(code);
        this.form.area = this.area[0].code
      },

      async getContactInfo() {
        const params = {
          language: this.$store.getters.language,
        };
        const response = await getContact(params);
        if (!response._items.length) return false;
        const data = response._items[0];
        this.cid = data.id;
        this.form = _.pick(data, Object.keys(this.form))
      },
      saveContact() {
        this.$refs['form'].validate(async (valid) => {
          if (!valid) return false;

          if (this.cid) {
            await updateContact(this.cid, this.form)
          } else {
            await createContact(this.form);
          }

          await this.getContactInfo();
          this.$message.success('更新成功')
        });
      }
    }
  }
</script>

<style scoped>

</style>
