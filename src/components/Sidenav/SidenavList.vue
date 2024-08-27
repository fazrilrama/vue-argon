<template>
  <div
    class="collapse navbar-collapse w-auto h-auto h-100"
    id="sidenav-collapse-main"
  >
    <ul class="navbar-nav">
      <li class="nav-item">
        <sidenav-item
          @click="goToMenu(null)"
          :url="menuPath"
          :class="getRoute() === 'dashboard-default' ? 'active' : ''"
          :navText="'Dashboard'"
        >
          <template v-slot:icon>
            <i class="ni ni-tv-2 text-primary text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <div v-for="menu in fetchUserMenuData.menu" :key="menu.id_menu">
        <li class="mt-3 nav-item">
          <h6
            class="text-xs ps-4 text-uppercase font-weight-bolder opacity-6"
            :class="'ms-2'"
          >
            {{ menu.menu }}
          </h6>
        </li>
        <li
          class="nav-item mb-1"
          v-for="sub_menu in menu.sub_menu"
          :key="sub_menu.id_sub_menu"
        >
          <sidenav-item
            @click="goToMenu(sub_menu)"
            :url="getRoute()"
            :class="getSubRoute() === sub_menu.sub_menu_url ? 'active' : ''"
            :navText="sub_menu.sub_menu"
          >
            <template v-slot:icon>
              <i
                class="fas fa-angle-double-right text-dark text-sm opacity-10"
              ></i>
            </template>
          </sidenav-item>
        </li>
      </div>
    </ul>
  </div>
</template>
<script>
import SidenavItem from "./SidenavItem.vue";
import SidenavCard from "./SidenavCard.vue";

import { format } from "date-fns";
import Swal from "sweetalert2";

import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "SidenavList",
  props: {
    cardBg: String,
  },
  data() {
    return {
      title: "Argon Dashboard 2",
      controls: "dashboardsExamples",
      isActive: "active",
    };
  },
  components: {
    SidenavItem,
    SidenavCard,
  },
  methods: {
    ...mapActions({
      fetchAllActivity: "eraforce/fetchAllActivity",
      toggleSidebarColor: "toggleSidebarColor",
    }),
    ...mapMutations({
      SET_APP_PAGE_NAME: "SET_APP_PAGE_NAME",
      SET_SELECTED_EMPLOYEE_DATA: "user/SET_SELECTED_EMPLOYEE_DATA",
      SET_ACTIVITY_ID: "eraforce/SET_ACTIVITY_ID",
      SET_ACTIVITY_CARD_LOADING: "eraforce/SET_ACTIVITY_CARD_LOADING",
      SET_ACTIVITY_CARD_NOT_LOADING: "eraforce/SET_ACTIVITY_CARD_NOT_LOADING",
      navbarMinimize: "navbarMinimize",
    }),
    getRoute() {
      const routeArr = this.$route.path.split("/");
      // console.log(12121, routeArr[2]);
      return routeArr[1];
    },
    getSubRoute() {
      let routeArr = this.$route.path.split("/");
      routeArr = routeArr[2] + "/" + routeArr[3];
      return routeArr;
    },
    getCallActivity() {
      const call_payload = {
        activity_id: this.$store.state.eraforce.activity_id || 3, //Call
        employee_id: null,
        first_date: format(new Date(), "yyyy-MM-01"),
        last_date: format(new Date(), "yyyy-MM-dd"),
      };
      this.SET_ACTIVITY_CARD_LOADING();
      this.fetchAllActivity(call_payload).then((response) => {
        this.SET_ACTIVITY_CARD_NOT_LOADING();
      });
    },
    goToMenu(uri) {
      if (!this.checkInStatus && uri != null && this.getRoute() == "2") {
        Swal.fire({
          title: "Oops... You are not checked in yet!!",
          text: "Check your mobile apps to do check in!",
          icon: "error",
          showDenyButton: false,
          confirmButtonText: "OK",
        });
      } else {
        this.SET_SELECTED_EMPLOYEE_DATA("");
        this.SET_APP_PAGE_NAME("");
        let url;
        if (uri != null) {
          url = "/" + this.getRoute() + "/" + uri.sub_menu_url;
          this.SET_APP_PAGE_NAME(uri.sub_menu);

          if (uri.sub_menu_url == "activity/call") {
            this.SET_ACTIVITY_ID(3);
            this.getCallActivity();
          } else if (uri.sub_menu_url == "activity/email") {
            this.SET_ACTIVITY_ID(5);
            this.getCallActivity();
          } else if (uri.sub_menu_url == "activity/visit") {
            this.SET_ACTIVITY_ID(4);
            this.getCallActivity();
          } else if (uri.sub_menu_url == "activity/online-meeting") {
            this.SET_ACTIVITY_ID(9);
            this.getCallActivity();
          }
        } else {
          url = "/" + this.getRoute();
        }
        this.$router.push(url);
        this.toggleSidebar();
      }
    },
    toggleSidebar() {
      this.toggleSidebarColor("bg-white");
      this.navbarMinimize();
    },
  },
  computed: {
    ...mapGetters({
      getUserMenuData: "menu/getUserMenuData",
      getMenuPath: "menu/getMenuPath",
    }),
    fetchUserMenuData() {
      return this.$store.state.menu.menu_data;
    },
    menuPath() {
      return this.$route.path;
    },
    checkInStatus() {
      return this.$store.state.eraforce.is_already_checkin;
    },
  },
};
</script>
