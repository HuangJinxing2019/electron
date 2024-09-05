import { createRouter, createWebHashHistory } from 'vue-router'
import { routes } from "./route.js";

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})