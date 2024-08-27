<template>
  <div
    v-show="this.$store.state.layout === 'landing'"
    class="landing-bg h-100 bg-gradient-primary position-fixed w-100"
  ></div>
  <sidenav
    :custom_class="this.$store.state.mcolor"
    :class="[this.$store.state.isTransparent, 'fixed-start']"
    v-if="this.$store.state.showSidenav"
  />
  <main
    class="main-content position-relative max-height-vh-100 h-100 border-radius-lg"
  >
    <div v-if="getRoute == '2'">
      <!-- nav -->
      <navbar
        :class="[navClasses]"
        textWhite="
        text-grey
      "
        :minNav="navbarMinimize"
        v-if="this.$store.state.showNavbar"
      />
    </div>
    <div v-else>
      <!-- nav -->
      <NavbarHRD
        :class="[navClasses]"
        textWhite="
        text-grey
      "
        :minNav="navbarMinimize"
        v-if="this.$store.state.showNavbar"
      />
    </div>

    <router-view />
    <app-footer v-show="this.$store.state.showFooter" />
  </main>
</template>
<script>
import Sidenav from "@/components/Sidenav";
import Configurator from "@/examples/Configurator.vue";
import Navbar from "@/components/navbar/PageNavbar.vue";
import NavbarHRD from "@/components/navbar/PageNavbarHRD.vue";
import AppFooter from "@/components/Footer.vue";
import { mapMutations } from "vuex";

export default {
  name: "App",
  components: {
    Sidenav,
    Configurator,
    Navbar,
    NavbarHRD,
    AppFooter,
  },
  methods: {
    ...mapMutations(["toggleConfigurator", "navbarMinimize"]),
  },
  computed: {
    navClasses() {
      return {
        "position-sticky bg-white left-auto top-2 z-index-sticky":
          this.$store.state.isNavFixed && !this.$store.state.darkMode,
        "position-sticky bg-default left-auto top-2 z-index-sticky":
          this.$store.state.isNavFixed && this.$store.state.darkMode,
        "position-absolute px-4 mx-0 w-100 z-index-2": this.$store.state
          .isAbsolute,
        "px-0 mx-4": !this.$store.state.isAbsolute,
      };
    },

    getRoute() {
      const routeArr = this.$route.path.split("/");
      console.log(routeArr[1]);
      return routeArr[1];
    },
  },
  beforeMount() {
    this.$store.state.isTransparent = "bg-transparent";
  },
};
</script>

<style>
.on-hover-mouse-clicked {
  cursor: pointer;
}
.component-row-flex-space-between {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-content: center;
}
</style>
