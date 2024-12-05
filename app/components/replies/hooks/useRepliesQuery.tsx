import { useQuery } from "@apollo/client/index";
import { useState } from "react";
import { Post, PostListOrderByEnum } from "~/api/__generated__/graphql";
import { REPLIES_QUERY } from "~/api/queries/replies";

export function useRepliesQuery(post: Post) {
	const [replies, setReplies] = useState<Post[]>([]);

	const { loading, error, data, fetchMore } = useQuery(REPLIES_QUERY, {
		variables: {
			postId: post.id,
			limit: 10,
			orderBy: PostListOrderByEnum.PublishedAt,
			reverse: true,
		},
		onCompleted: (data) => {
			setReplies(data.replies.nodes as Post[]);
		},
		notifyOnNetworkStatusChange: true,
	});

	return {
		loading,
		error,
		data,
		replies,
		setReplies,
		fetchMore,
	};
}
