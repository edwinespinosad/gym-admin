<template>
  <v-app>
    <div v-if="logged" class="row m-0 p-0" style="background-color: #000000">
      <Navbar></Navbar>
      <div class="col-11 text-white m-0 p-0" style="background-color: #000000">
        <div class="d-flex flex-column">
          <NavbarSuperior :user="user"></NavbarSuperior>
          <v-main style="background-color: #000000" class="container mt-5">
            <h5>{{ this.$route.meta.name }}</h5>
            <router-view class="container" />
          </v-main>
        </div>
      </div>
    </div>

    <div v-else class="row m-0 p-0">
      <Login></Login>
    </div>
  </v-app>
</template>

<script>
import Navbar from "../commons/Navbar.vue";
import NavbarSuperior from "../commons/NavbarSuperior.vue";
import Login from "./Login.vue";
import axios from "axios";
export default {
  name: "App",
  components: { Navbar, NavbarSuperior, Login },

  data: () => ({
    logged: false,
    user: {},
  }),
  // created() {
  //   this.URL_VALID = `${process.env.VITE_API_URL.replace(
  //     /"/g,
  //     ""
  //   )}/api/is-logged`;

  //   let token = { token: localStorage.getItem("token") };
  //   let role = localStorage.getItem("role");

  //   axios.post(this.URL_VALID, token).then((response) => {
  //     if (response.data.success) {
  //       this.logged = true;
  //       if (role === "1") {
  //         axios
  //           .get(
  //             `${process.env.VITE_API_URL.replace(/"/g, "")}/api/users/` +
  //               localStorage.getItem("user"),
  //             {
  //               headers: { "x-access-token": localStorage.getItem("token") },
  //             }
  //           )
  //           .then((response) => {
  //             this.user = response.data;
  //           });
  //       } else if (role === "3") {
  //         axios
  //           .get(
  //             `${process.env.VITE_API_URL.replace(/"/g, "")}/api/instructors/` +
  //               localStorage.getItem("user"),
  //             {
  //               headers: { "x-access-token": localStorage.getItem("token") },
  //             }
  //           )
  //           .then((response) => {
  //             this.user = response.data;
  //           });
  //       }
  //     } else {
  //       this.logged = false;
  //     }
  //   });
  // },

  async created() {
    try {
      this.URL_VALID = `${process.env.VITE_API_URL.replace(
        /"/g,
        ""
      )}/api/is-logged`;

      const token = { token: localStorage.getItem("token") };
      const role = localStorage.getItem("role");

      const validResponse = await axios.post(this.URL_VALID, token);
      if (validResponse.data.success) {
        this.logged = true;
        if (role === "1") {
          const userResponse = await axios.get(
            `${process.env.VITE_API_URL.replace(/"/g, "")}/api/users/` +
              localStorage.getItem("user"),
            { headers: { "x-access-token": localStorage.getItem("token") } }
          );
          this.user = userResponse.data;
        } else if (role === "3") {
          const instructorResponse = await axios.get(
            `${process.env.VITE_API_URL.replace(/"/g, "")}/api/instructors/` +
              localStorage.getItem("user"),
            { headers: { "x-access-token": localStorage.getItem("token") } }
          );
          this.user = instructorResponse.data;
        }
      } else {
        this.logged = false;
      }
    } catch (error) {
      console.error(error);
    }
  },
};
</script>
