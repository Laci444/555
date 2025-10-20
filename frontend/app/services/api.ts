import type { ApiService } from "~/types/services";
import { mockApi } from "./mockApi";
import { backend } from "./axiosProvider";

const apiImpl: ApiService = {
  getArticles() {
    return backend.get("api/articles/").then((r) => r.data);
  },
  getArticleById(id) {
    return backend.get(`api/articles/${id}/`).then((r) => r.data);
  },
  getAuthors() {
    return backend.get("api/authors/").then((r) => r.data);
  },
  getAuthorByName(username) {
    return backend.get(`api/authors/${username}/`).then((r) => r.data);
  },
  editArticle(id, data, authHeader) {
    return backend
      .put(`api/articles/${id}/`, data, {
        headers: {
          Authorization: authHeader,
        },
      })
      .then((r) => r.data);
  },
  createArticle(data, authHeader) {
    return backend
      .post("api/articles/", data, {
        headers: {
          Authorization: authHeader,
        },
      })
      .then((r) => r.data);
  },
};

export const api: ApiService =
  import.meta.env.VITE_API_MODE === "mock" ? mockApi : apiImpl;
