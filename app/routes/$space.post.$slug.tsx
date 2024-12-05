import { useParams } from "react-router";
import type { Route } from "./+types/$space.post.$slug";
import SidebarContent from "~/components/native/sidebar/SidebarContent";
import SearchArea from "~/components/native/SearchArea";
import { SinglePostFactory } from "~/components/posts/SinglePostFactory";
import { Post } from "~/api/__generated__/graphql";
import { SINGLE_POST_QUERY } from "~/api/queries/single-post";
import { useQuery } from "@apollo/client/index";

export function meta({ params }: Route.MetaArgs) {
	const title = params.slug?.split("-").slice(0, -1).join(" ");

	return [
		{ title: `UltimateX - ${title}` },
		{
			name: "description",
			content: "UltimateX, even better than BetterX.",
		},
	];
}

export default function SpacePostPage() {
	const { space, slug } = useParams();

	const postId = slug?.split("-").pop();

	if (!space || !slug || !postId) return <div>No space or slug</div>;

	return (
		<div className="lg:flex lg:flex-wrap">
			<div className="lg:w-[70%] p-5">
				<SearchArea />

				<section className="mt-5">
					<PostElement postId={postId} />
				</section>
			</div>
			<div className="w-[30%] lg:block hidden h-[100vh] sticky top-0 p-4 border-l border-zinc-200 overflow-x-hidden overflow-y-auto">
				<SidebarContent />
			</div>
		</div>
	);
}

function PostElement({ postId }: { postId: string }) {
	const { loading, error, data } = useQuery(SINGLE_POST_QUERY, {
		variables: { id: postId },
	});

	if (loading) return <SinglePostFactory view="News" />;
	if (error) return <div>Error: {error.message}</div>;

	return <SinglePostFactory post={data?.post as Post} />;
}
