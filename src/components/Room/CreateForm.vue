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
    <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4"
            v-for="task in roomData.tasks" :key="task.id">
      <task :taskData="task"
            :color="form.color"
            @delete-task="$emit('deleteTask', { taskId: $event, roomId: roomData.id })"
            @edit-task="openEditForm"></task>
    </el-col>
    <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
      <add-component title="Добавить задачу" @click="openAddForm"></add-component>
    </el-col>
  </el-row>
  <el-dialog v-model="taskFormVisible" :title="dialogTitle">
    <task-form :formData="currentTask"
               @task-data-updated="updateTaskData"></task-form>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
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
  emits: ['taskDataUpdate', 'deleteTask', 'roomCreated'],

  setup() {
    const formRef = ref<InstanceType<typeof ElForm>>();

    return { formRef };
  },

  data() {
    return {
      form: {
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
        name: '',
        description: '',
        id: 0,
        points: 0,
      },
      idForCreate: 1,
      dialogTitle: '',
    };
  },

  methods: {
    openEditForm(id: number) {
      this.dialogTitle = 'Редактирование задачи';
      this.currentTask = {
        ...this.roomData.tasks
          .filter((item: { name: string, description: string, id: number }) => item.id === id)[0],
      };
      this.taskFormVisible = true;
    },
    openAddForm() {
      this.dialogTitle = 'Добавление задачи';
      this.currentTask = {
        name: '',
        description: '',
        points: 0,
        id: this.idForCreate,
      };
      this.taskFormVisible = true;
    },
    updateTaskData(data: { name: string, description: string, id: number}) {
      this.taskFormVisible = false;
      this.$emit('taskDataUpdate', data, this.roomData.id);
      this.idForCreate += 1;
    },
    createRoom() {
      this.formDataRef.validate((valid: boolean | undefined) => {
        if (valid) {
          const roomData = {
            name: this.form.name,
            color: this.form.color,
            id: this.roomData.id,
          };
          this.$emit('roomCreated', roomData);
          this.formDataRef.resetFields();
          this.$nextTick(() => {
            this.formDataRef.clearValidate();
          });
        }
      });
    },
  },

  computed: {
    formDataRef(): InstanceType<typeof ElForm> {
      if (!this.formRef) throw new Error('No form ref!');

      return this.formRef;
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
