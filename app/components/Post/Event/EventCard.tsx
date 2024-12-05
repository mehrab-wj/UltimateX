import { Link } from "react-router";
import { Post } from "~/api/__generated__/graphql";
import { Skeleton } from "~/components/ui/skeleton";
import {
	getPostLocation,
	getThumbnail,
	getEventDate,
	getPostUser,
	getPostUserImage,
} from "~/lib/post-helpers";

export default function EventCard({ post }: { post: Post | undefined }) {
	if (!post) return <EventCardSkeleton />;

	const location = getPostLocation(post);
	const user = getPostUser(post);
	const userImage = getPostUserImage(post);

	return (
		<article className="h-[300px] text-white relative rounded-xl overflow-hidden group">
			<img
				src={getThumbnail(post) ?? ""}
				alt="jungle"
				className="h-full w-full object-cover absolute inset-0 brightness-[0.4] group-hover:brightness-[0.2] transition-all duration-300"
			/>
			<div className="relative p-4 z-10 flex flex-col justify-between h-full">
				<span className="bg-white text-black px-2 py-1 rounded-full font-bold text-[11px] inline-block w-max">
					{getEventDate(post as Post) ?? "Upcoming event"}
				</span>
				<div className="flex gap-2 mt-auto">
					<img
						className="w-[20px] h-[20px] rounded-full"
						src={
							userImage ??
							"https://tribe-s3-production.imgix.net/l0FFP4bEc9Zeg0Rstw6iq?fit=max&w=1000&auto=compress,format"
						}
						alt="profile"
					/>
					<div className="inline-block text-[11px]">
						<span className="">{user?.name ?? ""}</span>
						{location && (
							<>
								<span className="inline-block mx-1 text-[14px] relative top-[-2px]">
									.
								</span>
								<span>{location}</span>
							</>
						)}
					</div>
				</div>
				<strong className="my-1 text-[14px] text-zinc-100">
					{post.title ?? ""}
				</strong>
				<p className="text-[11px] text-zinc-200">
					{post.description ?? ""}
				</p>
				<Link
					to={post.relativeUrl ?? ""}
					className="absolute inset-0 z-20"
				/>
			</div>
		</article>
	);
}

export function EventCardSkeleton() {
	return <Skeleton className="w-full h-[300px]" />;
}

