<template>
  <el-dialog title="Submitted Document" width="30%" :show-close="false">
    <div class="d-flex flex-column">
      <div class="mb-1"></div>
    </div>
    <argon-button
      class="mt-4"
      variant="gradient"
      color="success"
      fullWidth
      size="md"
      disabled
      @click="handleUpdateInfo()"
    >
      <div>Update</div>
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
      quantity: "",
      value: "",
      profit: "",
      date: "",
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
    }),
    ...mapMutations({
      CLOSE_ADD_DOCUMENT_DIALOG: "eraforce/CLOSE_ADD_DOCUMENT_DIALOG",
      OPEN_ADD_DOCUMENT_DIALOG: "eraforce/OPEN_ADD_DOCUMENT_DIALOG",
    }),
    setInit() {
      this.name = this.current_project_data.job;
      this.quantity = this.current_project_data.quantity_target;
      this.value = this.current_project_data.value_target;
      this.profit = this.current_project_data.profit_target;
      this.date = this.current_project_data.end_date;
    },
    handleUpdateInfo() {
      if (
        this.name != "" &&
        this.quantity != "" &&
        this.value != "" &&
        this.profit != "" &&
        this.date != ""
      ) {
        const payload = {
          project_id: this.current_project_data.id,
          project_name: this.name,
          quantity_target: this.quantity,
          value_target: this.value,
          profit_target: this.profit,
          end_target_date: this.date,
        };
        console.log(`${JSON.stringify(payload)}`);
        return;
        this.CLOSE_ADD_DOCUMENT_DIALOG();
        this.doUpdatePipelineInformation(payload)
          .then((response) => {
            Swal.fire({
              icon: "success",
              title: `Voila! ${response}`,
            });
          })
          .catch((error) => {
            Swal.fire({
              icon: "Error",
              title: `Oopss!`,
              text: `Error: ${JSON.stringify(error.message)}`,
            });
            this.OPEN_ADD_DOCUMENT_DIALOG();
          });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Notes/pipeline ID is required!",
        });
      }
    },

    handleCancel() {
      this.CLOSE_ADD_DOCUMENT_DIALOG();
    },
  },

  watch: {},
};
</script>
