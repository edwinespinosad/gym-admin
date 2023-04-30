<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-icon
          @click="getData(dataUpdate)"
          color="green"
          v-bind="attrs"
          v-on="on"
        >
          fa-regular fa-address-card
        </v-icon>
      </template>

      <v-card color="#000000">
        <v-card-text class="p-4 text-white">
          <v-row>
            <v-col cols="11">
              <h5 class="">Agregar membresía</h5>
            </v-col>
            <v-col cols="1" @click="close()">
              <v-icon @click="dialog = false" dark>fa-solid fa-close</v-icon>
            </v-col>
          </v-row>
          <v-form ref="form" lazy-validation v-model="valid">
            <v-row>
              <v-col cols="12">
                <p>Membresía</p>
                <v-autocomplete
                  v-model="membership"
                  :items="memberships"
                  required
                  dense
                  dark
                  outlined
                  item-text="name"
                  item-value="id"
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-form>
          <div class="text-center">
            <button class="btn text-dark bg-green" @click="save()">
              Agregar
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
  props: {
    dataUpdate: Object,
  },
  data() {
    return {
      dialog: false,
      membershipClient: {
        fk_id_client: "",
        fk_id_membership: "",
        price: "",
      },
      membership: "",
      memberships: [],
      valid: true,
      fk_id_client: "",
      url: `${process.env.VITE_API_URL.replace(/"/g, "")}/api/memberships`,
      create_url: `${process.env.VITE_API_URL.replace(
        /"/g,
        ""
      )}/api/memberships/add-client`,
    };
  },
  created() {
    axios
      .get(this.url, {
        headers: { "x-access-token": localStorage.getItem("token") },
      })
      .then((response) => {
        response.data.rows.forEach((element) => {
          this.memberships.push({
            price: element.price,
            name:
              element.name + " - " + element.duration + " - $" + element.price,
            id: element.id,
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    close() {
      this.dialog = false;
      this.$refs.form.resetValidation();
      this.$refs.form.reset();
    },
    getData(data) {
      this.fk_id_client = data.id;
    },
    save() {
      if (this.$refs.form.validate()) {
        const formData = new FormData();
        formData.append("fk_id_membership", this.membership);
        formData.append("fk_id_client", this.fk_id_client);
        let price = this.memberships.find(
          (element) => element.id === this.membership
        );
        formData.append("price", price.price);

        this.membershipClient.fk_id_membership = this.membership;
        this.membershipClient.fk_id_client = this.fk_id_client;
        this.membershipClient.price = price.price;
        console.log(this.membershipClient);

        axios
          .post(this.create_url, this.membershipClient, {
            headers: { "x-access-token": localStorage.getItem("token") },
          })
          .then((response) => {
            if (response.data.success) {
              this.$swal.fire({
                title: "Membresía vinculada!",
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