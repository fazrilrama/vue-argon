<template>
  <div class="">
    <div class="pb-0 mb-0">
      <h6 class="text-center">{{ title }}</h6>
    </div>
    <div class="p-3">
      <div class="chart">
        <canvas id="chart-visit" class="chart-canvas" height="300"></canvas>
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
    var ctx1 = document.getElementById("chart-visit").getContext("2d");

    new Chart(ctx1, {
      type: "bar",
      data: {
        labels: this.VisitData.sales_name,
        datasets: [
          {
            label: ["Visit Data"],
            data: this.VisitData.visit,
            backgroundColor: ["rgb(245,66,80)"],
            hoverOffset: 4,
          },
        ],
      },

      options: {
        indexAxis: "x",
        responsive: true,
        barValueSpacing: 20,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        cutoutPercentage: 10,
      },
    });
  },

  computed: {
    ActivityData() {
      return this.$store.state.eraforce.statistic_activity;
    },

    VisitData() {
      let sales_name = [];
      let visit = [];
      this.ActivityData.forEach((data) => {
        sales_name.push(data.employee_name);
        visit.push(data.activity.visit_total);
      });
      const result = {
        sales_name,
        visit,
      };
      return result;
    },
  },
};
</script>
