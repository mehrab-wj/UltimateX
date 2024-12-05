import { useQuery } from "@apollo/client/index";
import { GET_POSTS_QUERY } from "~/api/queries/posts";
import { PostFactory } from "~/components/Post/PostFactory";
import { Post, PostListOrderByEnum } from "~/api/__generated__/graphql";
import { Button } from "~/components/ui/button";

export default function AllPosts({
	orderBy = PostListOrderByEnum.PublishedAt,
	reverse = true,
	limit = 5,
}) {
	const { loading, error, data, fetchMore } = useQuery(GET_POSTS_QUERY, {
		variables: {
			postTypeIds: ["SKuOAjHb4twpdjd", "x8jlZUWAsvWkU6Q"],
			orderByString: orderBy,
			reverse: reverse,
			after: null,
			limit,
		},
		notifyOnNetworkStatusChange: true,
	});

	if ((loading && !data) || data?.posts.totalCount === 0)
		return <LoadingState />;

	if (error) return <p>GQL Error : {error.message}</p>;
	if (!data || data?.posts.totalCount === 0) return null;

	return (
		<div className="grid grid-cols-1 gap-5 mt-4">
			{data.posts.nodes?.map((post, i) => (
				<PostFactory key={i} post={post as Post} />
			))}

			{data.posts.pageInfo.hasNextPage && (
				<div className="flex items-center justify-center col-span-full">
					<Button
						variant="ghost"
						onClick={() => {
							fetchMore({
								variables: {
									after: data.posts.pageInfo.endCursor,
								},
							});
						}}
						disabled={loading}
					>
						{loading ? (
							<>
								Loading <span className="loading !w-3"></span>
							</>
						) : (
							"Load more"
						)}
					</Button>
				</div>
			)}
		</div>
	);
}

function LoadingState() {
	return (
		<div className="grid grid-cols-1 gap-5">
			<PostFactory post={undefined} view="Discussion" />
			<PostFactory post={undefined} view="Discussion" />
			<PostFactory post={undefined} view="Discussion" />
			<PostFactory post={undefined} view="Discussion" />
		</div>
	);
}
