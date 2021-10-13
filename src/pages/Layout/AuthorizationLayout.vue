<template>
  <div>
    <h1>Auth</h1>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AuthorizationLayout',
});
</script>
