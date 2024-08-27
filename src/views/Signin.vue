<template>
  <div class="container top-0 position-sticky z-index-sticky">
    <div class="row">
      <div class="col-12">
        <navbar
          isBlur="blur  border-radius-lg my-3 py-2 start-0 end-0 mx-4 shadow"
          v-bind:darkMode="true"
          isBtn="bg-gradient-success"
        />
      </div>
    </div>
  </div>
  <main class="mt-0 main-content">
    <section>
      <div class="page-header min-vh-100">
        <div class="container">
          <div class="row">
            <div
              class="mx-auto col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0"
            >
              <div class="card card-plain">
                <div class="pb-0 card-header text-start">
                  <h4 class="font-weight-bolder">Sign In</h4>
                  <p class="mb-0">Enter your credentials to sign in</p>
                </div>
                <div class="card-body">
                  <!-- <form role="form"> -->
                  <div class="mb-3">
                    <argon-input
                      type="text"
                      placeholder="Email/Username/Phone"
                      name="email"
                      size="lg"
                      :value="unique"
                      v-model="unique"
                    />
                  </div>
                  <div class="mb-3">
                    <argon-input
                      :type="show_password ? 'text' : 'password'"
                      placeholder="Password"
                      name="password"
                      size="lg"
                      :icon="show_password ? 'fas fa-eye-slash' : 'fas fa-eye'"
                      iconDir="right"
                      :value="password"
                      v-model="password"
                      :hoverCursor="true"
                      @toggleIcon="showPassword()"
                    />
                  </div>
                  <!-- <argon-switch id="rememberMe">Remember me</argon-switch> -->

                  <div class="text-center">
                    <argon-button
                      class="mt-4"
                      variant="gradient"
                      color="success"
                      fullWidth
                      size="lg"
                      @click="loginButton"
                      :disabled="$store.state.auth.login_button_loading == true"
                    >
                      <div
                        v-if="$store.state.auth.login_button_loading == true"
                      >
                        <span
                          class="spinner-grow spinner-grow-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Loading...
                      </div>
                      <div v-else>Sign in</div>
                    </argon-button>
                  </div>
                  <!-- </form> -->
                </div>
                <div class="px-1 pt-0 text-center card-footer px-lg-2">
                  <p class="mx-auto mb-4 text-sm">
                    Don't have an account?
                    <a
                      @click="signUpButton"
                      href="javascript:;"
                      class="text-success text-gradient font-weight-bold"
                    >
                      Sign up
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div
              class="top-0 my-auto text-center col-6 d-lg-flex d-none h-100 pe-0 position-absolute end-0 justify-content-center flex-column"
            >
              <div
                class="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden"
                style="
                  background-image: url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-ill.jpg');
                  background-size: cover;
                "
              >
                <span class="mask bg-gradient-success opacity-6"></span>
                <h4
                  class="mt-5 text-white font-weight-bolder position-relative"
                >
                  Samantha Apps
                </h4>
                <p class="text-white position-relative">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste
                  odit maiores a, fugiat esse quam quod culpa, voluptatibus
                  earum corporis placeat nobis nihil ipsa officia excepturi. A
                  praesentium voluptatum tempora saepe minima quaerat vitae?
                  Voluptatum nam dolor aut optio, tempora nemo dolorum esse
                  accusantium, molestiae, quaerat vero veritatis temporibus.
                  Corporis natus ad assumenda necessitatibus maxime? Earum
                  architecto optio exercitationem quo recusandae nihil
                  repellendus, a perferendis eius tenetur harum quasi nulla
                  corrupti et velit magni soluta sunt, laudantium quisquam non.
                  Vero, accusantium. Vel maiores praesentium culpa deleniti
                  reiciendis quidem est nam doloribus eos, facilis in
                  reprehenderit voluptatibus dolores consequatur nesciunt
                  distinctio.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import Navbar from "@/components/navbar/AuthNavbar.vue";
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonSwitch from "@/components/ArgonSwitch.vue";
import ArgonButton from "@/components/ArgonButton.vue";
const body = document.getElementsByTagName("body")[0];
import Swal from "sweetalert2";

import { mapActions, mapMutations } from "vuex";

export default {
  data() {
    return {
      unique: "",
      password: "",
      is_loading: false,
      show_password: false,
    };
  },
  name: "signin",
  components: {
    Navbar,
    ArgonInput,
    ArgonSwitch,
    ArgonButton,
  },
  created() {
    this.$store.state.hideConfigButton = true;
    this.$store.state.showNavbar = false;
    this.$store.state.showSidenav = false;
    this.$store.state.showFooter = false;
    body.classList.remove("bg-gray-100");
    this.SET_NOT_LOADING_BUTTON();
  },
  beforeUnmount() {
    this.$store.state.hideConfigButton = false;
    this.$store.state.showNavbar = true;
    this.$store.state.showSidenav = true;
    this.$store.state.showFooter = true;
    body.classList.add("bg-gray-100");
  },
  methods: {
    ...mapActions({
      doLogin: "auth/doLogin",
    }),
    ...mapMutations({
      SET_LOADING_BUTTON: "auth/SET_LOADING_BUTTON",
      SET_NOT_LOADING_BUTTON: "auth/SET_NOT_LOADING_BUTTON",
      SET_APP_PAGE_NAME: "SET_APP_PAGE_NAME",
      SET_LOGIN_PASSWORD: "auth/SET_LOGIN_PASSWORD",
    }),
    showPassword() {
      this.show_password = !this.show_password;
    },
    loginButton() {
      const login_payload = {
        nik: this.unique,
        password: this.password,
        fcm_token: "no_token_inserted",
      };
      this.SET_LOADING_BUTTON();
      this.doLogin(login_payload).then((response) => {
        const enc_password = this.$CryptoJS.AES.encrypt(
          this.password,
          "Er4komp_2022%"
        ).toString();
        this.SET_LOGIN_PASSWORD(enc_password);
        this.SET_NOT_LOADING_BUTTON();
        this.SET_APP_PAGE_NAME("Dashboard");
        this.$router.push({ name: "Dashboard" });
      });
    },
    signUpButton() {
      Swal.fire({
        title: "Download mobile apps version to register.",
        width: 600,
        padding: "3em",
        color: "#716add",
        background: "#fff url(/images/trees.png)",
        backdrop: `
    rgba(0,0,123,0.4)
    url("/images/nyan-cat.gif")
    left top
    no-repeat
  `,
      });
    },
    encrypt(data) {
      const key = "Er4komp_2022%";
      let iv = crypto.randomBytes(16);
      let cipher = crypto.createCipheriv(
        "aes-256-ctr",
        Buffer.from(key, "hex"),
        iv
      );
      let encrypted = cipher.update(data);
      encrypted = Buffer.concat([encrypted, cipher.final()]);
      return iv.toString("hex") + ":" + encrypted.toString("hex");
    },
  },
  watch: {
    unique(val) {
      // console.log(`uni ${val}`);
    },
    password(val) {
      // console.log(`this password ${val}`);
    },
  },
};
</script>
