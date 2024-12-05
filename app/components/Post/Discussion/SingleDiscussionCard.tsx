import { Heart, MessageCircle, Send, Share } from "lucide-react";
import { Post } from "~/api/__generated__/graphql";
import { useToast } from "~/hooks/use-toast";
import {
	getPostUser,
	getPostUserImage,
	getPostDate,
	getDiscussionContent,
} from "~/lib/post-helpers";

import { Dialog, DialogTrigger } from "~/components/ui/dialog";
import ShareDialog from "~/components/Dialogs/ShareDialog";
import { Skeleton } from "~/components/ui/skeleton";
import RepliesFactory from "~/components/Replies/RepliesFactory";
import ReactionFactory from "~/components/Reactions/ReactionFactory";

export default function DiscussionCard({ post }: { post: Post | undefined }) {
	if (!post) return <DiscussionSkleton />;

	return <SingleDiscussionCardElement post={post} />;
}

export function SingleDiscussionCardElement({ post }: { post: Post }) {
	const { toast } = useToast();
	return (
		<>
			<div className="mb-5">
				<header className="flex gap-2 items-center">
					<img
						className="w-[45px] h-[45px] rounded-full"
						src={getPostUserImage(post) ?? ""}
						alt="profile"
					/>
					<div className="flex flex-col">
						<span className="">{getPostUser(post)?.name}</span>
						<small className="font-light">
							{getPostDate(post)}
						</small>
					</div>
				</header>

				<div className="mt-4">
					<h3 className="font-semibold">{post.title}</h3>

					<div
						className="post-content"
						dangerouslySetInnerHTML={{
							__html: getDiscussionContent(post) ?? "",
						}}
					/>
				</div>

				<footer className="flex items-center gap-2 mt-4">
					<ReactionFactory post={post} />

					<button className="flex items-center gap-1 text-sm">
						<MessageCircle className="w-4 h-4" />
						<span>{post.repliesCount}</span>
					</button>

					<Dialog>
						<DialogTrigger>
							<Send className="w-4 h-4" />
						</DialogTrigger>
						<ShareDialog url={post.url ?? ""} />
					</Dialog>
				</footer>
			</div>

			<div className="border-t border-zinc-200 pt-5">
				<RepliesFactory post={post} />
			</div>
		</>
	);
}

function DiscussionSkleton() {
	return (
		<div className="grid grid-cols-1 gap-4">
			<div className="p-4 border rounded-xl border-zinc-200">
				<header className="flex items-center gap-2">
					<Skeleton className="w-[40px] h-[40px] rounded-full" />
					<div className="flex flex-col gap-1">
						<Skeleton className="h-4 w-24" />
						<Skeleton className="h-3 w-10" />
					</div>
				</header>

				{/* Metadata skeleton (date, author, etc) */}
				<div className="block mt-4">
					<div className="space-y-2">
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-5/6" />
						<Skeleton className="h-4 w-4/6" />
					</div>
				</div>

				<footer className="flex items-center gap-2 mt-4">
					<Skeleton className="h-4 w-1/6" />
				</footer>
			</div>
		</div>
	);
}
