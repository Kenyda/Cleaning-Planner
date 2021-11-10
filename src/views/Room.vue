<template>
  <el-card class="room-card">
    <template #header>
      <div class="card-header">
        <span><hr class="mark" :style="headerBackground">{{ data.name }}</span>
        <i class="el-icon-edit icon edit"></i>
      </div>
    </template>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  ElCard,
} from 'element-plus';

export default defineComponent({
  name: 'Room',
  components: {
    ElCard,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  computed: {
    headerBackground(): string {
      return this.data
        ? `color: #${this.data.color}; background-color: #${this.data.color}` : '';
    },
  },
});
</script>

<style scoped>
.room-card {
  height: 200px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.mark {
  height: 12px;
  width: 12px;
  display: inline-block;
  border: none;
  margin: 0 5px;
}
</style>
