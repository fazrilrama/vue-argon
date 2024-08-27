<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header pb-0">
            <div class="d-flex align-items-center">
              <p class="mb-0">Edit Profile</p>
              <argon-button
                color="success"
                size="sm"
                class="ms-auto"
                @click="handleUpdateProfile"
                :disabled="loading_profile"
              >
                Update
              </argon-button>
            </div>
          </div>
          <div class="card-body">
            <div
              class="loading d-flex justify-content-center mt-3"
              v-if="loading_profile"
            >
              <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
            <div v-else>
              <p class="text-uppercase text-sm">User Information</p>
              <div class="row">
                <div class="col-md-6">
                  <label for="example-text-input" class="form-control-label"
                    >Username</label
                  >
                  <argon-input
                    type="text"
                    v-model="form.username"
                    :value="form.username"
                  />
                </div>
                <div class="col-md-6">
                  <label for="example-text-input" class="form-control-label"
                    >Email address</label
                  >
                  <argon-input
                    type="email"
                    v-model="form.email"
                    :value="form.email"
                  />
                </div>
                <div class="col-md-6">
                  <label for="example-text-input" class="form-control-label">
                    Phone
                  </label>
                  <argon-input
                    type="text"
                    v-model="form.phone"
                    :value="form.phone"
                  />
                </div>
                <div class="col-md-6">
                  <label for="example-text-input" class="form-control-label">
                    Fullname
                  </label>
                  <argon-input
                    type="text"
                    v-model="form.fullname"
                    :value="form.fullname"
                  />
                </div>
                <div class="col-md-12">
                  <label for="example-text-input" class="form-control-label">
                    Address
                  </label>
                  <argon-input
                    type="text"
                    v-model="form.address"
                    :value="form.address"
                  />
                </div>
              </div>
            </div>
            <!-- <hr class="horizontal dark" /> -->
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <!-- <hr class="horizontal dark" /> -->
            <p class="text-uppercase text-sm">About me</p>
            <div class="row">
              <label for="example-text-input" class="form-control-label"
                >Skills</label
              >
              <div
                class="col-md-12"
                v-for="skill in userLoginData.skills"
                :key="skill.skill_id"
              >
                <argon-checkbox id="checkboxId" checked reads="true">
                  {{ skill.skill_name }}
                </argon-checkbox>
              </div>
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
        username: "",
        email: "",
        phone: "",
        fullname: "",
        address: "",
      },
      loading_profile: false,
    };
  },
  components: { ProfileCard, ArgonInput, ArgonButton, ArgonCheckbox },

  mounted() {
    this.$store.state.isAbsolute = true;
    setNavPills();
    setTooltip();
    this.initData();
  },
  beforeMount() {},
  computed: {
    userLoginData() {
      return this.$store.state.user.selected_employee_data;
    },
    getIDApps() {
      const routeArr = this.$route.path.split("/");
      return routeArr[1];
    },
  },
  methods: {
    ...mapActions({
      doUpdateProfile: "eraforce/doUpdateProfile",
    }),

    initData() {
      this.form.username = this.userLoginData.user.username;
      this.form.email = this.userLoginData.user.email;
      this.form.phone = this.userLoginData.user.phone;
      this.form.fullname = this.userLoginData.user.fullname;
      this.form.address = this.userLoginData.user.address;
    },

    handleUpdateProfile() {
      this.loading_profile = true;
      const payload = {
        name: this.form.fullname,
        email: this.form.email,
        username: this.form.username,
        phone: this.form.phone,
        address: this.form.address,
      };
      this.doUpdateProfile(payload)
        .then((response) => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Success change profile!",
            showConfirmButton: false,
            timer: 3000,
          }).then((result) => {
            this.fetchUserLoginData().then((response) => {
              this.loading_profile = false;
            });
          });
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops... Failed update profile!",
            text: `Error: ${JSON.stringify(error)}`,
            showConfirmButton: true,
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.isConfirmed) {
              // location.reload();
              // this.SET_ACTIVITY_MODAL_ACTIVE();
            }
          });
        });
    },
  },
};
</script>
