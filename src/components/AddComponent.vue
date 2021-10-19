<template>
  <el-card class="add-card"
           shadow="hover"
           @click="goToRoute">
    <el-icon :size="40">
      <plus/>
    </el-icon>
    <p>{{ title }}</p>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  ElCard,
  ElIcon,
} from 'element-plus';
import { Plus } from '@element-plus/icons';

export default defineComponent({
  name: 'AddComponent',
  components: {
    ElCard,
    ElIcon,
    Plus,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    routerPath: String,
  },
  methods: {
    goToRoute() {
      if (this.$props.routerPath) this.$router.push(this.$props.routerPath);
    },
  },
});
</script>
