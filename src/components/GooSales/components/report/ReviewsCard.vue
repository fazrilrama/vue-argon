<template>
  <div class="row">
    <div class="card mb-3" v-if="kpiData.length == 0">
      <div class="card-header px-3">
        <h6 class="mb-0 text-center">No data found</h6>
      </div>
    </div>

    <div v-else>
      <div class="card mb-3 row">
        <div class="card-body">
          <div class="d-flex align-items-center">div.</div>
        </div>
      </div>
      <el-scrollbar height="400px">
        <div class="p-3">
          <!-- <KPITable /> -->
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import { ElTimeline, ElButton } from "element-plus";
import { UserFilled, Message, Phone, Monitor } from "@element-plus/icons-vue";
import { format } from "date-fns";

import ArgonButton from "@/components/ArgonButton.vue";

import { mapActions, mapMutations } from "vuex";

import KPITable from "@/components/GooSales/components/kpi/KPITable.vue";

import axios from "axios";

export default {
  name: "call-card",

  components: {
    ElButton,
    ElTimeline,
    ArgonButton,
    KPITable,
  },

  data() {
    return {
      image: "",
      status: "",
      status_color: "",
      show_more: true,
      show_text: "More",
      show_icon: "down",
      access_token: this.$store.state.eraforce.token_maps_pk,
    };
  },

  methods: {
    ...mapMutations({
      SELECTED_PRESENCE_DATA: "eraforce/SELECTED_PRESENCE_DATA",
    }),
    ...mapActions({}),

    imageLoadError() {
      return `https://salesforce.klikpersada.co.id/ns/employee/default-image.png`;
    },

    formatDate(date, type) {
      if (type == "daydatetime") {
        return format(new Date(date), "EEEE, dd MMMM yyyy HH:mm aa");
      } else if (type == "daydate") {
        return format(new Date(date), "EEEE, dd MMMM yyyy");
      } else if (type == "time") {
        return format(new Date(date), "HH:mm aa");
      }
    },

    formatStatus(status) {
      if (status == 2) {
        this.status_color = "danger";
        return "REJECTED";
      } else if (status == 1) {
        this.status_color = "success";
        return "ACCEPT";
      } else {
        this.status_color = "warning";
        return "PENDING";
      }
    },
  },

  computed: {
    kpiData() {
      return this.$store.state.eraforce.report_kpi;
    },
  },

  beforeMount() {},
};
</script>

<style scoped>
.pink-background {
  background-image: linear-gradient(to bottom right, #ee542f, #e3cdd3);
}
</style>
