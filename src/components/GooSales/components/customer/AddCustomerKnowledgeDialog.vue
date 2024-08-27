<template>
  <el-dialog width="40%" :show-close="false">
    <template #header>
      <div class="d-flex justify-content-between align-items-center">
        <span>Add Knowledge {{ client_name }}</span>
      </div>
    </template>

    <div class="d-flex flex-column">
      <div class="">
        <label for="">What you know about your client?</label>
        <argon-input
          type="text"
          placeholder="What you know about your client?"
          size="lg"
          :value="known"
          v-model="known"
        />
      </div>
      <div class="mb-1">
        <label for="">What you don't know about your client?</label>
        <argon-input
          type="text"
          placeholder="What you don't know about your client?"
          size="lg"
          :value="unknown"
          v-model="unknown"
        />
      </div>
    </div>
    <argon-button
      class="mt-4"
      variant="gradient"
      color="success"
      fullWidth
      size="md"
      :disabled="known == '' || unknown == ''"
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
      known: "",
      unknown: "",
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
    client_name: {
      type: String,
      default: "Client",
    },
  },
  async beforeMount() {
    // await this.setInit();
  },
  computed: {},
  methods: {
    ...mapActions({
      doUpdateKnowledge: "eraforce/doUpdateKnowledge",
      fetchListClient: "eraforce/fetchListClient",
    }),
    ...mapMutations({
      OPEN_ADD_CLIENT_KNOWLEDGE_DIALOG:
        "eraforce/OPEN_ADD_CLIENT_KNOWLEDGE_DIALOG",
      CLOSE_ADD_CLIENT_KNOWLEDGE_DIALOG:
        "eraforce/CLOSE_ADD_CLIENT_KNOWLEDGE_DIALOG",
      SET_SELECTED_CLIENT_KNOWLEDGE: "eraforce/SET_SELECTED_CLIENT_KNOWLEDGE",
      SET_CUSTOMER_LOADING: "eraforce/SET_CUSTOMER_LOADING",
      SET_CUSTOMER_NOT_LOADING: "eraforce/SET_CUSTOMER_NOT_LOADING",
    }),

    async setInit() {
      await this.selectedKnowledge;
      if (this.selectedKnowledge.known_info != null) {
        this.known = this.selectedKnowledge.known_info;
        this.unknown = this.selectedKnowledge.unknown_info;
      } else {
        this.known = "";
        this.unknown = "";
      }
    },

    handleUpdateInfo() {
      if (this.known != "" && this.unknown != "") {
        const payload = {
          client_id: this.selectedKnowledge.client_id,
          known_info: this.known,
          unknown_info: this.unknown,
        };

        this.closeDialog();
        this.doUpdateKnowledge(payload)
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
      this.known = "";
      this.unknown = "";
      this.CLOSE_ADD_CLIENT_KNOWLEDGE_DIALOG();
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
  },

  watch: {
    client_name: {
      handler(n, o) {
        this.setInit();
      },
      deep: true,
    },
  },
};
</script>
