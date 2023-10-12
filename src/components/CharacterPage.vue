<script>
import axios from "axios";
import { useRoute } from "vue-router";
export default {
  data: () => ({
    charDetails: [],
    charId: "",
  }),
  created() {
    let routeData = useRoute();
    let charId = routeData.params.charid;
    this.loadData(charId);
    this.charId = charId;
  },
  methods: {
    async loadData(charId) {
      const resp = await axios(
        `https://rickandmortyapi.com/api/character/${charId}`
      );
      const data = resp.data;
      this.charDetails = data;
    },
  },
};
</script>

<template>
  <div class="mainpage">
    <div class="char-details-holder">
      <div class="char-details">
        <article class="all-chars-heading">
          <strong>{{ this.charDetails.name }}</strong> 
        </article>
        <div class="details-withimage">
          <img
            class="details-avt-img"
            :src="this.charDetails.image"
            alt="character"
          />
          <article class="char-details-text">
            <article class="details-text-style">
              Id: {{ this.charDetails.id }}
            </article>
            <article class="details-text-style">
              Name: {{ this.charDetails.name }}
            </article>
            <article>
              Status: {{ this.charDetails.status }}
            </article>
            <article class="details-text-style">
              Species: {{ this.charDetails.species }}
            </article>
            <article class="details-text-style">
              Type: {{ this.charDetails.type }}
            </article>
            <article class="details-text-style">
              Gender: {{ this.charDetails.gender }}
            </article>
            <article class="details-text-style">
              Origin: <br />
              name: {{ this.charDetails.origin.name }}<br />
              Url: {{ this.charDetails.origin.url }}
            </article>
            <br />
            <article class="details-text-style">
             <strong>Location:</strong> {{ this.charDetails.location.name }}<br />
              <!-- Location Url: {{ this.charDetails.location.url }} } -->
            </article>
            <br />
            <!-- <article class="details-text-style">
              Url: {{ this.charDetails.url }}
            </article> -->
            <article class="details-text-style">
              <strong>Created:</strong> {{ this.charDetails.created }}
            </article>
          </article>
        </div>
        <router-link class="go-home-btn" to="/">Go Home</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.go-home-btn {
  font-size: 24px;
  margin: 20px;
  color: green;
}
.details-text-style {
  margin-bottom: 10px;
}
.details-withimage {
  display: flex;
  align-items: flex-start;
  padding: 40px;
  border: 2px solid green;
}
.details-avt-img {
  margin-right: 40px;
}
.char-details-text {
  font-size: 20px;
}
.all-chars-heading {
  font-size: 34px;
  text-align: center;
  margin-bottom: 40px;
}
.char-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px;
}
.char-details-holder {
  margin: auto;
}
.red{
  color: red;
}
</style>
