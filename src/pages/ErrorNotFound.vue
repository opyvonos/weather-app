<template>
  <!-- fullscreen 404 error page -->
  <div
    class="fullscreen bg-dark text-primary text-center q-pa-md flex flex-center"
  >
    <div>
      <!-- large 404 text -->
      <div style="font-size: 30vh">404</div>

	  <!-- error message -->
      <div class="text-h2" style="opacity: 0.4">Oops. Nothing here...</div>

	  <!-- button to navigate back home -->
      <q-btn
        class="q-mt-xl"
        color="primary"
        text-color="dark"
        unelevated
        to="/"
        label="Go Home"
        no-caps
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

// define 404 error component
export default defineComponent({
  name: "ErrorNotFound",
});
</script>
