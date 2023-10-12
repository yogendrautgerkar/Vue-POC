<script>
import axios from "axios";
export default {
  data: () => ({
    activeTab: "",
    activeTabName: "",
    charList: [],
    locationList: [],
    charsInLocationList: [],
  }),
  created() {
    this.loadData();
  },

  methods: {
    setActive(tab) {
      this.activeTab = tab;
    },
    filterWithLocation(tab, location) {
      let beforefilter = JSON.parse(JSON.stringify(this.charList));
      let filtered = beforefilter.filter(function (char) {
        return char.location.name == location && char.status != "unknown";
      });
      this.charsInLocationList = filtered;

      this.activeTab = tab;
      this.activeTabName = location;
    },
    isActive(tab) {
      return this.activeTab === tab;
    },
    async loadData() {
      // location data
      let page = 1;
      let locations = [];
      let lastLocation = [];
      do {
        const resp = await axios(
          `https://rickandmortyapi.com/api/location?page=${page}`
        );
        const data = resp.data;
        lastLocation = data;
        locations.push(...data.results);
        page++;
      } while (lastLocation.info.next !== null);
      // console.log(locations[0].id, locations[0].name);
      this.locationList = locations;
      //char data
      page = 1;
      let characters = [];
      let lastChar = [];
      do {
        const resp = await axios(
          `https://rickandmortyapi.com/api/character/?page=${page}`
        );
        const data = resp.data;
        lastChar = data;
        characters.push(...data.results);
        page++;
      } while (lastChar.info.next !== null);
      this.charList = characters;
    },
  },
};
</script>

<template>
  <div class="mainpage">
    <div class="tab-main-holder">
      <div class="tab-links-holder">
        <article class="tab-link" v-for="location in locationList" :key="location.id"
          @click="filterWithLocation(`tab-${location.id}`, location.name)"
          :class="{ active: isActive(`tab-${location.id}`) }">
          {{ location.name }}
        </article>
      </div>
      <div class="tab-content-holder">
        <div class="all-chars-holder">
          <article class="all-chars-heading">
            All Characters on {{ this.activeTabName }}
          </article>
          <div class="all-chars-list">
            <div class="locations-single" v-for="charInLocation in charsInLocationList" :key="charInLocation.id">
              <img class="char-image" :src="charInLocation.image" alt="character" />
              <article class="">
                Name : {{ charInLocation.name }}<br />
                Status : <span v-bind:class = "(charInLocation.status == 'Alive' )?'char-alive':'char-dead'">{{ charInLocation.status }}</span><br />
                <router-link :to="'character/' + charInLocation.id">Read More...</router-link>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.char-image {
  width: 100px;
  margin-right: 15px;
}

.all-chars-holder {
  padding: 40px;
  width: calc(100% - 80px);
}

.all-chars-heading {
  font-size: 34px;
  text-align: center;
  margin-bottom: 40px;
}

.all-chars-list {
  display: flex;
  flex-wrap: wrap;
  /* justify-content: center; */
}

.read-the-docs {
  color: #888;
}

.tab-links-holder {
  display: flex;
  flex-direction: column;
  width: 400px;
  max-height: 100vh;
  overflow: auto;
  border-right: 1px solid;
}

.tab-link {
  padding: 15px;
  font-size: 18px;
  cursor: pointer;
  border-bottom: 1px solid;
}

.tab-link.active {
  background: green;
  color: white;
}

.tab-content {
  padding: 20px;
  font-size: 20px;
}

.tab-content-holder {
  width: 100%;
  max-height: 100vh;
  overflow: auto;
}

.all-locations {
  display: flex;
  flex-wrap: wrap;
}

.locations-single {
  padding: 10px;
  border: 1px solid green;
  display: flex;
  margin: 10px;
  width: 300px;
}

.tab-main-holder {
  display: flex;
}
.char-dead{
  color: red;
  font-weight: bold;
}
.char-alive{
  color: green;
  font-weight: bold;
}
</style>
