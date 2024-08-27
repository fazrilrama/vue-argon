<template>
  <div class="mb-4 card">
    <div class="p-3 card-body">
      <div class="mb-3 containers-image-revenue">
        <img :src="image" alt="" class="card-img-revenue" />
      </div>
      <div class="d-flex">
        <div :class="contentClass">
          <div class="numbers">
            <p
              class="mb-0 text-sm text-uppercase font-weight-bold"
              :class="titleColor"
            >
              {{ title }}
            </p>
            <b class="font-weight-bolder" :class="valueColor">Revenue</b> <br />
            <span class="text-sm"> {{ value }} </span>
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
    image: {
      type: String,
    },
  },
};
</script>

<style scoped>
.card {
  width: 25vw;
}

.card-img-revenue {
  border-radius: 10px;
  display: block;
  width: 100%;
  background-size: cover;
  height: 150px;
  object-fit: cover;
}

.containers-image-revenue {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>
