<template>
  <el-dialog width="40%" :show-close="false">
    <template #header>
      <div class="d-flex justify-content-between align-items-center">
        <span> Company Information </span>
      </div>
    </template>

    <div class="d-flex flex-column">
      <!-- <div class="">
        <label for="">Erasoft Company ID</label>
        <argon-input
          type="text"
          placeholder="Erasoft Company ID"
          size="lg"
          :value="era_id"
          v-model="era_id"
        />
      </div> -->
      <div class="mb-1">
        <label for="">Company Name</label>
        <argon-input
          type="text"
          placeholder="Company Name"
          size="lg"
          :value="name"
          v-model="name"
        />
      </div>
      <div class="mb-1">
        <label for="">Company Address</label>
        <argon-input
          type="text"
          placeholder="Company Address"
          size="lg"
          :value="address"
          v-model="address"
        />
      </div>
      <div class="mb-1">
        <label for="">Company Phone Number</label>
        <argon-input
          type="text"
          placeholder="Company Phone Number"
          size="lg"
          :value="phone"
          v-model="phone"
        />
      </div>
    </div>
    <argon-button
      class="mt-4"
      variant="gradient"
      color="success"
      fullWidth
      size="md"
      :disabled="name == '' || address == '' || phone == ''"
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
      @click="closeDialog()"
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
      era_id: "",
      name: "",
      address: "",
      phone: "",
    };
  },
  components: {
    ArgonButton,
    ArgonInput,
  },
  props: {
    company_id_information: {
      Type: String,
      default: "",
    },
  },
  mounted() {
    // this.setInit();
  },
  computed: {},
  methods: {
    ...mapActions({
      doUpdateCompanyInformation: "eraforce/doUpdateCompanyInformation",
      fetchListClient: "eraforce/fetchListClient",
    }),
    ...mapMutations({
      OPEN_ADD_CLIENT_KNOWLEDGE_DIALOG:
        "eraforce/OPEN_ADD_CLIENT_KNOWLEDGE_DIALOG",
      CLOSE_ADD_CLIENT_INFORMATION_DIALOG:
        "eraforce/CLOSE_ADD_CLIENT_INFORMATION_DIALOG",
      SET_SELECTED_CLIENT_KNOWLEDGE: "eraforce/SET_SELECTED_CLIENT_KNOWLEDGE",
      SET_CUSTOMER_LOADING: "eraforce/SET_CUSTOMER_LOADING",
      SET_CUSTOMER_NOT_LOADING: "eraforce/SET_CUSTOMER_NOT_LOADING",
    }),

    async setInit() {
      await this.selectedKnowledge;
      this.name = this.selectedKnowledge.name;
      this.address = this.selectedKnowledge.address;
      this.phone = this.selectedKnowledge.phone;
    },

    handleUpdateInfo() {
      if (this.known != "" && this.unknown != "") {
        const payload = {
          company_id: this.selectedKnowledge.id,
          name: this.name,
          address: this.address,
          phone: this.phone,
        };

        this.closeDialog();
        this.doUpdateCompanyInformation(payload)
          .then((response) => {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `Voila! ${response}`,
              showConfirmButton: false,
              timer: 1500,
            });
            this.fetchAllClient();
            this.SET_SELECTED_CLIENT_KNOWLEDGE(null);
            this.era_id = "";
            this.name = "";
            this.address = "";
            this.phone = "";
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: `Oopss!`,
              text: `Error: ${JSON.stringify(error.message)}`,
            }).then((result) => {
              if (result.isConfirmed) {
                this.OPEN_ADD_CLIENT_KNOWLEDGE_DIALOG();
              }
            });
          });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Client knowledge is required!",
        });
      }
    },

    closeDialog() {
      this.CLOSE_ADD_CLIENT_INFORMATION_DIALOG();
    },

    openAddClientLocationDialog() {
      this.closeDialog();
      this.OPEN_ADD_CLIENT_LOCATION_DIALOG();
    },

    fetchAllClient() {
      this.SET_CUSTOMER_LOADING();
      //   this.SET_SELECTED_EMPLOYEE_DATA("");
      let payload = this.$store.state.eraforce.fetch_project_payload;
      this.fetchListClient(payload).then((response) => {
        this.records = response;
        this.SET_CUSTOMER_NOT_LOADING();
      });
    },
  },

  computed: {
    selectedKnowledge() {
      return this.$store.state.eraforce.selected_client_knowledge;
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
    selectedKnowledge: {
      handler(n, o) {
        if (n) {
          this.setInit();
        } else {
          console.log(`not n`);
        }
      },
      deep: true,
    },
  },
};
</script>
