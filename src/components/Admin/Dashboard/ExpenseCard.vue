<template>
  <v-col cols="12" lg="6" xl="6">
    <div class="d-flex align-items-center">
      <h5 class="w-75">Gastos</h5>
      <v-select
        class="my-0 py-0"
        :items="filters"
        outlined
        dark
        dense
        v-model="periodExpense"
      ></v-select>
    </div>
    <v-card color="#0f0f0f" dark class="p-4">
      <h2 class="text-center py-5">${{ expenses }}</h2>
    </v-card>
  </v-col>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      filters: ["Semanal", "Mensual", "Anual"],
      periodExpense: "Mensual",
      expenses: 0,
    };
  },
  mounted() {
    this.getExpenses();
  },
  watch: {
    periodExpense: function (newVal, oldVal) {
      this.getExpenses();
    },
  },
  methods: {
    async getExpenses() {
      try {
        await axios
          .get(
            `${process.env.VITE_API_URL.replace(
              /"/g,
              ""
            )}/api/expenses-dash?periodo=${this.periodExpense.toLowerCase()}`,
            {
              headers: { "x-access-token": localStorage.getItem("token") },
            }
          )
          .then((response) => {
            this.expenses =
              response.data.expenses[
                response.data.expenses.length - 1
              ].total;
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
</style>