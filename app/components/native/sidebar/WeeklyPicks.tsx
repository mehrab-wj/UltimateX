import { useQuery } from "@apollo/client/index";
import { GET_POSTS_QUERY } from "~/queries/posts";
import SmallPostCard from "../../posts/Custom/SmallPostCard";
import { Post, PostListFilterByOperator, PostListOrderByEnum } from "~/__generated__/graphql";
import { PostFactory } from "~/components/posts/PostFactory";

export default function WeeklyPicks() {
	const { loading, error, data } = useQuery(GET_POSTS_QUERY, {
		variables: {
			orderByString: PostListOrderByEnum.RepliesCount,
			reverse: true,
			limit: 3,
			filterBy: [
				{
					keyString: "publishedAt",
					operator: PostListFilterByOperator.Gte,
					value: "-604800",
				},
			],
		},
		notifyOnNetworkStatusChange: true,
	});

	if ((loading && !data) || data?.posts.totalCount === 0)
		return <LoadingState />;
	if (error) return <p>GQL Error : {error.message}</p>;
	if (!data || data?.posts.totalCount === 0) return null;

	return (
		<div>
			<h5 className="text-[16px] font-bold">This Week's Controversy</h5>

			<div className="grid grid-cols-1 mt-2">
				{data?.posts.nodes?.map((post) => (
					<PostFactory
						key={post.id}
						post={post as Post}
						view="Small"
					/>
				))}
			</div>
		</div>
	);
}

function LoadingState() {
	return <p>Loading...</p>;
}
