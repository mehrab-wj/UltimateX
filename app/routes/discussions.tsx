import type { Route } from "./+types/_index";
import { Input } from "~/components/ui/input";
import { Search } from "lucide-react";
import { GET_POSTS_QUERY } from "~/queries/posts";
import DiscussionCard from "~/components/native/posts/DiscussionCard";
import { Post } from "~/__generated__/graphql";
import { useQuery } from "@apollo/client/index";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "UltimateX - Discussions" },
		{
			name: "description",
			content: "UltimateX, even better than BetterX.",
		},
	];
}

export default function Discussions() {
	return (
		<>
			<div className="lg:flex lg:flex-wrap">
				<div className="lg:w-[70%] p-5">
					<div className="w-full relative">
						<Input
							placeholder="Search News"
							className="shadow-none rounded-full !text-[12px] pl-9"
							id="search"
						/>
						<label htmlFor="search">
							<Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-[15px] h-[15px]" />
						</label>
					</div>

					<section className="mt-5">
						<DiscussionsList />
					</section>
				</div>
			</div>
		</>
	);
}

function DiscussionsList() {
	const { loading, error, data } = useQuery(GET_POSTS_QUERY, {
		variables: {
			limit: 5,
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
			{data.posts.nodes?.map((post) => (
				<DiscussionCard post={post as Post} />
			))}
		</div>
	);
}

function LoadingState() {
	return <div>Loading...</div>;
}
