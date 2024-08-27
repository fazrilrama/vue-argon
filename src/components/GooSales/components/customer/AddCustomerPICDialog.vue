<template>
  <el-dialog
    width="50%"
    :show-close="false"
    v-model="$store.state.eraforce.add_client_pic_dialog"
  >
    <template #header>
      <div class="d-flex justify-content-between align-items-center">
        <span> PIC List {{ client_name }} </span>
      </div>
    </template>

    <div v-if="selectedKnowledge != null" class="mb-3">
      <el-table :data="selectedKnowledge" style="width: 100%">
        <el-table-column prop="pic_contact" label="PIC" />
        <el-table-column prop="contact_phone" label="Contact" />
        <el-table-column prop="contact_email" label="Email" />
        <el-table-column prop="status_pic" label="Position" />
      </el-table>
    </div>

    <argon-button
      classs="mt-4"
      variant="gradient"
      :color="buttonColor"
      fullWidth
      size="md"
      @click="handleAddNewPicButton()"
    >
      <div>
        <i
          class="fas fa-plus"
          style="margin-right: 10px"
          v-if="show_button == false"
        ></i>
        {{ buttonName }} New PIC
      </div>
    </argon-button>

    <div class="d-flex flex-column mt-4" v-if="show_form">
      <div class="mb-1">
        <label for="">PIC Name</label>
        <argon-input
          type="text"
          placeholder="PIC Name"
          size="lg"
          :value="name"
          v-model="name"
        />
      </div>
      <div class="mb-1">
        <label for="">PIC Phone Number</label>
        <argon-input
          type="text"
          placeholder="PIC Phone Number"
          size="lg"
          :value="phone"
          v-model="phone"
        />
      </div>
      <div class="mb-1">
        <label for="">PIC Email</label>
        <argon-input
          type="text"
          placeholder="PIC Email"
          size="lg"
          :value="address"
          v-model="address"
        />
      </div>
      <div class="mb-1">
        <label for="">PIC Position</label> <br />
        <el-select
          v-model="position"
          class="m-2"
          placeholder="Select"
          size="large"
        >
          <el-option
            v-for="status in statusData"
            :key="status.id"
            :label="status.name"
            :value="status.id"
          />
        </el-select>
      </div>

      <argon-button
        class="mt-4"
        variant="gradient"
        color="success"
        fullWidth
        size="md"
        :disabled="name == '' || address == '' || phone == '' || position == ''"
        @click="handleAddNewPIC()"
      >
        <div>Save</div>
      </argon-button>
    </div>

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
      position: "",
      name: "",
      address: "",
      phone: "",
      show_form: false,
      button_name: "",
      button_color: "",
    };
  },
  components: {
    ArgonButton,
    ArgonInput,
  },
  props: {
    company_id: {
      Type: String,
      default: "",
    },
    client_name: {
      Type: String,
      default: "",
    },
  },
  mounted() {},
  computed: {},
  methods: {
    ...mapActions({
      doAddClientPIC: "eraforce/doAddClientPIC",
      fetchClientInformation: "eraforce/fetchClientInformation",
      fetchListClient: "eraforce/fetchListClient",
    }),
    ...mapMutations({
      OPEN_ADD_CLIENT_PIC_DIALOG: "eraforce/OPEN_ADD_CLIENT_PIC_DIALOG",
      CLOSE_ADD_CLIENT_PIC_DIALOG: "eraforce/CLOSE_ADD_CLIENT_PIC_DIALOG",
      SET_SELECTED_CLIENT_KNOWLEDGE: "eraforce/SET_SELECTED_CLIENT_KNOWLEDGE",
      SET_CUSTOMER_LOADING: "eraforce/SET_CUSTOMER_LOADING",
      SET_CUSTOMER_NOT_LOADING: "eraforce/SET_CUSTOMER_NOT_LOADING",
    }),

    handleAddNewPicButton() {
      this.show_form = !this.show_form;
      this.position = "";
      this.name = "";
      this.address = "";
      this.phone = "";
    },

    setInit() {
      this.era_id = this.selectedKnowledge.erasoft_company_id;
      this.name = this.selectedKnowledge.name;
      this.address = this.selectedKnowledge.address;
      this.phone = this.selectedKnowledge.phone;
    },

    handleAddNewPIC() {
      if (
        this.name != "" &&
        this.address != "" &&
        this.phone != "" &&
        this.position != ""
      ) {
        const payload = {
          company_id: this.company_id,
          name: this.name,
          email: this.address,
          phone: this.phone,
          status: this.position,
          employee_id: this.loginData.id,
        };

        this.closeDialog();
        this.doAddClientPIC(payload)
          .then((response) => {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `Voila! Success create new PIC!`,
              showConfirmButton: false,
              timer: 1500,
            });
            this.fetchAllClient();
            this.SET_SELECTED_CLIENT_KNOWLEDGE(null);
            this.position = "";
            this.name = "";
            this.address = "";
            this.phone = "";
            this.show_form = false;
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: `Oopss!`,
              text: `Error: ${JSON.stringify(error.message)}`,
            }).then((result) => {
              if (result.isConfirmed) {
                this.OPEN_ADD_CLIENT_PIC_DIALOG();
              }
            });
          });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "PIC name is required!",
        });
      }
    },

    closeDialog() {
      this.CLOSE_ADD_CLIENT_PIC_DIALOG();
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
      if (this.show_form == false) {
        button = "Add";
      } else {
        button = "Cancel Add ";
      }
      return button;
    },

    buttonColor() {
      let button;
      if (this.show_form == false) {
        button = "info";
      } else {
        button = "danger";
      }
      return button;
    },

    statusData() {
      return this.$store.state.eraforce.status_data;
    },

    loginData() {
      return this.$store.state.eraforce.eraforce_user_login[0];
    },
  },

  watch: {
    company_id: {
      handler(n, o) {
        this.setInit();
        console.log(`val ${n}`);
      },
      deep: true,
    },
  },
};
</script>
