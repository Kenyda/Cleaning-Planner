<template>
<el-card class="create-card">
  <h1>Добавление комнаты</h1>
  <room-create-form :roomData="room"
    @task-data-update="updateTaskData"
    @delete-task="deleteTask"></room-create-form>
</el-card>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import {
  ElCard,
} from 'element-plus';
import RoomCreateForm from '@/components/Room/CreateForm.vue';

interface ITask {
  id: number,
  name: string,
  description: string,
  points: number,
}

export default defineComponent({
  name: 'CreateRoom',
  components: {
    ElCard,
    RoomCreateForm,
  },

  setup() {
    const room = reactive(
      {
        name: '',
        color: '',
        id: 0,
        tasks: [] as ITask[],
      },
    );
    return { room };
  },

  methods: {
    updateTaskData(data: { name: string, description: string, points: number, id: number}) {
      console.log('update task');
      if (this.room.tasks.length > 0) {
        const currentTask = this.room.tasks.filter((task) => task.id === data.id)[0];
        const taskIndex = this.room.tasks.indexOf(currentTask);
        if (taskIndex !== -1) {
          this.room.tasks[taskIndex] = data;
          return;
        }
      }
      this.room.tasks.push(data);
    },
    deleteTask(data: {taskId: number, roomId: number}) {
      this.room.tasks = this.room.tasks.filter((task) => task.id !== data.taskId);
    },
  },
});

</script>
