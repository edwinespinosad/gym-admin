<template>
  <div style="background-color: #0f0f0f" class="rounded-2">
    <FormMeal :update="false"></FormMeal>

    <Table :columns="columns" :url="url" :toggleSwitch="false">
      <template v-slot:image="{ data }">
        <v-img :src="`${data.image}`" height="100" width="100" contain></v-img>
      </template>

      <template v-slot:action-slot="data">
        <FormMeal :update="true" :dataUpdate="data"></FormMeal>
      </template>
    </Table>
  </div>
</template>
      
<script>
import FormMeal from "./FormMeal.vue";
import Table from "../../commons/Table.vue";
export default {
  components: { Table, FormMeal },
  data: () => ({
    columns: [
      {
        label: "#",
        name: "id",
      },
      {
        label: "Imagen",
        name: "image",
        slot_name: "image",
      },
      {
        label: "Nombre",
        name: "name",
      },
      {
        label: "Preparación",
        name: "meal_preparation",
      },
    ],
    url: `${process.env.VITE_API_URL.replace(/"/g, "")}/api/meals`,
  }),
  methods: {},
};
</script>
      
<style>
</style>