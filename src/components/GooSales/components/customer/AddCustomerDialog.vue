<template>
  <el-dialog width="40%" :show-close="false">
    <template #header>
      <div class="d-flex justify-content-between align-items-center">
        <span>Add Client</span>
        <div>
          <el-popover
            placement="bottom-end"
            title="Tips"
            :width="300"
            trigger="hover"
            :content="pop_over_content"
          >
            <template #reference>
              <i class="fas fa-info-circle cursor-pointer"></i>
            </template>
          </el-popover>
        </div>
      </div>
    </template>

    <div class="d-flex flex-column">
      <div class="mb-1">
        <argon-input
          type="text"
          placeholder="Client Name"
          size="lg"
          :value="name"
          v-model="name"
        />
      </div>
      <div class="mb-1">
        <argon-button
          variant="gradient"
          color="info"
          fullWidth
          size="md"
          @click="openAddClientLocationDialog()"
        >
          <div class="d-flex justify-content-center align-items-center">
            <i class="fas fa-map-marker-alt" style="margin-right: 10px"></i>
            {{ buttonName }} Client Location
          </div>
        </argon-button>
      </div>
    </div>
    <argon-button
      class="mt-4"
      variant="gradient"
      color="success"
      fullWidth
      size="md"
      :disabled="name == '' && selectedLocation == null"
      @click="handleUpdateInfo()"
    >
      <div>Save</div>
    </argon-button>
    <argon-button
      class="mt-1"
      variant="gradient"
      color="danger"
      fullWidth
      size="md"
      @click="handleCancel()"
    >
      <div>Cancel</div>
    </argon-button>
  </el-dialog>
</template>

<script>
import ArgonButton from "@/components/ArgonButton.vue";
import ArgonInput from "@/components/ArgonInput.vue";

import Swal from "sweetalert2";

import { mapActions, mapMutations } from "vuex";

export default {
  data() {
    return {
      name: "",
      pop_over_content:
        "You can find the location first with pressing 'Add Client Location'. After that, the location name will automatically added to the field above.",
    };
  },
  components: {
    ArgonButton,
    ArgonInput,
  },
  props: {
    current_project_data: {
      type: Object,
    },
  },
  async beforeMount() {
    await this.setInit();
  },
  computed: {},
  methods: {
    ...mapActions({
      doUpdatePipelineInformation: "eraforce/doUpdatePipelineInformation",
      doCreateNewClient: "eraforce/doCreateNewClient",
      fetchListClient: "eraforce/fetchListClient",
    }),
    ...mapMutations({
      CLOSE_ADD_CLIENT_DIALOG: "eraforce/CLOSE_ADD_CLIENT_DIALOG",
      OPEN_ADD_CLIENT_DIALOG: "eraforce/OPEN_ADD_CLIENT_DIALOG",
      OPEN_ADD_CLIENT_LOCATION_DIALOG:
        "eraforce/OPEN_ADD_CLIENT_LOCATION_DIALOG",
      CLOSE_ADD_CLIENT_LOCATION_DIALOG:
        "eraforce/CLOSE_ADD_CLIENT_LOCATION_DIALOG",
      SET_SELECTED_CLIENT_LOCATION: "eraforce/SET_SELECTED_CLIENT_LOCATION",
      SET_CUSTOMER_LOADING: "eraforce/SET_CUSTOMER_LOADING",
      SET_CUSTOMER_NOT_LOADING: "eraforce/SET_CUSTOMER_NOT_LOADING",
    }),

    fetchAllClient() {
      this.SET_CUSTOMER_LOADING();
      //   this.SET_SELECTED_EMPLOYEE_DATA("");
      let payload = this.$store.state.eraforce.fetch_project_payload;
      this.fetchListClient(payload).then((response) => {
        this.records = response;
        this.SET_CUSTOMER_NOT_LOADING();
      });
    },

    setInit() {
      if (this.selectedLocation != null) {
        this.name = this.selectedLocation.name;
      } else {
        this.name = "";
      }
    },

    handleUpdateInfo() {
      if (this.name != "") {
        const payload = {
          name: this.name,
          latitude: this.selectedLocation.latitude,
          longitude: this.selectedLocation.longitude,
          address: this.selectedLocation.address,
          city_name: this.selectedLocation.city,
        };

        this.closeDialog();
        this.doCreateNewClient(payload)
          .then((response) => {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `Voila! ${response}`,
              showConfirmButton: false,
              timer: 1500,
            });
            this.SET_SELECTED_CLIENT_LOCATION(null);
            this.fetchAllClient();
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: `Oopss!`,
              text: `Error: ${JSON.stringify(error.message)}`,
            }).then((result) => {
              if (result.isConfirmed) {
                this.OPEN_ADD_CLIENT_DIALOG();
              }
            });
          });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Client name is required!",
        });
      }
    },

    handleCancel() {
      this.name = "";
      this.SET_SELECTED_CLIENT_LOCATION(null);
      this.closeDialog();
    },

    closeDialog() {
      this.CLOSE_ADD_CLIENT_DIALOG();
    },

    getRoute() {
      const routeArr = this.$route.path.split("/");
      // console.log(12121, routeArr[2]);
      return routeArr[1];
    },

    openAddClientLocationDialog() {
      this.closeDialog();
      // this.OPEN_ADD_CLIENT_LOCATION_DIALOG();
      const url = "/" + this.getRoute() + "/master-data/customer/add-location";
      this.$router.push(url);
    },

    fetchAllClient() {
      //   this.SET_SELECTED_EMPLOYEE_DATA("");
      let payload = {
        team_id: "",
        company_name: this.search,
        page: this.page,
      };
      this.SET_CUSTOMER_LOADING();
      this.fetchListClient(payload).then((response) => {
        this.SET_CUSTOMER_NOT_LOADING();
        this.SET_PROJECT_PAYLOAD_DATA(payload);
        this.records = response;
      });
    },
  },

  computed: {
    selectedLocation() {
      return this.$store.state.eraforce.selected_client_location;
    },

    buttonName() {
      let button;
      if (this.selectedLocation == null) {
        button = "Add";
      } else {
        button = "Change";
        this.name = this.selectedLocation.location;
      }
      return button;
    },
  },

  watch: {
    name: {
      handler(n, o) {
        if (this.selectedLocation != null) {
          this.name = this.selectedLocation.name;
        }
        // console.log(`val ${n}`);
      },
      deep: true,
    },
  },
};
</script>
