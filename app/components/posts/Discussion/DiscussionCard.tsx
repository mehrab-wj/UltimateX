import { Heart, MessageCircle, Send, Share } from "lucide-react";
import { Post } from "~/__generated__/graphql";
import { useToast } from "~/hooks/use-toast";
import {
	getPostUser,
	getPostUserImage,
	getPostDate,
	getDiscussionContent,
} from "~/lib/post-helpers";

import { Dialog, DialogTrigger } from "~/components/ui/dialog";
import ShareDialog from "~/components/native/dialogs/share-dialog";
import { Skeleton } from "~/components/ui/skeleton";

export default function DiscussionCard({ post }: { post: Post | undefined }) {
	if (!post) return <DiscussionSkleton />;

	return <DiscussionCardElement post={post} />;
}

export function DiscussionCardElement({ post }: { post: Post }) {
	const { toast } = useToast();
	return (
		<div className="p-4 border rounded-xl border-zinc-200">
			<header className="flex items-center gap-2">
				<img
					src={
						getPostUserImage(post) ??
						"https://tribe-s3-production.imgix.net/Ng1kBNQZ6XqQvxMBVtgNO?fit=max&w=200&auto=compress,format"
					}
					alt="profile"
					className="w-[40px] h-[40px] rounded-full"
				/>
				<div className="flex flex-col">
					<strong className="text-sm font-semibold">
						{getPostUser(post)?.name}
					</strong>
					<small className="text-xs text-zinc-400">
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
				<button
					onClick={() => {
						toast({
							title: "Not allowed",
							description: "You have to be logged in to react",
							variant: "destructive",
						});
					}}
					className="flex items-center gap-1 text-sm"
				>
					<Heart
						className={`${
							post.reactions?.[0]?.reacted
								? "text-primary fill-primary"
								: ""
						} w-4 h-4`}
					/>
					<span>{post.reactionsCount}</span>
				</button>

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
	);
}

export function DiscussionSkleton() {
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
