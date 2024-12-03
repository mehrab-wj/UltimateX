import { useQuery } from "@apollo/client/index";
import { Post } from "~/__generated__/graphql";
import { REPLIES_QUERY } from "~/queries/replies";

export function useRepliesQuery(post: Post) {
	const { loading, error, data, fetchMore } = useQuery(REPLIES_QUERY, {
		variables: {
			postId: post.id,
			limit: 10,
		},
		notifyOnNetworkStatusChange: true,
	});

	return {
		loading,
		error,
		replies: data?.replies,
		fetchMore: () =>
			fetchMore({
				variables: {
					after: data?.replies.pageInfo.endCursor,
				},
			}),
	};
}
