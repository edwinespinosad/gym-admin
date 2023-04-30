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
          Agregar membresía
        </button>
      </template>

      <v-card color="#000000">
        <v-card-text class="p-4 text-white">
          <v-row>
            <v-col cols="11">
              <h5 class="">
                {{ this.update ? "Editar membresía" : "Agregar membresía" }}
              </h5>
            </v-col>
            <v-col cols="1" @click="dialog = false">
              <v-icon @click="close()" dark>fa-solid fa-close</v-icon>
            </v-col>
          </v-row>
          <v-form ref="form" lazy-validation v-model="valid">
            <v-row>
              <v-col cols="6">
                <p>Nombre</p>
                <v-text-field
                  v-model="membership.name"
                  required
                  dense
                  dark
                  outlined
                  :rules="rules.nameRule"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <p>Duración</p>
                <v-text-field
                  v-model="membership.duration"
                  required
                  dense
                  dark
                  outlined
                  :rules="rules.durationRule"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <p>Precio</p>
                <v-text-field
                  v-model="membership.price"
                  type="number"
                  required
                  dense
                  dark
                  outlined
                  :rules="rules.priceRule"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <p>Beneficios</p>
                <v-text-field
                  v-model="membership.benefits"
                  required
                  dense
                  dark
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
          <div class="text-center">
            <button class="btn text-dark bg-green" @click="save()">
              {{ this.update ? "Guardar membresía" : "Agregar membresía" }}
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
    membership: {
      id: "",
      name: "",
      duration: "",
      price: "",
      benefits: "",
    },
    rules: {
      nameRule: [(v) => !!v || "El nombre es requerido"],
      durationRule: [(v) => !!v || "La duración es requerida"],
      priceRule: [(v) => !!v || "El precio es requerido"],
    },
  }),
  props: {
    update: Boolean,
    dataUpdate: Object,
  },
  created() {
    this.URL_CREATE = `${process.env.VITE_API_URL.replace(
      /"/g,
      ""
    )}/api/memberships`;
    this.URL_UPDATE = `${process.env.VITE_API_URL.replace(
      /"/g,
      ""
    )}/api/memberships/`;
  },
  methods: {
    close() {
      this.dialog = false;
      this.$refs.form.resetValidation();
      this.$refs.form.reset();
    },
    getData(data) {
      this.membership.id = data.id;
      this.membership.name = data.name;
      this.membership.duration = data.duration;
      this.membership.price = data.price;
      this.membership.benefits = data.benefits;
    },
    save() {
      if (this.update) {
        axios
          .patch(this.URL_UPDATE + this.membership.id, this.membership, {
            headers: { "x-access-token": localStorage.getItem("token") },
          })
          .then((response) => {
            if (response.data.success) {
              this.$swal.fire({
                title: "Membresía modificada!",
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
      } else {
        if (this.$refs.form.validate()) {
          axios
            .post(this.URL_CREATE, this.membership, {
              headers: { "x-access-token": localStorage.getItem("token") },
            })
            .then((response) => {
              if (response.data.success) {
                this.$swal.fire({
                  title: "Membresía agregada!",
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