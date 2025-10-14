import { Button } from "../ui/button";
import { LogIn, Settings, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import type { UserState } from "~/types/auth";
import { toast } from "sonner";

export default function LogoutDropdown({
  className,
}: React.ComponentProps<typeof Button>) {
  const signOut = useSignOut();
  const authUser = useAuthUser<UserState>();
  async function handleLogout() {
    signOut();
    console.debug("signed out");
    toast.success("Signed out");
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className={className}>
          <User />
          Profile
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>{authUser.username}</DropdownMenuLabel>
        <DropdownMenuItem disabled>
          <Settings />
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>
          <LogIn />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
