import { api } from "~/services/api";
import type { Route } from "./+types/list";
import { useMemo, useState } from "react";
import Fuse from "fuse.js";
import { useDebounce } from "use-debounce";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "~/components/ui/input-group";
import { Search } from "lucide-react";
import Masonry from "react-masonry-css";
import { Flipped, Flipper } from "react-flip-toolkit";
import ArticleCard from "~/components/article/articleCard";
import CreateArticleButton from "~/components/article/edit/createArticleButton";

export async function clientLoader() {
  return api.getArticles();
}

export default function Articles({ loaderData }: {} & Route.ComponentProps) {
  const [query, setQuery] = useState("");
  const [debouncer] = useDebounce(query, 300);

  const fuse = useMemo(() => {
    return new Fuse(loaderData, {
      keys: ["title", "summary"],
      threshold: 0.3,
    });
  }, [loaderData]);

  const results = useMemo(() => {
    if (!debouncer) return loaderData;
    return fuse.search(debouncer).map((res) => res.item);
  }, [debouncer, fuse, loaderData]);

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <div className="flex flex-col gap-5 items-center pt-5">
      <CreateArticleButton />
      <InputGroup className="m-auto w-10/12 max-w-sm">
        <InputGroupInput
          placeholder="Search articles"
          name="Search"
          id="article-search"
          type="search"
          onChange={(event) => setQuery(event.target.value)}
        />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
      </InputGroup>
      <Flipper flipKey={results.map((a) => a.id).join("-")}>
        <Masonry
          breakpointCols={breakpoints}
          className="flex gap-x-5 justify-center px-5 divide-x -pr-5"
          columnClassName="masonry_column"
        >
          {results.map((article) => (
            <Flipped key={article.id} flipId={article.id}>
              <ArticleCard
                article={article}
                className="shadow-none not-last:pb-5 -border -rounded"
              />
            </Flipped>
          ))}
        </Masonry>
      </Flipper>
    </div>
  );
}
