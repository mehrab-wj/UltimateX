import { Post } from "~/__generated__/graphql";
import { useRepliesQuery } from "./hooks/useRepliesQuery";
import { ReplyCard, RepliesSkeleton } from "./ReplyCard";
import { ReplyForm } from "./ReplyForm";

interface RepliesFactoryProps {
	post: Post;
	showReplyForm?: boolean;
}

export default function RepliesFactory({
	post,
	showReplyForm = true,
}: RepliesFactoryProps) {
	const { loading, error, replies, fetchMore } = useRepliesQuery(post);

	if (loading && replies.length === 0) {
		return <RepliesSkeleton repliesCount={post.repliesCount} />;
	}

	if (error) {
		return <div className="text-red-500">Error: {error.message}</div>;
	}

	return (
		<div>
			<div className="flex flex-col gap-10">
				{replies?.map((reply) => (
					<ReplyCard
						key={reply.id}
						reply={reply}
						onFetchMore={() => fetchMore({})}
					/>
				))}
			</div>

			{showReplyForm && (
				<div className="mt-6">
					<h3 className="font-semibold mb-3">What's your thought?</h3>
					<ReplyForm
						post={post}
						onReplySubmitted={() => fetchMore({})}
					/>
				</div>
			)}
		</div>
	);
}
