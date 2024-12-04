import { Heart } from "lucide-react";
import { Post } from "~/__generated__/graphql";
import { useReactionHook } from "./useReactionHook";

export default function ReactionFactory({ post }: { post: Post }) {
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
