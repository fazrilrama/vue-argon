<template>
  <div class="card">
    <div class="pb-0 card-header mb-0">
      <h6 class="text-center">{{ title }}</h6>
    </div>
    <div class="p-3 card-body">
      <div class="chart">
        <canvas id="chart-arrival" class="chart-canvas" height="300"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js/auto";

export default {
  name: "gradient-line-chart",

  props: {
    title: {
      type: String,
      default: "Sales overview",
    },
    detail1: {
      type: String,
      default: "4% more",
    },
    detail2: {
      type: String,
      default: "in 2021",
    },
  },

  mounted() {
    var ctx1 = document.getElementById("chart-arrival").getContext("2d");

    new Chart(ctx1, {
      type: "doughnut",
      data: {
        labels: this.arrivalData.name,
        datasets: [
          {
            label: ["Late"],
            data: this.arrivalData.total,
            backgroundColor: ["rgb(245,66,80)", "rgb(45,206,154)"],
            hoverOffset: 10,
          },
        ],
      },

      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
          },
        },
        borderWidth: 3,
        cutoutPercentage: 10,
      },
    });
  },

  computed: {
    arrivalData() {
      return this.$store.state.eraforce.statistic_arrival;
    },
  },
};
</script>
