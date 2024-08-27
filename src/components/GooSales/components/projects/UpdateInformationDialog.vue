<template>
  <el-dialog title="Update Project Information" width="30%" :show-close="false">
    <div v-if="!is_loading">
      <div class="d-flex flex-column">
        <div class="mb-1">
          <span>Project Name</span>
          <el-input
            type="text"
            placeholder="Update project name"
            size="large"
            v-model="name"
          />
        </div>
        <div class="mb-1">
          <span>Quantity Target</span>
          <el-input
            type="text"
            placeholder="Update target quantity"
            size="large"
            v-model="quantity"
          />
        </div>
        <div class="mb-1">
          <span>Value Target</span>
          <el-input
            type="text"
            placeholder="Update target value"
            size="large"
            v-model="value_text"
          />
        </div>
        <div class="mb-1">
          <span>Profit Target</span>
          <el-input
            type="text"
            placeholder="Update target profit"
            size="large"
            v-model="profit_text"
          />
        </div>
        <div class="mb-1">
          <span>Estimated Finish</span>
          <br />
          <el-date-picker
            v-model="date"
            type="datetime"
            placeholder="Pick a day"
            :size="size"
            value-format="YYYY-MM-DD HH:mm:ss"
          />
        </div>
      </div>
    </div>
    <div v-else class="d-flex justify-content-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <argon-button
      class="mt-4"
      variant="gradient"
      color="success"
      fullWidth
      size="md"
      @click="handleUpdateInfo()"
    >
      <div>Update</div>
    </argon-button>
    <argon-button
      class="mt-2"
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
import { format } from "date-fns";

import { mapActions, mapMutations } from "vuex";

export default {
  data() {
    return {
      name: "",
      quantity: "",
      value: "",
      profit: "",
      date: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
      is_loading: true,
      value_text: "IDR 0",
      profit_text: "IDR 0",
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
    pipeline_id: {
      type: String,
      default: "",
    },
  },
  async beforeMount() {
    // await this.setInit();
  },
  computed: {},
  methods: {
    ...mapActions({
      doUpdatePipelineInformation: "eraforce/doUpdatePipelineInformation",
      fetchEmployeeProject: "eraforce/fetchEmployeeProject",
    }),
    ...mapMutations({
      CLOSE_UPDATE_INFORMATION_DIALOG:
        "eraforce/CLOSE_UPDATE_INFORMATION_DIALOG",
      OPEN_UPDATE_INFORMATION_DIALOG: "eraforce/OPEN_UPDATE_INFORMATION_DIALOG",
      SET_ACTIVITY_CARD_LOADING: "eraforce/SET_ACTIVITY_CARD_LOADING",
      SET_ACTIVITY_CARD_NOT_LOADING: "eraforce/SET_ACTIVITY_CARD_NOT_LOADING",
      SET_EMPLOYEE_PROJECT: "eraforce/SET_EMPLOYEE_PROJECT",
    }),
    setInit() {
      this.name = this.getSelectedData.job;
      this.quantity = this.getSelectedData.quantity_target;
      this.value_text =
        "IDR " + numeral(this.getSelectedData.value_target).format("0,0");
      this.profit_text =
        "IDR " + numeral(this.getSelectedData.profit_target).format("0,0");
      this.date = this.getSelectedData.end_date;
    },
    handleUpdateInfo() {
      const val_text = this.value_text.split(" ")[1];
      const val = val_text.split(",").join("");
      this.value = parseInt(val);

      const prof_text = this.profit_text.split(" ")[1];
      const prof = prof_text.split(",").join("");
      this.profit = parseInt(prof);
      if (
        this.name != "" &&
        this.quantity != "" &&
        this.value != "" &&
        this.profit != "" &&
        this.date != ""
      ) {
        const payload = {
          project_id: this.getSelectedData.number,
          project_name: this.name,
          quantity_target: this.quantity,
          value_target: this.value,
          profit_target: this.profit,
          end_target_date: this.date,
        };
        this.CLOSE_UPDATE_INFORMATION_DIALOG();
        this.doUpdatePipelineInformation(payload)
          .then((response) => {
            Swal.fire({
              icon: "success",
              title: `Voila! ${response}`,
            });
            this.fetchEmployeeProjects();
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: `Oopss!`,
              text: `Error: ${JSON.stringify(error.message)}`,
            }).then((result) => {
              if (result.isConfirmed) {
                this.OPEN_UPDATE_INFORMATION_DIALOG();
              }
            });
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
      this.CLOSE_UPDATE_INFORMATION_DIALOG();
    },

    fetchEmployeeProjects() {
      this.SET_ACTIVITY_CARD_LOADING();

      let payload = this.$store.state.eraforce.fetch_project_payload;
      this.fetchEmployeeProject(payload).then((response) => {
        this.SET_EMPLOYEE_PROJECT(response);
        this.SET_ACTIVITY_CARD_NOT_LOADING();
      });
    },
  },

  computed: {
    getSelectedData() {
      return this.$store.state.eraforce.selected_project_data;
    },
  },

  watch: {
    pipeline_id: {
      handler(n, o) {
        if (this.getSelectedData != "") {
          this.setInit();
          console.log(`vals ${this.getSelectedData}`);
          this.is_loading = false;
        }
      },
      deep: true,
    },

    value_text(val) {
      this.value_text = "IDR " + numeral(val).format("0,0");
    },

    profit_text(val) {
      this.profit_text = "IDR " + numeral(val).format("0,0");
    },
  },
};
</script>
