<template>
  <div class="">
    <div class="d-flex align-items-center">
      <h5 class="w-75">Ganancias Totales</h5>
    </div>
    <v-card color="#0f0f0f" dark class="p-4">
      <h2 class="text-center py-5" :class="indicator">${{ earning }}</h2>
    </v-card>
  </div>
</template>
  
<script>
import axios from "axios";

export default {
  data() {
    return {
      earning: 0,
      indicator: "",
    };
  },
  mounted() {
    this.getEarnings();
  },
  methods: {
    async getEarnings() {
      try {
        await axios
          .get(`${process.env.VITE_API_URL.replace(/"/g, "")}/api/earnings`, {
            headers: { "x-access-token": localStorage.getItem("token") },
          })
          .then((response) => {
            this.earning = response.data.earnings;
            this.updateIndicator();
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    },
    updateIndicator() {
      this.indicator = this.earning > 0 ? "text-success" : "text-danger";
    },
  },
};
</script>
  
<style>
</style>