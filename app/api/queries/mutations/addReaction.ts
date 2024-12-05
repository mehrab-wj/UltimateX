import { gql } from "~/api/__generated__/gql";

export const ADD_REACTION_MUTATION = gql(/* GraphQL */ `
	mutation addReaction($input: AddReactionInput!, $postId: ID!) {
		addReaction(input: $input, postId: $postId) {
			status
		}
	}
`);

export const REMOVE_REACTION_MUTATION = gql(/* GraphQL */ `
	mutation removeReaction($reaction: String!, $postId: ID!) {
		removeReaction(reaction: $reaction, postId: $postId) {
			status
		}
	}
`);
