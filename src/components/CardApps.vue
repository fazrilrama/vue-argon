<template>
  <div class="mt-4 card move-on-hover">
    <div class="card-body">
      <div class="d-flex">
        <p class="my-auto">{{ apps }}</p>
        <!-- <div class="ms-auto">
          <div class="avatar-group">
            <a
              href="javascript:;"
              class="border-0 avatar avatar-sm rounded-circle"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              :title="apps"
            >
              <img alt="Image placeholder" src="@/assets/img/team-1.jpg" />
            </a>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "card-message",
  props: {
    apps: {
      type: String,
      default: "",
    },
  },
};
</script>
