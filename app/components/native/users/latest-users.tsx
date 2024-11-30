import { GET_TOP_MEMBERS_QUERY } from "~/queries/members";
import { useQuery } from "@apollo/client/index";
import UserCard from "../cards/UserCard";

export default function LatestUsers() {
	const { data, loading, error } = useQuery(GET_TOP_MEMBERS_QUERY, {
		variables: {
			limit: 5,
			orderBy: "createdAt",
			reverse: true,
		},
	});

	if (error) return <p>GQL Error : {error.message}</p>;

	return (
		<div className="mt-4 border-t border-zinc-200 pt-3">
			<h5 className="text-[16px] font-bold">Latest Users</h5>

			{data && (
				<div className="grid grid-cols-1 mt-2">
					{data.members.edges?.map(({node: user}) => (
						<UserCard
							user={{
								id: user.id,
								imgSrc: user.profilePicture?.__typename === "Image" ? user.profilePicture.url : "",
								name: user.displayName ?? user.name ?? "",
							}}
						/>
					))}
				</div>
			)}
		</div>
	);
}
