<template>
<div>
  <home></home>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Home from '@/views/Home.vue';

export default defineComponent({
  name: 'ContentLayout',
  components: {
    Home,
  },
});

</script>
