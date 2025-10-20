import type { URL } from "url";
import type { AuthorListItem } from "./author";

interface ArticleCommon {
  id: string;
  title: string;
  summary: string;
  author: AuthorListItem;
  created_at: Date;
}

export interface ArticleListItem extends ArticleCommon {
  url: URL;
}

export interface ArticleDetail extends ArticleCommon {
  content: EditorJS.OutputData;
  updated_at: Date;
}

export interface ArticleFormData {
  title: string;
  summary: string;
  content: EditorJS.OutputData;
}
