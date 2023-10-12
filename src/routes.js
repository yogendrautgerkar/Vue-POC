import { createWebHistory, createRouter } from "vue-router";
import CharacterPage from "./components/CharacterPage.vue";
import MainPage from "./components/MainPage.vue";

const routes = [
  {
    name: "Main Page",
    path: "/",
    component: MainPage,
  },
  {
    name: "Character",
    path: "/character/:charid",
    component: CharacterPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
