<template>
  <el-form ref="formRef" :model="form" :rules="rules" label-position="top">
    <el-row :gutter="8">
      <el-col :span="22">
        <el-form-item label="Название"
                      prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="2">
        <el-form-item label="Цвет"
                      prop="color">
          <el-color-picker style="float: left" v-model="form.color"></el-color-picker>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
  <el-row :gutter="10">
    <template v-if="tasks">
      <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4"
              v-for="task in tasks" :key="task.id">
        <task :taskData="task"
              :color="form.color"
              @delete-task="$emit('deleteTask', $event)"
              @edit-task="openEditForm"></task>
      </el-col>
    </template>
    <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
      <add-component title="Добавить задачу" @click="openAddForm"></add-component>
    </el-col>
  </el-row>
  <el-dialog v-model="taskFormVisible" :title="dialogTitle">
    <task-form :formData="currentTask"
               :isTaskEditing="isTaskEditing"
               :allRoomsData="allRoomsData"
               :currentRoomId="roomData.id"
               @task-data-updated="$emit('updateTasks', $event)"></task-form>
  </el-dialog>
  <el-button v-if="!hideSaveButton"
             @click="$emit('createRoom')">+</el-button>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import {
  ElRow,
  ElCol,
  ElForm,
  ElFormItem,
  ElInput,
  ElColorPicker,
  ElDialog,
  ElButton,
} from 'element-plus';
import Task from '@/components/Task/Task.vue';
import CreateForm from '@/components/Task/CreateForm.vue';
import AddComponent from '@/components/AddComponent.vue';
import { ITask } from '@/utils/types';

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
    ElButton,
    Task,
    TaskForm: CreateForm,
    AddComponent,
  },
  props: {
    roomData: {
      type: Object,
      required: true,
    },
    allRoomsData: Object,
    hideSaveButton: Boolean,
  },
  emits: ['taskDataUpdate', 'deleteTask', 'createRoom', 'updateTasks'],

  setup() {
    const formRef = ref<InstanceType<typeof ElForm>>();

    const tasks = reactive([] as ITask[]);

    return { formRef, tasks };
  },

  data() {
    return {
      form: {
        id: this.roomData.id,
        name: '',
        color: '',
      },
      rules: {
        name: [
          { required: true, message: 'Поле обязательно для заполнения', trigger: ['blur', 'change'] },
          { max: 32, message: 'Значение не должно быть длиннее 32 символов', trigger: 'change' },
        ],
      },
      taskFormVisible: false,
      currentTask: {
        rooms: [] as number[],
        name: '',
        description: '',
        id: '',
        points: 0,
      },
      idForCreate: 1,
      isTaskEditing: false,
      dialogTitle: '',
    };
  },

  methods: {
    openEditForm(id: string) {
      console.log('openEditForm');
      this.dialogTitle = 'Редактирование задачи';
      this.currentTask = {
        ...this.tasks.filter((item: ITask) => item.id === id)[0],
      };
      console.log(this.currentTask);
      this.isTaskEditing = true;
      this.taskFormVisible = true;
    },
    openAddForm() {
      console.log('open');
      this.dialogTitle = 'Добавление задачи';
      this.currentTask = {
        rooms: [],
        name: '',
        description: '',
        points: 0,
        id: this.idForCreate.toString(),
      };
      this.isTaskEditing = false;
      this.taskFormVisible = true;
    },
    updateTaskData(data: ITask) {
      console.log('updateTaskData');
      this.taskFormVisible = false;

      const currentTask = this.tasks.filter((task) => task.id === data.id)[0];
      const index = this.tasks.indexOf(currentTask);
      this.tasks[index] = data;
      if (index === -1) {
        this.tasks.push(data);
        this.idForCreate += 1;
      } else this.tasks[index] = data;
    },
    deleteTask(id: string) {
      const currentTask = this.tasks.filter((task) => task.id === id)[0];
      if (currentTask !== undefined) {
        const taskIndex = this.tasks.indexOf(currentTask);
        this.tasks.splice(taskIndex, 1);
      }
    },
  },

  computed: {
    formDataRef(): InstanceType<typeof ElForm> {
      if (!this.formRef) throw new Error('No form ref!');

      return this.formRef;
    },
  },

  created() {
    if (this.roomData) {
      this.form.name = this.roomData.name;
      this.form.color = this.roomData.color;
      this.tasks = this.roomData.tasks;
    }
  },
});

</script>
