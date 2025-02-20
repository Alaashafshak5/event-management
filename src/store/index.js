import Vue from "vue";
import Vuex from "vuex";
import * as event from "@/store/modules/event.js";
import * as user from "@/store/modules/user.js";
import * as notifications from "@/store/modules/notification.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules:{
    user,
    event,
    notifications
  },
  state: {
    categories: [
      "sustainability",
      "nature",
      "animal welfare",
      "housing",
      "education",
      "food",
      "community",
    ]
  }
})
