import { api } from "~/services/api";
import type { Route } from "./+types/detail";
import { ArticleDetailView } from "~/components/article/articleDetail";
import { Flipped } from "react-flip-toolkit";

export async function clientLoader({ params }: Route.LoaderArgs) {
  const result = await api.getArticleById(params.id);
  /*
  if (!result) {
    throw new Response("Article not found", {
      status: 404,
      statusText: "Not found",
    });
  }
  */
  return result!;
}

export default function Article({ loaderData }: Route.ComponentProps) {
  return (
    <Flipped flipId={loaderData.id}>
      <div className="p-5">
        <ArticleDetailView article={loaderData} />
      </div>
    </Flipped>
  );
}
