<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header pb-0">
            <div class="d-flex align-items-center">
              <p class="mb-0">Settings</p>
              <argon-button
                color="success"
                size="sm"
                class="ms-auto"
                @click="handleUpdatePassword"
                >Update</argon-button
              >
            </div>
          </div>
          <div class="card-body">
            <div
              class="loading d-flex justify-content-center mt-3"
              v-if="loading_password"
            >
              <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
            <div v-else>
              <p class="text-uppercase text-sm">Update Password</p>
              <div class="row">
                <div class="col-md-12">
                  <label for="example-text-input" class="form-control-label"
                    >New Password</label
                  >
                  <argon-input
                    type="password"
                    v-model="form.password"
                    :value="form.password"
                    placeholder="Password"
                  />
                </div>
                <div class="col-md-12">
                  <label for="example-text-input" class="form-control-label"
                    >Confirm Password</label
                  >
                  <argon-input
                    type="password"
                    v-model="form.password_confirmation"
                    :value="form.password_confirmation"
                    placeholder="Password Confirmation"
                  />
                </div>
              </div>
              <!-- <hr class="horizontal dark" /> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import setNavPills from "@/assets/js/nav-pills.js";
import setTooltip from "@/assets/js/tooltip.js";
import ProfileCard from "@/views/components/ProfileCard.vue";
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import ArgonCheckbox from "@/components/ArgonCheckbox.vue";

const body = document.getElementsByTagName("body")[0];

import { mapActions } from "vuex";

import Swal from "sweetalert2";

export default {
  name: "profile",
  data() {
    return {
      showMenu: false,
      form: {
        password: null,
        password_confirmation: null,
      },
      loading_password: false,
    };
  },
  components: { ProfileCard, ArgonInput, ArgonButton, ArgonCheckbox },

  mounted() {
    this.$store.state.isAbsolute = true;
    setNavPills();
    setTooltip();
  },
  beforeMount() {},
  computed: {},
  methods: {
    ...mapActions({
      fetchUserLoginData: "eraforce/fetchUserLoginData",
      doUpdatePassword: "eraforce/doUpdatePassword",
    }),

    handleUpdatePassword() {
      if (
        this.form.password != null ||
        this.form.password_confirmation != null
      ) {
        if (this.form.password != this.form.password_confirmation) {
          console.log(`pass ${this.form.password}`);
          console.log(`pass_confirmation ${this.form.password_confirmation}`);
          Swal.fire({
            icon: "error",
            title: "Oops...!",
            text: `Password confirmation doesn't match!`,
            showConfirmButton: true,
            confirmButtonText: "OK",
          });
        } else {
          this.loading_password = true;
          const payload = {
            password: this.form.password,
          };
          this.doUpdatePassword(payload)
            .then((response) => {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Success change password!",
                showConfirmButton: false,
                timer: 3000,
              }).then((result) => {
                this.fetchUserLoginData().then((response) => {
                  this.loading_password = false;
                  this.form.password = null;
                  this.form.password_confirmation = null;
                });
              });
            })
            .catch((error) => {
              Swal.fire({
                icon: "error",
                title: "Oops... Failed update profile!",
                text: `Error: ${JSON.stringify(error.message)}`,
                showConfirmButton: true,
                confirmButtonText: "OK",
              }).then((result) => {
                if (result.isConfirmed) {
                  // location.reload();
                  // this.SET_ACTIVITY_MODAL_ACTIVE();
                }
              });
            });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...!",
          text: `Password && Password confirmation is required!`,
          showConfirmButton: true,
          confirmButtonText: "OK",
        });
      }
    },
  },
};
</script>
