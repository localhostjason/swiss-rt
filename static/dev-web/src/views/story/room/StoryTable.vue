<template>
  <div>
    <!-- logs table-->
    <el-row>
      <el-col :span="24">
        <el-table v-loading="loading" :data="data" ref="table" border fit @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" fixed="left"></el-table-column>
          <el-table-column prop="id" label="ID" sortable width="80"></el-table-column>

          <el-table-column prop="name" label="名称" sortable width="130"></el-table-column>
          <el-table-column prop="story" sortable label="房间故事"></el-table-column>
          <el-table-column label="操作" align="right" width="100">
            <template slot-scope="scope">
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
              <el-button type='danger' plain :disabled="!selectedRomStory.length">删除</el-button>
            </span>
          </template>
        </table-foot>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {getIdFormArray} from '@/utils'
  import TableFoot from '@/components/Table/Foot'

  export default {
    name: "StoryTableFilter",
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
    components: {
      TableFoot
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
    }
  }
</script>
