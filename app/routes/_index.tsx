import type { Route } from "./+types/_index";
import TabsSection from "~/components/native/sections/TabsSection";
import PostCard from "~/components/native/cards/PostCard";
import { Input } from "~/components/ui/input";
import { Search } from "lucide-react";
import SmallPostCard from "~/components/native/cards/SmallPostCard";
import { Link } from "react-router";
import { TabsContent } from "~/components/ui/tabs";
import LatestUsers from "~/components/native/users/latest-users";
import Events from "~/components/events/Events";

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
						defaultValue="home"
						tabsList={[
							{
								title: "Home",
								value: "home",
							},
							{
								title: "Trending",
								value: "trending",
							},
						]}
					>
						<TabsContent value="home">
							<Events />
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
