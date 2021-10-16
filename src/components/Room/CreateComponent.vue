<template>
<el-card class="create-card">
  <h1>Добавление комнаты</h1>
  <el-form v-model="form" label-position="top" style="margin: 25px">
    <el-row :gutter="10">
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
</el-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  ElCard,
  ElRow,
  ElCol,
  ElForm,
  ElFormItem,
  ElInput,
  ElColorPicker,
} from 'element-plus';

export default defineComponent({
  name: 'CreateRoom',
  components: {
    ElCard,
    ElRow,
    ElCol,
    ElForm,
    ElFormItem,
    ElInput,
    ElColorPicker,
  },
  data() {
    return {
      form: {
        name: '',
        color: '',
      },
    };
  },
});

</script>
