<template>
  <div class="row">
    <div class="card mb-3" v-if="activityData.length == 0">
      <div class="card-header px-3">
        <h6 class="mb-0 text-center">No data found</h6>
      </div>
    </div>

    <div class="mt-3" v-else>
      <el-scrollbar height="500px">
        <div class="p-3">
          <div
            class="card mb-3 row"
            v-for="(activity, index) in activityData"
            :key="index"
          >
            <img
              :src="activity.photo"
              class="card-img-top mt-3 img-top"
              alt="..."
              @error="imageLoadError"
            />
            <div class="card-body">
              <span class="card-title d-flex flex-column">
                <h5>{{ activity.project_name }}</h5>
                <span>
                  <i class="fa fa-user"></i> {{ activity.sales_name }}
                </span>
              </span>
              <p class="card-text">"{{ activity.note }}"</p>
              <p class="card-text">
                <small class="text-muted">{{
                  formatDate(activity.date, "daydatetime")
                }}</small>
              </p>
            </div>
          </div>
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

export default {
  name: "call-card",

  components: {
    ElButton,
    ElTimeline,
    ArgonButton,
  },

  data() {
    return {};
  },

  methods: {
    ...mapMutations({}),
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
  },

  computed: {
    activityData() {
      return this.$store.state.eraforce.team_activity;
    },
  },

  beforeMount() {},
};
</script>

<style scoped>
.img-top {
  background-size: cover;
  height: 150px;
  object-fit: cover;
}
</style>
