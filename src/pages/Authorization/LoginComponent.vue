<template>
<div class="authorization-card">
  <el-card>
    <h1>Login</h1>
    <el-form ref="formRef" :model="form" :rules="rules">
      <el-form-item prop="email" label="Email">
        <el-input :clearable="true" v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input
          v-model="form.password"
          type="password"
          autocomplete="off"
          :clearable="true"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   class=""
                   @click="submit()">Submit</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import {
  ElForm,
  ElCard,
  ElFormItem,
  ElInput,
  ElButton,
} from 'element-plus';

export default defineComponent({
  name: 'LoginComponent',
  components: {
    ElForm,
    ElCard,
    ElFormItem,
    ElInput,
    ElButton,
  },
  setup() {
    const formRef = ref<InstanceType<typeof ElForm>>();

    return { formRef };
  },

  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      rules: {
        email: [
          {
            required: true,
            message: 'Поле обязательно для заполнения',
            trigger: 'blur',
          },
          {
            type: 'email',
            message: 'Некорректное значение',
            trigger: ['blur'],
          },
        ],
        password: [
          {
            required: true,
            message: 'Поле обязательно для заполнения',
            trigger: 'blur',
          },
        ],
      },
    };
  },
  methods: {
    submit() {
      if (this.formRef === undefined) return;
      this.formRef.validate((valid: boolean | undefined) => {
        if (valid) {
          console.log('valid');
        }
      });
    },
  },
});
</script>

<style scoped lang="scss">
</style>
