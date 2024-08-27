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
            class="card card-profile row mb-3"
            v-for="(idea, index) in activityData"
            :key="index"
          >
            <div class="">
              <div class="mt-3" v-if="idea.image != null">
                <img
                  :src="idea.image"
                  alt="Image placeholder"
                  class="card-img-top"
                />
              </div>
              <div
                class="card-header text-center border-0 pt-0 pt-lg-2 pb-4 pb-lg-3"
              >
                <div class="d-flex justify-content-between align-items-center">
                  <div class="d-flex align-items-center">
                    <span class="badge bg-gradient-info">
                      <i class="far fa-envelope" v-if="idea.is_read"></i>
                      <i class="far fa-envelope-open" v-else></i>
                    </span>
                    <div class="d-flex flex-column justify-content-start ms-3">
                      <div class="h6 font-weight-300 text-start">
                        {{ idea.title }}
                      </div>
                      <div class="text-xxs text-start">
                        {{ formatDate(idea.created_at, "daydatetime") }}
                      </div>
                    </div>
                  </div>
                  <!-- <div class="text-end">
                    <argon-button variant="gradient" color="info" size="sm">
                      <div>Edit</div>
                    </argon-button>
                  </div> -->
                </div>
              </div>
              <div class="card-body pt-0">
                <div class="text-center mt-4">
                  <div class="fst-italic">
                    {{ idea.idea }}
                  </div>
                </div>
              </div>
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
      return this.$store.state.eraforce.wall_of_idea_data;
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
