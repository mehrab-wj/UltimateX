import { GET_TOP_MEMBERS_QUERY } from "~/api/queries/members";
import { useQuery } from "@apollo/client/index";
import { Skeleton } from "~/components/ui/skeleton";

export default function LatestUsers() {
	const { data, loading, error } = useQuery(GET_TOP_MEMBERS_QUERY, {
		variables: {
			limit: 5,
			orderBy: "createdAt",
			reverse: true,
		},
	});

	if (loading) return <LoadingState />;
	if (error) return <p>GQL Error : {error.message}</p>;
	if (!data || data?.members.totalCount === 0) return null;

	return (
		<div className="mt-4 pt-3">
			<h5 className="text-[16px] font-bold">Latest Users</h5>
			<div className="grid grid-cols-1 mt-2">
				{data.members.edges?.map(({ node: user }) => (
					<UserCard
						key={user.id}
						user={{
							id: user.id,
							imgSrc:
								user.profilePicture?.__typename === "Image"
									? user.profilePicture.url
									: "",
							name: user.displayName ?? user.name ?? "",
						}}
					/>
				))}
			</div>
		</div>
	);
}

const UserCard: React.FC<{
	user: {
		imgSrc: string;
		name: string;
		id: number | string;
	};
}> = ({ user }) => {
	return (
		<div className="flex justify-between items-center border-b border-gray-200 cursor-pointer py-4">
			<div className="flex gap-2 mt-auto items-center">
				<img
					className="w-[30px] h-[30px] rounded-full"
					src={user.imgSrc}
					alt="profile"
				/>
				<div className="inline-block text-[14px]">
					<span className="">{user.name}</span>
				</div>
			</div>
		</div>
	);
};

const LoadingState = () => (
	<div className="mt-4 border-t border-zinc-200 pt-3">
		<h5 className="text-[16px] font-bold">Latest Users</h5>
		{Array(3)
			.fill(null)
			.map((_, index) => (
				<div
					key={index}
					className="flex justify-between items-center border-b border-gray-200 cursor-pointer py-4"
				>
					<div className="flex gap-2 mt-auto items-center">
						<Skeleton className="w-[30px] h-[30px] rounded-full" />
						<div className="inline-block text-[14px]">
							<Skeleton className="w-[100px] h-[14px]" />
						</div>
					</div>
				</div>
			))}
	</div>
);
