<template>
  <div class="col-1" style="background-color: #0f0f0f">
    <div
      class="text-white d-flex flex-column align-items-center sticky-top gap-4"
    >
      <v-img src="/perfil.png" width="500" aspect-ratio="1"></v-img>

      <v-tooltip
        v-for="(link, index) in linksToShow"
        :key="index"
        right
        color="#E3FFA8"
      >
        <template v-slot:activator="{ on, attrs }">
          <router-link :to="{ name: link.name }" class="router">
            <div
              class="d-flex justify-content-center align-items-center"
              id="div-a"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon color="#7B7B7B">
                {{ link.icon }}
              </v-icon>
            </div>
          </router-link>
        </template>
        <span class="text-dark">{{ link.title }}</span>
      </v-tooltip>

      <div
        class="d-flex justify-content-center align-items-center cursor-pointer"
        id="div-a"
        @click="logout()"
      >
        <v-icon color="#FFFFFF"> fa-solid fa-right-from-bracket </v-icon>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      links: [
        {
          name: "dashboard",
          title: "Dashboard",
          icon: "fa-solid fa-chart-line",
        },
        { name: "users", title: "Usuarios", icon: "fa-solid fa-users" },
        { name: "clients", title: "Clientes", icon: "fa-regular fa-user" },
        {
          name: "memberships",
          title: "Membresías",
          icon: "fa-regular fa-address-card",
        },
        {
          name: "instructors",
          title: "Instructores",
          icon: "fa-solid fa-dumbbell",
        },
        {
          name: "expenses",
          title: "Gastos",
          icon: "fa-solid fa-money-bills",
        },
        {
          name: "suggestions",
          title: "Sugerencias Recibidas",
          icon: "fa-solid fa-exclamation",
        },
      ],
      linksInstructor: [
        {
          name: "routines",
          title: "Rutinas",
          icon: "fa-solid fa-dumbbell",
        },
        {
          name: "meals",
          title: "Comidas",
          icon: "fa-solid fa-bowl-rice",
        },
      ],
    };
  },
  computed: {
    useInstructorLinks() {
      return localStorage.getItem("role") === "3";
    },
    linksToShow() {
      return this.useInstructorLinks ? this.linksInstructor : this.links;
    },
  },
  methods: {
    async redirect() {
      try {
        await this.$router.push("/");
        window.location.reload();
      } catch (err) {
        if (err.name !== "NavigationDuplicated") {
          throw err;
        } else {
          window.location.reload();
        }
      }
    },

    logout() {
      this.$swal
        .fire({
          icon: "warning",
          title: "¿Deseas cerrar sesion?",
          showCancelButton: true,
          confirmButtonText: "Cerrar",
          cancelButtonText: `Cancelar`,
        })
        .then((result) => {
          if (result.isConfirmed) {
            localStorage.clear();
            if (this.$route.path !== "/") {
              this.redirect();
            } else {
              window.location.reload();
            }
          }
        });
    },
  },
};
</script>

<style>
</style>