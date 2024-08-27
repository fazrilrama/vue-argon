<template>
  <el-dialog title="Update Project Notes" width="30%">
    <span>
      <el-input
        v-model="updated_notes"
        :value="updated_notes"
        placeholder="Update project notes"
      />
    </span>
    <argon-button
      class="mt-4"
      variant="gradient"
      color="success"
      fullWidth
      size="md"
      @click="handleUpdateNote()"
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
import Swal from "sweetalert2";

import { mapActions, mapMutations } from "vuex";

export default {
  data() {
    return {
      updated_notes: "",
    };
  },
  components: {
    ArgonButton,
  },
  props: {
    current_note: {
      type: String,
      default: "",
    },
    pipeline_id: {
      type: String,
      default: "",
    },
  },
  computed: {},
  methods: {
    ...mapActions({
      doUpdatePipelineNotes: "eraforce/doUpdatePipelineNotes",
      fetchEmployeeProject: "eraforce/fetchEmployeeProject",
    }),
    ...mapMutations({
      CLOSE_UPDATE_NOTES_DIALOG: "eraforce/CLOSE_UPDATE_NOTES_DIALOG",
      OPEN_UPDATE_NOTES_DIALOG: "eraforce/OPEN_UPDATE_NOTES_DIALOG",
      SET_ACTIVITY_CARD_LOADING: "eraforce/SET_ACTIVITY_CARD_LOADING",
      SET_ACTIVITY_CARD_NOT_LOADING: "eraforce/SET_ACTIVITY_CARD_NOT_LOADING",
      SET_EMPLOYEE_PROJECT: "eraforce/SET_EMPLOYEE_PROJECT",
    }),
    setInit() {
      this.updated_notes = this.current_note;
    },

    handleUpdateNote() {
      if (this.updated_notes != "" && this.pipeline_id != "") {
        this.CLOSE_UPDATE_NOTES_DIALOG();
        const payload = {
          pipeline_id: this.pipeline_id,
          note: this.updated_notes,
        };
        this.doUpdatePipelineNotes(payload)
          .then((response) => {
            Swal.fire({
              icon: "success",
              title: `Voila! ${response}`,
            });
            this.fetchEmployeeProjects();
          })
          .catch((error) => {
            Swal.fire({
              icon: "Error",
              title: `Oopss!`,
              text: `Error: ${JSON.stringify(error.message)}`,
            });
            this.OPEN_UPDATE_NOTES_DIALOG();
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
      this.CLOSE_UPDATE_NOTES_DIALOG();
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
          this.updated_notes = this.getSelectedData.note;
        }
      },
      deep: true,
    },
  },
};
</script>
