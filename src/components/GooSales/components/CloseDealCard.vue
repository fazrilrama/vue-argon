<template>
  <div class="row">
    <div class="card mb-3" v-if="projectsData.length == 0">
      <div class="card-header px-3">
        <h6 class="mb-0 text-center">No data found</h6>
      </div>
    </div>
    <div class="card" v-else>
      <div class="card-body">
        <el-scrollbar height="400px">
          <div
            style="margin: 10px"
            v-for="(project, index) in projectsData"
            :key="index"
          >
            <div class="card">
              <div>
                <img
                  :src="project.project.company_picture"
                  class="card-img-top"
                  alt="..."
                  style="
                    background-size: cover;
                    height: 100px;
                    object-fit: cover;
                  "
                />
              </div>
              <div class="card-body">
                <ul class="list-group" style="padding: 0 16px">
                  <li
                    class="list-group-item border-0 d-flex justify-content-between align-items-center ps-0 mb-2 border-radius-lg"
                  >
                    <div class="d-flex align-items-center">
                      <div class="d-flex flex-column">
                        <h6 class="mb-1 text-dark text-sm">
                          {{ project.project.job }}
                        </h6>
                      </div>
                    </div>
                    <div class="d-flex align-items-center">
                      <div class="d-flex flex-column">
                        <h6 class="mb-1 text-dark text-sm">
                          <span class="badge rounded-pill bg-secondary">
                            {{ formatDate(project.project.last_updated) }}
                          </span>
                        </h6>
                      </div>
                    </div>
                    <div class="d-flex align-items-center">
                      <div class="d-flex flex-column">
                        <h6 class="mb-1 text-dark text-sm text-end">
                          {{ project.project.company_name }}
                        </h6>
                      </div>
                    </div>
                  </li>
                  <hr class="horizontal dark" />
                </ul>

                <ul class="list-group" style="padding: 0 16px">
                  <li
                    class="list-group-item border-0 d-flex justify-content-between align-items-center ps-0 mb-2 border-radius-lg"
                  >
                    <div class="d-flex align-items-center">
                      <div class="d-flex flex-column">
                        <h6 class="mb-1 text-dark text-sm">Profit Target</h6>
                        <span class="text-xs">
                          IDR {{ numeralFormat(project.project.profit_target) }}
                        </span>
                      </div>
                    </div>
                    <div class="d-flex align-items-center">
                      <div class="d-flex flex-column">
                        <h6 class="mb-1 text-dark text-sm text-end">
                          Quantity Target
                        </h6>
                        <span class="text-xs text-end">
                          {{ project.project.quantity_target }} unit
                        </span>
                      </div>
                    </div>
                  </li>

                  <li
                    class="list-group-item border-0 d-flex justify-content-between align-items-center ps-0 mb-2 border-radius-lg"
                  >
                    <div class="d-flex align-items-center">
                      <div class="d-flex flex-column">
                        <h6 class="mb-1 text-dark text-sm">Latest Note</h6>
                        <span class="text-xs">
                          {{ project.project.project_notes }}
                        </span>
                      </div>
                    </div>
                    <div class="d-flex align-items-center">
                      <div class="d-flex flex-column">
                        <h6 class="mb-1 text-dark text-sm text-end">
                          Revenue Target
                        </h6>
                        <span class="text-xs text-end">
                          IDR {{ numeralFormat(project.project.value_target) }}
                        </span>
                      </div>
                    </div>
                  </li>
                </ul>

                <div
                  style="padding: 0 16px"
                  class="d-flex justify-content-evenly align-items-center"
                >
                  <argon-button
                    class="mt-3"
                    variant="gradient"
                    color="danger"
                    fullWidth
                    size="md"
                    @click="handleRejectDeal(project.project)"
                  >
                    <div>Reject Deal</div>
                  </argon-button>
                  <div style="margin: 0 10px"></div>
                  <argon-button
                    class="mt-3"
                    variant="gradient"
                    color="info"
                    fullWidth
                    size="md"
                    @click="handleCloseDeal(project.project)"
                  >
                    <div>Close Deal</div>
                  </argon-button>
                </div>
              </div>
            </div>
          </div>
        </el-scrollbar>

        <!-- Reject Deal -->
        <el-dialog
          v-model="reject_dialog"
          title="Describe your rejection"
          width="40%"
          :show-close="false"
        >
          <div>
            <div class="row mb-2">
              <div class="col-12">
                <div class="mb-1">
                  <label for="">Winner's Name</label>
                  <argon-input
                    type="text"
                    placeholder="Input Winner's Name"
                    size="lg"
                    :value="reject_form.winner_name"
                    v-model="reject_form.winner_name"
                  />
                </div>
              </div>
            </div>
            <div class="row mb-2">
              <div class="col-12">
                <div class="mb-1">
                  <label for="">Project Value</label>
                  <argon-input
                    type="text"
                    placeholder="Input Project Value"
                    size="lg"
                    :value="value_text"
                    v-model="value_text"
                  />
                </div>
              </div>
            </div>
            <div class="row mb-2">
              <div class="col-12">
                <div class="mb-1">
                  <label for="">Note</label>
                  <argon-input
                    type="text"
                    placeholder="Input Note"
                    size="lg"
                    :value="reject_form.note"
                    v-model="reject_form.note"
                  />
                </div>
              </div>
            </div>
          </div>
          <template #footer>
            <span class="dialog-footer">
              <argon-button
                class="mb-3"
                variant="gradient"
                color="success"
                fullWidth
                size="md"
                @click="initPipeline"
              >
                <div>Confirm</div>
              </argon-button>
              <argon-button
                class=""
                variant="gradient"
                color="danger"
                fullWidth
                size="md"
                @click="handleCancelReject"
              >
                <div>Cancel</div>
              </argon-button>
            </span>
          </template>
        </el-dialog>

        <!-- Close Deal -->
        <el-dialog
          v-model="close_deal_dialog"
          title="Close Deal"
          width="50%"
          :show-close="false"
        >
          <div>
            <el-scrollbar height="200px">
              <div>
                <div
                  class="card"
                  style="margin: 10px"
                  v-for="(i, index) in count"
                  :key="i"
                >
                  <div class="card-body">
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <span
                        class="cursor-pointer"
                        @click="deleteExtraClose"
                        v-show="count >= 2 && index != 0"
                      >
                        <i class="fa fa-trash text-danger"></i>
                      </span>
                    </div>
                    <div class="row">
                      <div class="col-12">
                        <label for="">Revenue Value</label>
                        <argon-input
                          placeholder="Type here..."
                          icon="far fa-money-bill-alt"
                          iconDir="left"
                          v-model="revenue_value[index]"
                          :value="revenue_value[index]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </el-scrollbar>
          </div>
          <template #footer>
            <span class="dialog-footer">
              <argon-button
                class="mb-1"
                color="success"
                size="md"
                variant="gradient"
                @click="proceedCloseDeal()"
                fullWidth
              >
                Proceed
              </argon-button>
              <argon-button
                color="danger"
                size="md"
                variant="gradient"
                @click="cancleCloseDeal"
                fullWidth
              >
                Cancel
              </argon-button>
            </span>
          </template>
        </el-dialog>

        <div class="d-flex justify-content-center mt-2">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script defer>
import Chart from "chart.js/auto";
import { format } from "date-fns";
import { mapMutations, mapActions } from "vuex";
import Swal from "sweetalert2";

import ArgonButton from "@/components/ArgonButton.vue";
import ArgonInput from "@/components/ArgonInput.vue";

export default {
  components: {
    ArgonButton,
    ArgonInput,
  },
  data() {
    return {
      reject_dialog: false,
      close_deal_dialog: false,
      count: 1,
      selected_project_data: {},
      selected_pipeline_data: {},
      cancel_note: "",
      deal_id: "",
      reject_form: {
        winner_name: "-",
        project_value: 0,
        note: "",
      },
      po_number: [],
      so_number: [],
      revenue_value: [],
      notes: [],
      value_text: "IDR 0",
      so_number_error: true,
    };
  },
  mounted() {
    // this.initRevenueNoteValue();
  },
  methods: {
    ...mapActions({
      doInitPipeline: "eraforce/doInitPipeline",
      fetchEmployeeProject: "eraforce/fetchEmployeeProject",
      doUpdatePotentialReject: "eraforce/doUpdatePotentialReject",
      doFinalizePipelineDeal: "eraforce/doFinalizePipelineDeal",
    }),
    ...mapMutations({
      SET_SELECTED_PROJECT_DATA: "eraforce/SET_SELECTED_PROJECT_DATA",
      SET_ACTIVITY_CARD_LOADING: "eraforce/SET_ACTIVITY_CARD_LOADING",
      SET_ACTIVITY_CARD_NOT_LOADING: "eraforce/SET_ACTIVITY_CARD_NOT_LOADING",
      SET_EMPLOYEE_PROJECT: "eraforce/SET_EMPLOYEE_PROJECT",
    }),

    initRevenueNoteValue() {
      for (let i = 0; i < this.count; i++) {
        if (this.revenue_value[i] == null) {
          this.revenue_value[i] = 0;
        }
        if (this.notes[i] == null) {
          this.notes[i] = "-";
        }
      }
    },

    clickOnSoInput() {
      for (let i = 0; i < this.count; i++) {
        if (this.so_number[i] == null) {
          this.so_number[i] = "S";
        }
      }
    },

    addMoreClose() {
      this.count += 1;
    },

    deleteExtraClose() {
      this.count -= 1;
    },

    formatDate(date) {
      let dates = date;
      dates = format(new Date(dates), "EEEE, dd MMMM yyyy HH:mm");
      return dates;
    },

    initRejectForm() {
      this.reject_form.winner_name = null;
      this.reject_form.project_value = 0;
      this.value_text = 0;
      this.reject_form.note = "";
    },

    initDealForm() {
      this.po_number = [];
      this.so_number = [];
      this.revenue_value = [];
      this.notes = [];
    },

    handleCancelReject() {
      this.initRejectForm();
      this.reject_dialog = false;
    },

    handleRejectDeal(data) {
      Swal.fire({
        title: `Attention!!`,
        text: `Are you sure want to reject this deal?`,
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          this.reject_dialog = true;
          this.selected_project_data = data;
        }
      });
    },

    // THIS IS HANDLE REJECT CLOSE DEAL BUTTON
    initPipeline() {
      this.reject_dialog = false;
      const payload_init = {
        card_customer: this.selected_project_data.number,
        count: 1,
      };
      this.doInitPipeline(payload_init)
        .then((response) => {
          const pipeline_id = response[0];
          const val_text = this.value_text.split(" ")[1];
          const val = val_text.split(",").join("");
          this.reject_form.project_value = parseInt(val);
          const payload_reject = {
            potential: 2,
            card_pipeline: pipeline_id,
            note: this.reject_form.note,
            project_value: this.reject_form.project_value,
            project_winner: this.reject_form.winner_name,
          };
          this.doUpdatePotentialReject(payload_reject)
            .then((res) => {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: `Success rejected!`,
                showConfirmButton: false,
                timer: 1500,
              }).then((result) => {
                this.fetchEmployeeProjects();
                this.selected_project_data = {};
                this.initRejectForm();
              });
            })
            .catch((error) => {
              console.log(`error deal ${JSON.stringify(error)}`);
              Swal.fire({
                icon: "error",
                title: `Ooopss!`,
                text: `Error: ${JSON.stringify(error)}`,
                showDenyButton: false,
                showCancelButton: false,
                confirmButtonText: "OK",
              }).then((result) => {
                if (result.isConfirmed) {
                  this.reject_dialog = true;
                  this.selected_project_data = data;
                }
              });
            });
        })
        .catch((error) => {
          console.log(`error ${JSON.stringify(error)}`);
        });
    },

    handleCloseDeal(project) {
      this.selected_project_data = project;
      this.revenue_value[0] =
        "IDR " + numeral(this.selected_project_data.value_target).format("0,0");
      this.close_deal_dialog = true;
    },

    cancleCloseDeal() {
      this.selected_project_data = {};
      this.close_deal_dialog = false;
      this.initDealForm();
    },

    // THIS IS HANDLE CLOSE DEAL BUTTon
    proceedCloseDeal() {
      let revenue_dot = [];
      for (let i = 0; i < this.count; i++) {
        const val = this.revenue_value[i].split(",").join("");
        revenue_dot.push(val);
      }
      let data = revenue_dot[0];

      const close_deal_payload = {
        card_customer: this.selected_project_data.number,
        data: data,
      };

      this.close_deal_dialog = false;
      this.doFinalizePipelineDeal(close_deal_payload)
        .then((response) => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Success close deal!`,
            showConfirmButton: false,
            timer: 1500,
          }).then((result) => {
            this.fetchEmployeeProjects();
            this.selected_project_data = {};
            this.initDealForm();
          });
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: `Ooopss!`,
            text: `Error: ${error}`,
            showDenyButton: false,
            showCancelButton: false,
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.isConfirmed) {
              this.close_deal_dialog = true;
            }
          });
        });
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
    projectsData() {
      return this.$store.state.eraforce.employee_project.slice().reverse();
    },
  },
  watch: {
    value_text(val) {
      this.value_text = "IDR " + numeral(val).format("0,0");
    },
    revenue_value: {
      handler: function (val, oldVal) {
        for (let i = 0; i < val.length; i++) {
          this.revenue_value[i] = numeral(val[i]).format("0,0");
        }
      },
      deep: true,
    },
    so_number: {
      handler: function (val, oldVal) {
        for (let i = 0; i < val.length; i++) {
          if (val[i].charAt(0) !== "S") {
            console.log(`char 1 not S`);
            this.so_number[i] = "S" + val[i];
          }

          if (val[i].length >= 2 && val[i].charAt(2) != "/") {
            console.log(`char 2 not /`);
            const year = format(new Date(), "yy");

            this.so_number[i] = this.so_number[i].substring(0, 2) + "/" + year;
          }

          if (val[i].length >= 5 && val[i].charAt(5) != "/") {
            console.log(`char 5 not /`);
            this.so_number[i] = this.so_number[i].substring(0, 5) + "/";
          }

          if (val[i].length > 10) {
            this.so_number[i] = this.so_number[i].substring(0, 10);
          }
        }
      },
      deep: true,
    },
  },
};
</script>
