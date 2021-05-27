import axios from "axios";

export default {
  // Gets all ideas
  getIdeas: function () {
    return axios.get("/api/ideas");
  },
  // Gets the idea with the given id
  getIdea: function (id) {
    return axios.get("/api/ideas/" + id);
  },
  // Deletes the idea with the given id
  deleteIdea: function (id) {
    return axios.delete("/api/ideas/" + id);
  },
  // Saves idea to the database
  saveIdea: function (ideaData) {
    return axios.post("/api/ideas", ideaData);
  },
  // add Update route to be able to update saved ideas...
  // this doesn't seem to work yet
  updateIdea: function (id) {
    return axios.put("api/ideas" + id);
  },
  testUserRouter: function () {
    return axios.get("/api/user/test");
  },
  login: function (userData) {
    return axios.post("/api/user/login", userData);
  },
  logout: function () {
    return axios.get("/api/user/logout");
  },
  signup: function (userData) {
    return axios.post("/api/user/signup", userData);
  },
  getUser: function () {
    return axios.get("/api/user/data");
  },
  saveAudio: function (filename) {
    return axios.get("/api/ideas/text", filename);
  }
};
