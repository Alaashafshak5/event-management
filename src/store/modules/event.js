import EventService from "@/services/EventService.js";

export const namespaced = true;

export const state = {
  events: [],
  eventsTotal: 0,
  event: {},
};

export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event);
  },
  SET_EVENTS(state, events) {
    state.events = events;
  },
  SET_EVENTS_TOTAL(state, eventsTotal) {
    state.eventsTotal = eventsTotal;
  },
  SET_EVENT(state, event) {
    state.event = event;
  },
};
export const actions = {
  createEvent({ commit, dispatch}, event) {
    return EventService.postEvent(event).then(() => {
      commit("ADD_EVENT", event)
      const notification = {
        type: 'success',
        mssg: 'Your event has been created',
    }
    dispatch('notification/add', notification, { root: true })
    });
  },
  fetchEvents({ commit, dispatch }, { perPage, page }) {
    return EventService.getEvents(perPage, page)
      .then((response) => {
        commit("SET_EVENTS_TOTAL", parseInt(response.headers["x-total-count"]));
        commit("SET_EVENTS", response.data); // For now, logs out the response
      })
      .catch((error) => {
        const notification = {
          type: "error",
          mssg: "There was a problem:" + error.mssg,
        };
        dispatch("notification/add", notification, { root: true });
      });
  },
  fetchEvent({ commit, dispatch }, id) {
    EventService.getEvent(id) // <--- Send the prop id to our EventService
      .then((response) => {
        commit("SET_EVENT", response.data);
      })
      .catch((error) => {
        const notification = {
          type: "error",
          mssg: "There was a problem:" + error.mssg,
        };
        dispatch("notification/add", notification, { root: true });
      });
  },
};

export const getters = {
  catLen: (state) => {
    return state.categories.length;
  },
};
