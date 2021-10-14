<template>
  <el-card>
    <h1>Моя хата</h1>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  ElCard,
} from 'element-plus';

export default defineComponent({
  name: 'Home',
  components: {
    ElCard,
  },

  data() {
    return {
      apartmentsData: [],
    };
  },

  methods: {
    async getApartmentData() {
      const headers = new Headers();

      headers.append('Authorization', `Bearer ${this.$store.state.token}`);

      try {
        const response = await fetch('http://localhost:8081/api/apartments', {
          method: 'GET',
          headers,
        });
        if (response.status === 401) {
          console.log('error');
        } else this.apartmentsData = await response.json();
      } catch (err) {
        console.log(err);
      }
    },
  },

  mounted() {
    this.getApartmentData();
  },
});
</script>
