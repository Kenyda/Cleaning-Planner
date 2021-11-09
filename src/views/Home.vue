<template>
  <el-card v-if="apartmentsData.items.length > 0">
    <h1>{{apartmentsData.items[apartmentsData.items.length - 1].name}}</h1>
    <el-row :gutter="10">
      <template v-for="room in mainApartment.rooms" :key="room.id">
        <el-col :span="6">
          <room :data="room"></room>
        </el-col>
      </template>
      <el-col :span="6">
        <add-room  shadow="hover"
                   :title="'Добавить комнату'"
                   :routerPath="'/room/create'"></add-room>
      </el-col>
    </el-row>
  </el-card>
  <el-button @click="delAllApp">del</el-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  ElCard,
  ElRow,
  ElCol,
  ElButton,
} from 'element-plus';
import AddComponent from '@/components/AddComponent.vue';
import Room from '@/views/Room.vue';

export default defineComponent({
  name: 'Home',
  components: {
    ElCard,
    ElRow,
    ElCol,
    ElButton,
    AddRoom: AddComponent,
    Room,
  },

  data() {
    return {
      apartmentsData: {
        items: [],
        limit: 0,
        offset: 0,
        total: 0,
      },
      mainApartment: {
        id: Number,
        name: String,
        rooms: [{
          id: Number,
          name: String,
        }],
        users: [],
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
        if (response.status !== 401) {
          this.apartmentsData = await response.json();
          this.mainApartment = this.apartmentsData.items[this.apartmentsData.items.length - 1];
        } else console.log('error');
        if (this.apartmentsData.items.length === 0) {
          this.$router.push('/apartment/create');
        }
      } catch (err) {
        console.log(err);
      }
    },
    delAllApp() {
      this.apartmentsData.items.forEach(async (app: { id: number }) => {
        const headers = new Headers();

        headers.append('Authorization', `Bearer ${this.$store.state.token}`);

        try {
          const response = await fetch(`http://localhost:8081/api/apartments/${app.id}`, {
            method: 'DELETE',
            headers,
          });
          this.apartmentsData = await response.json();
        } catch (err) {
          console.log(err);
        }
      });
    },
  },

  mounted() {
    this.getApartmentData();
  },
});
</script>
