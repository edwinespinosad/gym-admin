<template>
  <div style="background-color: #0f0f0f" class="rounded-2">
    <!-- <FormUser :update="false"></FormUser> -->

    <Table
      :columns="columns"
      :url="url"
      :toggleSwitch="true"
      :urlState="urlStatus"
    >
      <template v-slot:image="{ data }">
        <v-img
          :src="`${URL}/${data.image}`"
          height="50"
          width="50"
          contain
        ></v-img>
      </template>

      <template v-slot:action-slot="data">
        <v-icon color="red" @click="deleteUser(data.id)">
          fa-regular fa-trash-can
        </v-icon>
      </template>
    </Table>
  </div>
</template>

<script>
import axios from "axios";
// import FormUser from "./FormUser.vue";
import Table from "../../commons/Table.vue";
import { bus } from "../../../main.js";

export default {
  components: { Table },
  data: () => ({
    URL: process.env.VITE_API_URL.replace(/"/g, ""),
    users: [],
    usersPag: [],
    paginaActual: 1,
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
        label: "Apellidos",
        name: "last_name",
      },
      {
        label: "Teléfono",
        name: "phone",
      },
      {
        label: "Correo Electrónico",
        name: "email",
      },
    ],
    url: `${process.env.VITE_API_URL.replace(/"/g, "")}/api/clients`,
    urlStatus: `${process.env.VITE_API_URL.replace(
      /"/g,
      ""
    )}/api/clients/activate`,
  }),
  methods: {
    deleteUser(id) {
      this.$swal
        .fire({
          icon: "warning",
          title: "¿Deseas eliminar al cliente?",
          showCancelButton: true,
          confirmButtonText: "Eliminar",
          cancelButtonText: `Cancelar`,
        })
        .then((result) => {
          if (result.isConfirmed) {
            axios
              .delete(
                `${process.env.VITE_API_URL.replace(/"/g, "")}/api/clients/` +
                  id,
                {
                  headers: { "x-access-token": localStorage.getItem("token") },
                }
              )
              .then((response) => {
                if (response.status === 204) {
                  this.$swal.fire({
                    title: "Cliente eliminado!",
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