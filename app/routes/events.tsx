import type { Route } from "./+types/events";
import { GET_POSTS_QUERY } from "~/api/queries/posts";
import { Post } from "~/api/__generated__/graphql";
import { useQuery } from "@apollo/client/index";
import { PostFactory } from "~/components/Post/PostFactory";
import LatestUsers from "~/features/User/LatestUsers";
import WeeklyPicks from "~/features/Post/WeeklyPicks";
import SearchArea from "~/components/native/SearchArea";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "UltimateX - Events" },
		{
			name: "description",
			content: "UltimateX, even better than BetterX.",
		},
	];
}

export default function EventsPage() {
	return (
		<>
			<div className="lg:flex lg:flex-wrap">
				<div className="lg:w-[70%] p-5">
					<SearchArea />

					<section className="mt-5">
						<EventsList />
					</section>
				</div>
				<div className="w-[30%] lg:block hidden h-[100vh] sticky top-0 p-4 border-l border-zinc-200 overflow-x-hidden overflow-y-auto">
					<WeeklyPicks />
					<LatestUsers />
				</div>
			</div>
		</>
	);
}

function EventsList({ limit = 6 }: { limit?: number }) {
	const { loading, error, data } = useQuery(GET_POSTS_QUERY, {
		variables: {
			limit,
			spaceIds: ["fFJEmB9V0DCc"],
			postTypeIds: ["935QwHTDP8wBVCn"],
			orderByString: "publishedAt",
			reverse: true,
			filterBy: [],
		},
	});

	if (loading) return <LoadingState />;
	if (error) return <p>GQL Error : {error.message}</p>;
	if (!data || data?.posts.totalCount === 0) return null;

	return (
		<div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
			{data.posts.nodes?.map((post, i) => (
				<PostFactory key={i} post={post as Post} />
			))}
		</div>
	);
}

function LoadingState() {
	return (
		<div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
			<PostFactory view="Event" />
			<PostFactory view="Event" />
			<PostFactory view="Event" />
			<PostFactory view="Event" />
		</div>
	);
}
