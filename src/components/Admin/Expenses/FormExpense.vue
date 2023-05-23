<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <button
          v-bind="attrs"
          v-on="on"
          class="btn position-absolute top-2 end-0 text-dark bg-green"
        >
          Agregar gasto
        </button>
      </template>

      <v-card color="#000000">
        <v-card-text class="p-4 text-white">
          <v-row>
            <v-col cols="11">
              <h5 class="">Agregar gasto</h5>
            </v-col>
            <v-col cols="1" @click="close()">
              <v-icon @click="dialog = false" dark>fa-solid fa-close</v-icon>
            </v-col>
          </v-row>
          <v-form ref="form" lazy-validation v-model="valid">
            <v-row>
              <v-col cols="6">
                <p>Descripción</p>
                <v-text-field
                  v-model="expense.description"
                  required
                  dense
                  dark
                  outlined
                  :rules="rules.descriptionRule"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <p>Costo</p>
                <v-text-field
                  v-model="expense.cost"
                  required
                  dense
                  dark
                  outlined
                  type="number"
                  hide-spin-buttons
                  :rules="rules.costRule"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
          <div class="text-center">
            <button class="btn text-dark bg-green" @click="save()">
              Agregar gasto
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
    expense: {
      description: "",
      cost: "",
    },

    rules: {
      descriptionRule: [(v) => !!v || "La descripción es requerida"],
      costRule: [(v) => !!v || "El costoes requerido"],
    },
  }),
  created() {
    this.URL_CREATE = `${process.env.VITE_API_URL.replace(
      /"/g,
      ""
    )}/api/expenses`;
  },
  methods: {
    close() {
      this.dialog = false;
      this.$refs.form.resetValidation();
      this.$refs.form.reset();
    },
    save() {
      if (this.$refs.form.validate()) {
        axios
          .post(this.URL_CREATE, this.expense, {
            headers: { "x-access-token": localStorage.getItem("token") },
          })
          .then((response) => {
            if (response.data.success) {
              this.$swal.fire({
                title: "Gasto agregado!",
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
    },
  },
};
</script>
  
<style>
</style>