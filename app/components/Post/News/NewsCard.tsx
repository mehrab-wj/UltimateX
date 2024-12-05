import { Post } from "~/api/__generated__/graphql";
import { Link } from "react-router";
import { Skeleton } from "~/components/ui/skeleton";
import { getThumbnail, getNewsReadingTime } from "~/lib/post-helpers";

import ReactionFactory from "~/components/Reactions/ReactionFactory";
import { MessageCircle } from "lucide-react";

export default function NewsCard({ post }: { post: Post | undefined }) {
	if (!post) return <NewsCardSkeleton />;

	const thumbnail = getThumbnail(post);

	return (
		<article className="relative rounded-xl group">
			{thumbnail ? (
				<div className="overflow-hidden rounded-xl">
					<img
						src={thumbnail}
						alt="jungle"
						className="w-full object-cover transition-transform duration-300"
					/>
				</div>
			) : (
				<div className="w-full h-[300px] bg-gradient-to-tr from-primary to-orange-400 rounded-xl" />
			)}

			<div className="bg-black/90 rounded-b-xl absolute bottom-0 left-0 right-0 z-10 p-4 flex items-center justify-between">
				<div>
					<strong className="block text-xl text-white">
						{post.title ?? ""}
					</strong>
					<small className="text-gray-300">
						{getNewsReadingTime(post)} minutes read
					</small>
				</div>

				<div className="text-white flex items-center gap-1">
					<MessageCircle className="w-4 h-4" />
					<span>{post.repliesCount}</span>
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
