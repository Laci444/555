import Navigation from "~/components/nagivation";
import Logo from "./resources/logo.svg?react";
import { Link } from "react-router";
import { ThemeToggle } from "~/components/themeToggle";
import LoginPopover from "~/components/auth/loginPopover";
import LogoutDropdown from "~/components/auth/logoutDropdown";
import { useIsAuthenticated } from "~/hooks/useIsAuthenticated";

export default function Header() {
  const isAuthenticated = useIsAuthenticated();
  return (
    <header className="flex flex-col items-center align-middle">
      {isAuthenticated ? (
        <LogoutDropdown className="absolute top-5 left-10" />
      ) : (
        <LoginPopover className="absolute top-5 left-10" />
      )}
      <Link to="/">
        <Logo className="size-40 fill-foreground" />
      </Link>
      <Navigation />
      <ThemeToggle className="absolute top-5 right-5" />
    </header>
  );
}
