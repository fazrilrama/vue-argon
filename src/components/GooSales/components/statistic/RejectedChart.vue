<template>
  <div class="card">
    <div class="pb-0 card-header mb-0">
      <h6 class="text-center">{{ title }}</h6>
    </div>
    <div class="p-3 card-body">
      <div class="chart">
        <canvas id="chart-rejected" class="chart-canvas" height="300"></canvas>
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
    var ctx1 = document.getElementById("chart-rejected").getContext("2d");

    new Chart(ctx1, {
      type: "bar",
      data: {
        labels: this.earningsRejectedData.sales_name,
        datasets: [
          {
            label: ["Sales Rejected Profit"],
            data: this.earningsRejectedData.sales_rejected_profit,
            backgroundColor: ["rgb(245,66,80)"],
            hoverOffset: 4,
          },
          {
            label: ["Sales Target"],
            data: this.earningsRejectedData.sales_target,
            backgroundColor: ["rgb(45,206,154)"],
            hoverOffset: 4,
          },
          {
            label: ["Manager Target"],
            data: this.earningsRejectedData.manager_targets,
            backgroundColor: ["rgb(26, 101, 232)"],
            // hoverOffset: 4,
          },
        ],
      },

      options: {
        indexAxis: "y",
        responsive: true,
        barValueSpacing: 20,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
          },
        },
        cutoutPercentage: 10,
      },
    });
  },

  computed: {
    earningsRejectedData() {
      return this.$store.state.eraforce.statistic_earnings_rejected;
    },
  },
};
</script>
