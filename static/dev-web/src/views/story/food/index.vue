<template>
  <div>
    <panel-title title="餐厅故事"></panel-title>

    <el-row>
      <el-col :span="24">
        <!--        <markdown-editor ref="markdownEditor" v-model="content" :language="language" height="600px"/>-->
        <markdown-editor ref="markdownEditor" v-model="content" height="550px"/>
      </el-col>
    </el-row>
    <div class="top-line"></div>
    <div style="margin-bottom: 20px">
      <el-button type="primary" @click="saveStory">保 存</el-button>
    </div>
  </div>
</template>

<script>
  import PanelTitle from '@/components/PanelTitle/PanelTitle'
  import MarkdownEditor from '@/components/MarkdownEditor'

  import {getStory, updateStory, createStory} from '@/api/contact'

  export default {
    name: "index",
    components: {
      PanelTitle,
      MarkdownEditor
    },
    data() {
      return {
        story_id: null,
        html: null,
        content: '',
        languageTypeList: {
          'en': 'en_US',
          'zh': 'zh_CN',
        }
      }
    },
    computed: {
      language() {
        return this.languageTypeList[this.$store.getters.language]
      }
    },
    created() {
      this.getStory()
    },
    methods: {
      getHtml() {
        this.html = this.$refs.markdownEditor.getHtml();
        console.log(this.html)
      },

      async getStory() {
        const params = {
          type: 'food',
          language: this.$store.getters.language,
        };
        let response = await getStory(params);
        response = response._items;
        if (!response.length) {
          this.story_id = null;
          return false;
        }
        const data = response[0];
        this.content = data.content;
        this.story_id = data.id;
      },
      async saveStory() {
        if (!this.content) {
          this.$message.error('请填写餐厅故事');
          return false;
        }

        const data = {
          type: 'food',
          language: this.$store.getters.language,
          content: this.content,
        };

        this.story_id ?
          await updateStory(this.story_id, data) :
          await createStory(data);

        this.$message.success('更新成功');
        this.getStory();
      }
    }
  }
</script>

<style scoped>

</style>
