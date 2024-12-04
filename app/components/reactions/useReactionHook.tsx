import { useState } from "react";
import { Post } from "~/__generated__/graphql";
import { useToast } from "~/hooks/use-toast";
import { useUserStore } from "~/storages/userStore";

export function useReactionHook({ post }: { post: Post }) {
	const [reacted, setReacted] = useState(
		(post.reactions!.filter((reaction) => reaction!.reacted)?.length ?? 0) >
			0
	);
	const { user } = useUserStore();
	const { toast } = useToast();

	return {
		like: () => {
			if (!user) {
				toast({
					title: "Not allowed",
					description: "You have to be logged in to react",
					variant: "destructive",
				});
			}

			setReacted(!reacted);
		},
		reactions: post.reactionsCount,
		reacted,
	};
}
