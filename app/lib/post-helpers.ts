import { Post } from "~/__generated__/graphql";

export const getThumbnail = (post: Post) => {
	const coverImage = post.fields?.find((field) => field.key === "coverImage");
	return coverImage?.relationEntities?.medias[0]?.__typename === "Image"
		? coverImage.relationEntities.medias[0].url
		: "";
};

export const getPostLocation = (post: Post) => {
	const location = post.fields?.find((field) => field.key === "location");
	return location?.value?.replaceAll('"', "") ?? null;
};

export const getPostDate = (post: Post) => {
	const date = post.fields?.find((field) => field.key === "dateTime")?.value;

	if (!date) return null;

	return new Date(date.replaceAll('"', "")).toLocaleDateString("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric",
	});
};