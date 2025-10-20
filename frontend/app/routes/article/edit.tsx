import { api } from "~/services/api";
import type { Route } from "./+types/edit";
import ArticleEdit from "~/components/article/edit/articleEdit";
import type { ArticleDetail } from "~/types/article";

export async function clientLoader({
  params,
}: Route.LoaderArgs): Promise<ArticleDetail> {
  const result = await api.getArticleById(params.id);
  return result!;
}

export default function EditArticle({ loaderData }: Route.ComponentProps) {
  return <ArticleEdit article={loaderData} />;
}
