<template>
<el-card class="create-card">
  <h1>Добавление комнаты</h1>
  <room-create-form :roomData="room" ref="roomRef"
    @create-room="validate"
    @task-data-update="updateTaskData"
    @delete-task="deleteTask"></room-create-form>
</el-card>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
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
    const roomRef = ref<InstanceType<typeof RoomCreateForm>>();
    const room = reactive(
      {
        name: '',
        color: '',
        id: 0,
        tasks: [] as ITask[],
      },
    );
    return { room, roomRef };
  },

  methods: {
    updateTaskData(data: { name: string, description: string, points: number, id: number}) {
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
    validate() {
      this.roomDataRef.formDataRef.validate(async (valid: boolean | undefined) => {
        if (valid) {
          const roomData = await this.createRoom();
          this.roomDataRef.tasks.forEach(async (task) => {
            await this.createTask(task, roomData.id);
          });
          this.$router.push('/');
        }
      });
    },

    async createRoom() {
      const data = {
        name: this.roomDataRef.form.name,
        color: this.roomDataRef.form.color.slice(1),
        apartment: this.$route.query.apartmentId,
      };
      try {
        const response = await fetch('/api/rooms', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`,
            'Content-Type': 'application/json',
          },
        });
        return await response.json();
      } catch (error) {
        console.log(error);
        return null;
      }
    },

    async createTask(taskData: { name: string, description: string, points: number },
      roomId: number) {
      const data = {
        name: taskData.name,
        description: taskData.description,
        points: taskData.points,
        rooms: [roomId],
        apartment: this.$route.query.apartmentId,
      };
      try {
        const response = await fetch('/api/tasks', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`,
            'Content-Type': 'application/json',
          },
        });
        return await response.json();
      } catch (error) {
        console.log(error);
        return null;
      }
    },
  },

  computed: {
    roomDataRef(): InstanceType<typeof RoomCreateForm> {
      if (!this.roomRef) throw new Error('No form ref!');

      return this.roomRef;
    },
  },
});

</script>
