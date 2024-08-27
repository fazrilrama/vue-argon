<template>
  <div class="fixed-plugin">
    <a
      :class="`fixed-plugin-button text-light position-fixed ${backgroundType}`"
      style="width: 50px; height: 50px"
    >
      <!-- px-2 py-2  -->
      <div class="d-flex flex-column justify-content-center align-items-center">
        <i :class="`${iconType}`" style="margin-top: 15px"></i>
      </div>
    </a>
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";

export default {
  name: "floating-button",
  props: ["toggle"],
  data() {
    return {
      icon: "fas fa-sign-in-alt",
      bg: "bg-success",
    };
  },
  methods: {},
  computed: {
    checkInStatus() {
      return this.$store.state.eraforce.is_already_checkin;
    },
    iconType() {
      if (!this.checkInStatus) {
        this.icon = "fas fa-sign-out-alt";
      } else {
        this.icon = "fas fa-sign-in-alt";
      }
      return this.icon;
    },
    backgroundType() {
      if (!this.checkInStatus) {
        this.bg = "bg-success";
      } else {
        this.bg = "bg-danger";
      }
      return this.bg;
    },
  },
  beforeMount() {
    // this.$store.state.isTransparent = "bg-transparent";
    // window.addEventListener("resize", this.sidenavTypeOnResize);
    // window.addEventListener("load", this.sidenavTypeOnResize);
  },
  mounted() {
    console.log(`in ${this.checkInStatus}`);
  },
};
</script>
