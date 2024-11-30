import { GET_POSTS_QUERY } from "~/queries/posts";
import { useQuery } from "@apollo/client/index";
import EventCard from "../native/posts/EventCard";
import { Post, PostListFilterByOperator } from "~/__generated__/graphql";
import { Skeleton } from "../ui/skeleton";
import { getPostLocation, getThumbnail, getPostDate } from "~/lib/post-helpers";

export default function Events() {
	const { loading, error, data } = useQuery(GET_POSTS_QUERY, {
		variables: {
			limit: 2,
			spaceIds: ["fFJEmB9V0DCc"],
			postTypeIds: ["935QwHTDP8wBVCn"],
			orderByString: "publishedAt",
			reverse: true,
			filterBy: [
				{
					keyString: "fields.dateTime",
					operator: PostListFilterByOperator.Gte,
					value: "0",
				},
			],
		},
	});

	if (loading) return <LoadingState />;
	if (error) return <p>GQL Error : {error.message}</p>;
	if (!data || data?.posts.totalCount === 0) return null;

	return (
		<div className="grid grid-cols-1 xl:grid-cols-2 gap-4 my-5">
			{data.posts.nodes?.map((post) => (
				<EventCard
					thumbnail={getThumbnail(post as Post)}
					user={{
						imgSrc:
							post.owner?.member?.profilePicture?.__typename ==
							"Image"
								? post.owner.member.profilePicture.url
								: "",
						name:
							post.owner?.member?.displayName ??
							post.owner?.member?.name ??
							"",
					}}
					trending={getPostDate(post as Post) ?? "Upcoming event"}
					title={post.title!}
					description={post.description ?? ""}
					location={getPostLocation(post as Post)}
					href="/"
				/>
			))}
		</div>
	);
}

function LoadingState() {
	return (
		<div className="grid grid-cols-1 xl:grid-cols-2 gap-4 my-5">
			<Skeleton className="w-full h-[200px]" />
			<Skeleton className="w-full h-[200px]" />
		</div>
	);
}
