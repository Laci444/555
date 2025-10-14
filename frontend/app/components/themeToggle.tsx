import { Moon, Sun } from "lucide-react";

import { Button } from "~/components/ui/button";
import { useTheme } from "~/components/themeProvider";
import React from "react";
import { cn } from "~/lib/utils";

export function ThemeToggle({
	className,
}: React.ComponentProps<typeof Button>) {
	const { setTheme, theme } = useTheme();

	const toggleTheme = React.useCallback(() => {
		setTheme(theme === "dark" ? "light" : "dark");
	}, [theme, setTheme]);

	return (
		<Button
			size="sm"
			onClick={toggleTheme}
			className={cn("rounded-2xl", className)}
		>
			<Sun className="transition-all scale-100 rotate-0 translate-x-0 dark:scale-0 dark:-rotate-90 dark:translate-x-5 h-[1.2rem] w-[1.2rem]" />
			<Moon className="transition-all scale-0 rotate-90 -translate-x-5 dark:scale-100 dark:rotate-0 dark:translate-x-0 h-[1.2rem] w-[1.2rem]" />
			<span className="sr-only">Toggle theme</span>
		</Button>
	);
}
