<template>
  <el-dialog width="40%" :show-close="false">
    <template #header>
      <div class="d-flex justify-content-between align-items-center">
        <span> Change Picture </span>
      </div>
    </template>

    <div class="d-flex flex-column">
      <div class="mb-1">
        <input type="file" accept="image/*" @change="handleUploadImage" />
      </div>
    </div>
    <argon-button
      class="mt-4"
      variant="gradient"
      color="success"
      fullWidth
      size="md"
      :disabled="name == ''"
      @click="handleUpdatePicture()"
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
      name: "",
    };
  },
  components: {
    ArgonButton,
    ArgonInput,
  },
  props: {
    company_id_picture: {
      Type: String,
      default: "",
    },
  },
  mounted() {},
  computed: {},
  methods: {
    ...mapActions({
      doChangeClientPicture: "eraforce/doChangeClientPicture",
      fetchListClient: "eraforce/fetchListClient",
    }),
    ...mapMutations({
      OPEN_ADD_CLIENT_PICTURE_DIALOG: "eraforce/OPEN_ADD_CLIENT_PICTURE_DIALOG",
      CLOSE_ADD_CLIENT_PICTURE_DIALOG:
        "eraforce/CLOSE_ADD_CLIENT_PICTURE_DIALOG",
      SET_SELECTED_CLIENT_KNOWLEDGE: "eraforce/SET_SELECTED_CLIENT_KNOWLEDGE",
      SET_CUSTOMER_LOADING: "eraforce/SET_CUSTOMER_LOADING",
      SET_CUSTOMER_NOT_LOADING: "eraforce/SET_CUSTOMER_NOT_LOADING",
    }),

    handleUploadImage(file) {
      // console.log(`file ${JSON.stringify(file)}`);
      this.name = file.target.files[0];
    },

    handleUpdatePicture() {
      if (this.name != "") {
        let formData = new FormData();
        formData.append("file", this.name);

        this.closeDialog();
        this.doChangeClientPicture(formData)
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
            this.name = "";
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: `Oopss!`,
              text: `Error: ${JSON.stringify(error.message)}`,
            }).then((result) => {
              if (result.isConfirmed) {
                this.OPEN_ADD_CLIENT_PICTURE_DIALOG();
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
      this.CLOSE_ADD_CLIENT_PICTURE_DIALOG();
    },

    openAddClientLocationDialog() {
      this.closeDialog();
      this.OPEN_ADD_CLIENT_PICTURE_DIALOG();
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
    company_id_picture: {
      handler(n, o) {
        // this.setInit();
        console.log(`val ${n}`);
      },
      deep: true,
    },
  },
};
</script>
