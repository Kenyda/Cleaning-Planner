<template>
  <el-form v-model="form" label-position="top">
    <el-row :gutter="8">
      <el-col :span="22">
        <el-form-item label="Название">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="2">
        <el-form-item label="Цвет">
          <el-color-picker style="float: left" v-model="form.color"></el-color-picker>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
  <el-row :gutter="10">
    <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4"
            v-for="task in roomData.tasks" :key="task.id">
      <task :taskData="task"
            :color="form.color"
            @edit-task="openEditForm"></task>
    </el-col>
    <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
      <add-component title="Добавить задачу" @click="openAddForm"></add-component>
    </el-col>
  </el-row>
  <el-dialog v-model="taskFormVisible" :title="dialogTitle">
    <task-form :formData="currentTask"
               @task-created="createTask"></task-form>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  ElRow,
  ElCol,
  ElForm,
  ElFormItem,
  ElInput,
  ElColorPicker,
  ElDialog,
} from 'element-plus';
import Task from '@/components/Task/Task.vue';
import CreateForm from '@/components/Task/CreateForm.vue';
import AddComponent from '@/components/AddComponent.vue';

export default defineComponent({
  name: 'RoomCreateForm',
  components: {
    ElRow,
    ElCol,
    ElForm,
    ElFormItem,
    ElInput,
    ElColorPicker,
    ElDialog,
    Task,
    TaskForm: CreateForm,
    AddComponent,
  },
  props: {
    roomData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      form: {
        name: '',
        color: '',
      },
      taskFormVisible: false,
      currentTask: {
        name: '',
        description: '',
        id: 0,
      },
      idForCreate: 1,
      dialogTitle: '',
    };
  },

  methods: {
    openEditForm(id: number) {
      console.log(id);
      this.dialogTitle = 'Редактирование задачи';
      this.currentTask = {
        ...this.roomData.tasks
          .filter((item: { name: string, description: string, id: number }) => item.id === id)[0],
      };
      console.log(this.currentTask);
      this.taskFormVisible = true;
    },
    openAddForm() {
      this.dialogTitle = 'Добавление задачи';
      this.currentTask = {
        name: '',
        description: '',
        id: this.idForCreate,
      };
      console.log(this.currentTask);
      this.taskFormVisible = true;
    },
    createTask(data: { name: string, description: string, id: number}) {
      this.taskFormVisible = false;
      this.$emit('taskCreated', data, this.roomData.id);
      this.idForCreate += 1;
    },
  },

  mounted() {
    if (this.roomData) {
      this.form.name = this.roomData.name;
      this.form.color = this.roomData.color;
    }
  },
});

</script>
