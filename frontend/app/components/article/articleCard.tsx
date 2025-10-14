import type { ArticleListItem } from "~/types/article";
import AuthorCard from "~/components/author/authorCard";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import { Link } from "react-router";
import { cn } from "~/lib/utils";

export default function ArticleCard({
	article,
	className,
	...other // needed in order to be used by flip-toolkit
}: { article: ArticleListItem } & React.ComponentProps<typeof Card>) {
	return (
		<Card
			{...other}
			className={cn("inline-flex gap-0 p-2 -bg-card", className)}
		>
			<Link to={`/articles/${article.id}`}>
				<CardHeader className="p-0 text-xl font-bold">
					<CardTitle>{article.title}</CardTitle>
				</CardHeader>

				<CardContent className="p-0">{article.summary}</CardContent>
			</Link>

			<CardFooter>
				<AuthorCard author={article.author} />
			</CardFooter>
		</Card>
	);
}
