import type { URL } from "url";

export interface AuthorCommon {
  username: string;
  full_name: string;
  profile_image: URL;
}

export interface AuthorListItem extends AuthorCommon {
  url: URL;
}

export interface AuthorDetail extends AuthorCommon {
  email: string;
  bio: string;
}
