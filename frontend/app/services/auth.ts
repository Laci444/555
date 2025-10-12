import { mockAuth } from "./mockAuth";
import { backend } from "./axiosProvider";

import type { LoginCredentials } from "~/types/auth";

const authImpl = {
	async login(credentials: LoginCredentials) {
		backend.post("/auth/token/", credentials);
	},

	async refreshAccessToken(refreshToken: string) {
		backend.post("/auth/token/refresh/", refreshToken);
	},
};

//export const auth = authImpl;
export const auth = mockAuth;
