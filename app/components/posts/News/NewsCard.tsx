import { Post } from "~/__generated__/graphql";
import { Link } from "react-router";
import { Skeleton } from "~/components/ui/skeleton";
import {
	getPostLocation,
	getThumbnail,
	getEventDate,
	getPostUser,
	getPostUserImage,
	getNewsReadingTime,
} from "~/lib/post-helpers";
import { Heart, MessageCircle, Send } from "lucide-react";
import { Dialog, DialogTrigger } from "~/components/ui/dialog";
import ShareDialog from "~/components/native/dialogs/share-dialog";
import { useToast } from "~/hooks/use-toast";

export default function NewsCard({ post }: { post: Post | undefined }) {
	if (!post) return <NewsCardSkeleton />;

	const { toast, dismiss } = useToast();

	const location = getPostLocation(post);
	const user = getPostUser(post);
	const userImage = getPostUserImage(post);
	const thumbnail = getThumbnail(post);

	return (
		<article className="relative rounded-xl group">
			{thumbnail && (
				<div className="overflow-hidden rounded-xl">
					<img
						src={thumbnail}
						alt="jungle"
						className="w-full object-cover transition-transform duration-300"
					/>
				</div>
			)}

			<div className="bg-black/90 rounded-b-xl absolute bottom-0 left-0 right-0 z-30 p-4 flex items-center justify-between">
				<Link to={post.relativeUrl ?? ""}>
					<strong className="block text-xl text-white">
						{post.title ?? ""}
					</strong>
					<small className="text-gray-300">
						{getNewsReadingTime(post)} minutes read
					</small>
				</Link>
				<div className="text-white flex items-center gap-2">
					<button
						onClick={() => {
							toast({
								title: "Not allowed",
								description:
									"You have to be logged in to react",
								variant: "destructive",
							});
							setTimeout(dismiss, 3000);
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
				</div>
			</div>

			<Link
				to={post.relativeUrl ?? ""}
				className="absolute inset-0 z-20"
			/>
		</article>
	);
}

export function NewsCardSkeleton() {
	return <Skeleton className="w-full h-[300px]" />;
}
