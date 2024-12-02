import { Post } from "~/__generated__/graphql";
import DiscussionCard from "./Discussion/DiscussionCard";
import EventCard from "./Event/EventCard";
import NewsCard from "./News/NewsCard";
import SmallPostCard from "./Custom/SmallPostCard";

const POST_TYPES = {
	Discussion: "x8jlZUWAsvWkU6Q",
	Event: "935QwHTDP8wBVCn",
	News: "SKuOAjHb4twpdjd",
	Small: "small",
};

function getPostType(post: Post): string | undefined {
	return Object.keys(POST_TYPES).find(
		(key) => POST_TYPES[key as keyof typeof POST_TYPES] === post.postTypeId
	) ?? post.postTypeId;
}

export function PostFactory({
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
			return <EventCard post={post} />;
		case "News":
			return <NewsCard post={post} />;
		case "Small":
			return <SmallPostCard post={post} />;
		default:
			return <div>Undefined post type: {postType}</div>;
	}
}
