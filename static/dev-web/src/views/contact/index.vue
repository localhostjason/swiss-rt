<template>
  <div>
    <panel-title title="联系我们"></panel-title>

    <el-row>
      <el-col :span="8">
        <fieldset>
          <h5 style="margin-bottom: 15px">基本信息</h5>

          <el-form :model="form" :rules="rules" ref="form" label-width="100px">
            <el-form-item label="国家:" prop="country">
              <el-input v-model="form.country"></el-input>
            </el-form-item>
            <el-form-item label="城市:" prop="city">
              <el-input v-model="form.city"></el-input>
            </el-form-item>
            <el-form-item label="街道:" prop="address">
              <el-input v-model="form.address"></el-input>
            </el-form-item>

            <el-form-item label="电话:" prop="phone">
              <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="邮编:" prop="zip">
              <el-input v-model="form.zip"></el-input>
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

  import {getContact, updateContact, createContact} from '@/api/contact'
  import _ from 'lodash'

  export default {
    name: "index",
    components: {
      PanelTitle
    },
    data() {
      return {
        form: {
          country: null,
          city: null,
          address: null,
          phone: null,
          zip: null,
          email: null,
        },
        cid: null,

        rules: {
          country: [
            {required: true, message: '请输入国家', trigger: 'blur'},
          ],
          city: [
            {required: true, message: '请输入城市', trigger: 'blur'},
          ],
          address: [
            {required: true, message: '请输入详细地址', trigger: 'blur'},
          ],
          phone: [
            {required: true, message: '请输入电话号码', trigger: 'blur'},
          ],
          zip: [
            {required: true, message: '请输入邮编', trigger: 'blur'},
          ],
          email: [
            {required: true, message: '请输入邮箱', trigger: 'blur'},
          ]
        }
      }
    },
    created() {
      this.getContactInfo()
    },
    methods: {
      async getContactInfo() {
        const params = {
          language: this.$store.getters.language,
        };
        const response = await getContact(params);
        if (response._items.length) {
          const data = response._items[0];
          this.cid = data.id;
          this.form = _.pick(data, Object.keys(this.form));
          return false
        }
        this.cid = null;

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
