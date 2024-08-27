// eslint-disable-next-line no-unused-vars
import Swal from "sweetalert2";

export default {
  namespaced: true,
  state: {
    is_login: false,
    apps: [],
    login_data: {},
    login_message: "",
    login_button_loading: false,
    local_token: localStorage.getItem("item"),
    user_apps_permission: [],
    user_login_password: "",
  },
  getters: {
    data: (state) => state.data,
    getAllData: (state) => state.apps,
  },
  actions: {
    fetchAllApps({ commit, rootState }) {
      try {
        rootState.ax
          .get(`apps`)
          .then((response) => {
            commit("SET_ALL_APPS_DATA", response.data.data);
          })
          .catch((err) => {
            console.log(12222, err.message);
          });
      } catch (err) {
        console.log(err);
      }
    },

    doLogin({ commit, rootState }, body) {
      return new Promise((resolve, reject) => {
        rootState.ax.post(`api/login`, body).then(
          (response) => {
            commit("SET_USER_LOGIN_DATA", response.data.data);
            commit("SET_USER_IS_LOGIN");
            commit("SET_LOCAL_TOKEN", response.data.data.token);
            resolve(response.data.data);
          },
          (error) => {
            commit("SET_NOT_LOADING_BUTTON");
            Swal.fire({
              icon: "error",
              title: "Login Failed",
              text: `${error.response.data.message}`,
            });
            commit("SET_LOGIN_MESSAGE", error.response.data.message);
            reject(error);
          }
        );
      });
    },

    doLogout({ commit }) {
      commit("SET_USER_IS_NOT_LOGIN");
      commit("SET_USER_LOGIN_DATA", {});
      commit("REMOVE_LOCAL_TOKEN");
    },

    userAppsPermission({ commit, rootState }, body) {
      return new Promise((resolve, reject) => {
        rootState.ax.get(`apps?id_user=${body.id_user}`).then(
          (response) => {
            commit("SET_USER_APPS_PERMISSION", response.data.data);
            resolve(response.data.data);
          },
          (error) => {
            // commit("SET_NOT_LOADING_BUTTON");
            // Swal.fire({
            //   icon: "error",
            //   title: "Failed get",
            //   text: `${error.response.data.message}`,
            // });
            // commit("SET_LOGIN_MESSAGE", error.response.data.message);
            reject(error.response.data);
          }
        );
      });
    },

    doRegister({ commit, rootState }, body) {
      return new Promise((resolve, reject) => {
        rootState.ax.post(`auth/register`, body).then(
          (response) => {
            console.log(`success register ${JSON.stringify(body)}`);
            resolve(response.data.data);
          },
          (error) => {
            commit("SET_NOT_LOADING_BUTTON");
            Swal.fire({
              icon: "error",
              title: "Login Failed",
              text: `${error.response.data.message}`,
            });
            commit("SET_LOGIN_MESSAGE", error.response.data.message);
            reject(error);
          }
        );
      });
    },
  },
  mutations: {
    SET_USER_IS_LOGIN(state) {
      state.is_login = true;
    },
    SET_USER_IS_NOT_LOGIN(state) {
      state.is_login = false;
    },
    SET_ALL_APPS_DATA(state, data) {
      state.apps = data;
    },
    SET_USER_APPS_PERMISSION(state, data) {
      state.user_apps_permission = data;
    },
    SET_LOGIN_MESSAGE(state, data) {
      state.login_message = data;
    },
    SET_USER_LOGIN_DATA(state, data) {
      state.login_data = data;
    },
    SET_LOADING_BUTTON(state) {
      state.login_button_loading = true;
    },
    SET_NOT_LOADING_BUTTON(state) {
      state.login_button_loading = false;
    },
    SET_LOCAL_TOKEN(state, data) {
      localStorage.setItem("token", data);
      window.dispatchEvent(new Event("storage"));
    },
    REMOVE_LOCAL_TOKEN(state) {
      localStorage.removeItem("token");
    },
    SET_LOGIN_PASSWORD(state, data) {
      state.user_login_password = data;
    },
  },
};
