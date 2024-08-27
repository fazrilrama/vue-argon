<template>
  <div class="card card-carousel overflow-hidden h-60 p-0 mt-1">
    <div
      id="carouselExampleCaptions"
      class="carousel slide h-100"
      data-bs-ride="carousel"
    >
      <div class="carousel-inner border-radius-lg h-100">
        <div class="carousel-item h-100 active">
          <h6 class="text-center">Top 5</h6>
          <div
            class="card my-1 mx-3 p-2 bg-gradient-dark"
            v-for="(rank, index) in sales_rank_data"
            :key="index"
          >
            <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex align-items-center">
                <div class="me-3">
                  <h6 class="text-light">#{{ index + 1 }}</h6>
                </div>
                <img
                  :src="rank.employee.image"
                  :alt="rank.employee.name"
                  width="50"
                  height="50"
                  class="rounded me-3"
                />
                <div class="d-flex flex-column">
                  <span class="text-bold text-light">
                    {{ rank.employee.name }}
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
          <h6 class="text-center">Bottom 5</h6>
          <div
            class="card my-1 mx-3 p-2 pink-background"
            v-for="(rank, index) in sales_rank_data_bottom"
            :key="index"
          >
            <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex align-items-center">
                <div class="me-3">
                  <h6 class="text-light">#{{ rank.index }}</h6>
                </div>
                <img
                  :src="rank.employee.image"
                  :alt="rank.employee.name"
                  width="50"
                  height="50"
                  class="rounded me-3"
                />
                <div class="d-flex flex-column">
                  <span class="text-bold text-light">
                    {{ rank.employee.name }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        class="carousel-control-prev w-5 me-3"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next w-5 me-3"
        type="button"
        data-bs-target="#carouselExampleCaptions"
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
      sales_rank_data: [],
      length: 0,
      last_updated: "",
    };
  },

  methods: {
    async getSalesProfitRank() {
      var url =
        "https://salesforce.klikpersada.co.id/ns/api/v1/kpi/profit/gooapps";
      var { data } = await axios.post(url);
      var list = data.result;
      const length = list.length;
      const bottom5 = length - 5;

      this.sales_rank_data = list.slice(0, 5);
      let sales_rank_data_bottom_not_ranked = list.slice(bottom5, length);
      let index_now = bottom5;
      let data_result = [];
      sales_rank_data_bottom_not_ranked.forEach((data) => {
        const index = {
          index: index_now + 1,
        };
        const data_item = { ...data, ...index };
        data_result.push(data_item);
        index_now = index_now + 1;
      });
      this.sales_rank_data_bottom = data_result;
    },

    recycleData() {
      this.last_updated = format(new Date(), "HH:mm:ss");
      // axios.get("https://devgoapi.yukevajkt.com/ping");
      this.getSalesProfitRank();
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
