<template>
  <div class="row">
    <div class="card mb-3" v-if="presenceData.length == 0">
      <div class="card-header px-3">
        <h6 class="mb-0 text-center">No data found</h6>
      </div>
    </div>

    <div v-else>
      <div v-for="(presence, index) in presenceData" :key="index">
        <div class="card h-100 mb-4 row">
          <div class="card-header pb-0 px-3">
            <div class="row">
              <div class="col-md-4">
                <h6 class="mb-0">{{ presence.full_name }}</h6>
              </div>
              <div
                class="col-md-4 d-flex justify-content-center align-items-center"
              >
                <h6 class="mb-0">
                  <span :class="`badge rounded-pill bg-${status_color}`">
                    {{ formatStatus(presence.status) }}
                  </span>
                </h6>
              </div>
              <div
                class="col-md-4 d-flex justify-content-end align-items-center"
              >
                <small>
                  {{ formatDate(presence.created_at, "daydatetime") }}
                </small>
              </div>
            </div>
          </div>

          <div class="card-body pt-4 p-3">
            <ul class="list-group">
              <li
                class="list-group-item border-0 d-flex justify-content-between align-items-center ps-0 mb-2 border-radius-lg"
              >
                <div class="d-flex align-items-center">
                  <div class="d-flex flex-column">
                    <h6 class="mb-1 text-dark text-sm">Presence Date</h6>
                    <span class="text-xs" v-if="presence.time_in != null">
                      {{ formatDate(presence.time_in, "daydate") }}
                    </span>
                    <span class="text-xs" v-else> --:-- </span>
                  </div>
                </div>
                <div class="d-flex align-items-center">
                  <div class="d-flex flex-column">
                    <h6 class="mb-1 text-dark text-sm text-end">Notes</h6>
                    <span class="text-xs text-end">
                      {{ presence.note ?? "-" }}
                    </span>
                  </div>
                </div>
              </li>
            </ul>

            <!-- <span
              class="d-flex justify-content-center align-items-center cursor-pointer"
              @click="clickMore(index)"
            >
              Show {{ show_text }}
              <i
                :class="`fas fa-caret-${show_icon}`"
                style="margin-left: 10px"
              ></i>
            </span> -->

            <div v-if="show_more">
              <!-- TIME IN PART -->
              <div v-if="presence.time_in_correct != null && presence.time_in">
                <hr class="horizontal dark" />
                <h6
                  class="text-uppercase text-body text-xs font-weight-bolder my-3 text-center"
                >
                  Time In Correction
                </h6>
                <ul class="list-group">
                  <li
                    class="list-group-item border-0 d-flex justify-content-evenly ps-0 mb-2 border-radius-lg"
                  >
                    <div class="d-flex flex-column">
                      <h6 class="mb-1 text-dark text-sm">Time In</h6>
                      <span class="text-xs" v-if="presence.time_in != null">
                        {{ formatDate(presence.time_in, "time") }}
                      </span>
                      <span class="text-xs" v-else> --:-- </span>
                    </div>
                    <div>
                      <argon-button
                        color="success"
                        variant="outline"
                        size="sm"
                        class="btn-icon-only btn-rounded mb-0 me-3 d-flex align-items-center justify-content-center"
                      >
                        <i class="fas fa-arrow-right" aria-hidden="true"></i>
                      </argon-button>
                    </div>
                    <div class="d-flex flex-column">
                      <h6 class="mb-1 text-dark text-sm">Time In Correction</h6>
                      <span
                        class="text-xs"
                        v-if="presence.time_in_correct != null"
                      >
                        {{ formatDate(presence.time_in_correct, "time") }}
                      </span>
                      <span class="text-xs" v-else> --:-- </span>
                    </div>
                  </li>
                </ul>
              </div>

              <!-- TIME OUT PART -->
              <div v-if="presence.time_out_correct != null">
                <hr class="horizontal dark" />
                <h6
                  class="text-uppercase text-body text-xs font-weight-bolder my-3 text-center"
                >
                  Time Out Correction
                </h6>
                <ul class="list-group">
                  <li
                    class="list-group-item border-0 d-flex justify-content-evenly ps-0 mb-2 border-radius-lg"
                  >
                    <div class="d-flex flex-column">
                      <h6 class="mb-1 text-dark text-sm">Time Out</h6>
                      <span class="text-xs" v-if="presence.time_out != null">
                        {{ formatDate(presence.time_out, "time") }}
                      </span>
                      <span class="text-xs" v-else> --:-- </span>
                    </div>
                    <div>
                      <argon-button
                        color="success"
                        variant="outline"
                        size="sm"
                        class="btn-icon-only btn-rounded mb-0 me-3 d-flex align-items-center justify-content-center"
                      >
                        <i class="fas fa-arrow-right" aria-hidden="true"></i>
                      </argon-button>
                    </div>
                    <div class="d-flex flex-column">
                      <h6 class="mb-1 text-dark text-sm">
                        Time Out Correction
                      </h6>
                      <span
                        class="text-xs"
                        v-if="presence.time_out_correct != null"
                      >
                        {{ formatDate(presence.time_out_correct, "time") }}
                      </span>
                      <span class="text-xs" v-else> --:-- </span>
                    </div>
                  </li>
                </ul>
              </div>

              <!-- LOCATION IN PART -->
              <div v-if="presence.latitude_in_correct != null">
                <hr class="horizontal dark" />
                <h6
                  class="text-uppercase text-body text-xs font-weight-bolder my-3 text-center"
                >
                  Location In Correction
                </h6>
                <ul class="list-group">
                  <li
                    class="list-group-item border-0 d-flex justify-content-evenly ps-0 mb-2 border-radius-lg"
                  >
                    <div class="d-flex flex-column">
                      <h6 class="mb-1 text-dark text-sm text-center">
                        Location In
                      </h6>
                      <span class="text-xs">
                        {{ presence.in }}
                      </span>
                    </div>
                    <div>
                      <argon-button
                        color="success"
                        variant="outline"
                        size="sm"
                        class="btn-icon-only btn-rounded mb-0 me-3 d-flex align-items-center justify-content-center"
                      >
                        <i class="fas fa-arrow-right" aria-hidden="true"></i>
                      </argon-button>
                    </div>
                    <div class="d-flex flex-column justify-content-center">
                      <h6 class="mb-1 text-dark text-sm text-center">
                        Location In Correction
                      </h6>
                      <span class="text-xs"> {{ presence.in_correct }} </span>
                    </div>
                  </li>
                </ul>
              </div>

              <!-- LOCATION OUT PART -->
              <div v-if="presence.latitude_out_correct != null">
                <hr class="horizontal dark" />
                <h6
                  class="text-uppercase text-body text-xs font-weight-bolder my-3 text-center"
                >
                  Location Out Correction
                </h6>
                <ul class="list-group">
                  <li
                    class="list-group-item border-0 d-flex justify-content-evenly ps-0 mb-2 border-radius-lg"
                  >
                    <div class="d-flex flex-column">
                      <h6 class="mb-1 text-dark text-sm">Location Out</h6>
                      <span class="text-xs">
                        {{ location_out[index] }}
                      </span>
                    </div>
                    <div>
                      <argon-button
                        color="success"
                        variant="outline"
                        size="sm"
                        class="btn-icon-only btn-rounded mb-0 me-3 d-flex align-items-center justify-content-center"
                      >
                        <i class="fas fa-arrow-right" aria-hidden="true"></i>
                      </argon-button>
                    </div>
                    <div class="d-flex flex-column">
                      <h6 class="mb-1 text-dark text-sm">
                        Location Out Correction
                      </h6>
                      <span class="text-xs">
                        {{ location_out_correct[index] }}
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div
              v-if="isAdmin"
              class="d-flex justify-content-between align-items-center"
            >
              <argon-button
                v-if="presence.status == 0"
                class="mt-3 me-2"
                variant="gradient"
                color="danger"
                fullWidth
                size="md"
                @click="handleRejectRequest()"
              >
                <div>Reject Request</div>
              </argon-button>
              <argon-button
                v-if="presence.status == 0"
                class="mt-3 ms-2"
                variant="gradient"
                color="success"
                fullWidth
                size="md"
                @click="handleRejectRequest()"
              >
                <div>Accept Request</div>
              </argon-button>
            </div>
            <div v-else>
              <argon-button
                v-if="presence.status == 0"
                class="mt-3"
                variant="gradient"
                color="danger"
                fullWidth
                size="md"
                @click="handleCancelRequest()"
              >
                <div>Cancel Request</div>
              </argon-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ElTimeline, ElButton } from "element-plus";
import { UserFilled, Message, Phone, Monitor } from "@element-plus/icons-vue";
import { format } from "date-fns";

import ArgonButton from "@/components/ArgonButton.vue";

import { mapActions, mapMutations } from "vuex";

import axios from "axios";

export default {
  name: "call-card",

  components: {
    ElButton,
    ElTimeline,
    ArgonButton,
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
      location_in: [],
      location_out: [],
      location_in_correct: [],
      location_out_correct: [],
    };
  },

  methods: {
    ...mapMutations({
      SELECTED_PRESENCE_DATA: "eraforce/SELECTED_PRESENCE_DATA",
    }),
    ...mapActions({
      fetchPresenceRequestList: "eraforce/fetchPresenceRequestList",
    }),

    getPresence() {
      this.fetchPresenceRequestList().then((response) => {
        console.log(`total ${response.length}`);
      });
    },

    imageLoadError() {
      return `https://salesforce.klikpersada.co.id/ns/employee/default-image.png`;
    },

    showClientMap(detail) {
      window.open(
        `https://maps.google.com/?q=${detail.latitude_in},${detail.longitude_in}`,
        "_blank"
      );
    },

    clickMore(index) {
      this.presenceData.map((presence) => {
        if (presence.id == index) {
          // console.log(`show ${selectIndex} == ${presence_index}`);
          this.show_more = !this.show_more;
          if (this.show_more) {
            (this.show_text = "Less"), (this.show_icon = "up");
          } else {
            (this.show_text = "More"), (this.show_icon = "down");
          }
        }
      });
    },

    getRoute() {
      const routeArr = this.$route.path.split("/");
      // console.log(12121, routeArr[2]);
      return routeArr[1];
    },

    async goToPresenceRequest(detail) {
      await this.SELECTED_PRESENCE_DATA(detail);
      const url = "/" + this.getRoute() + "/transaksi/attendance/request";
      this.$router.push(url);
    },

    formatDate(date, type) {
      if (date != "0000-00-00 00:00:00") {
        if (type == "daydatetime") {
          return format(new Date(date), "EEEE, dd MMMM yyyy HH:mm aa");
        } else if (type == "daydate") {
          return format(new Date(date), "EEEE, dd MMMM yyyy");
        } else if (type == "time") {
          return format(new Date(date), "HH:mm aa");
        } else {
          return "-";
        }
      } else {
        return "-";
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

    async getLocation(data) {
      try {
        if (data.latitude_in != null && data.longitude_in != null) {
          const response = await axios.get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${data.longitude_in},${data.latitude_in}.json?access_token=${this.access_token}`
          );
          this.location_in.push(
            response.data.features ? response.data.features[0].place_name : "-"
          );
        }

        if (data.latitude_out != null && data.longitude_out != null) {
          const response = await axios.get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${data.longitude_out},${data.latitude_out}.json?access_token=${this.access_token}`
          );
          this.location_out.push(
            response.data.features ? response.data.features[0].place_name : "-"
          );
        }

        if (
          data.latitude_in_correct != null &&
          data.longitude_in_correct != null
        ) {
          const response = await axios.get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${data.longitude_in_correct},${data.latitude_in_correct}.json?access_token=${this.access_token}`
          );
          this.location_in_correct.push(
            response.data.features ? response.data.features[0].place_name : "-"
          );
        }

        if (
          data.latitude_out_correct != null &&
          data.longitude_out_correct != null
        ) {
          const response = await axios.get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${data.longitude_out_correct},${data.latitude_out_correct}.json?access_token=${this.access_token}`
          );
          this.location_out_correct.push(
            response.data.features ? response.data.features[0].place_name : "-"
          );
        }
      } catch (err) {
        // this.loading = false;
        console.log(err);
      }
    },
  },

  async created() {
    // this.generateLocation();
  },

  computed: {
    presenceData() {
      return this.$store.state.eraforce.presence_request_list;
    },

    isAdmin() {
      return this.$store.state.eraforce.eraforce_user_login[0].status_id == 7;
    },
  },

  mounted() {
    this.getPresence();
  },

  beforeMount() {},
};
</script>

<style scoped>
.pink-background {
  background-image: linear-gradient(to bottom right, #ee542f, #e3cdd3);
}
</style>
