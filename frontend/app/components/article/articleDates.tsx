import type { ArticleDetail } from "~/types/article";
import { Badge } from "~/components/ui/badge";

export default function ArticleDates({ article }: { article: ArticleDetail }) {
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const createdAt = new Date(article.created_at);
  const updatedAt = new Date(article.updated_at);

  const isUpdated = createdAt.getTime() !== updatedAt.getTime();

  return (
    <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
      <span>
        Published:{" "}
        <Badge variant="secondary">
          {createdAt.toLocaleDateString(undefined, dateOptions)}
        </Badge>
      </span>
      {isUpdated && (
        <span>
          Updated:{" "}
          <Badge variant="outline">
            {updatedAt.toLocaleDateString(undefined, dateOptions)}
          </Badge>
        </span>
      )}
    </div>
  );
}
