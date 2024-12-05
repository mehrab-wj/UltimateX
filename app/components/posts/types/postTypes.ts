import { Post } from "~/api/__generated__/graphql";

export const POST_TYPES = {
    Discussion: "x8jlZUWAsvWkU6Q",
    Event: "935QwHTDP8wBVCn",
    News: "SKuOAjHb4twpdjd",
    Small: "small",
} as const;

export function getPostType(post: Post): string | undefined {
	return Object.keys(POST_TYPES).find(
		(key) => POST_TYPES[key as keyof typeof POST_TYPES] === post.postTypeId
	) ?? post.postTypeId;
}

// TypeScript type for post types
export type PostType = keyof typeof POST_TYPES;