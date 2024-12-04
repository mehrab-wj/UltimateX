import { Post } from "~/__generated__/graphql";
import { Link } from "react-router";
import { Skeleton } from "~/components/ui/skeleton";
import {
	getThumbnail,
	getPostUser,
	getPostUserImage,
	getPostDate,
} from "~/lib/post-helpers";
import { MessageCircle } from "lucide-react";
import { useToast } from "~/hooks/use-toast";

export default function SmallPostCard({ post }: { post?: Post }) {
	if (!post) return <LoadingSkeleton />;

	const { toast, dismiss } = useToast();

	const user = getPostUser(post);
	const userImage = getPostUserImage(post);
	const thumbnail = getThumbnail(post);

	return (
		<article className="text-black relative overflow-hidden border-b border-gray-200 py-4 ">
			<div className="flex gap-2 mt-auto items-center">
				<img
					className="w-[30px] h-[30px] rounded-full"
					src={userImage ?? ""}
					alt="profile"
				/>
				<div className="flex flex-col text-xs">
					<span className="">{user?.name}</span>
					<small className="font-light">{getPostDate(post)}</small>
				</div>
			</div>
			<div className="flex flex-wrap items-center flex-row-reverse ">
				{thumbnail && (
					<div className="w-[30%]">
						<img
							src={thumbnail}
							alt="thumbnail"
							className="w-full rounded-lg"
						/>
					</div>
				)}
				<div className="flex flex-col justify-between grow w-[70%] ">
					<strong className="my-1 text-[13px] text-zinc-800">
						{post.title}
					</strong>
					<p className="text-sm text-zinc-500">{post.description}</p>
				</div>
			</div>
			<div className="flex items-center gap-2 justify-between mt-2">
				<div className="flex items-center gap-2">
					<span className="flex items-center gap-1 text-[10px]">
						<MessageCircle className="w-4 h-4" />
						<span>{post.repliesCount}</span>
					</span>
				</div>
			</div>

			<Link
				to={post.relativeUrl ?? "/"}
				className="absolute inset-0 z-20"
			/>
		</article>
	);
}

function LoadingSkeleton() {
	return <Skeleton className="w-full h-[100px] rounded-lg" />;
}
