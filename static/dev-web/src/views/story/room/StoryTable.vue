<template>
  <div>
    <!-- logs table-->
    <el-row>
      <el-col :span="24">
        <el-table v-loading="loading" :data="data" ref="table" border fit @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" fixed="left"></el-table-column>
          <el-table-column prop="id" label="ID" sortable width="80"></el-table-column>

          <el-table-column prop="name" label="名称" sortable width="130"></el-table-column>
          <el-table-column prop="story" sortable label="房间故事">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.story_lan.length">有故事</el-tag>
              <el-tag v-else type="warning">无故事</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="img_url" label="图片" width="60">
            <template slot-scope="scope" v-if="scope.row.story_lan.length">
              <img :src="pre_url + scope.row.story_lan[0].img_url" width="35px" height="25px">
            </template>
          </el-table-column>
          <el-table-column prop="img_url" label="图片地址">
            <template slot-scope="scope" v-if="scope.row.story_lan.length">
              <span>{{scope.row.story_lan[0].img_url}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="right" width="200">
            <template slot-scope="scope">
              <el-button type="text"
                         @click="uploadDash(scope.row.story_lan, scope.row.story_lan.length ? scope.row.story_lan[0].id : 0)"
                         :disabled="!scope.row.story_lan.length">上次图片
              </el-button>

              <el-button @click="editRoomStoryDialog(scope.row)" type="text" size="small">
                <span v-if="scope.row.story_lan.length">编辑故事</span>
                <span v-else>创建故事</span>
              </el-button>
              <el-button type="text" size="small" @click="deleteStoryInfo(scope.row)"
                         :disabled="!scope.row.story_lan.length"
              >删除故事
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <table-foot :data-length="data.length"
                    @setSelection="setSelection"
                    @clearSelection="$refs.table.clearSelection()"
                    @toggleAllSelection="$refs.table.toggleAllSelection()"
                    ref="tableFoot"
        >
          <template slot="foot">
            <span>
              <el-button type='danger' plain :disabled="!selectedRomStory.length"
                         @click="deleteStoryInfo(selectedRomStory)">删除</el-button>
            </span>
          </template>
        </table-foot>
      </el-col>
    </el-row>

    <room-story-dialog ref="storyDialog" @getRoomList="toGetRoomList"></room-story-dialog>

    <upload-file ref="uploadFile" type="story" @reload="toGetRoomList"></upload-file>
  </div>
</template>

<script>
  import TableFoot from '@/components/Table/Foot'

  import UploadFile from '@/views/common/UploadFile'


  import RoomStoryDialog from './RoomStoryDialog'
  import _ from 'lodash'
  import {deleteStory} from '@/api/contact'

  export default {
    name: "StoryTableFilter",
    components: {
      RoomStoryDialog,
      TableFoot,
      UploadFile
    },
    props: {
      data: {
        type: Array,
        required: true
      },
      listLoading: {
        type: Boolean,
        default: true
      }
    },
    watch: {
      listLoading(val) {
        this.loading = val;
      },
    },
    data() {
      return {
        loading: this.listLoading,

        selectedRomStory: [],

        pre_url: process.env.VUE_APP_FILE_API,
      };
    },
    methods: {
      handleSelectionChange(val) {
        this.$refs.tableFoot.selectionChange(val);
      },
      setSelection(val) {
        let result = [];
        if (val && val.length) {
          for (const v of val) {
            if (v['story_lan'].length)
              result.push(v['story_lan'][0]['id'])
          }
        }
        this.selectedRomStory = result
      },

      editRoomStoryDialog(row) {
        this.$refs.storyDialog.showStoryDialog(row)
      },
      deleteStoryInfo(row) {
        this.$confirm('此操作将永久删除房间故事, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {

          const data = _.isArray(row) ? row : [row.story_lan[0]['id']];

          this.loading = true;
          try {
            for (const story_id of data) {
              await deleteStory(story_id)
            }
            this.loading = false;
            this.$message.success('删除成功');
            this.$emit('getRoomList')
          } catch (e) {
            this.loading = false;
          }
        }).catch(() => console.log('no delete'));
      },
      uploadDash(show_list, show_id) {
        this.$refs.uploadFile.showUploadFileDialog(show_list.filter(val => val.img_url), show_id)
      },
      toGetRoomList() {
        this.$emit('getRoomList')
      }
    }
  }
</script>
