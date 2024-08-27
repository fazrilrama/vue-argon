<template>
  <nav
    class="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
    :class="
      this.$store.state.isRTL ? 'top-0 position-sticky z-index-sticky' : ''
    "
    v-bind="$attrs"
    id="navbarBlur"
    data-scroll="true"
  >
    <div class="px-3 py-1 container-fluid">
      <breadcrumbs
        :currentDirectory="currentRouteName"
        :currentPage="`Apps`"
        textWhite="text-white"
      />

      <div
        class="mt-2 collapse navbar-collapse mt-sm-0 me-md-0 me-sm-4"
        :class="this.$store.state.isRTL ? 'px-0' : 'me-sm-4'"
        id="navbar"
      >
        <div
          class="pe-md-3 d-flex align-items-center"
          :class="this.$store.state.isRTL ? 'me-md-auto' : 'ms-md-auto'"
        ></div>
        <ul class="navbar-nav justify-content-end">
          <li
            class="nav-item d-flex align-items-center"
            v-if="isUserLoginStatus"
          >
            <div
              class="px-0 nav-link font-weight-bold text-white on-hover-mouse-clicked"
              @click="logoutButton"
            >
              <i
                class="fa fa-user"
                :class="this.$store.state.isRTL ? 'ms-sm-2' : 'me-sm-2'"
              ></i>
              <span class="d-sm-inline d-none">Log Out</span>
            </div>
          </li>
          <li class="nav-item d-flex align-items-center" v-else>
            <router-link
              :to="{ name: 'Signin' }"
              class="px-0 nav-link font-weight-bold text-white"
            >
              <i
                class="fa fa-user"
                :class="this.$store.state.isRTL ? 'ms-sm-2' : 'me-sm-2'"
              ></i>
              <span class="d-sm-inline d-none">Sign In</span>
            </router-link>
          </li>
          <!-- <li class="nav-item d-xl-none ps-3 d-flex align-items-center">
            <a
              href="#"
              @click="toggleSidebar"
              class="p-0 nav-link text-white"
              id="iconNavbarSidenav"
            >
              <div class="sidenav-toggler-inner">
                <i class="sidenav-toggler-line bg-white"></i>
                <i class="sidenav-toggler-line bg-white"></i>
                <i class="sidenav-toggler-line bg-white"></i>
              </div>
            </a>
          </li>
          <li class="px-3 nav-item d-flex align-items-center">
            <a class="p-0 nav-link text-white" @click="toggleConfigurator">
              <i class="cursor-pointer fa fa-cog fixed-plugin-button-nav"></i>
            </a>
          </li> -->
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import Breadcrumbs from "../Breadcrumbs.vue";
import { mapMutations, mapActions } from "vuex";

export default {
  name: "navbar",
  data() {
    return {
      showMenu: false,
    };
  },
  props: ["minNav", "textWhite"],
  created() {
    this.minNav;
  },
  methods: {
    ...mapMutations(["navbarMinimize", "toggleConfigurator"]),
    ...mapActions(["toggleSidebarColor", "auth/doLogout"]),

    toggleSidebar() {
      this.toggleSidebarColor("bg-white");
      this.navbarMinimize();
    },
  },
  components: {
    Breadcrumbs,
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
    isUserLoginStatus() {
      const login_status = this.$store.state.auth.is_login;

      return login_status;
    },
    logoutButton() {
      this.$store.dispatch("auth/doLogout");
      this.$store.dispatch("auth/fetchAllApps").then(() => {
        setTimeout(() => {
          this.$router.push({ name: "Home" });
        }, 2000);
      });
    },
  },
};
</script>
