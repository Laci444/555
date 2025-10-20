import type { ArticleDetail } from "~/types/article";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import AuthorCard from "~/components/author/authorCard";
import ArticleDates from "./articleDates";
import EditArticleButton from "./edit/editArticleButton";
import BlockParser from "editor-react-parser";

export function ArticleDetailView({ article }: { article: ArticleDetail }) {
  return (
    <Card className="mx-auto max-w-4xl">
      <CardHeader className="flex flex-col">
        <CardTitle className="w-full text-3xl font-bold">
          {article.title}
          <EditArticleButton author={article.author} />
        </CardTitle>
        <AuthorCard author={article.author} />
        <ArticleDates article={article} />
      </CardHeader>
      <Separator />
      <CardContent>
        <p className="mb-6 text-lg font-medium leading-relaxed text-muted-foreground">
          {article.summary}
        </p>
        <div className="max-w-none prose dark:prose-invert">
          <BlockParser data={article.content} />
        </div>
      </CardContent>
    </Card>
  );
}
