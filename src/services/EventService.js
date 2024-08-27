import axios from "axios";

const apiClient = axios.create({
  baseURL: `http://localhost:3000`,
  withCredentials: false, // This is the default
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Api call method of a progress bar

// apiClient.interceptors.request.use((config) => {
//   Nprogress.start();
//   return config;
// });

// apiClient.interceptors.response.use((response) => {
//   Nprogress.done();
//   return response;
// });

export default {
  getEvents(perPage, page) {
    return apiClient.get("/events?_limit=" + perPage + "$_page=" + page);
  },
  getEvent(id) {
    return apiClient.get("/events/" + id);
  },
  postEvent(event) {
    return apiClient.post("/events", event);
  },
};

// apiClient
//   .get("https://api.coindesk.com/v1/bpi/currentprice.json")
//   .then((response) => (this.info = response.data.bpi))
//   .catch((error) => console.log(error));
