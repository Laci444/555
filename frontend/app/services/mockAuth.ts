import type { LoginCredentials } from "~/types/auth";
import type { AuthService } from "~/types/services";

export const mockAuth: AuthService = {
  async login(_credentials: LoginCredentials) {
    return {
      refresh:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzY5ODU1ODkzLCJpYXQiOjE3NTk4NTQ1OTMsImp0aSI6ImZkMmViMGFjYmM3NTRiMDdhMDNiMTQxNTc3YTUxMDA4IiwidXNlcl9pZCI6IjEifQ.pmRBDi21Pwle25n8BMnEMp0mZE7Imnlf8c9OPaGqlc8",
      access:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzYxMjE4MTY1LCJpYXQiOjE3NjAyMTc4NjUsImp0aSI6IjI5NWE0ZjI3MGVkMzRjMWM5ZjVhM2FmNmU5NTZlNzgzIiwic3ViIjoiMSIsInVzZXJuYW1lIjoiam9lc21pdGgifQ.bR_2ZqlooptAvV84q3XKUNCIGMCDtV7GbqCWIak2-BQ",
    };
  },
  async refreshAccessToken(_refressToken: string) {
    return {
      access:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzYxMjE4MTY1LCJpYXQiOjE3NjAyMTc4NjUsImp0aSI6IjI5NWE0ZjI3MGVkMzRjMWM5ZjVhM2FmNmU5NTZlNzgzIiwic3ViIjoiMSIsInVzZXJuYW1lIjoiam9lc21pdGgifQ.bR_2ZqlooptAvV84q3XKUNCIGMCDtV7GbqCWIak2-BQ",
    };
  },
};
