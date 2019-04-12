import Vue from "vue";
const House = () => import("@/view/House.vue");
const About = () => import("@/view/About.vue");
const Baan = () => import("@/view/Baan.vue");
const Dorm = () => import("@/view/Dorm.vue");
const Creater = () => import("@/view/Creater.vue");
const Register = () => import("@/view/Register.vue");
const Announce = () => import("@/view/Announce.vue");
const Transfer = () => import("@/view/Transfer.vue");
const EditInfo = () => import("@/components/EditInfo.vue");

import Router from "vue-router";
Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/about"
    },
    {
      path: "/about",
      name: "About",
      component: About
    },
    {
      path: "/register",
      name: "Register",
      component: Register
    },
    {
      path: "/announce",
      name: "Announce",
      component: Announce
    },
    {
      path: "/baan",
      name: "Baan",
      component: Baan
    },
    {
      path: "/baan/:name",
      name: "House",
      component: House
    },
    {
      path: "/transfer",
      name: "Transfer",
      component: Transfer
    },
    {
      path: "/edit",
      name: "Edit",
      component: EditInfo
    },
    {
      path: "/dorm",
      name: "Dorm",
      component: Dorm
    },
    {
      path: "/creater",
      name: "Creater",
      component: Creater
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ x: 0, y: 0 });
      }, 500);
    });
  }
});
