<template>
 <el-card>
   <el-form ref="formRef" :model="form" :rules="rules" label-position="top">
     <el-form-item label="Название помещения для уборки"
                   prop="name">
       <el-input v-model="form.name"></el-input>
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
                 @updateTasks="updateTasks"
                 :allRoomsData="roomsData"
                 :ref="setRoomRefs"></create-room>
   </el-card>
   <el-button icon="el-icon-plus" @click="updateRoomData">Добавить комнату</el-button>
   <el-button @click="saveData">Сохранить</el-button>
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
  ElMessage,
} from 'element-plus';
import {
  Delete,
} from '@element-plus/icons';
import CreateForm from '@/components/Room/CreateForm.vue';

interface ITask {
  rooms: number[],
  id: string,
  name: string,
  description: string,
  points: number,
}

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
  emits: ['updateTasks'],

  setup() {
    const formRef = ref<InstanceType<typeof ElForm>>();

    const rooms = reactive([
      {
        name: 'Кухня',
        color: '#EF7D03',
        id: -2,
        tasks: [
          {
            name: 'Помыть посуду',
            description: '12345 454 12345 454 12345 454 12345 454 12345 454 12345 454 12345 454 12345 454 12345 454 12345 454 12345 454 12345 454 12345678',
            points: 3,
            id: -2,
          },
          {
            name: 'Помыть пол',
            description: '',
            points: 5,
            id: -3,
          },
          {
            name: 'Помыть плиту',
            description: '',
            points: 5,
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
            points: 5,
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
        name: 'Мой дом',
      },
      rules: {
        name: [
          { required: true, message: 'Поле обязательно для заполнения', trigger: ['change', 'blur'] },
          { max: 32, message: 'Значение не должно быть длиннее 32 символов', trigger: 'change' },
        ],
      },
      roomIdForCreate: 1,
      roomRefs: [] as InstanceType<typeof CreateForm>[],
    };
  },

  computed: {
    formDataRef(): InstanceType<typeof ElForm> {
      if (!this.formRef) throw new Error('No form ref!');

      return this.formRef;
    },
    roomsData(): {id: number, name: string}[] {
      const data: {id: number, name: string}[] = [];
      this.rooms.forEach((room) => data.push({
        id: room.id, name: room.name,
      }));
      return data;
    },
  },

  methods: {
    setRoomRefs(el: InstanceType<typeof CreateForm>) {
      if (el && !this.roomRefs.includes(el)) this.roomRefs.push(el);
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
      this.roomRefs = [];
    },

    updateTasks(data: ITask) {
      console.log(data);
      this.roomRefs.forEach((room) => {
        if (data.rooms.includes(room.form.id)) room.updateTaskData(data);
      });
    },

    checkRoomData() {
      let valid = true;
      this.roomRefs.forEach((room) => {
        if (room.form.name !== '' || room.roomData.tasks.length > 0) {
          room.formDataRef.validate((roomValid: boolean | undefined) => {
            if (!roomValid) {
              ElMessage({
                message: 'Проверьте правильность заполнения комнат',
                type: 'warning',
                duration: 5000,
              });
              valid = false;
            }
          });
        }
      });
      return valid;
    },

    saveData() {
      this.formDataRef.validate(async (valid: boolean | undefined) => {
        const roomDataValid = this.checkRoomData();
        if (!valid) this.formDataRef.scrollToField('name');
        else if (roomDataValid) {
          const apartmentData = await this.createApartment();
          this.roomRefs.forEach(async (room) => {
            if (room.form.name) {
              const roomData = await this.createRoom(room.form, apartmentData.id);
              room.tasks.forEach(async (task) => {
                await this.createTask(task, roomData.id, apartmentData.id);
              });
            }
          });
          this.$router.push('/');
        }
      });
    },

    async createApartment() {
      try {
        const response = await fetch('/api/apartments', {
          method: 'POST',
          body: JSON.stringify(this.form),
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

    async createRoom(roomData: { name: string, color: string }, apartmentId: number) {
      const data = {
        name: roomData.name,
        color: roomData.color.slice(1),
        apartment: apartmentId,
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
      roomId: number,
      apartmentId: number) {
      const data = {
        name: taskData.name,
        description: taskData.description,
        points: taskData.points,
        rooms: [roomId],
        apartment: apartmentId,
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
});
</script>
