<template>
<el-form ref="formRef" :model="form" :rules="rules">
  <el-form-item prop="name">
    <el-input v-model="form.name"
              placeholder="Задача"></el-input>
  </el-form-item>
  <el-form-item prop="description">
    <el-input
      v-model="form.description"
      :rows="2"
      type="textarea"
      placeholder="Описание задачи"
    />
  </el-form-item>
  <el-form-item>
    <el-button @click="saveData">Сохранить</el-button>
  </el-form-item>
</el-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElButton,
} from 'element-plus';

export default defineComponent({
  name: 'TaskCreateForm',
  components: {
    ElForm,
    ElFormItem,
    ElInput,
    ElButton,
  },
  props: {
    formData: Object,
  },

  setup() {
    const formRef = ref<InstanceType<typeof ElForm>>();

    return { formRef };
  },

  data() {
    return {
      form: {
        name: '',
        description: '',
      },
      rules: {
        name: [
          { required: true, message: '', trigger: ['change', 'blur'] },
          { max: 32, message: '', trigger: ['change', 'blur'] },
        ],
      },
      id: 0,
    };
  },

  mounted() {
    if (this.formData) {
      console.log('fdata');
      this.form.name = this.formData.name;
      this.form.description = this.formData.description;
      this.id = this.formData.id;
    }
  },

  watch: {
    formData: {
      handler(val) {
        this.form.name = val.name;
        this.form.description = val.description;
        this.id = val.id;
      },
    },
  },

  methods: {
    saveData() {
      if (this.formRef) {
        this.formRef.validate((valid: boolean | undefined) => {
          if (valid) {
            if (this.formData) {
              const taskData = {
                name: this.form.name,
                description: this.form.description,
                id: this.formData.id,
              };
              this.$emit('task-created', taskData);
            }
          }
        });
      }
    },
  },
});
</script>

<style scoped>

</style>
