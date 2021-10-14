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
      <el-alert @close="authError = false"
                v-if="authError"
                title="Неверный email или пароль"
                type="error" />
    </el-form>
  </el-card>
</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import {
  ElButton,
  ElCard,
  ElForm,
  ElFormItem,
  ElInput,
  ElAlert,
} from 'element-plus';

export default defineComponent({
  name: 'LoginComponent',
  components: {
    ElForm,
    ElCard,
    ElFormItem,
    ElInput,
    ElButton,
    ElAlert,
  },

  setup() {
    const formRef = ref<InstanceType<typeof ElForm>>();

    return { formRef };
  },

  data() {
    return {
      authError: false,
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
            trigger: 'blur',
          },
          {
            max: 255,
            message: 'Значение не должно быть длиннее 255',
            trigger: ['change', 'blur'],
          },
        ],
        password: [
          {
            required: true,
            message: 'Поле обязательно для заполнения',
            trigger: 'blur',
          },
          {
            max: 128,
            message: 'Значение не должно быть длиннее 128',
            trigger: ['change', 'blur'],
          },
        ],
      },
    };
  },
  methods: {
    async submit() {
      if (this.formRef === undefined) return;
      let isValid: boolean | undefined = false;
      this.formRef.validate((valid: boolean | undefined) => {
        isValid = valid;
      });
      if (isValid) {
        const tokenData = await this.getToken();
        if (tokenData.access_token) {
          this.$store.dispatch('saveToken', tokenData.access_token);
          localStorage.setItem('token', JSON.stringify(tokenData.access_token));
          this.$router.push('/');
        } else this.authError = true;
      }
    },

    async getToken() {
      const formData = new FormData();

      formData.append('username', this.form.email);
      formData.append('password', this.form.password);

      try {
        const response = await fetch('http://localhost:8081/api/auth/jwt/login', {
          method: 'POST',
          body: formData,
        });
        return await response.json();
      } catch (error) {
        console.log(error);
        return null;
      }
    },
  },

  mounted() {
    const localStorageToken = JSON.parse(localStorage.getItem('token') as string);
    if (localStorageToken) {
      this.$store.dispatch('saveToken', localStorageToken);
      this.$router.push('/');
    }
  },

});
</script>

<style scoped lang="scss">
</style>
