<template>
  <div class="row">
    <div class="card">
      <div class="card-header">
        <div
          class="d-flex justify-content-between align-items-center align-content-center"
        >
          <div>
            <h6 :class="textCenter == true ? 'text-center' : ''">
              {{ title }}
            </h6>
          </div>
          <div>
            <slot name="header"> </slot>
          </div>
        </div>
      </div>
      <div class="card-body px-0 pt-0 pb-2">
        <slot name="body"> </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "base-card-components",
  props: {
    title: {
      type: String,
      default: "",
    },
    textCenter: {
      type: Boolean,
      default: false,
    },
    computed: {},
  },
};
</script>
