import { Post } from "~/__generated__/graphql";
import { POST_TYPES, getPostType } from "./types/postTypes";
import DiscussionCard from "./Discussion/DiscussionCard";
import SmallPostCard from "./Custom/SmallPostCard";
import SingleEventCard from "./Event/SingleEventCard";
import SingleNewsCard from "./News/SingleNewsCard";

export function SinglePostFactory({
	post,
	view = undefined,
}: {
	post?: Post;
	view?: keyof typeof POST_TYPES;
}) {
	if (!post && !view)
		throw new Error("You have to either provide a post or a view");

	const postType = !view ? getPostType(post!) : view;

	switch (postType) {
		case "Discussion":
			return <DiscussionCard post={post} />;
		case "Event":
			return <SingleEventCard post={post} />;
		case "News":
			return <SingleNewsCard post={post} />;
		case "Small":
			return <SmallPostCard post={post} />;
		default:
			return <div>Undefined post type: {postType}</div>;
	}
}
