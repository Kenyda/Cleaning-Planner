<template>
<el-card class="create-card">
  <h1>Добавление комнаты</h1>
  <room-create-form></room-create-form>
</el-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  ElCard,
} from 'element-plus';
import RoomCreateForm from '@/components/Room/CreateForm.vue';

export default defineComponent({
  name: 'CreateRoom',
  components: {
    ElCard,
    RoomCreateForm,
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
