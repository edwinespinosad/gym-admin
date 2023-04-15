<template>
  <div>
    <div class="">
      <div class="d-flex align-items-center">
        <h5 class="w-75">Ingresos</h5>
        <v-select
          class="my-0 py-0"
          :items="filters"
          outlined
          dark
          dense
          v-model="periodIncome"
        ></v-select>
      </div>
      <v-card color="#0f0f0f" dark class="p-4">
        <h2 class="text-center py-5">${{ incomes }}</h2>
      </v-card>
    </div>

    <div class="d-flex justify-content-between align-items-center py-5">
      <div class="w-48">
        <div class="d-flex align-items-center">
          <h5 class="w-75">Membresías Vendidas</h5>
          <v-select
            :items="filters"
            outlined
            dark
            dense
            v-model="periodMembershipSales"
          ></v-select>
        </div>
        <v-card color="#0f0f0f" dark class="p-4">
          <canvas id="myChart" ref="chartMembershipSales"></canvas>
        </v-card>
      </div>

      <div class="w-48">
        <div class="d-flex align-items-center">
          <h5 class="w-75">Nuevos Clientes</h5>
          <v-select
            :items="filters"
            outlined
            dense
            dark
            v-model="periodNewClients"
          ></v-select>
        </div>
        <v-card color="#0f0f0f" dark class="p-4">
          <canvas id="myChart" ref="chartNewClients"></canvas>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

import axios from "axios";
export default {
  components: {
    Bar,
  },
  data() {
    return {
      chart: null,
      chartNewClients: null,

      periodIncome: "Mensual",
      periodMembershipSales: "Mensual",
      periodNewClients: "Mensual",
      filters: ["Semanal", "Mensual", "Anual"],
      incomes: null,
      membershipSales: null,
      newClients: null,

      months: [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ],
    };
  },
  mounted() {
    this.chart = new ChartJS(this.$refs.chartMembershipSales, {
      type: "bar",
      data: {
        labels: [],
        datasets: [
          {
            label: "Ventas de Membresias",
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            data: [],
          },
        ],
      },
    });

    this.chartNewClients = new ChartJS(this.$refs.chartNewClients, {
      type: "bar",
      data: {
        labels: [],
        datasets: [
          {
            label: "Nuevos Clientes",
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            data: [],
          },
        ],
      },
    });
  },
  created() {
    this.getIncomes();
    this.getMembershipSales();
    this.getNewClients();
  },
  watch: {
    periodIncome: function (newVal, oldVal) {
      this.getIncomes();
    },
    periodMembershipSales: function (newVal, oldVal) {
      this.getMembershipSales();
    },
    periodNewClients: function (newVal, oldVal) {
      this.getNewClients();
    },
  },
  methods: {
    async getIncomes() {
      try {
        const response = await axios
          .get(
            `http://localhost:3000/api/incomes?periodo=${this.periodIncome.toLowerCase()}`,
            {
              headers: { "x-access-token": localStorage.getItem("token") },
            }
          )
          .then((response) => {
            this.incomes =
              response.data.incomes[response.data.incomes.length - 1].total;
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    },
    async getMembershipSales() {
      try {
        const response = await axios
          .get(
            `http://localhost:3000/api/memberships-sales?periodo=${this.periodMembershipSales.toLowerCase()}`,
            {
              headers: { "x-access-token": localStorage.getItem("token") },
            }
          )
          .then((response) => {
            this.chart.data.datasets[0].data = [];
            this.chart.data.labels = [];

            response.data.membershipSales.forEach((element) => {
              this.chart.data.datasets[0].data.push(element.ventas);
              if (this.periodMembershipSales === "Mensual") {
                this.chart.data.labels.push(this.months[element.periodo - 1]);
              } else {
                this.chart.data.labels.push(element.periodo.toString());
              }
            });
            if (this.$refs.chartMembershipSales) {
              this.chart.update();
            }
            this.membershipSales = response.data.membershipSales;
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    },
    async getNewClients() {
      try {
        const response = await axios
          .get(
            `http://localhost:3000/api/new-clients?periodo=${this.periodNewClients.toLowerCase()}`,
            {
              headers: { "x-access-token": localStorage.getItem("token") },
            }
          )
          .then((response) => {
            this.chartNewClients.data.datasets[0].data = [];
            this.chartNewClients.data.labels = [];

            response.data.newClients.forEach((element) => {
              this.chartNewClients.data.datasets[0].data.push(element.count);
              if (element.day !== undefined) {
                this.chartNewClients.data.labels.push(element.day.toString());
              } else if (element.month !== undefined) {
                this.chartNewClients.type = "line";
                this.chartNewClients.data.labels.push(
                  this.months[element.month - 1]
                );
              } else if (element.year !== undefined) {
                this.chartNewClients.data.labels.push(element.year.toString());
              }
            });
            if (this.$refs.chartMembershipSales) {
              this.chartNewClients.update();
            }
            this.newClients = response.data.newClients;
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