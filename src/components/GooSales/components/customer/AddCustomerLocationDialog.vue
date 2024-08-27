<template>
  <el-dialog title="Please Pin Location" width="60%" :show-close="false">
    <div class="d-flex justify-content-center" v-if="is_map_loaded">
      <el-button type="primary" @click="openMap"> Load Location </el-button>
    </div>
    <div class="map-holder" v-else>
      <GMapAutocomplete
        placeholder="This is a placeholder"
        @place_changed="setPlace"
        style="z-index: 9999"
      >
      </GMapAutocomplete>
      <GMapMap
        :center="{ lat: 51.093048, lng: 6.84212 }"
        :zoom="7"
        map-type-id="terrain"
        style="width: 100%; height: 400px"
      >
      </GMapMap>
      <!-- <div id="map" style="width: 100%; height: 50vh"></div>
      <div class="coordinates-header">
        <h3>Current Coordinates</h3>
        <p>Location: {{ location }}</p>
        <p>Address: {{ address }}</p>
      </div> -->
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeMapDialog((is_cancel = true))"
          >Cancel</el-button
        >
        <el-button
          type="primary"
          @click="confirmPinLocation"
          :disabled="location == ''"
        >
          Add Location
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import Swal from "sweetalert2";

import { mapActions, mapMutations } from "vuex";

import axios from "axios";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

export default {
  name: "GoappsAdminAddCustomerLocationDialog",

  data() {
    return {
      center: { lat: 51.093048, lng: 6.84212 },
      location: "",
      address: "",
      // center: [106.8156433, -6.1640701], //longitude, latitude -> mapbox format
      map: {},
      city: "",
      access_token: this.$store.state.eraforce.token_maps_pk,
      mapstatus: "",
      is_map_loaded: true,
    };
  },

  components: {},

  mounted() {},

  methods: {
    ...mapMutations({
      OPEN_ADD_CLIENT_DIALOG: "eraforce/OPEN_ADD_CLIENT_DIALOG",
      CLOSE_ADD_CLIENT_LOCATION_DIALOG:
        "eraforce/CLOSE_ADD_CLIENT_LOCATION_DIALOG",
      SET_SELECTED_CLIENT_LOCATION: "eraforce/SET_SELECTED_CLIENT_LOCATION",
    }),

    getMapData(place) {
      this.maps.place = place;
      console.log(place);
    },
    triggerReady() {
      this.maps.fallbackProcedure = "manually";
      this.maps.ready = true;
    },

    getMapData(place) {
      console.log(`hi ${JSON.stringify(place)}`);
      this.maps.place = place;
    },

    openMap() {
      this.maps.fallbackProcedure = "manually";
      this.maps.ready = true;
      this.is_map_loaded = false;
      // this.initMap();
    },

    setMapLoaded() {},

    async initMap() {
      this.map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -6.1640701, lng: 106.8156433 },
        zoom: 8,
      });
    },

    async createMap() {
      try {
        console.log(`halo`);
        await this.setMapLoaded();
        await this.getLocation();
        mapboxgl.accessToken = await this.access_token;
        // console.log(`token ${this.$store.state.eraforce.token_maps}`);
        this.map = await new mapboxgl.Map({
          container: "map",
          style: "mapbox://styles/mapbox/streets-v11",
          center: this.center,
          zoom: 11,
        });

        let geocoder = new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          mapboxgl: mapboxgl,
          marker: false,
        });

        this.map.addControl(geocoder);

        let marker = new mapboxgl.Marker({
          draggable: true,
          color: "#D80739",
        })
          .setLngLat(this.center)
          .addTo(this.map);

        geocoder.on("result", (e) => {
          marker.remove();
          this.center = e.result.center;
          marker = new mapboxgl.Marker({
            draggable: true,
            color: "#D80739",
          })
            .setLngLat(this.center)
            .addTo(this.map);
          this.location = e.result.text;
          this.address = e.result.place_name;
          marker.on("dragend", (e) => {
            this.center = Object.values(e.target.getLngLat());
            this.getLocation();
          });
        });
      } catch (err) {
        console.log("map error", err);
      }
    },

    async getLocation() {
      try {
        this.loading = true;
        const response = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${this.center[0]},${this.center[1]}.json?access_token=${this.access_token}`
        );
        // console.log(`response api ${JSON.stringify(response)}`);
        this.loading = false;
        this.location = response.data.features[0].text;
        this.address = response.data.features[0].place_name;
        this.city = response.data.features[0].context[4].text ?? "Indonesia";
      } catch (err) {
        this.loading = false;
        console.log(err);
      }
    },

    confirmPinLocation() {
      const payload = {
        location: this.location,
        address: this.address,
        latitude: this.center[1],
        longitude: this.center[0],
        city: this.city,
      };
      this.SET_SELECTED_CLIENT_LOCATION(payload);
      this.CLOSE_ADD_CLIENT_LOCATION_DIALOG();
      this.OPEN_ADD_CLIENT_DIALOG();
    },

    closeMapDialog(is_cancel = false) {
      if (is_cancel == true) {
        this.SET_SELECTED_CLIENT_LOCATION(null);
      }
      this.CLOSE_ADD_CLIENT_LOCATION_DIALOG();
      this.OPEN_ADD_CLIENT_DIALOG();
    },
  },

  watch: {},
};
</script>
