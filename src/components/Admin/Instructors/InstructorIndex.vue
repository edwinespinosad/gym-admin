<template>
  <div style="background-color: #0f0f0f" class="rounded-2">
    <FormInstructor :update="false"></FormInstructor>

    <Table
      :columns="columns"
      :url="url"
      :toggleSwitch="true"
      :urlState="urlStatus"
    >
      <template v-slot:image="{ data }">
        <v-img
          :src="`${data.image}`"
          height="50"
          width="50"
          contain
        ></v-img>
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
// import firebase from "firebase/app";
// import "firebase/storage";
// import { initializeApp } from "firebase/app";
// import {
//   getStorage,
//   ref,
//   getDownloadURL,
//   uploadBytesResumable,
// } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: process.env.VITE_apiKey,
//   authDomain: process.env.VITE_authDomain,
//   projectId: process.env.VITE_projectId,
//   storageBucket: process.env.VITE_storageBucket,
//   messagingSenderId: process.env.VITE_messagingSenderId,
//   appId: process.env.VITE_appId,
//   measurementId: process.env.VITE_measurementId,
// };
// initializeApp(firebaseConfig);

export default {
  components: { Table, FormInstructor },
  mounted() {
    // const storage = getStorage();
    // const pathReference = ref(storage, "files/1681758790215.png");
    // const downloadURL = getDownloadURL(pathReference);
    // console.log(downloadURL);
    
    // const storageRef = getStorage().ref().child("files/1681758790215.png");

    // storageRef
    //   .getDownloadURL()
    //   .then((url) => {
    //     this.imageFB = url;
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  },
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