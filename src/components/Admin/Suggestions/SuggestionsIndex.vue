<template>
  <div style="background-color: #0f0f0f" class="rounded-2">
    <Table :columns="columns" :url="url" :toggleSwitch="false"> </Table>
  </div>
</template>
      
<script>
import Table from "../../commons/Table.vue";
export default {
  components: { Table },
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
    ],
    url: `${process.env.VITE_API_URL.replace(/"/g, "")}/api/suggestions`,
  }),
};
</script>
      
  <style>
</style>