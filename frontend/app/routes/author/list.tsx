import { api } from "~/services/api";
import type { Route } from "./+types/list";
import AuthorCard from "~/components/author/authorCard";

export async function clientLoader() {
  return api.getAuthors();
}

export default function Authors({ loaderData }: Route.ComponentProps) {
  return (
    <div className="flex flex-col gap-5 content-center pt-10 align-middle">
      {loaderData.map((author) => (
        <AuthorCard key={author.username} author={author} />
      ))}
    </div>
  );
}
