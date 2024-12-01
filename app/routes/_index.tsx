import type { Route } from "./+types/_index";
import TabsSection from "~/components/native/sections/TabsSection";
import { TabsContent } from "~/components/ui/tabs";
import EventsGallery from "~/components/events/EventsGallery";
import SidebarContent from "~/components/native/sidebar/SidebarContent";
import SearchArea from "~/components/native/SearchArea";
import AllPosts from "~/components/posts/AllPosts";
import { PostListOrderByEnum, TagsOrderByEnum } from "~/__generated__/graphql";

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

							<AllPosts />
						</TabsContent>
						<TabsContent value="trending">
							<AllPosts orderBy={PostListOrderByEnum.ReactionsCount} />
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
