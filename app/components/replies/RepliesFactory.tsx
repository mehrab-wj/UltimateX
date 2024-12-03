import { Post, RepliesQuery } from "~/__generated__/graphql";
import { useRepliesQuery } from "./hooks/useRepliesQuery";
import { Skeleton } from "../ui/skeleton";
import { Heart } from "lucide-react";
import {
	getPostContent,
	getPostDate,
	getPostUser,
	getPostUserImage,
} from "~/lib/post-helpers";
import { Button } from "../ui/button";

export default function RepliesFactory({ post }: { post: Post }) {
	if (post.repliesCount === 0) return null;

	const { loading, error, replies, fetchMore } = useRepliesQuery(post);

	if (loading) return loadingSkeleton(post.repliesCount);
	if (error) return <div>Error: {error.message}</div>;

	return (
		<div className="border border-gray-200 rounded-xl p-4">
			<div className="flex flex-col gap-6">
				{replies?.nodes?.map((reply) => (
					<ReplyCard key={reply.id} reply={reply as Post} />
				))}
			</div>
		</div>
	);
}

export function ReplyCard({ reply }: { reply: Post }) {
	const user = getPostUser(reply);
	const userImage = getPostUserImage(reply);
	let content = getPostContent(reply) ?? "";

	return (
		<div className="">
			<div className="flex gap-2 mt-auto items-center">
				<img
					className="w-[45px] h-[45px] rounded-full"
					src={userImage ?? ""}
					alt="profile"
				/>
				<div className="flex flex-col">
					<span className="">{user?.name}</span>
					<small className="font-light">{getPostDate(reply)}</small>
				</div>
			</div>

			<div
				className="post-content space-y-3 mt-3"
				dangerouslySetInnerHTML={{ __html: content }}
			/>

			<div className="flex items-center gap-2 justify-between mt-2">
				<div className="flex items-center gap-2">
					<button className="flex items-center gap-1">
						<Heart className="w-4 h-4" />
						<span>{reply.reactionsCount}</span>
					</button>
				</div>
			</div>
		</div>
	);
}

function loadingSkeleton(repliesCount: number) {
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