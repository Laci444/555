import { Card, CardHeader, CardContent, CardTitle } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { Badge } from "~/components/ui/badge";
import type { AuthorDetail } from "~/types/author";
import AuthorAvatar from "./authorAvatar";

export default function AuthorDetailCard({ author }: { author: AuthorDetail }) {
	return (
		<Card className="mx-auto max-w-lg">
			<CardHeader className="flex flex-col gap-4 items-center">
				<AuthorAvatar author={author} className="w-24 h-24" />
				<CardTitle className="text-2xl font-bold">{author.full_name}</CardTitle>
				<Badge variant="secondary">{author.email}</Badge>
			</CardHeader>

			<Separator className="my-4" />

			<CardContent>
				<p className="whitespace-pre-line text-muted-foreground">
					{author.bio}
				</p>
			</CardContent>
		</Card>
	);
}
