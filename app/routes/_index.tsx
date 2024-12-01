import type { Route } from "./+types/_index";
import TabsSection from "~/components/native/sections/TabsSection";
import PostCard from "~/components/native/cards/PostCard";
import { Input } from "~/components/ui/input";
import { Search } from "lucide-react";
import { TabsContent } from "~/components/ui/tabs";
import EventsGallery from "~/components/events/EventsGallery";
import SidebarContent from "~/components/native/sidebar/SidebarContent";
import SearchArea from "~/components/native/SearchArea";

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
					<SearchArea />
					
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
							<EventsGallery />
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
					<SidebarContent />
				</div>
			</div>
		</>
	);
}
