<template>
  <div class="mt-3">
    <navbar
      :minNav="navbarMinimize"
      :class="`${
        this.$store.state.isNavFixed ? this.$store.state.navbarFixed_class : ''
      } ${this.$store.state.isNavFixed ? 'bg-white' : 'bg-success'}`"
    />
  </div>
  <div
    class="mx-3 mt-4 border-radius-xl position-relative"
    :style="{
      backgroundImage: 'url(' + require('@/assets/img/vr-bg.jpg') + ')',
      backgroundSize: 'cover',
    }"
  >
    <main class="mt-1 main-content border-radius-lg">
      <div
        class="section min-vh-85 position-relative transform-scale-0 transform-scale-md-7"
      >
        <div class="container-fluid">
          <div class="pt-6 row" v-if="$store.state.auth.is_login">
            <div
              class="pt-5 text-center col-lg-1 col-md-1 pt-lg-0 ms-lg-5"
            ></div>
            <div class="col-lg-8 col-md-11">
              <div class="d-flex">
                <div class="me-auto">
                  <h3 class="mb-0 ms-1">Welcome,</h3>
                  <h1 class="mb-2 text-uppercase ms-1">
                    
                  </h1>
                </div>
                <div class="ms-auto">
                  <!-- <img
                    class="w-50 float-end mt-lg-n4"
                    src="@/assets/img/small-logos/icon-sun-cloud.png"
                    alt="image sun"
                  /> -->
                </div>
              </div>
            </div>
          </div>

          <div :class="$store.state.auth.is_login ? 'pt-3 row' : 'pt-6 row'">
            <div
              class="pt-5 text-center col-lg-1 col-md-1 pt-lg-0 ms-lg-5"
              v-if="$store.state.auth.is_login"
            >
              <a
                href="javascript:;"
                class="border-0 avatar avatar-md d-block"
                data-bs-toggle="tooltip"
                data-bs-placement="left"
                title="My Profile"
              >
                <img
                  class="border-radius-lg"
                  alt="Image placeholder"
                  :src="image"
                  @error="imageLoadError"
                />
              </a>
            </div>
            <div class="col-lg-8 col-md-11">
              <div class="d-flex">
                <div class="me-auto">
                  <h1 class="mb-0 display-1 font-weight-bold mt-n4">
                    {{
                      getWeatherData.current_weather
                        ? getWeatherData.current_weather.temperature
                        : 28
                    }}°C
                  </h1>
                  <h6 class="mb-0 text-uppercase ms-1">Cloudy</h6>
                </div>
                <div class="ms-auto">
                  <img
                    class="w-50 float-end mt-lg-n4"
                    src="@/assets/img/small-logos/icon-sun-cloud.png"
                    alt="image sun"
                  />
                </div>
              </div>
              <div class="mt-4 row" v-if="getIsLogin">
                <!-- <div class="col-lg-4 col-md-4">
                  <card-calendar />
                </div> -->
                <div></div>
              </div>
              <div class="mt-4 row" v-else>
                <div class="col-lg-4 col-md-4">
                  <card-calendar />
                </div>
                <div class="mt-4 col-lg-4 col-md-4 mt-sm-0">
                  <card-to-do />
                  <card-email />
                </div>
                <div class="mt-4 col-lg-4 col-md-4 mt-sm-0">
                  <card-player />
                  <card-message />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
  <app-footer class="py-3 bg-white border-radius-lg" />
</template>

<script>
/* eslint-disable vue/no-unused-components */
// import Sidenav from "@/examples/Sidenav";

import Swal from "sweetalert2";

import AppFooter from "@/components/Footer.vue";
import Navbar from "@/components/navbar/Navbar.vue";
import CardApps from "@/components/CardApps.vue";
import setTooltip from "@/assets/js/tooltip.js";
import CardCalendar from "./components/CardCalendar.vue";
import CardEmail from "./components/CardEmail.vue";
import CardToDo from "./components/CardToDo.vue";
import CardPlayer from "./components/CardPlayer.vue";
import CardMessage from "./components/CardMessage.vue";

const body = document.getElementsByTagName("body")[0];

import { mapMutations, mapActions, mapGetters } from "vuex";

export default {
  name: "virtual-reality",
  data() {
    return {
      image: "",
      refresh: 0,
    };
  },
  components: {
    AppFooter,
    // Sidenav,
    Navbar,
    CardApps,
    CardCalendar,
    CardEmail,
    CardToDo,
    CardPlayer,
    CardMessage,
  },
  mounted() {
    setTooltip();
    this.setInitMethod();
    // this.$store.dispatch("auth/fetchAllApps");
    this.fetchAppsData();
    this.fetchWeatherData();
  },
  methods: {
    ...mapMutations([
      "navbarMinimize",
      "toggleConfigurator",
      "SET_APP_NAME",
      "SET_TOKEN_ERAFORCE",
    ]),
    ...mapActions({
      fetchAllApps: "auth/fetchAllApps",
      fetchWeatherData: "fetchWeatherData",
      fetchMenu: "menu/fetchMenu",
      loginEraforce: "eraforce/loginEraforce",
      fetchDashboardData: "eraforce/fetchDashboardData",
    }),
    fetchAppsData() {
      if (this.$store.state.auth.is_login == false) {
        this.fetchAllApps();
      } else {
        this.image = `https://devgoapi.yukevajkt.com/assets/user/${this.$store.state.auth.login_data.user.image}`;
      }
    },

    setInitMethod() {
      if (localStorage.getItem("reloaded2")) {
        localStorage.removeItem("reloaded2");
      } else {
        localStorage.setItem("reloaded2", "1");
        location.reload();
        console.log("reloaded");
      }
    },

    async goToAppPage(data) {
      Swal.fire({
        title: "Please wait!",
        didOpen: () => {
          Swal.showLoading();
        },
      });
      this.SET_APP_NAME(data.apps);
      if (data.id_apps == "2") {
        const user_login = this.$store.state.auth.login_data;
        let unique;
        if (user_login.user.username != null) {
          unique = user_login.user.username;
        } else if (user_login.user.email != null) {
          unique = user_login.user.email;
        } else if (user_login.user.phone != null) {
          unique = user_login.user.phone;
        } else {
          Swal.fire({
            icon: "error",
            title: "Something Wrong!",
            text: `Can't access this apps! Please contact administrator!`,
          });
        }
        const login_password = this.$store.state.auth.user_login_password;
        const dec_password = this.$CryptoJS.AES.decrypt(
          login_password,
          "Er4komp_2022%"
        ).toString(this.$CryptoJS.enc.Utf8);

        const eraforce_payload = {
          username: unique,
          password: dec_password,
        };
        await this.loginEraforce(eraforce_payload)
          .then(async (response) => {
            window.dispatchEvent(new Event("storage"));
            await this.fetchDashboardData()
              .then((response) => {
                this.fetchUserMenu(data);
              })
              .catch((error) => {
                Swal.fire({
                  icon: "error",
                  title: "Something Wrong!",
                  text: `Error: ${error.message}, please refresh page and try again!`,
                }).then((result) => {
                  if (result.isConfirmed) {
                    location.reload();
                  }
                });
              });
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Something Wrong!",
              text: `Error: ${error.response.data.message ?? "-"}`,
            });
          });
      } else {
        this.fetchUserMenu(data);
      }
    },

    fetchUserMenu(data) {
      this.fetchMenu(data.id_user_apps)
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Hi, have a nice day!",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            this.$router.push(`/${data.id_apps}`);
          });
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Something Wrong!",
            text: `Error: ${error.message}, please refresh page and try again!`,
          }).then((result) => {
            if (result.isConfirmed) {
              location.reload();
            }
          });
        });
    },

    imageLoadError() {
      console.log(`image not found`);
      this.image = `https://salesforce.klikpersada.co.id/ns/employee/default-image.png`;
    },
  },
  beforeMount() {
    this.$store.state.layout = "vr";
    this.$store.state.showNavbar = false;
    this.$store.state.showSidenav = false;
    this.$store.state.showFooter = false;
    body.classList.add("virtual-reality");
    this.$store.state.isTransparent = "bg-white";
  },
  beforeUnmount() {
    this.$store.state.layout = "default";
    this.$store.state.showNavbar = true;
    this.$store.state.showSidenav = true;
    this.$store.state.showFooter = true;
    body.classList.remove("virtual-reality");

    if (this.$store.state.isPinned === false) {
      const sidenav_show = document.querySelector(".g-sidenav-show");
      sidenav_show.classList.remove("g-sidenav-hidden");
      sidenav_show.classList.add("g-sidenav-pinned");
      this.$store.state.isPinned = true;
    }
    this.$store.state.isTransparent = "bg-transparent";
  },
  computed: {
    ...mapGetters({
      getAllData: "auth/getAllData",
    }),
    isTransparent() {
      return this.$store.state.isTransparent;
    },
    getAllData() {
      return this.$store.state.auth.apps;
    },
    getIsLogin() {
      return this.$store.state.auth.is_login;
    },
    getUserLoginName() {
      return this.$store.state.auth.login_data.user.fullname ?? "User";
    },
    getWeatherData() {
      return this.$store.state.weather;
    },
    getUserProfilePicture() {
      this.image = `https://devgoapi.yukevajkt.com/assets/user/${this.$store.state.auth.login_data.user.image}`;
      return this.image;
    },
  },
};
</script>
