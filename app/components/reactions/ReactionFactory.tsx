import { Heart } from "lucide-react";
import { Post } from "~/api/__generated__/graphql";
import { useReactionHook } from "./useReactionHook";

export default function ReactionFactory({
	post,
	reactType = "heart",
}: {
	post: Post;
	reactType?: "heart" | "+1";
}) {
	const { reactions, reacted, like } = useReactionHook({ post });

	return (
		<button
			onClick={() => like()}
			className="flex items-center gap-1 text-sm"
		>
			<Heart
				className={`${
					reacted ? "text-primary fill-primary" : ""
				} w-4 h-4`}
			/>
			<span>{reactions}</span>
		</button>
	);
}
