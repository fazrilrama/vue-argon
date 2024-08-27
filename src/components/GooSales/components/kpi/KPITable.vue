<template>
  <div class="card p-3 d-flex justify-content-center row">
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center justify-content-center mb-0">
          <thead>
            <tr>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7"
              >
                RANK
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7"
              >
                NAME
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7"
              >
                CALL
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7"
              >
                EMAIL
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7"
              >
                ONLINE MEETING
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7"
              >
                VISIT
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7"
              >
                PIPELINE
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7"
              >
                PROFIT TARGET
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7"
              >
                DIFFERENCE
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(base, index) in baseKpiData"
              :key="index"
              class="bg-grey"
            >
              <td class="text-center">
                <p class="text-xs font-weight-bold mb-0">0</p>
              </td>
              <td class="text-center">
                <p class="text-xs font-weight-bold mb-0">{{ base.name }}</p>
              </td>
              <td class="text-center">
                <span class="text-xs font-weight-bold">{{ base.call }}</span>
              </td>
              <td class="text-center">
                <span class="text-xs font-weight-bold">{{ base.email }}</span>
              </td>
              <td class="text-center">
                <span class="text-xs font-weight-bold">{{
                  base.online_meeting
                }}</span>
              </td>
              <td class="text-center">
                <span class="text-xs font-weight-bold">{{ base.visit }}</span>
              </td>
              <td class="text-center">
                <span class="text-xs font-weight-bold">{{
                  base.pipeline
                }}</span>
              </td>
              <td class="text-center">
                <span class="text-xs font-weight-bold">
                  IDR {{ numeralFormat(base.profit) }}
                </span>
              </td>
              <td class="text-center">
                <span class="text-xs font-weight-bold">{{
                  base.difference
                }}</span>
              </td>
            </tr>

            <tr
              v-for="(base, index) in employeeKPI"
              :key="index"
              :class="backgroundColor(base.flag)"
            >
              <td class="text-center">
                <p class="text-xs font-weight-bold mb-0 text-dark">
                  {{ index + 1 }}
                </p>
              </td>
              <td class="text-center">
                <p class="text-xs font-weight-bold mb-0 text-dark">
                  {{ base.name }}
                </p>
              </td>
              <td class="text-center">
                <span class="text-xs font-weight-bold text-dark">{{
                  base.call
                }}</span>
              </td>
              <td class="text-center">
                <span class="text-xs font-weight-bold text-dark">{{
                  base.email
                }}</span>
              </td>
              <td class="text-center">
                <span class="text-xs font-weight-bold text-dark">{{
                  base.online_meeting
                }}</span>
              </td>
              <td class="text-center">
                <span class="text-xs font-weight-bold text-dark">{{
                  base.visit
                }}</span>
              </td>
              <td class="text-center">
                <span class="text-xs font-weight-bold text-dark">{{
                  base.pipeline
                }}</span>
              </td>
              <td class="text-center">
                <span class="text-xs font-weight-bold text-dark">
                  IDR {{ numeralFormat(base.profit) }}
                </span>
              </td>
              <td class="text-center">
                <span class="text-xs font-weight-bold text-dark">{{
                  base.difference
                }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "projects-table",

  methods: {
    backgroundColor(status) {
      let color;
      if (status == "balance") {
        color = "bg-info";
      } else if (status == "under") {
        color = "bg-danger";
      } else if (status == "over") {
        color = "bg-success";
      } else {
        color = "bg-grey";
      }
      return color;
    },
  },

  computed: {
    kpiData() {
      return this.$store.state.eraforce.report_kpi;
    },

    baseKpiData() {
      return this.kpiData.slice(0, 2);
    },

    employeeKPI() {
      const length = this.kpiData.length + 1;
      return this.kpiData.slice(2, length);
    },
  },
};
</script>

<style scoped>
.bg-grey {
  background-color: #ededed;
}
</style>
