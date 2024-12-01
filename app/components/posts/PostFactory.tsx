import { Post } from "~/__generated__/graphql";
import DiscussionCard from "./Discussion/DiscussionCard";

const POST_TYPES = {
	Discussion: "x8jlZUWAsvWkU6Q",
};

function getPostType(post: Post): string | undefined {
	return Object.keys(POST_TYPES).find(
		(key) => POST_TYPES[key as keyof typeof POST_TYPES] === post.postTypeId
	);
}

export function PostFactory({
	post,
	view = undefined,
}: {
	post: Post | undefined;
	view?: keyof typeof POST_TYPES;
}) {
	if (!post && !view)
		throw new Error("You have to either provide a post or a view");

	const postType = !view ? getPostType(post!) : view;

	switch (postType) {
		case "Discussion":
			return <DiscussionCard post={post!} />;
		default:
			return <div>Undefined post type: {postType}</div>;
	}
}
