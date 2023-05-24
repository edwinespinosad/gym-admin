<template>
  <div
    style="background-color: #0f0f0f; width: auto; overflow-x: auto"
    class="rounded-2"
  >
    <FormExpense></FormExpense>

    <Table :columns="columns" :url="url" :toggleSwitch="false"> </Table>
  </div>
</template>
    
<script>
import FormExpense from "./FormExpense.vue";
import Table from "../../commons/Table.vue";
import { bus } from "../../../main.js";
import axios from "axios";
export default {
  components: { Table, FormExpense },
  data: () => ({
    columns: [
      {
        label: "#",
        name: "id",
      },
      {
        label: "Descripción",
        name: "description",
      },
      {
        label: "Costo",
        name: "total",
      },
    ],
    url: `${process.env.VITE_API_URL.replace(/"/g, "")}/api/expenses`,
  }),
};
</script>
    
<style>
</style>