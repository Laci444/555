import { Link } from "react-router";
import { useIsAuthenticated } from "~/hooks/useIsAuthenticated";
import { Button } from "~/components/ui/button";
import { Edit } from "lucide-react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import type { UserState } from "~/types/auth";
import type { AuthorCommon } from "~/types/author";

export default function EditArticleButton({
  author,
}: {
  author: AuthorCommon;
}) {
  const isAuthenticated = useIsAuthenticated();
  return (
    isAuthenticated &&
    useAuthUser<UserState>().username === author.username && (
      <Button className="float-right" asChild>
        <Link to="edit">
          <Edit />
        </Link>
      </Button>
    )
  );
}
