<template>
  <el-card v-if="apartmentsData.items.length > 0">
    <h1>Моя хата</h1>
    <el-row>
      <el-col :span="6">
        <add-room  shadow="hover"
                   :title="'Добавить комнату'"
                   :routerPath="'/room/create'"></add-room>
      </el-col>
    </el-row>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  ElCard,
  ElRow,
  ElCol,
} from 'element-plus';
import AddComponent from '@/components/AddComponent.vue';

export default defineComponent({
  name: 'Home',
  components: {
    ElCard,
    ElRow,
    ElCol,
    AddRoom: AddComponent,
  },

  data() {
    return {
      apartmentsData: {
        items: [],
        limit: 0,
        offset: 0,
        total: 0,
      },
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
        if (this.apartmentsData.items.length === 0) {
          console.log('push');
          this.$router.push('/apartment/create');
        }
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
