import { Post } from "~/__generated__/graphql";
import { Skeleton } from "~/components/ui/skeleton";
import {
	getThumbnail,
	getNewsReadingTime,
	getPostDate,
	getPostContent,
} from "~/lib/post-helpers";
import { Calendar } from "lucide-react";
import RepliesFactory from "~/components/replies/RepliesFactory";

export default function SingleNewsCard({ post }: { post: Post | undefined }) {
	if (!post) return <NewsCardSkeleton />;

	const thumbnail = getThumbnail(post);

	let content = getPostContent(post) ?? "";

	// Remove the first image from content if thumbnail exists
	if (thumbnail) {
		const tempDiv = document.createElement("div");
		tempDiv.innerHTML = content;

		const firstImage = tempDiv.querySelector("img");
		if (firstImage) firstImage.remove();

		content = tempDiv.innerHTML;
	}

	return (
		<>
			<article className="relative rounded-xl group mb-5">
				{thumbnail && (
					<div className="overflow-hidden rounded-xl">
						<img
							src={thumbnail}
							alt="jungle"
							className="w-full object-cover transition-transform duration-300"
						/>
					</div>
				)}

				<div className="rounded-b-xl right-0 z-30 flex flex-col xl:flex-row gap-2 items-start justify-between mt-5">
					<div>
						<strong className="block text-xl">
							{post.title ?? ""}
						</strong>
						<small className="text-gray-600">
							{getNewsReadingTime(post)} minutes read
						</small>
					</div>
					<div className="flex flex-col gap-1">
						<div className="flex items-center gap-1 text-sm">
							<Calendar
								className={`${
									post.reactions?.[0]?.reacted
										? "text-primary fill-primary"
										: ""
								} w-4 h-4`}
							/>
							<span>{getPostDate(post)}</span>
						</div>
					</div>
				</div>

				<div
					dangerouslySetInnerHTML={{
						__html: content,
					}}
					className="post-content space-y-3 mt-5"
				/>
			</article>

			<div className="border-t border-zinc-200 pt-5">
				<RepliesFactory post={post} />
			</div>
		</>
	);
}

export function NewsCardSkeleton() {
	return <Skeleton className="w-full h-[300px]" />;
}
