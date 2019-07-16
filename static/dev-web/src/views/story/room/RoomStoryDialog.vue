<template>
  <el-dialog :title="dialog.title" :visible.sync="dialog.visible" :close-on-press-escape="false"
             :close-on-click-modal="false">

    <el-row style="margin-bottom: 20px; margin-top: -8px">
      <div class="pull-left">
        <div class="div_title">
          <span>房间信息</span>
        </div>
      </div>
    </el-row>

    <el-row>
      <el-col :span="24">
       <!-- <markdown-editor
          ref="markdownEditor"
          v-model="content"
          :language="language"
          height="300px"/>-->
        <markdown-editor
          ref="markdownEditor"
          v-model="content"
          height="300px"/>
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialog.visible = false">取 消</el-button>
      <el-button type="primary" @click="updateRoomStory">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import MarkdownEditor from '@/components/MarkdownEditor'
  import {updateStory, getStoryInfo, createStory} from '@/api/contact'
  import {updateRoom} from '@/api/room'

  export default {
    name: "RoomStoryDialog",
    components: {
      MarkdownEditor
    },
    data() {
      return {
        dialog: {
          title: '',
          visible: false,
        },
        story_id: null,
        room_id: null,

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
    methods: {
      showStoryDialog(row) {
        this.dialog.visible = true;
        this.room_id = row.id;
        this.story_id = row.story;

        this.dialog.title = row.story ? `更新房间【${row.number}】故事` : `创建房间【${row.number}】故事`;

        this.$nextTick(() => {
          if (row.story) this.getStoryInfo(row.story);
        })
      },
      async getStoryInfo(id) {
        const response = await getStoryInfo(id);
        this.content = response.content
      },
      async updateRoomStory() {
        if (!this.content) {
          this.$message.error('故事不能为空');
          return false;
        }

        if (this.story_id) {
          await updateStory(this.story_id, {content: this.content})
        } else {
          const response = await createStory({content: this.content});
          await updateRoom(this.room_id, {story: response.id})
        }
        this.$message.success('更新成功');
        this.$emit('getRoomList');
        this.dialog.visible = false;

      }
    }
  }
</script>

<style scoped>

</style>
