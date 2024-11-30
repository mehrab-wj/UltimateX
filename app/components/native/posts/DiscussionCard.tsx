import { Heart, MessageCircle, Send, Share } from "lucide-react";
import { Post } from "~/__generated__/graphql";
import { useToast } from "~/hooks/use-toast";
import {
	getPostUser,
	getPostUserImage,
	getPostDate,
	getDiscussionContent,
} from "~/lib/post-helpers";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "~/components/ui/dialog";

export default function DiscussionCard({ post }: { post: Post }) {
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
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Share post</DialogTitle>
							<DialogDescription>
								Share this post with your friends
							</DialogDescription>
						</DialogHeader>
					</DialogContent>
				</Dialog>
			</footer>
		</div>
	);
}
