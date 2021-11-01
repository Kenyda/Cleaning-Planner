<template>
<el-card shadow="hover" class="task-card">
  <template #header>
    <span class="description">Сложность: {{taskData.points}}</span>
    <br>
    <hr :style="headerColor" class="task-color-mark" />
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
      return `color: ${this.color}; background-color: ${this.color}`;
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
  margin: 0;
  float: left;
  border: none;
  border-radius: 100%;
  color: rgba(0, 7, 16, 0.9);
}
.description {
  font-size: small;
  color: #939292;
  float: left;
}
</style>
