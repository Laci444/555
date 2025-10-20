import { api } from "~/services/api";
import type { Route } from "./+types/index";
import { Link } from "react-router";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import ArticleCard from "~/components/article/articleCard";

export async function clientLoader() {
  return api.getArticles().then((a) => {
    return a.slice(0, 6);
  });
}

export default function Index({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <section className="mx-auto mb-12 max-w-4xl text-center">
        <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl">
          Welcome to the 555 News
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Fresh news, deeper insights, and original opinions - clear and
          accessible.
        </p>
      </section>

      <section className="flex flex-col gap-5 content-between">
        <div className="flex justify-between w-full">
          <h2 className="text-2xl font-semibold">Latest Articles</h2>
          <Link
            to="/articles"
            className="text-sm hover:underline text-muted-foreground"
          >
            View all →
          </Link>
        </div>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="mx-auto w-full max-w-6xl"
        >
          <CarouselContent>
            {loaderData.map((article) => (
              <CarouselItem
                key={article.id}
                className="basis-full min-h-60 sm:basis-1/2 lg:basis-1/3"
              >
                <ArticleCard
                  article={article}
                  className="flex justify-center p-5 min-h-full"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </section>

      <section className="space-y-4 text-center">
        <blockquote className="relative p-6">
          <p className="text-2xl italic leading-relaxed text-muted-foreground">
            Journalism is the first rough draft of history.
          </p>
          <footer className="mt-4 text-sm text-foreground">
            — Philip L. Graham
          </footer>
        </blockquote>
      </section>
    </>
  );
}
