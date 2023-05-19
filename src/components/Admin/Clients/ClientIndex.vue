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
        <v-img :src="`${data.image}`" height="50" width="50" contain></v-img>
      </template>

      <template v-slot:membership="{ data }">
        <p>
          {{
            data.membership_name !== null
              ? data.membership_name
              : "Sin membresía"
          }}
        </p>
      </template>
      <template v-slot:duration="{ data }">
        <span
          class="text-center"
          :class="{
            'text-danger':
              getDaysLeft(
                data.latest_purchase_date,
                data.membership_duration
              ) == 0,
            'text-warning':
              getDaysLeft(data.latest_purchase_date, data.membership_duration) >
                0 &&
              getDaysLeft(data.latest_purchase_date, data.membership_duration) <
                5,
            'text-success':
              getDaysLeft(
                data.latest_purchase_date,
                data.membership_duration
              ) >= 5,
          }"
        >
          {{ getDaysLeft(data.latest_purchase_date, data.membership_duration) }}
        </span>
      </template>

      <template v-slot:action-slot="data">
        <AddMembershipClient
          v-if="
            getDaysLeft(data.latest_purchase_date, data.membership_duration) ==
            0
          "
          :data-update="data"
        ></AddMembershipClient>

        <v-icon color="red" @click="deleteUser(data.id)">
          fa-regular fa-trash-can
        </v-icon>
      </template>
    </Table>
  </div>
</template>

<script>
import axios from "axios";
import Table from "../../commons/Table.vue";
import AddMembershipClient from "./AddMembershipClient.vue";
import { bus } from "../../../main.js";

export default {
  components: { Table, AddMembershipClient },
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
      {
        label: "Membresía",
        name: "membership_name",
        slot_name: "membership",
      },
      {
        label: "Días Restantes",
        name: "",
        slot_name: "duration",
      },
    ],
    url: `${process.env.VITE_API_URL.replace(/"/g, "")}/api/clients`,
    urlStatus: `${process.env.VITE_API_URL.replace(
      /"/g,
      ""
    )}/api/clients/activate`,
  }),
  methods: {
    getDaysLeft(date, duration) {
      try {
        let fecha = new Date(date);

        if (duration.includes("mes")) {
          fecha.setMonth(fecha.getMonth() + parseInt(duration));
          let days = Math.floor((new Date(fecha) - new Date()) / 86400000);
          return days < 0 ? 0 : days;
        } else {
          fecha.setDate(fecha.getDate() + parseInt(duration));
          let days = Math.floor((new Date(fecha) - new Date()) / 86400000);
          return days < 0 ? 0 : days;
        }
      } catch (error) {
        return 0;
      }
    },
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