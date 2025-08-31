<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <!-- display weather icon in the header -->
        <q-btn flat dense round color="black" :disable="true">
          <img
            src="weather_ico.png"
            alt="Weather"
            title="Weather"
            style="width: 40px; margin-top: 10px; margin-bottom: 10px"
          />
        </q-btn>

        <!-- display current date and time in the header -->
        <div
          class="text-black text-h6 text-bold text-capitalize absolute-center"
          title="Today's date"
        >
          {{ currentDate }}, {{ currentTime }}
        </div>
      </q-toolbar>
    </q-header>

    <!-- display page content -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";

// define MainLayout component
export default defineComponent({
  name: "MainLayout",

  components: {},

  // setup component variables and functions
  setup() {
    const currentDate = ref(""); // current date
    const currentTime = ref(""); // current time
    // function to get date and time
    setInterval(() => {
      const now = new Date();
      // format the date
      currentDate.value = now.toLocaleDateString("en-US", { weekday: "long" });
      // format the time
      currentTime.value = now.toLocaleTimeString(undefined, {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    }, 1000); // function called every second
    return {
      currentDate,
      currentTime,
    };
  },
});
</script>
