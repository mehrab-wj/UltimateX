import { useState } from "react";
import { Post } from "~/api/__generated__/graphql";
import {
	getPostContent,
	getPostDate,
	getPostUser,
	getPostUserImage,
} from "~/lib/post-helpers";
import ReactionFactory from "../Reactions/ReactionFactory";
import { ReplyForm } from "./ReplyForm";
import RepliesFactory from "./RepliesFactory";
import { Skeleton } from "../ui/skeleton";

interface ReplyCardProps {
	reply: Post;
	onFetchMore: () => void;
}

export function ReplyCard({ reply, onFetchMore }: ReplyCardProps) {
	const [replying, setReplying] = useState(false);

	const user = getPostUser(reply);
	const userImage = getPostUserImage(reply);
	const content = getPostContent(reply) ?? "";

	return (
		<div>
			<div className="flex gap-2 items-center">
				<img
					className="w-[45px] h-[45px] rounded-full"
					src={userImage ?? ""}
					alt={`${user?.name}'s profile`}
				/>
				<div className="flex flex-col">
					<span>{user?.name}</span>
					<small className="font-light">{getPostDate(reply)}</small>
				</div>
			</div>

			<div
				className="post-content space-y-3 mt-3"
				dangerouslySetInnerHTML={{ __html: content }}
			/>

			{replying ? (
				<div className="mt-3">
					<ReplyForm
						post={reply}
						onReplySubmitted={() => {
							onFetchMore();
							setReplying(false);
						}}
					/>
				</div>
			) : (
				<div className="flex flex-col justify-between mt-2">
					<div className="flex items-center gap-4">
						<ReactionFactory post={reply} />
						<button
							onClick={() => setReplying(true)}
							className="flex items-center gap-1"
						>
							Reply
						</button>
					</div>
				</div>
			)}

			{reply.repliesCount > 0 && (
				<div className="pl-6 pt-6">
					<RepliesFactory post={reply} showReplyForm={false} />
				</div>
			)}
		</div>
	);
}

export function RepliesSkeleton({ repliesCount }: { repliesCount: number }) {
	return (
		<div className="border border-gray-200 rounded-xl p-4">
			<div className="flex flex-col gap-6">
				{Array.from({ length: repliesCount }).map((_, index) => (
					<div key={index}>
						<div className="flex gap-2 mt-auto items-center">
							<Skeleton className="w-[45px] h-[45px] rounded-full" />
							<div className="flex flex-col gap-1">
								<Skeleton className="w-[100px] h-4" />
								<Skeleton className="w-[40px] h-3" />
							</div>
						</div>
						<div className="post-content space-y-3 mt-3">
							<Skeleton className="w-5/6 h-4" />
							<Skeleton className="w-2/3 h-4" />
							<Skeleton className="w-1/2 h-4" />
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
