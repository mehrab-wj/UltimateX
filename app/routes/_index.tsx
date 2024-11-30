import type { Route } from "./+types/_index";
import TabsSection from "~/components/native/sections/TabsSection";
import TrendPostCard from "~/components/native/cards/TrendPostCard";
import PostCard from "~/components/native/cards/PostCard";
import { Input } from "~/components/ui/input";
import { Search } from "lucide-react";
import SmallPostCard from "~/components/native/cards/SmallPostCard";
import { Link, useOutletContext } from "react-router";
import UserCard from "~/components/native/cards/UserCard";
import { TabsContent } from "~/components/ui/tabs";
import { gql, useQuery } from "@apollo/client/index";
import { GET_POSTS_QUERY } from "~/queries/posts";
import { Loading } from "~/components/native/loading";
import { GET_TOP_MEMBERS_QUERY } from "~/queries/members";
import LatestUsers from "~/components/native/users/latest-users";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "UltimateX - Home" },
		{
			name: "description",
			content: "UltimateX, even better than BetterX.",
		},
	];
}

export default function Home() {
	// const context = useOutletContext();

	// const { loading, error, data } = useQuery(GET_POSTS_QUERY, {
	// 	variables: {
	// 		limit: 10,
	// 		orderByString: "reactionsCount",
	// 		reverse: true,
	// 		filterBy: [],
	// 	},
	// });

	// if (loading) return <Loading />;
	// if (error) return <p>GQL Error : {error.message}</p>;

	return (
		<>
			<div className="lg:flex lg:flex-wrap">
				<div className="lg:w-[70%] p-5">
					<div className="w-full relative">
						<Input
							placeholder="Search News"
							className="shadow-none rounded-full !text-[12px] pl-9"
							id="search"
						/>
						<label htmlFor="search">
							<Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-[15px] h-[15px]" />
						</label>
					</div>
					<TabsSection
						defaultValue="for-you"
						tabsList={[
							{
								title: "For You",
								value: "for-you",
							},
							{
								title: "Trending",
								value: "trending",
							},
							{
								title: "Following",
								value: "following",
							},
						]}
					>
						<TabsContent value="for-you">
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-5">
								<TrendPostCard
									user={{
										imgSrc: "/img/profile.png",
										name: "Mehrab H",
									}}
									trending="Trending #1"
									title="The 10-year-old Medium story that turned into a book deal"
									description="Getting a book deal on a story you first published a decade ago feels even more magical."
									category={{ title: "Fashion", url: "#" }}
									href="/"
								/>
								<TrendPostCard
									user={{
										imgSrc: "/img/profile.png",
										name: "Mehrab H",
									}}
									trending="Trending #1"
									title="The 10-year-old Medium story that turned into a book deal"
									description="Getting a book deal on a story you first published a decade ago feels even more magical."
									category={{ title: "Fashion", url: "#" }}
									href="/"
								/>
							</div>
							<div className="grid grid-cols-1 mt-4">
								<PostCard
									user={{
										imgSrc: "/img/profile.png",
										name: "Mehrab H",
									}}
									title="The 10-year-old Medium story that turned into a book deal"
									description="Getting a book deal on a story you first published a decade ago feels even more magical."
									category={{ title: "Fashion", url: "#" }}
									href="/"
									date="2024-01-01"
									readTime="15 min"
									save={true}
								/>
								<PostCard
									user={{
										imgSrc: "/img/profile.png",
										name: "Mehrab H",
									}}
									title="The 10-year-old Medium story that turned into a book deal"
									description="Getting a book deal on a story you first published a decade ago feels even more magical."
									category={{ title: "Fashion", url: "#" }}
									href="/"
									date="2024-01-01"
									readTime="10 min"
									save={false}
								/>
								<PostCard
									user={{
										imgSrc: "/img/profile.png",
										name: "Mehrab H",
									}}
									title="The 10-year-old Medium story that turned into a book deal"
									description="Getting a book deal on a story you first published a decade ago feels even more magical."
									category={{ title: "Fashion", url: "#" }}
									href="/"
									date="2024-01-01"
									readTime="10 min"
									save={false}
								/>
								<PostCard
									user={{
										imgSrc: "/img/profile.png",
										name: "Mehrab H",
									}}
									title="The 10-year-old Medium story that turned into a book deal"
									description="Getting a book deal on a story you first published a decade ago feels even more magical."
									category={{ title: "Fashion", url: "#" }}
									href="/"
									date="2024-01-01"
									readTime="10 min"
									save={false}
								/>
							</div>
						</TabsContent>
						<TabsContent value="trending">
							<div>Trending</div>
						</TabsContent>
						<TabsContent value="following">
							<div>Following</div>
						</TabsContent>
					</TabsSection>
				</div>

				<div className="w-[30%] lg:block hidden h-[100vh] sticky top-0 p-4 border-l border-zinc-200 overflow-x-hidden overflow-y-auto">
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

					<div className="mt-4">
						<h5 className="text-[16px] font-bold">Categories</h5>

						<div className="grid grid-cols-1 mt-2">
							<ul>
								{[
									{
										title: "Fashion",
										url: "#",
									},
									{
										title: "Sport",
										url: "#",
									},
									{
										title: "Travel",
										url: "#",
									},
									{
										title: "Food",
										url: "#",
									},
									{
										title: "Tech",
										url: "#",
									},
									{
										title: "Design",
										url: "#",
									},
									{
										title: "Art",
										url: "#",
									},
								].map((item, index) => (
									<li
										key={index}
										className="inline-block mr-2 my-2"
									>
										<Link
											to={item.url}
											className="border border-gray-200 font-bold py-1 px-3 rounded-2xl text-[13px]"
										>
											{item.title}
										</Link>
									</li>
								))}
							</ul>
						</div>
					</div>

					<LatestUsers />
				</div>
			</div>
		</>
	);
}
