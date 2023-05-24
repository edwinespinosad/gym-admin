<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-icon
          v-if="update"
          @click="getData(dataUpdate)"
          color="green"
          v-bind="attrs"
          v-on="on"
        >
          fa-solid fa-pencil
        </v-icon>
        <button
          v-else
          v-bind="attrs"
          v-on="on"
          class="btn position-absolute top-2 end-0 text-dark bg-green"
        >
          Agregar usuario
        </button>
      </template>

      <v-card color="#000000">
        <v-card-text class="p-4 text-white">
          <v-row>
            <v-col cols="11">
              <h5 class="">
                {{ this.update ? "Editar usuario" : "Agregar usuario" }}
              </h5>
            </v-col>
            <v-col cols="1" @click="close()">
              <v-icon @click="dialog = false" dark>fa-solid fa-close</v-icon>
            </v-col>
          </v-row>
          <v-form ref="form" lazy-validation v-model="valid">
            <v-row>
              <v-col cols="12" lg="6" xl="6">
                <p>Nombre</p>
                <v-text-field
                  v-model="user.name"
                  required
                  dense
                  dark
                  outlined
                  :rules="rules.nameRule"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="6" xl="6">
                <p>Apellidos</p>
                <v-text-field
                  v-model="user.last_name"
                  required
                  dense
                  dark
                  outlined
                  :rules="rules.lastNameRule"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="6" xl="6">
                <p>Teléfono</p>
                <v-text-field
                  v-model="user.phone"
                  type="number"
                  hide-spin-buttons
                  required
                  dense
                  dark
                  outlined
                  :rules="rules.phoneRule"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="6" xl="6">
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
              <v-col cols="12" lg="6" xl="6">
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
          </v-form>
          <div class="text-center">
            <button class="btn text-dark bg-green" @click="save()">
              {{ this.update ? "Guardar usuario" : "Agregar usuario" }}
            </button>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
import { bus } from "../../../main.js";
export default {
  data: () => ({
    dialog: false,
    valid: true,
    user: {
      id: "",
      name: "",
      last_name: "",
      phone: "",
      email: "",
      password: "",
      fk_id_role_user: 1,
    },

    rules: {
      nameRule: [(v) => !!v || "El nombre es requerido"],
      lastNameRule: [(v) => !!v || "Los apellidos son requeridos"],
      phoneRule: [
        (v) => !!v || "El teléfono es requerido",
        (v) => (v && v.length == 10) || "El teléfono debe tener 10 dígitos",
      ],
      emailRule: [(v) => !!v || "El correo es requerido"],
      passwordRule: [(v) => !!v || "La contraseña es requerida"],
    },
  }),
  props: {
    update: Boolean,
    dataUpdate: Object,
  },
  created() {
    this.URL_CREATE = `${process.env.VITE_API_URL.replace(/"/g, "")}/api/users`;
    this.URL_UPDATE = `${process.env.VITE_API_URL.replace(
      /"/g,
      ""
    )}/api/users/`;
  },
  methods: {
    close() {
      this.dialog = false;
      this.$refs.form.resetValidation();
      this.$refs.form.reset();
    },
    getData(data) {
      this.user.id = data.id;
      this.user.name = data.name;
      this.user.last_name = data.last_name;
      this.user.phone = data.phone;
      this.user.email = data.email;
      this.user.fk_id_role_user = 1;
    },
    save() {
      if (this.$refs.form.validate()) {
        if (this.update) {
          axios
            .patch(this.URL_UPDATE + this.user.id, this.user, {
              headers: { "x-access-token": localStorage.getItem("token") },
            })
            .then((response) => {
              if (response.data.success) {
                this.$swal.fire({
                  title: "Usuario modificado!",
                  icon: "success",
                  confirmButtonText: "Ok",
                  timer: 1500,
                });
                bus.$emit("reload-grid");
                this.dialog = false;
                this.$refs.form.reset();
                location.reload();
              } else {
                this.$swal.fire({
                  title: "Error!",
                  text: "Verifica los campos ingresados",
                  icon: "error",
                  timer: 2000,
                });
              }
            });
        } else {
          axios
            .post(this.URL_CREATE, this.user, {
              headers: { "x-access-token": localStorage.getItem("token") },
            })
            .then((response) => {
              if (response.data.success) {
                this.$swal.fire({
                  title: "Usuario agregado!",
                  icon: "success",
                  confirmButtonText: "Ok",
                  timer: 1500,
                });
                bus.$emit("reload-grid");
                this.dialog = false;
                this.$refs.form.reset();
              } else {
                this.$swal.fire({
                  title: "Error!",
                  text: "Verifica los campos ingresados",
                  icon: "error",
                  timer: 2000,
                });
              }
            });
        }
      }
    },
  },
};
</script>

<style>
</style>