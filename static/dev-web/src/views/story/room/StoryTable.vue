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
              <el-tag v-if="scope.row.story">有故事</el-tag>
              <el-tag v-else type="warning">无故事</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="right" width="150">
            <template slot-scope="scope">
              <el-button @click="editRoomStoryDialog(scope.row)" type="text" size="small">
                <span v-if="scope.row.story">编辑故事</span>
                <span v-else>创建故事</span>
              </el-button>
              <el-button type="text" size="small" @click="deleteStoryInfo(scope.row)"
                         :disabled="!scope.row.story"
              >删除故事</el-button>
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
  </div>
</template>

<script>
  import {getIdFormArray} from '@/utils'
  import TableFoot from '@/components/Table/Foot'

  import RoomStoryDialog from './RoomStoryDialog'
  import _ from 'lodash'
  import {deleteStory} from '@/api/contact'

  export default {
    name: "StoryTableFilter",
    components: {
      RoomStoryDialog,
      TableFoot
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

        selectedRomStory: []
      };
    },
    methods: {
      handleSelectionChange(val) {
        this.$refs.tableFoot.selectionChange(val);
      },
      setSelection(val) {
        this.selectedRomStory = getIdFormArray(val, 'id');
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
          const data = _.isArray(row) ? row : [row.id];

          this.loading = true;
          for (const story_id of data) {
            await deleteStory(story_id)
          }
          this.loading = false;
          this.$message.success('删除成功');
          this.$emit('getRoomList')

        }).catch(() => {
        });
      },
      toGetRoomList() {
        this.$emit('getRoomList')
      }
    }
  }
</script>
