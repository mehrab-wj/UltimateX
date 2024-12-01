import { useQuery } from "@apollo/client/index";
import { GET_POSTS_QUERY } from "~/queries/posts";
import { PostFactory } from "./PostFactory";
import { Post } from "~/__generated__/graphql";

export default function AllPosts() {
    const { loading, error, data } = useQuery(GET_POSTS_QUERY, {
		variables: {
			limit: 10,
			// spaceIds: ["1Vtk2k8bMUMi"],
			postTypeIds: ["SKuOAjHb4twpdjd", "x8jlZUWAsvWkU6Q"],
			orderByString: "publishedAt",
			reverse: true,
			filterBy: [],
		},
	});

	if (loading) return <LoadingState />;
	if (error) return <p>GQL Error : {error.message}</p>;
	if (!data || data?.posts.totalCount === 0) return null;

	return (
		<div className="grid grid-cols-1 gap-4 mt-4">
			{data.posts.nodes?.map((post, i) => (
				<PostFactory key={i} post={post as Post} />
			))} 
		</div>
	);
}

function LoadingState() {
	return (
		<div className="grid grid-cols-1 gap-4">
			<PostFactory post={undefined} view="Discussion" />
			<PostFactory post={undefined} view="Discussion" />
			<PostFactory post={undefined} view="Discussion" />
			<PostFactory post={undefined} view="Discussion" />
		</div>
	);
}
