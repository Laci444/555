import Masonry from "react-masonry-css";
import ArticleCard from "./articleCard";
import type { ArticleListItem } from "~/types/article";
import { Flipper, Flipped } from "react-flip-toolkit";

export default function ArticleList({
	articles,
}: {
	articles: ArticleListItem[];
}) {
	const breakpoints = {
		default: 3,
		1100: 2,
		700: 1,
	};

	return (
		// flipper provides animation
		<Flipper flipKey={articles.map((a) => a.id).join("-")}>
			<Masonry
				breakpointCols={breakpoints}
				className="flex gap-x-5 p-5 px-20 divide-x -pr-5"
				columnClassName="masonry_column"
			>
				{articles.map((article) => (
					<Flipped key={article.id} flipId={article.id}>
						<ArticleCard
							article={article}
							className="shadow-none not-last:pb-5 -border -rounded"
						/>
					</Flipped>
				))}
			</Masonry>
		</Flipper>
	);
}
