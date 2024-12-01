import SmallPostCard from "../cards/SmallPostCard";
import LatestUsers from "../users/latest-users";

export default function SidebarContent() {
	return (
		<>
			<div>
				<h5 className="text-[16px] font-bold">Curated Picks</h5>

				<div className="grid grid-cols-1 mt-2">
					<SmallPostCard
						user={{
							imgSrc: "/img/profile.png",
							name: "Mehrab H",
						}}
						title="The 10-year-old Medium story that turned into a book deal"
						category={{ title: "Fashion", url: "#" }}
						href="/"
						date="2024-01-01"
						readTime="15 min"
						save={true}
					/>
					<SmallPostCard
						user={{
							imgSrc: "/img/profile.png",
							name: "Mehrab H",
						}}
						title="The 10-year-old Medium story that turned into a book deal"
						category={{ title: "Fashion", url: "#" }}
						href="/"
						date="2024-01-01"
						readTime="15 min"
						save={false}
					/>
				</div>
			</div>

			<LatestUsers />
		</>
	);
}
