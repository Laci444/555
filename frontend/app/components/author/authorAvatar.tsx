import type { AuthorCommon } from "~/types/author";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function AuthorAvatar({
  author,
  className,
}: React.ComponentProps<typeof Avatar> & { author: AuthorCommon }) {
  return (
    <Avatar className={className}>
      <AvatarImage
        className="object-cover"
        src={author.profile_image?.toString()}
        alt={author.full_name}
      />
      <AvatarFallback>
        {author.full_name
          .split(" ")
          .map((n) => n[0])
          .join("")}
      </AvatarFallback>
    </Avatar>
  );
}
