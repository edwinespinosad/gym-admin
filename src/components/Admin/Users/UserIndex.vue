<template>
  <div
    class="rounded-2"
    style="background-color: #0f0f0f; width: auto; overflow-x: auto"
  >
    <FormUser :update="false"></FormUser>

    <Table
      :columns="columns"
      :url="url"
      :toggleSwitch="true"
      :urlState="urlStatus"
    >
      <template v-slot:action-slot="data">
        <FormUser :update="true" :dataUpdate="data"></FormUser>
        <v-icon color="red" @click="deleteUser(data.id)">
          fa-regular fa-trash-can
        </v-icon>
      </template>
    </Table>
  </div>
</template>

<script>
import axios from "axios";
import FormUser from "./FormUser.vue";
import Table from "../../commons/Table.vue";
import { bus } from "../../../main.js";

export default {
  name: "UserIndex",
  components: { FormUser, Table },
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
    url: `${process.env.VITE_API_URL.replace(/"/g, "")}/api/users`,
    urlStatus: `${process.env.VITE_API_URL.replace(
      /"/g,
      ""
    )}/api/users/activate`,
  }),
  methods: {
    deleteUser(id) {
      this.$swal
        .fire({
          icon: "warning",
          title: "¿Deseas eliminar al usuario?",
          showCancelButton: true,
          confirmButtonText: "Eliminar",
          cancelButtonText: `Cancelar`,
        })
        .then((result) => {
          if (result.isConfirmed) {
            axios
              .delete(
                `${process.env.VITE_API_URL.replace(/"/g, "")}/api/users/` + id,
                {
                  headers: { "x-access-token": localStorage.getItem("token") },
                }
              )
              .then((response) => {
                if (response.status === 204) {
                  this.$swal.fire({
                    title: "Usuario eliminado!",
                    icon: "success",
                    confirmButtonText: "Ok",
                    timer: 1500,
                  });
                  bus.$emit("reload-grid");
                  // window.location.reload();
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