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
  <el-form-item prop="rooms">
    <el-select v-model="form.rooms" multiple placeholder="Дополнительные комнаты">
      <el-option
        v-for="item in rooms"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      >
      </el-option>
    </el-select>
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
  ElSelect,
  ElOption,
  ElButton,
  ElSlider,
} from 'element-plus';

export default defineComponent({
  name: 'TaskCreateForm',
  components: {
    ElForm,
    ElFormItem,
    ElInput,
    ElSelect,
    ElOption,
    ElButton,
    ElSlider,
  },
  props: {
    allRoomsData: Object,
    formData: Object,
    currentRoomId: Number,
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
        rooms: [] as number[],
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
      id: '',
    };
  },

  computed: {
    formDataRef(): InstanceType<typeof ElForm> {
      if (!this.formRef) throw new Error('No form ref!');

      return this.formRef;
    },
    rooms(): {id: number, name: string}[] {
      if (this.currentRoomId && this.allRoomsData) {
        return this.allRoomsData
          .filter((room: { id: number, name: string }) => room.id !== this.currentRoomId);
      } return [];
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
      console.log('save');
      this.formDataRef.validate((valid: boolean | undefined) => {
        if (valid && this.formData) {
          if (this.currentRoomId) this.form.rooms.push(this.currentRoomId);
          const taskData = {
            rooms: this.form.rooms,
            name: this.form.name,
            description: this.form.description,
            id: `${this.currentRoomId}.${this.formData.id}`,
            points: this.points,
          };
          this.$emit('taskDataUpdated', taskData);
        }
      });
    },
  },
});
</script>
