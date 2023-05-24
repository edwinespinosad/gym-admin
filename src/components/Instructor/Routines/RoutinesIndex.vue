<template>
  <div
    class="rounded-2"
    style="background-color: #0f0f0f; width: auto; overflow-x: auto"
  >
    <FormRoutines :update="false"></FormRoutines>

    <Table :columns="columns" :url="url" :toggleSwitch="false">
      <template v-slot:action-slot="data">
        <FormRoutines :update="true" :dataUpdate="data"></FormRoutines>
      </template>
    </Table>
  </div>
</template>
    
<script>
import FormRoutines from "./FormRoutines.vue";
import Table from "../../commons/Table.vue";
import { bus } from "../../../main.js";
import axios from "axios";
export default {
  components: { Table, FormRoutines },
  data: () => ({
    columns: [
      {
        label: "#",
        name: "id",
      },
      {
        label: "Nombre",
        name: "name",
      },
      {
        label: "Descripción",
        name: "description",
      },
    ],
    url: `${process.env.VITE_API_URL.replace(/"/g, "")}/api/routines`,
  }),
  methods: {},
};
</script>
    
<style>
</style>