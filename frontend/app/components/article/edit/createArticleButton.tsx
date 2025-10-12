import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { Plus } from "lucide-react";
import { useIsAuthenticated } from "~/hooks/useIsAuthenticated";

export default function CreateArticleButton() {
  const isAuthenticated = useIsAuthenticated();
  return (
    isAuthenticated && (
      <Button className="w-fit" asChild>
        <Link to="new">
          <Plus />
          New article
        </Link>
      </Button>
    )
  );
}
