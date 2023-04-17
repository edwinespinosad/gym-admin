<template>
  <Table :data="users" :columns="columns" :url="url">
    <template v-slot:action-slot="data">
      <FormUser :update="true" :dataUpdate="data"></FormUser>
      <v-icon color="red" @click="deleteUser(user.id)">
        fa-regular fa-trash-can
      </v-icon>
    </template>
  </Table>
</template>

<script>
import TableVue from "../components/commons/Table.vue";
import axios from "axios";
export default {
  components: { TableVue },
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
        label: "Apellidos",
        name: "last_name",
      },
      {
        label: "Telefono",
        name: "phone",
      },
      {
        label: "Correo Electrónico",
        name: "email",
      },
    ],
    users: [],
    url: `${process.env.VITE_API_URL.replace(/"/g, "")}/api/users`,
  }),
  async created() {
    await axios
      .get(`${process.env.VITE_API_URL.replace(/"/g, "")}/api/users`)
      .then((response) => {
        this.users = response.data.rows;
      })
      .catch((error) => {
        console.log(error);
      });
  },
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
              .delete(`${process.env.VITE_API_URL.replace(/"/g, "")}/api/users/` + id)
              .then((response) => {
                if ((response.status = 404)) {
                  this.$swal.fire({
                    title: "Usuario eliminado!",
                    icon: "success",
                    confirmButtonText: "Ok",
                    timer: 1500,
                  });
                  window.location.reload();
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