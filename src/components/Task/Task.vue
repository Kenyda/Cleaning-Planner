<template>
<el-card shadow="hover" :style="headerColor" class="task-card">
  <template #header>
    <span>{{ taskData.name }}</span>
    <el-icon class="icon delete">
      <delete />
    </el-icon>
    <el-icon class="icon edit">
      <edit />
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
  computed: {
    headerColor() {
      return `border-color: ${this.color}`;
    },
  },
});
</script>

<style scoped>
.task-card {
  height: 200px;
  margin-bottom: 15px;
}
</style>
