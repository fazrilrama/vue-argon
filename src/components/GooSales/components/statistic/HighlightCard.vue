<template>
  <div class="mb-4 card">
    <div class="p-3 card-body">
      <div class="d-flex" :class="directionReverse ? reverseDirection : ''">
        <div>
          <div
            class="text-center icon icon-shape"
            :class="`${background} ${'border-radius-2xl'}`"
          >
            <i class="text-lg opacity-10" :class="icon" aria-hidden="true"></i>
          </div>
        </div>
        <div :class="contentClass">
          <div class="numbers">
            <p
              class="mb-0 text-sm text-uppercase font-weight-bold"
              :class="titleColor"
            >
              {{ title }}
            </p>
            <h5
              class="font-weight-bolder"
              :class="valueColor"
              v-if="
                title.toString().toLowerCase() == 'revenue' ||
                title.toString().toLowerCase() == 'profit'
              "
            >
              IDR {{ numeralFormat(value) }}
            </h5>
            <h5 class="font-weight-bolder" :class="valueColor" v-else>
              {{ value }}
            </h5>
            <span class="text-sm" :class="percentColor">{{ percentage }}</span>
            <br />
            <span
              class="text-sm"
              v-if="
                title.toString().toLowerCase() == 'revenue' ||
                title.toString().toLowerCase() == 'profit'
              "
            >
              Previous {{ title.toString().toLowerCase() }} <br />
              <b> IDR {{ numeralFormat(detail) }} </b>
            </span>
            <span class="text-sm" v-else>
              Previous {{ title.toString().toLowerCase() }} <br />
              <b>
                {{ detail }}
              </b>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "card",
  data() {
    return {
      reverseDirection: "flex-row-reverse justify-content-between",
    };
  },
  props: {
    directionReverse: Boolean,
    title: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    detail: {
      type: String,
      required: true,
    },
    titleColor: {
      type: String,
    },
    value: {
      required: true,
    },
    valueColor: {
      type: String,
    },
    percentage: String,
    iconClass: {
      type: String,
      required: true,
    },
    percentageColor: {
      type: String,
      default: "text-success",
    },
    iconBackground: {
      type: String,
      default: "bg-white",
    },
    contentClass: {
      type: String,
    },
  },

  computed: {
    icon() {
      if (this.status == "up") {
        return "fas fa-level-up-alt";
      } else if (this.status == "down") {
        return "fas fa-level-down-alt";
      } else {
        return "far fa-window-minimize";
      }
    },
    background() {
      if (this.status == "up") {
        return "bg-gradient-success";
      } else if (this.status == "down") {
        return "bg-gradient-danger";
      } else {
        return "bg-gradient-info";
      }
    },
    percentColor() {
      if (this.status == "up") {
        return "text-success";
      } else if (this.status == "down") {
        return "text-danger";
      } else {
        return "text-info";
      }
    },
  },
};
</script>

<style scoped>
.card {
  width: 28vw;
}
</style>
