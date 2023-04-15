<template>
  <div class="container-fluid bg-dark text-white">
    <v-row class="vh-100">
      <v-col cols="5" class="m-0 p-0">
        <v-img
          lazy-src="https://picsum.photos/id/11/10/6"
          class="vh-100"
          src="/main.jpg"
        ></v-img>
      </v-col>
      <v-col cols="7" class="py-5 my-5">
        <v-img
          lazy-src="https://picsum.photos/id/11/10/6"
          max-width="80%"
          contain
          class="mx-auto"
          src="/GadGymPerfil.png"
        ></v-img>

        <h1 class="text-center fw-bolder">Bienvenido</h1>
        <v-form ref="form" lazy-validation v-model="valid">
          <v-card-text>
            <v-row>
              <v-col cols="6" offset="3">
                <p>Correo Electrónico</p>
                <v-text-field
                  v-model="user.email"
                  required
                  dense
                  dark
                  outlined
                  :rules="rules.emailRule"
                ></v-text-field>
              </v-col>
              <v-col cols="6" offset="3">
                <p>Contraseña</p>
                <v-text-field
                  v-model="user.password"
                  type="password"
                  dense
                  dark
                  outlined
                  :rules="rules.passwordRule"
                ></v-text-field>
              </v-col>

              <v-col
                cols="12"
                class="d-flex justify-content-center align-items-center"
              >
                <v-btn class="text-dark" color="#e3ffa8" @click="signIn()">
                  Iniciar Sesión
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-form>
      </v-col>
    </v-row>

    <!-- <div class="row justify-content-center align-items-center vh-100">
      <div class="col-md-6 col-lg-8">
        <v-card class="elevation-12 p-4" dark>
          <h2 class="font-weight-bold text-center">Inicio de Sesión</h2>

          <div class="d-flex justify-content-center align-items-center">
            <div></div>

            <div>
              <v-form ref="form" lazy-validation v-model="valid">
                <v-card-text>
                  <v-row>
                    <v-col cols="6">
                      <p>Correo Electrónico</p>
                      <v-text-field
                        v-model="user.email"
                        required
                        dense
                        dark
                        outlined
                        :rules="rules.emailRule"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <p>Contraseña</p>
                      <v-text-field
                        v-model="user.password"
                        type="password"
                        dense
                        dark
                        outlined
                        :rules="rules.passwordRule"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-form>
              <v-card-actions class="justify-content-center">
                <v-btn class="text-dark" color="#e3ffa8" @click="signIn()">
                  Iniciar Sesión
                </v-btn>
              </v-card-actions>
            </div>
          </div>
        </v-card>
      </div>
    </div> -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      valid: false,
      rules: {
        emailRule: [(v) => !!v || "El correo es requerido"],
        passwordRule: [(v) => !!v || "La contraseña es requerida"],
      },
    };
  },
  created() {
    this.URL_CREATE = "http://localhost:3000/api/login";
    this.URL_VALID = "http://localhost:3000/api/is-logged";
  },
  methods: {
    signIn() {
      if (this.$refs.form.validate()) {
        axios.post(this.URL_CREATE, this.user).then((response) => {
          if (response.data.success) {
            this.$swal.fire({
              title: "Inicio de sesion correcto!",
              icon: "success",
              confirmButtonText: "Ok",
              timer: 1500,
            });
            let token = response.data.token;
            let user = response.data.user;
            localStorage.setItem("token", token);
            localStorage.setItem("user", user);
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          } else {
            this.$swal.fire({
              title: "Lo sentimos!",
              text: response.data.message,
              icon: "error",
              timer: 2000,
            });
          }
        });
      }
    },
  },
};
</script>
