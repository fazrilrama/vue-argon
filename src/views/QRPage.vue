<template>
  <div class="container top-0 position-sticky z-index-sticky">
    <div class="row">
      <div class="col-12">
        <!-- <navbar isBtn="bg-gradient-light" /> -->
      </div>
    </div>
  </div>
  <main class="main-content mt-0" v-if="is_on_office">
    <div class="container" id="container-attendance">
      <div class="row" id="row-attendance">
        <!-- Attendance Data -->
        <div class="col-lg-6 col-md-6 col-sm-12">
          <div class="card z-index-0 mt-4" style="width: 100%">
            <div class="">
              <div class="mt-2 position-relative text-center">
                <p class="text-bold">
                  {{ formatDate(new Date(), "daydate") }} {{ time }}
                </p>
              </div>
            </div>
            <div class="card-body d-flex justify-content-evenly">
              <div>
                <qrcode-vue
                  :value="client"
                  :size="size"
                  level="H"
                  v-if="is_qr_ready"
                />
                <div class="row" style="height: 250px; width: 250px" v-else>
                  <div class="col-12">
                    <div class="text-center p-3">
                      <div class="spinner-border mt-5" role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-4">
                <div>In The Office : {{ attendanceCount }}</div>
                <!-- <div>Is Late : {{ office_attendance_late }}</div> -->
              </div>
            </div>
          </div>

          <!-- List Attendance -->
          <div class="row">
            <div class="col-lg-6 col-md-6 mt-4">
              <div style="width: 100%">
                <div class="card p-2 text-center text-bold">
                  Non Sales Attendance
                </div>
              </div>
              <div
                class="p-2"
                style="width: 100%"
                v-for="attendance in attendances"
              >
                <div class="row">
                  <div class="col-md-2">
                    <img
                      v-bind:src="
                        'https://cdn.erakomp.co.id/eraoffice/users/' +
                        attendance['user']['sales_photo'] +
                        '?x-oss-process=image/resize,w_512,h_512'
                      "
                      class="rounded"
                      alt="Avatar"
                      width="50"
                      height="50"
                    />
                  </div>
                  <div class="col-md-10">
                    <div
                      class="d-flex justify-content-between align-items-center"
                      v-if="isGoHome"
                    >
                      <div>
                        <div
                          class="text-sm text-bold"
                          :class="attendance.diff_out > 0 ? '' : 'text-danger'"
                        >
                          {{ attendance["user"]["sales_name"] }}
                        </div>
                        <div
                          :class="attendance.diff_out > 0 ? '' : 'text-danger'"
                        >
                          Out: {{ attendance["time_out"] }}
                        </div>
                      </div>
                      <div>
                        <i
                          @click="
                            goToMap(
                              attendance.latitude_out,
                              attendance.longitude_out
                            )
                          "
                          class="fas fa-map-marker-alt cursor-pointer"
                          :class="
                            attendance.is_match_in == 0
                              ? 'text-danger'
                              : 'text-success'
                          "
                        ></i>
                      </div>
                    </div>
                    <div
                      class="d-flex justify-content-between align-items-center"
                      v-else
                    >
                      <div>
                        <div
                          class="text-sm text-bold"
                          :class="attendance.diff > 0 ? 'text-danger' : ''"
                        >
                          {{ attendance["user"]["sales_name"] }}
                        </div>
                        <div :class="attendance.diff > 0 ? 'text-danger' : ''">
                          In: {{ attendance["time_in"] }}
                        </div>
                      </div>
                      <div>
                        <i
                          @click="
                            goToMap(
                              attendance.latitude_in,
                              attendance.longitude_in
                            )
                          "
                          class="fas fa-map-marker-alt cursor-pointer"
                          :class="
                            attendance.is_match_in == 0
                              ? 'text-danger'
                              : 'text-success'
                          "
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-md-6 mt-4">
              <div style="width: 100%">
                <div class="card p-2 text-center text-bold">
                  Sales Attendance
                </div>
                <div
                  class="p-2"
                  style="width: 100%"
                  v-for="attendance in attendanceSales"
                >
                  <div class="row">
                    <div class="col-md-2">
                      <img
                        v-bind:src="
                          'https://salesforce.klikpersada.co.id/ns/employee/' +
                          attendance.photo_url
                        "
                        class="rounded"
                        alt="Avatar"
                        width="50"
                        height="50"
                      />
                    </div>
                    <div class="col-md-10">
                      <div
                        class="d-flex justify-content-between align-items-center"
                        v-if="isGoHome"
                      >
                        <div>
                          <div
                            :class="
                              attendance.diff_out > 0 ? '' : 'text-danger'
                            "
                            class="text-bold"
                          >
                            {{ attendance.full_name }}
                          </div>
                          <div
                            :class="
                              attendance.diff_out > 0 ? '' : 'text-danger'
                            "
                          >
                            <span v-if="attendance.time_out">
                              Out: {{ attendance.time_out.split(" ")[1] }}
                            </span>
                            <span v-else> - </span>
                          </div>
                        </div>
                        <div>
                          <i
                            @click="
                              goToMap(
                                attendance.latitude_out,
                                attendance.longitude_out
                              )
                            "
                            class="fas fa-map-marker-alt cursor-pointer"
                            :class="
                              attendance.is_match == 0
                                ? 'text-danger'
                                : 'text-success'
                            "
                          ></i>
                        </div>
                      </div>
                      <div
                        class="d-flex justify-content-between align-items-center"
                        v-else
                      >
                        <div>
                          <div
                            :class="attendance.diff > 0 ? 'text-danger' : ''"
                            class="text-bold"
                          >
                            {{ attendance.full_name }}
                          </div>
                          <div
                            :class="attendance.diff > 0 ? 'text-danger' : ''"
                          >
                            In: {{ attendance.time_in.split(" ")[1] }}
                          </div>
                        </div>
                        <div>
                          <i
                            @click="
                              goToMap(
                                attendance.latitude_in,
                                attendance.longitude_in
                              )
                            "
                            class="fas fa-map-marker-alt cursor-pointer"
                            :class="
                              attendance.is_match == 0
                                ? 'text-danger'
                                : 'text-success'
                            "
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sales Data -->
        <div class="col-lg-6 col-md-6 col-sm-12">
          <div>
            <div class="card mt-4" style="width: 100%">
              <div class="">
                <div class="mt-2 text-center">
                  <p class="text-bold">
                    Sales Profit Rank
                    {{ formatDate(new Date(), "yearmonth") }}
                  </p>
                </div>
              </div>
            </div>
            <Carousel />
          </div>

          <div>
            <div class="card mt-2" style="width: 100%">
              <div class="">
                <div class="mt-2 text-center">
                  <p class="text-bold">
                    Courier Rank
                    {{ formatDate(new Date(), "yearmonth") }}
                  </p>
                </div>
              </div>
            </div>
            <CarouselCourier />
          </div>
        </div>
      </div>
    </div>
  </main>
  <main class="main-content mt-5" v-else>
    <div class="container" id="container-attendance" v-if="is_location_loading">
      <div class="row" id="row-attendance">
        <div class="p3 d-flex justify-content-center">
          <lottie-player
            src="https://assets7.lottiefiles.com/private_files/lf30_fup2uejx.json"
            background="transparent"
            speed="1"
            style="width: 300px; height: 300px"
            loop
            autoplay
          ></lottie-player>
        </div>
      </div>
      <div class="row" id="row-attendance">
        <div class="p3 d-flex justify-content-center">
          <h6>Please wait...</h6>
        </div>
      </div>
    </div>
    <div class="container" id="container-attendance" v-else>
      <div class="row" id="row-attendance">
        <div class="card bg-gradient-light p3">
          <div class="d-flex justify-content-center">
            <img
              src="@/assets/img/gooassets/lost.png"
              alt=""
              style="width: 40vw"
            />
          </div>
          <h1 class="text-dark text-center text-bold">
            HI, ARE YOU LOST, BUDDY?
          </h1>
          <h6 class="text-center">
            I'm sorry, but you are not authorized to access this route!
          </h6>
          <div class="d-flex justify-content-center">
            <argon-button
              class="mb-3 me-2"
              color="success"
              size="md"
              variant="gradient"
              @click="contactAdministrator()"
              fullWidth
            >
              Contact Administrator
            </argon-button>
            <argon-button
              class="mb-3"
              color="danger"
              size="md"
              variant="gradient"
              @click="goHome()"
              fullWidth
            >
              Go Home
            </argon-button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Swal from "sweetalert2";

import Navbar from "@/examples/PageLayout/Navbar.vue";
import AppFooter from "@/views/CheckFooter.vue";
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonCheckbox from "@/components/ArgonCheckbox.vue";
import ArgonButton from "@/components/ArgonButton.vue";
const body = document.getElementsByTagName("body")[0];

import QrcodeVue from "qrcode.vue";
import axios from "axios";
import { async } from "q";
import { format } from "date-fns";
import Carousel from "@/components/GooSales/components/QRPageCarousel.vue";
import CarouselCourier from "@/components/GooSales/components/QRPageCarouselCourier.vue";
import { mapActions } from "vuex";

import AllTeamRevenueCard from "@/components/GooSales/components/statistic/AllTeamRevenueCard.vue";

export default {
  name: "signin",
  data() {
    return {
      client: "",
      size: 250,
      counter: 0,
      attendances: [],
      attendanceSales: [],
      dateNow: [],
      userCount: 0,
      attendanceCount: 0,
      is_qr_ready: false,
      on_line: navigator.onLine,
      interval: null,
      time: null,
      sales_rank_data: [],
      office_attendance_late: 0,
      sales_team_revenue: [],
      is_on_office: false,
      is_location_loading: true,
    };
  },
  beforeDestroy() {
    // prevent memory leak
    clearInterval(this.interval);
  },
  components: {
    Navbar,
    AppFooter,
    ArgonInput,
    ArgonCheckbox,
    ArgonButton,
    QrcodeVue,
    Carousel,
    CarouselCourier,
    AllTeamRevenueCard,
  },
  created() {
    this.$store.state.hideConfigButton = true;
    this.$store.state.showNavbar = false;
    this.$store.state.showSidenav = false;
    this.$store.state.showFooter = false;
    body.classList.remove("bg-gray-100");
    this.interval = setInterval(() => {
      // Concise way to format time according to system locale.
      // In my case this returns "3:48:00 am"
      this.time = Intl.DateTimeFormat(navigator.language, {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      }).format();
    }, 1000);
  },
  beforeUnmount() {
    this.$store.state.hideConfigButton = false;
    this.$store.state.showNavbar = true;
    this.$store.state.showSidenav = true;
    this.$store.state.showFooter = true;
    body.classList.add("bg-gray-100");
  },
  computed: {
    isGoHome() {
      const now = format(new Date(), "yyyy-MM-dd HH:mm:ss");

      const late = format(new Date(), "yyyy-MM-dd") + " " + "17:00:00";

      const checkoutDiffTime = new Date(now) - new Date(late);
      const checkoutDiffHours = Math.ceil(checkoutDiffTime / (1000 * 60 * 60));

      if (checkoutDiffHours > 0) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    ...mapActions({
      getWifiLocation: "getWifiLocation",
    }),
    contactAdministrator() {
      window.open("https://wa.me/6282323425566");
    },
    goHome() {
      this.$router.push("/");
    },
    goToMap(lat, lang) {
      window.open(`https://maps.google.com/?q=${lat},${lang}`, "_blank");
    },
    formatDate(date, type = null) {
      if (type == "daydatetime") {
        return format(new Date(date), "EEEE, dd MMMM yyyy HH:mm aa");
      } else if (type == "daydate") {
        return format(new Date(date), "EEEE, dd MMMM yyyy");
      } else if (type == "time") {
        return format(new Date(date), "HH:mm aa");
      } else if (type == "yearmonth") {
        return format(new Date(date), "MMMM yyyy");
      }
    },

    pingServer() {
      axios.get("https://devgoapi.yukevajkt.com/ping");
      setTimeout(() => {
        this.pingServer();
      }, 30000);
    },

    /// method vue
    heartbeat() {
      console.log("heartbeat");
      this.getAttendanceOffice();
      this.getAttendanceSales();

      clearTimeout(this.pingTimeout);

      // Use `WebSocket#terminate()`, which immediately destroys the connection,
      // instead of `WebSocket#close()`, which waits for the close timer.
      // Delay should be equal to the interval at which your server
      // sends out pings plus a conservative assumption of the latency.
      this.pingTimeout = setTimeout(() => {
        this.ws.close();
      }, 60000 + 1000);
    },

    onMessageSocket(event) {
      var data = JSON.parse(event.data);
      var { msg, token } = data;
      if (msg == "READY") {
        this.client = token;
      }
      if (msg == "ATTENDANCE_SUCCESS") {
        this.ws.send(
          JSON.stringify({
            type: "server",
          })
        );
      }
      if (msg == "REFRESH") {
        this.ws.send(
          JSON.stringify({
            type: "server",
          })
        );
      }

      if (msg == "ATTENDANCE_OFFICE_REFRESH") {
        this.attendanceCount += 1;
        this.getAttendanceOffice();
      }

      if (msg == "ATTENDANCE_SALES_REFRESH") {
        this.getAttendanceSales();
      }
    },
    initWebSocket() {
      // this.ws = new WebSocket("wss://devgoapi.yukevajkt.com/api/v2/attendance");

      this.ws = new WebSocket("wss://devgoapi.yukevajkt.com/api/v3/attendance");
      this.ws.onopen = () => {
        this.heartbeat();
        console.log(`Success connect WS`);
        this.is_qr_ready = true;
        this.ws.send(
          JSON.stringify({
            type: "server",
          })
        );
      };
      this.ws.onmessage = this.onMessageSocket;
      this.ws.onclose = () => {
        this.is_qr_ready = false;
        console.log("disconnected");
        setTimeout(this.initWebSocket(), 1000);
      };
    },
    initClientName() {
      const today = new Date();
      const date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      const time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const dateTime = date + "." + time;
      this.client =
        "client+" + dateTime + "+" + Math.random().toString(36).substring(2, 9);
    },
    /// get attendance office
    async getAttendanceOffice() {
      var url =
        "https://goocheck.klikpersada.co.id/api/public/get-attendance?key=90afa72a-f538-4785-ab1c-6ae5551d6e37";
      var { data } = await axios.get(url);
      let data_result = [];
      data.forEach((item) => {
        const date = format(new Date(), "yyyy-MM-dd");
        let time_in = item.time_in;

        let date2_in = new Date(date + " " + time_in);
        let date1_in = new Date(date + " " + "08:00:00");
        const checkinDiffTime = date2_in - date1_in;
        const checkinDiffHours = Math.ceil(checkinDiffTime / (1000 * 60 * 60));

        let diff_out = null;
        if (item.time_out != null) {
          let time_out = item.time_out;

          let date2_out = new Date(date + " " + time_out);
          let date1_out = new Date(date + " " + "17:00:00");
          const checkoutDiffTime = date2_out - date1_out;
          const checkoutDiffHours = Math.ceil(
            checkoutDiffTime / (1000 * 60 * 60)
          );
          diff_out = {
            diff_out: checkoutDiffHours,
          };
        }

        const diff = {
          diff: checkinDiffHours,
        };
        const data_item = { ...item, ...diff, ...diff_out };
        data_result.push(data_item);
      });

      this.attendances = data_result;
    },

    async getAttendanceSales() {
      const today = new Date();

      var url =
        "https://salesforce.klikpersada.co.id/ns/api/v1/check/list/manager/qr";
      var { data } = await axios.post(url, {
        first_date:
          today.getFullYear() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getDate() +
          " 00:00:00",
        last_date:
          today.getFullYear() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getDate() +
          " 23:59:59",
        flag: "true",
      });
      var list = data.result.detail;
      let data_result = [];
      list.forEach((item) => {
        const date = format(new Date(), "yyyy-MM-dd");
        let time_in = item.time_in;

        let date2_in = new Date(time_in);
        let date1_in = new Date(date + " " + "08:00:00");
        const checkinDiffTime = date2_in - date1_in;
        const checkinDiffHours = Math.ceil(checkinDiffTime / (1000 * 60 * 60));

        let diff_out = null;
        if (item.time_out != null) {
          let time_out = item.time_out;

          let date2_out = new Date(time_out);
          let date1_out = new Date(date + " " + "17:00:00");
          const checkoutDiffTime = date2_out - date1_out;
          const checkoutDiffHours = Math.ceil(
            checkoutDiffTime / (1000 * 60 * 60)
          );
          diff_out = {
            diff_out: checkoutDiffHours,
          };
        }

        const diff = {
          diff: checkinDiffHours,
        };
        const data_item = { ...item, ...diff };
        data_result.push(data_item);
      });
      this.attendanceSales = data_result;
    },

    async getAttendanceOfficeCount() {
      var url =
        "https://goocheck.klikpersada.co.id/api/public/get-attendance/count?key=90afa72a-f538-4785-ab1c-6ae5551d6e37";
      var { data } = await axios.get(url);
      this.attendanceCount = data.length;

      data.forEach((item) => {
        const date = format(new Date(), "yyyy-MM-dd");
        let time_in = item.time_in;

        let date2_in = new Date(date + " " + time_in);
        let date1_in = new Date(date + " " + "08:00:00");
        const checkinDiffTime = date2_in - date1_in;
        const checkinDiffHours = Math.ceil(checkinDiffTime / (1000 * 60 * 60));
      });
    },
    async getUserOfficeCount() {
      var url =
        "https://goocheck.klikpersada.co.id/api/public/user/count?key=90afa72a-f538-4785-ab1c-6ae5551d6e37";
      var { data } = await axios.get(url);
      this.userCount = data;
    },

    async getSalesTeamRevenue() {
      const month = format(new Date(), "MM");
      const year = format(new Date(), "yyyy");
      var url = `https://salesforce.klikpersada.co.id/ns/api/v1/team/revenue/gooapps?interval=1&month=${month}&year=${year}`;
      var { data } = await axios.get(url);
      const list = data.result;
      this.sales_team_revenue = list;
    },

    isLocationMatches() {
      this.is_location_loading = true;
      this.getWifiLocation()
        .then((response) => {
          this.is_location_loading = false;
          if (response.length > 0) {
            this.initClientName();
            this.initWebSocket();
            this.getAttendanceOffice();
            this.getAttendanceSales();
            this.getAttendanceOfficeCount();
            this.getSalesTeamRevenue();
            this.pingServer();
            this.is_on_office = true;
          } else {
            this.is_on_office = false;
          }
          console.log(`ald ${JSON.stringify(response)}`);
        })
        .catch((e) => {
          this.is_location_loading = false;
          Swal.fire({
            title: "Oops... !",
            text: "Do you want to try again?",
            icon: "error",
            showDenyButton: true,
            confirmButtonText: "Try Again",
            denyButtonText: `No`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              location.reload();
            } else if (result.isDenied) {
              Swal.fire(
                "Failed to access this route, redirected to homepage",
                "",
                "error"
              ).then(() => {
                this.$router.push("/");
              });
            }
          });
        });
    },
  },
  watch: {
    on_line: {
      handler(n, o) {
        console.log(`status ${n}`);
      },
      deep: true,
    },
  },
  beforeMount() {
    this.isLocationMatches();
  },
  mounted() {
    // this.isLocationMatches();
    // this.getUserOfficeCount();
  },
};
</script>

<style scoped>
.card-img-revenue {
  border-radius: 10px;
  display: block;
  width: 100%;
  background-size: cover;
  height: 100px;
  min-width: 150px;
  object-fit: cover;
  margin-right: 10px;
}

.containers-image-revenue {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>
