<template>
  <div class="">
    <div class="pb-0 mb-0">
      <h6 class="text-center">{{ title }}</h6>
    </div>
    <div class="p-3">
      <div class="chart">
        <canvas id="chart-email" class="chart-canvas" height="300"></canvas>
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
    var ctx1 = document.getElementById("chart-email").getContext("2d");

    new Chart(ctx1, {
      type: "bar",
      data: {
        labels: this.EmailData.sales_name,
        datasets: [
          {
            label: ["Email Data"],
            data: this.EmailData.email,
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

    EmailData() {
      let sales_name = [];
      let email = [];
      this.ActivityData.forEach((data) => {
        sales_name.push(data.employee_name);
        email.push(data.activity.email_total);
      });
      const result = {
        sales_name,
        email,
      };
      return result;
    },
  },
};
</script>
