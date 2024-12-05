import type { Route } from "./+types/discussion";
import { GET_POSTS_QUERY } from "~/api/queries/posts";
import { Post } from "~/api/__generated__/graphql";
import { useQuery } from "@apollo/client/index";
import { PostFactory } from "~/components/posts/PostFactory";
import SidebarContent from "~/components/native/sidebar/SidebarContent";
import SearchArea from "~/components/native/SearchArea";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "UltimateX - Discussions" },
		{
			name: "description",
			content: "UltimateX, even better than BetterX.",
		},
	];
}

export default function DiscussionsPage() {
	return (
		<>
			<div className="lg:flex lg:flex-wrap">
				<div className="lg:w-[70%] p-5">
					<SearchArea />

					<section className="mt-5">
						<DiscussionsList />
					</section>
				</div>
				<div className="w-[30%] lg:block hidden h-[100vh] sticky top-0 p-4 border-l border-zinc-200 overflow-x-hidden overflow-y-auto">
					<SidebarContent />
				</div>
			</div>
		</>
	);
}

function DiscussionsList({ limit = 5 }: { limit?: number }) {
	const { loading, error, data } = useQuery(GET_POSTS_QUERY, {
		variables: {
			limit,
			spaceIds: ["1Vtk2k8bMUMi"],
			postTypeIds: ["x8jlZUWAsvWkU6Q"],
			orderByString: "publishedAt",
			reverse: true,
			filterBy: [],
		},
	});

	if (loading) return <LoadingState />;
	if (error) return <p>GQL Error : {error.message}</p>;
	if (!data || data?.posts.totalCount === 0) return null;

	return (
		<div className="grid grid-cols-1 gap-4">
			{data.posts.nodes?.map((post, i) => (
				<PostFactory key={i} post={post as Post} />
			))}
		</div>
	);
}

function LoadingState() {
	return (
		<div className="grid grid-cols-1 gap-4">
			<PostFactory post={undefined} view="Discussion" />
			<PostFactory post={undefined} view="Discussion" />
			<PostFactory post={undefined} view="Discussion" />
			<PostFactory post={undefined} view="Discussion" />
		</div>
	);
}
