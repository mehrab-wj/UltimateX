import { Post } from "~/__generated__/graphql";

export const getPostUser = (post: Post) => {
	return post.owner?.member ?? null;
};

export const getPostUserImage = (post: Post) => {
	return post.owner?.member?.profilePicture?.__typename === "Image"
		? post.owner?.member?.profilePicture.url
		: null;
};

export const getThumbnail = (post: Post) => {
	const coverImage = post.fields?.find((field) => field.key === "coverImage");
	const media =
		coverImage?.relationEntities?.medias[0]?.__typename === "Image"
			? coverImage.relationEntities.medias[0].url
			: "";

	if (media) return media;

	return post.thumbnail?.__typename === "Image" ? post.thumbnail.url : null;
};

export const getPostLocation = (post: Post) => {
	const location = post.fields?.find((field) => field.key === "location");
	return location?.value?.replaceAll('"', "") ?? null;
};

export const getEventDate = (post: Post) => {
	const date = post.fields?.find((field) => field.key === "dateTime")?.value;

	if (!date) return null;

	return new Date(date.replaceAll('"', "")).toLocaleDateString("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric",
	});
};

export const getDiscussionContent = (post: Post) => {
	const content = post.fields?.find(
		(field) => field.key === "content"
	)?.value;

	return content?.replaceAll("\\", "").replaceAll('"', "") ?? null;
};

export const getPostDate = (post: Post) => {
	const date = post.publishedAt;

	if (!date) return null;

	return new Date(date.replaceAll('"', "")).toLocaleDateString("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric",
	});
};

export const getPostContent = (post: Post) => {
	return getDiscussionContent(post) ?? null;
};

export const getNewsReadingTime = (post: Post) => {
	const content = getPostContent(post);

	if (!content) return 0;

	return Math.ceil(content.length / 250);
};
