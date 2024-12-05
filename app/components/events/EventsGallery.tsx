import { GET_POSTS_QUERY } from "~/api/queries/posts";
import { useQuery } from "@apollo/client/index";
import { Post, PostListFilterByOperator } from "~/api/__generated__/graphql";
import { PostFactory } from "../posts/PostFactory";

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
				<PostFactory key={post.id} post={post as Post} />
			))}
		</div>
	);
}

function LoadingState() {
	return (
		<div className="grid grid-cols-1 xl:grid-cols-2 gap-4 my-5">
			<PostFactory post={undefined} view="Event" />
			<PostFactory post={undefined} view="Event" />
		</div>
	);
}
