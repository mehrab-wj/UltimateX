import { Link } from "react-router";
import { Post } from "~/__generated__/graphql";
import ShareDialog from "~/components/native/dialogs/share-dialog";
import { useReactionHook } from "~/components/reactions/useReactionHook";
import { Button } from "~/components/ui/button";
import { Dialog, DialogTrigger } from "~/components/ui/dialog";
import { Skeleton } from "~/components/ui/skeleton";
import {
	getPostLocation,
	getThumbnail,
	getEventDate,
	getPostUser,
	getPostUserImage,
	getPostContent,
	getPostLinkFromFields,
	getPostUrl,
} from "~/lib/post-helpers";

export default function SingleEventCard({ post }: { post: Post | undefined }) {
	if (!post) return <EventCardSkeleton />;

	const { reacted, like } = useReactionHook({ post });

	const location = getPostLocation(post);
	const user = getPostUser(post);
	const userImage = getPostUserImage(post);

	return (
		<article className="relative">
			<div className="relative">
				<img
					src={getThumbnail(post) ?? ""}
					alt={post.title ?? "UltimateX Event"}
					className="h-full w-full object-cover rounded-xl"
				/>

				<div className="absolute flex items-center gap-2 bottom-5 left-5">
					<img
						className="w-[50px] h-[50px] rounded-full"
						src={
							userImage ??
							"https://tribe-s3-production.imgix.net/l0FFP4bEc9Zeg0Rstw6iq?fit=max&w=1000&auto=compress,format"
						}
						alt="profile"
					/>
					<div className="flex flex-col text-white">
						<span className="font-bold">{user?.name ?? ""}</span>
						{location && (
							<>
								<span>{location}</span>
							</>
						)}
					</div>
				</div>
			</div>
			<div className="relative z-10 flex flex-col justify-between mt-5">
				<strong className="my-1 text-lg">{post.title ?? ""}</strong>

				<div
					className="space-y-3 post-content"
					dangerouslySetInnerHTML={{
						__html: getPostContent(post) ?? "",
					}}
				/>
			</div>

			<div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
				<div className="border p-4 rounded-lg">
					<a href={getPostLinkFromFields(post) ?? ""} target="_blank">
						<Button className="block w-full" variant="default">
							RSVP
						</Button>
					</a>

					<Dialog>
						<div className="flex items-center gap-2 mt-3">
							<Button
								onClick={() => like()}
								className="block w-full"
								variant="outline"
							>
								Like
							</Button>

							<DialogTrigger className="w-full">
								<Button className="w-full" variant="outline">
									Share
								</Button>
							</DialogTrigger>
							<ShareDialog url={getPostUrl(post)} />
						</div>
					</Dialog>
				</div>

				<div className="border p-4 rounded-lg">
					<div>
						Date & Time:
						<span>{getEventDate(post)}</span>
					</div>
					<div>Location: {location}</div>
					<div>
						Hosts:
						<div>
							<span>{user?.name}</span>
						</div>
					</div>
				</div>
			</div>
		</article>
	);
}

export function EventCardSkeleton() {
	return <Skeleton className="w-full h-[300px]" />;
}
