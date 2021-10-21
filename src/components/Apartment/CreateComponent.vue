<template>
 <el-card>
   <el-form v-model="form" label-position="top">
     <el-form-item label="Название помещения для уборки">
       <el-input v-model="form.apartmentName"></el-input>
     </el-form-item>
   </el-form>
   <el-card v-for="room in rooms" :key="room.id" style="margin-bottom: 15px">
    <create-room :roomData="room"
                 @task-data-update="updateTaskData"
                 @delete-task="deleteTask"></create-room>
   </el-card>
 </el-card>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import {
  ElCard,
  ElForm,
  ElFormItem,
  ElInput,
} from 'element-plus';
import CreateForm from '@/components/Room/CreateForm.vue';

export default defineComponent({
  name: 'CreateApartment',
  components: {
    ElCard,
    ElForm,
    ElFormItem,
    ElInput,
    CreateRoom: CreateForm,
  },

  setup() {
    const rooms = reactive([
      {
        name: 'Кухня',
        color: '#f35b5b',
        id: -2,
        tasks: [
          {
            name: 'Помыть посуду',
            description: '12345 454 12345 454 12345 454 12345 454 12345 454 12345 454 12345 454 12345 454 12345 454 12345 454 12345 454 12345 454 12345678',
            id: -2,
          },
          {
            name: 'Помыть пол',
            description: '',
            id: -3,
          },
          {
            name: 'Помыть плиту',
            description: '',
            id: -4,
          },
        ],
      },
      {
        name: 'Спальня',
        color: '#5697fa',
        id: -3,
        tasks: [
          {
            name: 'Помыть пол',
            description: '',
            id: -2,
          },
        ],
      },
    ]);

    return { rooms };
  },

  data() {
    return {
      form: {
        apartmentName: 'Мой дом',
      },
    };
  },
  methods: {
    updateTaskData(data: { name: string, description: string, id: number}, roomId: number) {
      const currentRoom = this.rooms.filter((room) => room.id === roomId)[0];
      const currentTask = currentRoom.tasks.filter((task) => task.id === data.id)[0];
      const roomIndex = this.rooms.indexOf(currentRoom);
      const taskIndex = this.rooms[roomIndex].tasks.indexOf(currentTask);
      if (taskIndex !== -1) {
        this.rooms[roomIndex].tasks[taskIndex] = data;
      } else currentRoom.tasks.push(data);
    },
    deleteTask(data: {taskId: number, roomId: number}) {
      const currentRoom = this.rooms.filter((room) => room.id === data.roomId)[0];
      const roomIndex = this.rooms.indexOf(currentRoom);
      this.rooms[roomIndex].tasks = this.rooms[roomIndex].tasks
        .filter((task) => task.id !== data.taskId);
    },
  },
});
</script>
