import TabsSection from "~/components/native/sections/TabsSection";
import type { Route } from "./+types/hot";
import { TabsContent } from "@radix-ui/react-tabs";
import TrendPostCard from "~/components/native/cards/TrendPostCard";
import PostCard from "~/components/native/cards/PostCard";
import { Input } from "~/components/ui/input";
import { Search } from "lucide-react";
import SmallPostCard from "~/components/native/cards/SmallPostCard";
import { Link } from "react-router";
import UserCard from "~/components/native/cards/UserCard";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Hot posts" },
		{ name: "description", content: "Hot posts" },
	];
}

export default function Hot() {
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
							<Link
								to="/"
								className="text-[12px] text-zinc-800 mt-2 underline hover:text-black"
							>
								See all categories
							</Link>
						</div>
					</div>

					<div className="mt-4 border-t border-zinc-200 pt-3">
						<h5 className="text-[16px] font-bold">
							Recommended Follows
						</h5>

						<div className="grid grid-cols-1 mt-2">
						<UserCard
								user={{
									imgSrc: "/img/profile.png",
									name: "Mehrab H",
									id: 1,
								}}
							/>
							<UserCard
								user={{
									imgSrc: "/img/profile.png",
									name: "Mehrab H",
									id: 1,
								}}
							/>
							<UserCard
								user={{
									imgSrc: "/img/profile.png",
									name: "Mehrab H",
									id: 1,
								}}
							/>
								<UserCard
								user={{
									imgSrc: "/img/profile.png",
									name: "Mehrab H",
									id: 1,
								}}
							/>
							<UserCard
								user={{
									imgSrc: "/img/profile.png",
									name: "Mehrab H",
									id: 1,
								}}
							/>
							<UserCard
								user={{
									imgSrc: "/img/profile.png",
									name: "Mehrab H",
									id: 1,
								}}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
