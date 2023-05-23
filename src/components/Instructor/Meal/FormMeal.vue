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
          Agregar comida
        </button>
      </template>

      <v-card color="#000000">
        <v-card-text class="p-4 text-white">
          <v-row>
            <v-col cols="11">
              <h5 class="">
                {{ this.update ? "Editar comida" : "Agregar comida" }}
              </h5>
            </v-col>
            <v-col cols="1" @click="close()">
              <v-icon @click="dialog = false" dark>fa-solid fa-close</v-icon>
            </v-col>
          </v-row>
          <v-form ref="form" lazy-validation v-model="valid">
            <v-row>
              <v-col
                cols="12"
                class="d-flex flex-column justify-content-center align-items-center"
              >
                <input
                  required
                  v-show="false"
                  ref="photo"
                  type="file"
                  accept="image/*"
                  @change="onFileChanged"
                />
                <div
                  class="drop text-center"
                  style="margin-bottom: 4px; cursor: pointer; display: flex"
                >
                  <div
                    class="mb-2 row d-flex justify-content-center align-items-center"
                    style="height: 110px; width: 110px"
                  >
                    <v-img
                      class="rounded-circle"
                      :src="view_image"
                      v-if="image !== null"
                      @click="selectImage"
                      max-width="109"
                      max-height="109"
                      width="109"
                      height="109"
                      style="
                        cursor: pointer;
                        margin-top: -2px;
                        margin-right: -1px;
                      "
                    ></v-img>
                    <v-icon v-else @click="selectImage" color="#000000"
                      >fa-solid fa-image
                    </v-icon>
                  </div>
                </div>
                <p v-if="validImage" class="text-danger">
                  La imagen es necesaria
                </p>
              </v-col>
              <v-col cols="12">
                <p>Nombre de la comida</p>
                <v-text-field
                  v-model="meal.name"
                  required
                  dense
                  dark
                  outlined
                  :rules="rules.nameRule"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <p>Preparación</p>
                <v-textarea
                  v-model="meal.meal_preparation"
                  required
                  auto-grow
                  dense
                  dark
                  outlined
                  :rules="rules.meal_preparationRule"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-form>
          <div class="text-center">
            <v-btn
              class="btn text-dark bg-green"
              @click="save()"
              :loading="loading"
            >
              {{ this.update ? "Guardar comida" : "Agregar comida" }}
            </v-btn>
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
  props: {
    update: Boolean,
    dataUpdate: Object,
  },
  data() {
    return {
      URL: process.env.VITE_API_URL.replace(/"/g, ""),
      image: null,
      view_image: "",
      validImage: false,
      loading: false,
      change_image: false,
      dialog: false,
      valid: true,
      meal: {
        id: "",
        name: "",
        description: "",
      },
      rules: {
        nameRule: [(v) => !!v || "El nombre es requerido"],
        meal_preparationRule: [(v) => !!v || "La preparación es requerida"],
      },
    };
  },
  created() {
    this.URL_CREATE = `${process.env.VITE_API_URL.replace(/"/g, "")}/api/meals`;
    this.URL_UPDATE = `${process.env.VITE_API_URL.replace(
      /"/g,
      ""
    )}/api/meals/`;
  },
  watch: {
    image(file) {
      if (file) {
        if (typeof file !== "string") {
          this.view_image = URL.createObjectURL(file);
          //   console.log(typeof file);
          //   console.log(URL.createObjectURL(file));
        } else {
          this.view_image = file;
        }
      } else {
        this.view_image = null;
      }
    },
  },
  methods: {
    close() {
      this.dialog = false;
      this.$refs.form.resetValidation();
      this.$refs.form.reset();
    },
    onFileChanged(e) {
      this.image = e.target.files[0];
      this.validImage = false;
      this.change_image = true;
    },
    selectImage() {
      this.$refs.photo.click();
    },
    getData(data) {
      this.meal.id = data.id;
      this.meal.name = data.name;
      this.meal.meal_preparation = data.meal_preparation;
      this.image = data.image;
      console.log(data.image);
      console.log(
        this.update
          ? this.dataUpdate.image
          : this.view_image.includes("blob")
          ? this.view_image
          : this.URL + "/" + this.view_image
      );
    },
    save() {
      if (this.$refs.form.validate() && this.image !== null) {
        this.loading = true;
        const formData = new FormData();
        formData.append("file", this.image);
        formData.append("name", this.meal.name);
        formData.append("meal_preparation", this.meal.meal_preparation);
        formData.append("change_image", this.change_image);

        if (this.update) {
          axios
            .patch(this.URL_UPDATE + this.meal.id, formData, {
              headers: { "x-access-token": localStorage.getItem("token") },
            })
            .then((response) => {
              this.loading = false;
              if (response.data.success) {
                this.$swal.fire({
                  title: "Comida modificada!",
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
          axios
            .post(this.URL_CREATE, formData, {
              headers: { "x-access-token": localStorage.getItem("token") },
            })
            .then((response) => {
              if (response.data.success) {
                this.$swal.fire({
                  title: "Comida agregada!",
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
      } else if (this.image === null) {
        this.validImage = true;
      }
    },
  },
};
</script>
  
  <style>
</style>