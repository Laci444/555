import type { ArticleDetail } from "~/types/article";
import { Badge } from "~/components/ui/badge";

export default function ArticleDates({ article }: { article: ArticleDetail }) {
	const dateOptions: Intl.DateTimeFormatOptions = {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	};

	const createdAt = article.created_at.toLocaleDateString(
		undefined,
		dateOptions,
	);
	const updatedAt = article.updated_at.toLocaleDateString(
		undefined,
		dateOptions,
	);

	const isUpdated =
		article.created_at.getTime() !== article.updated_at.getTime();

	return (
		<div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
			<span>
				Published: <Badge variant="secondary">{createdAt}</Badge>
			</span>
			{isUpdated && (
				<span>
					Updated: <Badge variant="outline">{updatedAt}</Badge>
				</span>
			)}
		</div>
	);
}
