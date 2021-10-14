<template>
<div class="authorization-card">
  <el-card>
    <h1>Login</h1>
    <el-form ref="form" :model="form">
      <el-form-item label="Activity name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
    </el-form>
  </el-card>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  ElForm,
  ElCard,
  ElFormItem,
  ElInput,
} from 'element-plus';

export default defineComponent({
  name: 'LoginComponent',
  components: {
    ElForm,
    ElCard,
    ElFormItem,
    ElInput,
  },
  data() {
    return {
      form: {
        name: '',
      },
    };
  },
});
</script>

<style scoped lang="scss">
</style>
