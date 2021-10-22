<template>
 <el-card>
   <el-form ref="formRef" :model="form" :rules="rules" label-position="top">
     <el-form-item label="Название помещения для уборки"
                   prop="apartmentName">
       <el-input v-model="form.apartmentName"></el-input>
     </el-form-item>
   </el-form>
   <el-card v-for="(room, index) in rooms" :key="room.id" style="margin-bottom: 15px">
     <template #header>
       Комната № {{ index + 1 }}
       <el-icon class="icon delete"
                @click="deleteRoom(room.id)">
         <delete />
       </el-icon>
     </template>
    <create-room :roomData="room"
                 @task-data-update="updateTaskData"
                 @delete-task="deleteTask"></create-room>
   </el-card>
   <el-button icon="el-icon-plus" @click="updateRoomData">Добавить комнату</el-button>
 </el-card>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import {
  ElCard,
  ElForm,
  ElFormItem,
  ElInput,
  ElButton,
  ElIcon,
} from 'element-plus';
import {
  Delete,
} from '@element-plus/icons';
import CreateForm from '@/components/Room/CreateForm.vue';

export default defineComponent({
  name: 'CreateApartment',
  components: {
    ElCard,
    ElForm,
    ElFormItem,
    ElInput,
    ElButton,
    ElIcon,
    Delete,
    CreateRoom: CreateForm,
  },

  setup() {
    const formRef = ref<InstanceType<typeof ElForm>>();

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

    return { rooms, formRef };
  },

  data() {
    return {
      form: {
        apartmentName: 'Мой дом',
      },
      rules: {
        apartmentName: [
          { required: true, message: 'Поле обязательно для заполнения', trigger: ['change', 'blur'] },
        ],
      },
      roomIdForCreate: 1,
    };
  },

  computed: {
    formDataRef(): InstanceType<typeof ElForm> {
      if (!this.formRef) throw new Error('No form ref!');

      return this.formRef;
    },
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

    updateRoomData() {
      this.rooms.push({
        name: '',
        color: '',
        id: this.roomIdForCreate,
        tasks: [],
      });
      this.roomIdForCreate += 1;
    },

    deleteRoom(id: number) {
      const currentRoom = this.rooms.filter((room) => room.id === id)[0];
      const roomIndex = this.rooms.indexOf(currentRoom);
      this.rooms.splice(roomIndex, 1);
    },
  },
});
</script>
