import { useState } from "react";
import { Post } from "~/api/__generated__/graphql";
import { useToast } from "~/hooks/use-toast";
import { useUserStore } from "~/storages/userStore";
import { useMutation } from "@apollo/client/index";
import {
	ADD_REACTION_MUTATION,
	REMOVE_REACTION_MUTATION,
} from "~/api/queries/mutations/addReaction";

export function useReactionHook({ post }: { post: Post }) {
	const [reactionData, setReactionData] = useState({
		reactions: post.reactionsCount,
		reacted:
			(post.reactions!.filter((reaction) => reaction!.reacted)?.length ??
				0) > 0,
	});

	const { user } = useUserStore();
	const { toast } = useToast();

	const [addReaction] = useMutation(ADD_REACTION_MUTATION, {
		variables: {
			postId: post.id,
			input: {
				reaction: "heart",
				overrideSingleChoiceReactions: true,
			},
		},
		onError: (error) => {
			toast({
				description: error.message,
				variant: "destructive",
			});

			setReactionData({
				reactions: reactionData.reactions - 1,
				reacted: false,
			});
		},
	});

	const [removeReaction] = useMutation(REMOVE_REACTION_MUTATION, {
		variables: {
			postId: post.id,
			reaction: "heart",
		},
		onError: (error) => {
			toast({
				title: "Login failed",
				description: error.message,
				variant: "destructive",
			});
		},
	});

	return {
		like: () => {
			if (!user) {
				toast({
					title: "Not allowed",
					description: "You have to be logged in to react",
					variant: "destructive",
				});
				return;
			}

			if (reactionData.reacted) {
				removeReaction();
			} else {
				addReaction();
			}

			setReactionData({
				reactions:
					reactionData.reactions + (reactionData.reacted ? -1 : 1),
				reacted: !reactionData.reacted,
			});
		},
		...reactionData,
	};
}
