<template>
 <el-card>
   <el-form v-model="form" label-position="top">
     <el-form-item label="Название помещения для уборки">
       <el-input v-model="form.apartmentName"></el-input>
     </el-form-item>
   </el-form>
   <el-card v-for="room in rooms" :key="room.id" style="margin-bottom: 15px">
    <create-room :roomData="room"></create-room>
   </el-card>
 </el-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
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
  data() {
    return {
      form: {
        apartmentName: 'Мой дом',
      },
      rooms: [
        {
          name: 'Кухня',
          color: '#f35b5b',
          id: 0,
          tasks: [
            {
              name: 'Помыть посуду',
              description: '12345 454 12345 454 12345 454 12345 454 12345 454 12345 454 12345 454 12345 454 12345 454 12345 454 12345 454 12345 454 12345678',
              id: 0,
            },
            {
              name: 'Помыть пол',
              description: '',
              id: 0,
            },
            {
              name: 'Помыть плиту',
              description: '',
              id: 0,
            },
          ],
        },
        {
          name: 'Спальня',
          color: '#5697fa',
          id: 0,
          tasks: [
            {
              name: 'Помыть пол',
              description: '',
              id: 0,
            },
          ],
        },
      ],
    };
  },
});
</script>

<style scoped>

</style>
