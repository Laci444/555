import type { AuthorListItem } from "~/types/author";
import { Separator } from "~/components/ui/separator";
import { Card, CardFooter } from "~/components/ui/card";
import { Link } from "react-router";
import AuthorAvatar from "./authorAvatar";

export default function AuthorCard(props: { author: AuthorListItem }) {
  const { author } = props;

  return (
    <Link to={`/authors/${author.username}`} className="flex justify-center">
      <Card className="inline-flex p-1 px-2">
        <CardFooter className="space-x-2">
          <AuthorAvatar author={author} />
          <Separator orientation="vertical" className="my-auto size-6" />
          <div className="content-center h-full text-sm">
            {author.full_name}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
