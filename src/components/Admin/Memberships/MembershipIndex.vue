<template>
  <div style="background-color: #0f0f0f" class="rounded-2">
    <FormMembership :update="false"></FormMembership>

    <Table :columns="columns" :url="url" :toggleSwitch="true" :urlState="urlStatus">
      <template v-slot:action-slot="data">
        <FormMembership :update="true" :dataUpdate="data"></FormMembership>
        <v-icon color="red" @click="deleteMembership(data.id)">
          fa-regular fa-trash-can
        </v-icon>
      </template>
    </Table>
  </div>
</template>
  
<script>
import FormMembership from "./FormMembership.vue";
import Table from "../../commons/Table.vue";
import { bus } from "../../../main.js";
import axios from "axios";
export default {
  components: { Table, FormMembership },
  data: () => ({
    users: [],
    usersPag: [],
    paginaActual: 1,
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
        label: "Duración",
        name: "duration",
      },
      {
        label: "Precio",
        name: "price",
      },
      {
        label: "Beneficios",
        name: "benefits",
      },
    ],
    url: "http://localhost:3000/api/memberships",
    urlStatus: "http://localhost:3000/api/memberships/activate",
  }),
  methods: {
    deleteMembership(id) {
      this.$swal
        .fire({
          icon: "warning",
          title: "¿Deseas eliminar la membresía?",
          showCancelButton: true,
          confirmButtonText: "Eliminar",
          cancelButtonText: `Cancelar`,
        })
        .then((result) => {
          if (result.isConfirmed) {
            axios
              .delete("http://localhost:3000/api/memberships/" + id)
              .then((response) => {
                console.log(response.status);
                if ((response.status == 204)) {
                  this.$swal.fire({
                    title: "Membresía eliminada!",
                    icon: "success",
                    confirmButtonText: "Ok",
                    timer: 1500,
                  });
                  bus.$emit("reload-grid");
                } else {
                  this.$swal.fire({
                    title: "Error!",
                    text: "Ocurrió un error inesperado",
                    icon: "error",
                    timer: 2000,
                  });
                }
              });
          }
        });
    },
  },
};
</script>
  
  <style>
</style>