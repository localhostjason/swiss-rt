<template>
  <div>
    <panel-title title="房间故事"></panel-title>

    <el-row>
      <el-col :span="24">
        <story-table-filter @filterStory="filterStory"></story-table-filter>
        <story-table :data="room"
                     :list-loading="listLoading"
                     @getRoomList="getRoomList"
        ></story-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import PanelTitle from '@/components/PanelTitle/PanelTitle'
  import StoryTableFilter from './StoryTableFilter'
  import StoryTable from './StoryTable'

  import {getRoom} from '@/api/room'

  export default {
    name: "index",
    components: {
      PanelTitle,
      StoryTableFilter,
      StoryTable
    },
    data() {
      return {
        listLoading: true,
        room: [],
        filter: {}
      }
    },
    created() {
      this.getRoomList()
    },
    methods: {
      async getRoomList() {
        const embedded = {
          story: true
        };
        const response = await getRoom(this.filter, embedded);
        this.room = response._items.map(v => {
          this.$set(v, 'story_lan', v.story.filter(val => val.language === this.$store.getters.language));
          return v;
        });
        this.listLoading = false;

      },
      filterStory(params) {
        this.filter = params;
        this.getRoomList()
      }
    }
  }
</script>

<style scoped>

</style>
