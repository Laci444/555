import { mockAuth } from "./mockAuth";
import { backend } from "./axiosProvider";

import type { LoginCredentials } from "~/types/auth";
import type { AuthService } from "~/types/services";

const authImpl: AuthService = {
  async login(credentials: LoginCredentials) {
    return backend.post("/auth/token/", credentials).then((r) => r.data);
  },

  async refreshAccessToken(refreshToken: string) {
    return backend
      .post("/auth/token/refresh/", { refresh: refreshToken })
      .then((r) => r.data);
  },
};

export const auth: AuthService =
  import.meta.env.VITE_API_MODE === "mock" ? mockAuth : authImpl;
