import type {
  ArticleDetail,
  ArticleFormData,
  ArticleListItem,
} from "./article";
import type { LoginCredentials } from "./auth";
import type { AuthorDetail, AuthorListItem } from "./author";

export interface ApiService {
  getArticles: () => Promise<ArticleListItem[]>;
  getArticleById: (id: string) => Promise<ArticleDetail>;
  getAuthors: () => Promise<AuthorListItem[]>;
  getAuthorByName: (username: string) => Promise<AuthorDetail>;
  editArticle: (
    id: string,
    data: ArticleFormData,
    authHeader?: string,
  ) => Promise<void>;
  createArticle: (
    data: ArticleFormData,
    authHeader?: string,
  ) => Promise<ArticleDetail>;
}

export interface AuthService {
  login: (
    credentials: LoginCredentials,
  ) => Promise<{ refresh: string; access: string }>;
  refreshAccessToken: (refreshToken: string) => Promise<{ access: string }>;
}
