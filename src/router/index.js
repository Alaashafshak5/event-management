import Vue from "vue";
import VueRouter from "vue-router";
import EventCreate from "../views/EventCreate.vue";
import EventList from "../views/EventList.vue";
import EventShow from "../views/EventShow.vue";
import Nprogress from 'nprogress';
import store from '@/store';
import NotFound from '@/views/NotFound.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "event-list",
    component: EventList,
  },
  {
    path: "/event/:id",
    name: "event-show",
    component: EventShow,
    props: true,
    beforeEnter(routeTo, routeFrom, next){
      store.dispatch('event/fetchEvent', routeTo.params.id).then(() => {
        next()
      })
    }
  },
  {
    path: "/event/create",
    name: "event-create",
    component: EventCreate,
  },
  {
    path: "/404",
    name: "404",
    component: NotFound,
  },

  {
    path: "*",
    redirect: { name: '404' },
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

router.beforeEach((routeTo, routeFrom, next) => {
  Nprogress.start(),
  next()
});

router.afterEach(() => {
  Nprogress.done()
})