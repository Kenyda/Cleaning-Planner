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
  <el-form-item label="Сложность">
    <div class="slider-demo-block">
      <el-slider v-model="points"
                 :step="1"
                 :max="10"
                 show-stops> </el-slider>
    </div>
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
  ElSlider,
} from 'element-plus';

export default defineComponent({
  name: 'TaskCreateForm',
  components: {
    ElForm,
    ElFormItem,
    ElInput,
    ElButton,
    ElSlider,
  },
  props: {
    formData: Object,
  },

  emits: ['taskDataUpdated'],

  setup() {
    const formRef = ref<InstanceType<typeof ElForm>>();
    const points = ref(0);

    return { formRef, points };
  },

  data() {
    return {
      form: {
        name: '',
        description: '',
      },
      rules: {
        name: [
          { required: true, message: 'Поле обязательно для заполнения', trigger: ['change', 'blur'] },
          { max: 32, message: 'Значение не должно быть длиннее 32 символов', trigger: ['change', 'blur'] },
        ],
        description: [
          { max: 128, message: 'Значение не должно быть длиннее 128 символов', trigger: ['change', 'blur'] },
        ],
      },
      id: 0,
    };
  },

  computed: {
    formDataRef(): InstanceType<typeof ElForm> {
      if (!this.formRef) throw new Error('No form ref!');

      return this.formRef;
    },
  },

  mounted() {
    if (this.formData) {
      this.form.name = this.formData.name;
      this.form.description = this.formData.description;
      this.id = this.formData.id;
    }
  },

  updated() {
    this.formDataRef.clearValidate();
  },

  watch: {
    formData: {
      handler(val) {
        this.form.name = val.name;
        this.form.description = val.description;
        this.id = val.id;
        this.points = val.points;
      },
    },
  },

  methods: {
    saveData() {
      this.formDataRef.validate((valid: boolean | undefined) => {
        if (valid && this.formData) {
          const taskData = {
            name: this.form.name,
            description: this.form.description,
            id: this.formData.id,
            points: this.points,
          };
          this.$emit('taskDataUpdated', taskData);
        }
      });
    },
  },
});
</script>
