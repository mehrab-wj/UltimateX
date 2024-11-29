import type { Route } from "./+types/hot";
import { Button } from "~/components/ui/button";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Hot posts" },
		{ name: "description", content: "Hot posts" },
	];
}

export default function Hot() {
	return (
		<>
			<h1>Hot posts</h1>
			<Button variant="default">Hot</Button>
		</>
	);
}
