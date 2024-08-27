<template>
  <!-- -------- START FOOTER 3 w/ COMPANY DESCRIPTION WITH LINKS & SOCIAL ICONS & COPYRIGHT ------- -->
  <footer class="py-5 footer">
    <div class="container">
      <div class="row">
        <div class="mx-auto mt-2 text-center col-8">
          <p class="mb-0 text-secondary">
            Copyright © {{ new Date().getFullYear() }} Developed with
            <i class="fa fa-heart"></i> by IT Team.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "app-footer",
};
</script>
