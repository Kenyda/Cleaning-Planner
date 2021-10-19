<template>
<el-form v-model="form">
  <el-form-item>
    <el-input v-model="form.name"
              placeholder="Задача"></el-input>
  </el-form-item>
  <el-form-item>
    <el-input
      v-model="form.description"
      :rows="2"
      type="textarea"
      placeholder="Описание задачи"
    />
  </el-form-item>
</el-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  ElForm,
  ElFormItem,
  ElInput,
} from 'element-plus';

export default defineComponent({
  name: 'TaskCreateForm',
  components: {
    ElForm,
    ElFormItem,
    ElInput,
  },
  data() {
    return {
      form: {
        name: '',
        description: '',
      },
    };
  },
});
</script>

<style scoped>

</style>
