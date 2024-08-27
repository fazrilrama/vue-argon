<template>
  <div class="card card-carousel overflow-hidden h-60 p-0 mt-1">
    <div
      id="carouselExampleCaptions2"
      class="carousel slide h-100"
      data-bs-ride="carousel"
    >
      <div class="carousel-inner border-radius-lg h-100">
        <div class="carousel-item h-100 active">
          <h6 class="text-center">Top 5 Longest Distance</h6>
          <div
            class="card my-1 mx-3 p-2 bg-gradient-info"
            v-for="(rank, index) in ranking_distance"
            :key="index"
          >
            <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex align-items-center">
                <div class="me-3">
                  <h6 class="text-light">#{{ index + 1 }}</h6>
                </div>
                <img
                  :src="
                    'https://cdn.erakomp.co.id/eraoffice/users/' +
                    rank.sales_photo +
                    '?x-oss-process=image/resize,w_512,h_512'
                  "
                  :alt="rank.sales_name"
                  width="50"
                  height="50"
                  class="rounded me-3"
                />
                <div class="d-flex flex-column">
                  <span class="text-bold text-light">
                    {{ rank.sales_name }}
                  </span>
                  <span class="text-bold text-light">
                    {{ Math.round(rank.distance_total / 1000) }} KM
                  </span>
                </div>
              </div>
              <div>
                <h2 v-if="index == 0">
                  <i class="fas fa-trophy text-yellow"></i>
                </h2>
                <h4 v-else-if="index == 1">
                  <i class="fas fa-trophy text-silver"></i>
                </h4>
                <h4 v-else-if="index >= 2">
                  <i class="fas fa-trophy text-bronze"></i>
                </h4>
              </div>
            </div>
          </div>
        </div>

        <div class="carousel-item h-100">
          <h6 class="text-center">Top 5 The Most Delivery</h6>
          <div
            class="card my-1 mx-3 p-2 bg-gradient-primary"
            v-for="(rank, index) in ranking_count"
            :key="index"
          >
            <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex align-items-center">
                <div class="me-3">
                  <h6 class="text-light">#{{ index + 1 }}</h6>
                </div>
                <img
                  :src="
                    'https://cdn.erakomp.co.id/eraoffice/users/' +
                    rank.sales_photo +
                    '?x-oss-process=image/resize,w_512,h_512'
                  "
                  :alt="rank.sales_name"
                  width="50"
                  height="50"
                  class="rounded me-3"
                />
                <div class="d-flex flex-column">
                  <span class="text-bold text-light">
                    {{ rank.sales_name }}
                  </span>
                  <span class="text-bold text-light">
                    {{ rank.delivery_montly_count }} Delivery
                  </span>
                </div>
              </div>
              <div>
                <h2 v-if="index == 0">
                  <i class="fas fa-trophy text-yellow"></i>
                </h2>
                <h4 v-else-if="index == 1">
                  <i class="fas fa-trophy text-silver"></i>
                </h4>
                <h4 v-else-if="index >= 2">
                  <i class="fas fa-trophy text-bronze"></i>
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        class="carousel-control-prev w-5 me-3"
        type="button"
        data-bs-target="#carouselExampleCaptions2"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next w-5 me-3"
        type="button"
        data-bs-target="#carouselExampleCaptions2"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
    <span class="text-xs ms-3">Last updated: Today, {{ last_updated }}</span>
  </div>
</template>

<script>
import axios from "axios";
import { format } from "date-fns";

export default {
  name: "carousel",
  data() {
    return {
      ranking_distance: [],
      ranking_count: [],
      length: 0,
      last_updated: "",
    };
  },

  methods: {
    async getCourierData() {
      var url =
        "https://goocheck.klikpersada.co.id/api/public/delivery?key=90afa72a-f538-4785-ab1c-6ae5551d6e37";
      var { data } = await axios.get(url);
      this.ranking_distance = data.ranking_distance;
      this.ranking_count = data.ranking_count;
    },

    recycleData() {
      this.last_updated = format(new Date(), "HH:mm:ss");
      // axios.get("https://devgoapi.yukevajkt.com/ping");
      this.getCourierData();
      setTimeout(() => {
        this.recycleData();
      }, 300000);
    },
  },

  mounted() {
    this.recycleData();
  },
};
</script>

<style scoped>
.text-yellow {
  color: gold;
}
.text-silver {
  color: rgb(212, 212, 212);
}
.text-bronze {
  color: #786464;
}
.pink-background {
  background-color: #761800;
}
</style>
