import { type createRefreshAttribute } from "react-auth-kit/refresh/createRefresh";
import { auth } from "~/services/auth";
import type { UserState } from "~/types/auth";

export const refresh: createRefreshAttribute<UserState> = {
  interval: 4 * 60 * 1000,
  refreshApiCallback: async (param) => {
    try {
      const response = await auth.refreshAccessToken(param.refreshToken ?? "");
      return {
        isSuccess: true,
        newAuthToken: response.access,
      };
    } catch (error) {
      return {
        isSuccess: false,
      };
    }
  },
};
