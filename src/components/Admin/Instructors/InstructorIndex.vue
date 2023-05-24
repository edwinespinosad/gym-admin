<template>
  <div
    class="rounded-2"
    style="background-color: #0f0f0f; width: auto; overflow-x: auto"
  >
    <FormInstructor :update="false"></FormInstructor>

    <Table
      :columns="columns"
      :url="url"
      :toggleSwitch="true"
      :urlState="urlStatus"
    >
      <template v-slot:image="{ data }">
        <v-img :src="`${data.image}`" height="50" width="50" contain></v-img>
      </template>

      <template v-slot:action-slot="data">
        <FormInstructor :update="true" :dataUpdate="data"></FormInstructor>
        <v-icon color="red" @click="deleteInstructor(data.id)">
          fa-regular fa-trash-can
        </v-icon>
      </template>
    </Table>
  </div>
</template>
    
<script>
import FormInstructor from "./FormInstructor.vue";
import Table from "../../commons/Table.vue";
import { bus } from "../../../main.js";
import axios from "axios";

export default {
  components: { Table, FormInstructor },

  data: () => ({
    imageFB: null,
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
    url: `${process.env.VITE_API_URL.replace(/"/g, "")}/api/instructors`,
    urlStatus: `${process.env.VITE_API_URL.replace(
      /"/g,
      ""
    )}/api/instructors/activate`,
  }),
  methods: {
    deleteInstructor(id) {
      this.$swal
        .fire({
          icon: "warning",
          title: "¿Deseas eliminar al instructor?",
          showCancelButton: true,
          confirmButtonText: "Eliminar",
          cancelButtonText: `Cancelar`,
        })
        .then((result) => {
          if (result.isConfirmed) {
            axios
              .delete(
                `${process.env.VITE_API_URL.replace(
                  /"/g,
                  ""
                )}/api/instructors/` + id,
                {
                  headers: { "x-access-token": localStorage.getItem("token") },
                }
              )
              .then((response) => {
                if (response.status == 204) {
                  this.$swal.fire({
                    title: "Instructor eliminado!",
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