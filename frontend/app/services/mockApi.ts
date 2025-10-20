import type {
  ArticleDetail,
  ArticleFormData,
  ArticleListItem,
} from "~/types/article";
import type { AuthorDetail, AuthorListItem } from "~/types/author";
import { authors } from "~/mocks/authorData";
import { articles } from "~/mocks/articleData";
import type { ApiService } from "~/types/services";

function mapArticles(articleDetails: ArticleDetail[]): ArticleListItem[] {
  return articleDetails.map((article) => ({
    id: article.id,
    url: new URL(`/articles/${article.id}`, window.location.origin),
    title: article.title,
    summary: article.summary,
    created_at: article.created_at,
    author: article.author,
  }));
}

function mapAuthors(authorDetails: AuthorDetail[]): AuthorListItem[] {
  return authorDetails.map((author) => ({
    username: author.username,
    url: new URL(`/authors/${author.username}`, window.location.origin),
    full_name: author.full_name,
    profile_image: author.profile_image,
  }));
}

export const mockApi: ApiService = {
  async getArticles(): Promise<ArticleListItem[]> {
    return mapArticles(articles).sort(
      (a, b) => b.created_at.getTime() - a.created_at.getTime(),
    );
  },

  async getArticleById(id: string): Promise<ArticleDetail> {
    return articles.find((article) => article.id === id)!;
  },

  async editArticle(
    id: string,
    data: ArticleFormData,
    authHeader?: string,
  ): Promise<void> {
    if (!authHeader) {
      throw new Error("Unauthenticated");
    }
    this.getArticleById(id).then((r) => {
      if (r === undefined) {
        return;
      }
      r.title = data.title;
      r.summary = data.summary;
      r.content = data.content;
      r.updated_at = new Date();
    });
  },

  async getAuthors(): Promise<AuthorListItem[]> {
    return mapAuthors(authors);
  },

  async getAuthorByName(username: string): Promise<AuthorDetail> {
    return authors.find((author) => author.username === username)!;
  },

  async createArticle(
    data: {
      title: string;
      summary: string;
      content: EditorJS.OutputData;
    },
    authHeader?: string,
  ): Promise<ArticleDetail> {
    if (!authHeader) {
      throw new Error("Unauthenticated");
    }
    const now = new Date();

    // random
    const author = authors[Math.floor(Math.random() * authors.length)];

    const newArticle: ArticleDetail = {
      id: crypto.randomUUID(),
      title: data.title,
      summary: data.summary,
      content: data.content,
      created_at: now,
      updated_at: now,
      author: {
        username: author.username,
        full_name: author.full_name,
        profile_image:
          author.profile_image instanceof URL
            ? author.profile_image
            : new URL(author.profile_image),
        url: new URL(`/authors/${author.username}`, window.location.origin),
      },
    };

    articles.push(newArticle);
    return newArticle;
  },
};
