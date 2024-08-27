import { createStore } from "vuex";
import auth from "./modules/auth";
import menu from "./modules/menu";
import user from "./modules/user";
import department from "./modules/department";
import eraforce from "./modules/eraforce";
import administrator from "./modules/administrator";
import hrd from "./modules/hrd";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";

const ax = axios.create({
  baseURL: process.env.VUE_APP_BE_URL,
  headers: {
    Accept: "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
});

export default createStore({
  modules: {
    auth,
    menu,
    user,
    department,
    eraforce,
    administrator,
    hrd,
  },
  plugins: [createPersistedState()],
  state: {
    hideConfigButton: false,
    isPinned: true,
    showConfig: false,
    sidebarType: "bg-white",
    isRTL: false,
    mcolor: "",
    darkMode: false,
    isNavFixed: false,
    isAbsolute: false,
    showNavs: true,
    showSidenav: true,
    showNavbar: true,
    showFooter: true,
    showMain: true,
    layout: "default",
    token: localStorage.getItem("token") || "",
    ax: ax,
    weather: {},
    app_title: "GooApps Dashboard",
    dashboard_app_title: "",
    dashboard_app_sub_title: "",
    province: [],
    city: [],
    is_city_selected: false,
  },
  mutations: {
    toggleConfigurator(state) {
      state.showConfig = !state.showConfig;
    },
    navbarMinimize(state) {
      const sidenav_show = document.querySelector(".g-sidenav-show");

      if (sidenav_show.classList.contains("g-sidenav-hidden")) {
        sidenav_show.classList.remove("g-sidenav-hidden");
        sidenav_show.classList.add("g-sidenav-pinned");
        state.isPinned = true;
      } else {
        sidenav_show.classList.add("g-sidenav-hidden");
        sidenav_show.classList.remove("g-sidenav-pinned");
        state.isPinned = false;
      }
    },
    sidebarType(state, payload) {
      state.sidebarType = payload;
    },
    navbarFixed(state) {
      if (state.isNavFixed === false) {
        state.isNavFixed = true;
      } else {
        state.isNavFixed = false;
      }
    },
    SET_WEATHER_DATA(state, data) {
      state.weather = data;
    },
    SET_APP_NAME(state, data) {
      state.dashboard_app_title = data;
    },
    SET_APP_PAGE_NAME(state, data) {
      state.dashboard_app_sub_title = data;
    },
    SET_PROVINCE(state, data) {
      state.province = data;
    },
    SET_PROVINCE_SELECTED(state) {
      state.is_city_selected = true;
    },
    SET_PROVINCE_NOT_SELECTED(state) {
      state.is_city_selected = false;
    },
    SET_CITY(state, data) {
      state.city = data;
    },
  },
  actions: {
    toggleSidebarColor({ commit }, payload) {
      commit("sidebarType", payload);
    },
    fetchAllApps({ commit }) {
      try {
        ax.get(`apps`)
          .then((response) => {
            console.log(`hai`);
            console.log(`resss ${JSON.stringify(response.data)}`);
            commit("SET_ALL_DATA", response.data);
          })
          .catch((err) => {
            console.log(12222, err.message);
          });
      } catch (err) {
        console.log(err);
      }
    },

    fetchWeatherData({ commit }) {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `https://api.open-meteo.com/v1/forecast?latitude=-6.16&longitude=106.82&current_weather=true`
          )
          .then(
            (response) => {
              commit("SET_WEATHER_DATA", response.data);
              resolve(response.data);
            },
            (error) => {
              console.log(
                `error on get weather ${JSON.stringify(error.response.data)}`
              );
              reject(error);
            }
          );
      });
    },

    fetchProvinceData({ commit }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`https://dev.farizdotid.com/api/daerahindonesia/provinsi`)
          .then(
            (response) => {
              // console.log(`province ${JSON.stringify(response.data.provinsi)}`);
              commit("SET_PROVINCE", response.data.provinsi);
              resolve(response.data.provinsi);
            },
            (error) => {
              console.log(
                `error on get province ${JSON.stringify(error.response.data)}`
              );
              reject(error);
            }
          );
      });
    },

    fetchCityByProvinceData({ commit }, body) {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${body}`
          )
          .then(
            (response) => {
              // console.log(`province ${JSON.stringify(response.data.provinsi)}`);
              commit("SET_CITY", response.data.kota_kabupaten);
              resolve(response.data.kota_kabupaten);
            },
            (error) => {
              console.log(
                `error on get city ${JSON.stringify(error.response.data)}`
              );
              reject(error);
            }
          );
      });
    },

    getWifiLocation({ commit }) {
      return new Promise((resolve, reject) => {
        ax.get(`wifi/locations`, {
          onDownloadProgress: (progressEvent) => {
            console.log(`prog ${JSON.stringify(progressEvent)}`);
            const total = parseFloat(progressEvent.total);
            const current = progressEvent.loaded;

            let percentCompleted = Math.floor((current / total) * 100);
            console.log("completed: ", percentCompleted);
          },
        }).then(
          (response) => {
            resolve(response.data.result);
          },
          (error) => {
            reject(error.response.data.message);
          }
        );
      });
    },
  },
  getters: {
    getWeatherData: (state) => {
      return state.weather;
    },
  },
});
