<template>
  <el-dialog title="Update Deal Information" width="30%" :show-close="false">
    <div v-if="!is_loading">
      <div class="d-flex flex-column">
        <div class="mb-1">
          <span>PO Number</span>
          <el-input
            type="text"
            placeholder="Update PO Number"
            size="lg"
            v-model="po"
          />
        </div>
        <div class="mb-1">
          <span>SO Number</span>
          <el-input
            type="text"
            placeholder="Update SO Number"
            size="lg"
            v-model="so"
          />
        </div>
        <div class="mb-1">
          <span>Revenue Value</span>
          <el-input
            type="text"
            placeholder="Update Revenue Value"
            size="lg"
            v-model="value"
          />
        </div>
      </div>
    </div>
    <div v-else>
      <div class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
    <argon-button
      class="mt-4"
      variant="gradient"
      color="success"
      fullWidth
      size="md"
      :disabled="po == '' || so == '' || value == ''"
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

import { mapActions, mapMutations } from "vuex";

export default {
  data() {
    return {
      po: "",
      so: "",
      value: "",
      is_loading: false,
    };
  },
  components: {
    ArgonButton,
    ArgonInput,
  },
  props: {
    current_project_data: {
      type: null,
    },
    deal_id: {
      type: String,
      default: "",
    },
  },
  beforeMount() {},
  computed: {},
  methods: {
    ...mapActions({
      doUpdatePipelineInformation: "eraforce/doUpdatePipelineInformation",
    }),
    ...mapMutations({
      CLOSE_UPDATE_DEAL_DIALOG: "eraforce/CLOSE_UPDATE_DEAL_DIALOG",
      OPEN_UPDATE_DEAL_DIALOG: "eraforce/OPEN_UPDATE_DEAL_DIALOG",
    }),
    setInit() {
      if (this.getSelectedData != null) {
        this.po = this.getSelectedData.po_id;
        this.so = this.getSelectedData.so_id;
        this.value = this.getSelectedData.so_value;
        this.is_loading = false;
      } else {
        this.is_loading = true;
        console.log(`nulls`);
      }
    },
    handleUpdateInfo() {
      if (this.po != "" && this.so != "" && this.value != "") {
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
        this.CLOSE_UPDATE_INFORMATION_DIALOG();
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
            this.OPEN_UPDATE_DEAL_DIALOG();
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
      this.CLOSE_UPDATE_DEAL_DIALOG();
    },
  },

  computed: {
    getSelectedData() {
      return this.$store.state.eraforce.selected_project_data;
    },
  },

  watch: {
    deal_id: {
      handler(n, o) {
        if (n) {
          this.setInit();
          console.log(`vals ${JSON.stringify(this.getSelectedData)}`);
        }
      },
      deep: true,
    },
  },
};
</script>
