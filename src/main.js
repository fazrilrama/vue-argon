import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import ArgonDashboard from "./argon-dashboard";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import VueCryptojs from "vue-cryptojs";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import VueNumerals from "vue-numerals";
import VueGeolocation from "vue3-geolocation";
import GMaps from "vuejs3-google-maps";
import VueGoogleMaps from "@fawmi/vue-google-maps";

const appInstance = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  appInstance.component(key, component);
}
appInstance.use(store);
appInstance.use(router);
appInstance.use(ArgonDashboard);
appInstance.use(VueSweetalert2);
appInstance.use(VueCryptojs);
appInstance.use(ElementPlus);
appInstance.use(VueNumerals);
// appInstance.use(VueGeolocation);
// appInstance.use(GMaps, {
//   load: {
//     apiKey: "AIzaSyCLEKzHA-9iVyvLskye9ysvPuU-A54SaJU",
//     libraries: ["places"],
//   },
// });
appInstance.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyCLEKzHA-9iVyvLskye9ysvPuU-A54SaJU",
    libraries: "places",
  },
  autobindAllEvents: true,
});
appInstance.mount("#app");
appInstance.config.devtools = true;
