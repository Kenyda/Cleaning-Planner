<template>
<el-card shadow="hover" class="task-card">
  <template #header>
    <div :style="headerColor" class="task-color-mark">
      <span :style="pointColor" class="point-shadow">{{taskData.points}}</span>
    </div>
    <span>{{ taskData.name }}</span>
    <el-icon class="icon delete">
      <delete @click="$emit('deleteTask', taskData.id)" />
    </el-icon>
    <el-icon class="icon edit">
      <edit @click="$emit('editTask', taskData.id)" />
    </el-icon>
  </template>
  <template v-if="taskData.description !== ''">
    {{ taskData.description }}
  </template>
  <template v-else>
    Описание не добавлено
  </template>
</el-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  ElCard,
  ElIcon,
} from 'element-plus';
import {
  Delete,
  Edit,
} from '@element-plus/icons';

export default defineComponent({
  name: 'Task',
  components: {
    ElCard,
    ElIcon,
    Delete,
    Edit,
  },
  props: {
    taskData: {
      type: Object,
      required: true,
    },
    color: String,
  },
  emits: ['deleteTask', 'editTask'],
  computed: {
    headerColor() {
      return `background-color: ${this.color}`;
    },
    pointColor() {
      if (this.color) {
        return parseInt(this.color.slice(1), 16) > 0xAAAAAA
          ? 'color: #000000' : 'color: #FFFFFF';
      } return '';
    },
  },
});
</script>

<style scoped>
.task-card {
  height: 200px;
  margin-bottom: 15px;
}
.task-color-mark {
  height: 15px;
  width: 20px;
  margin: -3px 0;
  float: left;
  border: 1px solid #eae8e8;
  border-radius: 100%;
  padding-bottom: 3px;
}
.point-shadow {
  font-size: small;
  background: inherit;
  -webkit-background-clip: text;
  color: transparent;
  filter: invert(0) grayscale(1);
  -webkit-filter: invert(0) grayscale(1);
}
</style>
