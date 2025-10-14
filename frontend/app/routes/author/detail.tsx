import { api } from "~/services/api";
import type { Route } from "./+types/detail";
import AuthorDetailCard from "~/components/author/authorDetail";
import { useRouteError } from "react-router";

export async function clientLoader({ params }: Route.LoaderArgs) {
	const response = await api.getAuthorById(params.id);
	response ?? useRouteError();
	return response!;
}

export default function Author({ loaderData }: Route.ComponentProps) {
	return (
		<div className="p-5">
			<AuthorDetailCard author={loaderData} />
		</div>
	);
}
