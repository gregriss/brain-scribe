import axios from "axios";

export default {
  // Gets all books
  getIdeas: function () {
    return axios.get("/api/ideas");
  },
  // Gets the book with the given id
  getIdea: function (id) {
    return axios.get("/api/ideas/" + id);
  },
  // Deletes the book with the given id
  deleteIdea: function (id) {
    return axios.delete("/api/ideas/" + id);
  },
  // Saves a book to the database
  saveIdea: function (ideaData) {
    return axios.post("/api/ideas", ideaData);
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
  }
};
