<template>
  <!-- container centered on page -->
  <q-page class="flex flex-center">
    <div class="flex-center" style="width: 80%">
      <!-- elements with padding -->
      <q-page class="q-pa-sm q-py-xl">
        <!-- input field for city name -->
        <q-input
          ref="cityInput"
          standout
          bottom-slots
          v-model="city"
          label="Enter the name of the city"
          @keyup.enter="getWeatherData"
          style="width: 80%"
          class="q-mx-auto"
        >
          <!-- button to clear input and data -->
          <template v-slot:prepend>
            <q-icon
              name="close"
              @click="clearField"
              class="cursor-pointer"
              title="Delete"
            />
          </template>
          <!-- search button -->
          <template v-slot:append>
            <div class="flex flex-center">
              <q-btn
                color="primary"
                icon="search"
                class="text-black"
                @click="getWeatherData"
                title="Search"
              /></div
          ></template>
        </q-input>

        <!-- display search results -->
        <div class="flex flex-center" style="width: 100%">
          <!-- change background based on weather -->
          <div
            v-if="weatherData"
            class="weather-container q-backg"
            :style="{ backgroundImage: getBackgroundImage() }"
          >
            <div class="weather-container">
              <!-- city name -->
              <div class="city">
                {{ weatherData.name }}, {{ weatherData.sys.country }}
              </div>
              <!-- city coordinates -->
              <div class="coords">
                <q-btn
                  icon="place"
                  size="sm"
                  :disable="true"
                  flat
                  dense
                  title="Latitude, longitude"
                ></q-btn>
                {{ weatherData.coord.lat }}, {{ weatherData.coord.lon }}
              </div>
              <!-- current temperature -->
              <div class="temperature">
                {{ Math.round(weatherData.main.temp) }}°C
              </div>

              <!-- weather description and feels-like temperature -->
              <div class="feels-like">
                Feels like: {{ Math.round(weatherData.main.feels_like) }}°C
              </div>
              <div class="description text-capitalize">
                {{ weatherData.weather[0].description }}
              </div>

              <!-- min and max temperature -->
              <div class="temperature-2">
                {{ Math.round(weatherData.main.temp_min) }}°C/{{
                  Math.round(weatherData.main.temp_max)
                }}°C
              </div>
            </div>

            <!-- pressure, humidity, and visibility -->
            <div v-if="weatherData" class="weather-container">
              <div class="pressure">
                <b>Pressure:</b> {{ weatherData.main.pressure }}hPa
              </div>
              <div class="humidity">
                <b>Humidity:</b> {{ weatherData.main.humidity }}%
              </div>
              <div class="visibility">
                <b>Visibility:</b> {{ weatherData.visibility }}m
              </div>

              <!-- wind speed -->
              <div class="wind">
                <q-btn
                  icon="speed"
                  size="sm"
                  :disable="true"
                  flat
                  dense
                  title="Wind speed"
                ></q-btn>
                {{ weatherData.wind.speed }}m/s
              </div>

              <!-- cloudiness -->
              <div class="cloudiness">
                <q-btn
                  icon="cloud"
                  size="sm"
                  :disable="true"
                  flat
                  dense
                  title="Cloudiness"
                ></q-btn>
                {{ weatherData.clouds.all }}%
              </div>
            </div>

            <!-- sunrise and sunset -->
            <div v-if="weatherData" class="weather-container">
              <div class="sun-info">
                <div>
                  <b>Sunrise:</b>
                  {{
                    new Date(
                      weatherData.sys.sunrise * 1000
                    ).toLocaleTimeString()
                  }}
                </div>
                <div>
                  <b>Sunset:</b>
                  {{
                    new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()
                  }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-page>
    </div>
    <!-- background image if no weather data -->
    <q-img v-if="!weatherData" src="weather.png" class="fixed-down q-image">
    </q-img>
    <!-- floating button to navigate pages -->
    <q-page-sticky position="bottom-right" :offset="[30, 30]">
      <q-fab
        color="primary"
        icon="keyboard_arrow_up"
        direction="up"
        text-color="black"
        title="More"
      >
        <!-- navigate to city name weather page -->
        <q-fab-action
          color="secondary"
          class="text-black"
          to="/"
          title="Search by city name"
          ><img src="city_ico.png" alt="City" style="width: 20px"
        /></q-fab-action>
        <!-- navigate to coordinates weather page -->
        <q-fab-action
          color="accent"
          class="text-black"
          to="/pagecoords"
          icon="place"
          title="Search by coordinates" /></q-fab
    ></q-page-sticky>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

// define IndexPage component
export default defineComponent({
  name: "IndexPage",
  data() {
    return {
      city: "",
      dense: true,
      weatherData: null,
    };
  },
  methods: {
    // fetch weather data
    async getWeatherData() {
      try {
        // API call
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=a508522611f3769a546ee178ff862ef8&units=metric`
        );
        const data = await response.json();
        // check if data exists before accessing it
        if (data && data.weather && data.weather.length > 0) {
          this.weatherData = data;
        } else {
          // log if weather data is missing
          console.error("Weather data is empty or undefined.");
        }
      } catch (error) {
        // log error fetching weather data
        console.error("Error fetching weather data:", error);
      }
    },
    // clear input field
    clearField() {
      this.city = null;
      this.$refs.cityInput.focus(); // set focus to input field
    },
    // set background image based on weather
    getBackgroundImage() {
      const weatherMain = this.weatherData.weather[0].main;
      switch (weatherMain) {
        case "Clear":
          return "url(clear.jpg)";
        case "Clouds":
          return "url(clouds.jpg)";
        case "Rain":
          return "url(rain.jpg)";
        case "Drizzle":
          return "url(drizzle.jpg)";
        case "Thunderstorm":
          return "url(thunder.jpg)";
        case "Snow":
          return "url(snow.jpg)";
        case "Mist":
          return "url(mist.jpg)";
        case "Fog":
          return "url(mist.jpg)";
        default:
          return "";
      }
    },
  },
});
</script>

<!-- setting element styles -->
<style lang="scss">
.q-image {
  width: 20%;
  height: auto;
  opacity: 60%;
  z-index: -1;
  position: absolute;
}

.q-field__control {
  color: $dark;
}

.weather-container {
  padding: 45px;
  border-radius: 10px;
  color: #000000;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  background-color: rgba(248, 225, 244, 0.6);
}

.city {
  font-size: 30px;
  font-weight: bold;
}

.description {
  margin-top: 10px;
  font-size: 18px;
  font-weight: bold;
}

.temperature {
  font-size: 36px;
}

.temperature-2 {
  margin-top: 10px;
  font-size: 18px;
}

.feels-like {
  font-size: 16px;
}

.weather-container,
.description-container {
  display: inline-block;
  vertical-align: top;
  margin-right: 20px;
  margin-left: 20px;
  margin-top: 3%;
}

.pressure,
.humidity,
.visibility,
.wind,
.cloudiness,
.sun-info {
  font-size: medium;
  margin-top: 5px;
  margin-bottom: 5px;
}

.q-backg {
  background-size: cover;
  background-color: $accent;
}
</style>
