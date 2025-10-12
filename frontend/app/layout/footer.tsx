import Facebook from "./resources/facebook.svg?react";
import Twitter from "./resources/twitter.svg?react";
import Instagram from "./resources/instagram.svg?react";
import Github from "./resources/github.svg?react";

export default function Footer() {
	return (
		<footer className="flex flex-col gap-5 justify-between items-center py-6 text-sm border-t bg-muted/50 text-muted-foreground">
			{/* Social links */}
			<div className="flex gap-5 items-center">
				<a
					href="https://facebook.com"
					target="_blank"
					rel="noopener noreferrer"
					className="transition-colors hover:text-foreground"
				>
					<Facebook className="w-5 h-5 fill-current" />
				</a>
				<a
					href="https://twitter.com"
					target="_blank"
					rel="noopener noreferrer"
					className="transition-colors hover:text-foreground"
				>
					<Twitter className="w-5 h-5 fill-current" />
				</a>
				<a
					href="https://instagram.com"
					target="_blank"
					rel="noopener noreferrer"
					className="transition-colors hover:text-foreground"
				>
					<Instagram className="w-5 h-5 fill-current" />
				</a>
				<a
					href="https://github.com/laci444/555"
					target="_blank"
					rel="noopener noreferrer"
					className="transition-colors hover:text-foreground"
				>
					<Github className="w-5 h-5 fill-current" />
				</a>
			</div>

			{/* Copyright */}
			<p className="text-center md:text-left">
				© {new Date().getFullYear()} 555 News. All rights reserved.
			</p>
		</footer>
	);
}
