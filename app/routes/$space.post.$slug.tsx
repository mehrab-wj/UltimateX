import { useParams } from "react-router";
import type { Route } from "./+types/$space.post.$slug";
import SidebarContent from "~/components/native/sidebar/SidebarContent";
import SearchArea from "~/components/native/SearchArea";

export default function SpacePostPage() {
	const { space, slug } = useParams();

	if (!space || !slug) return <div>No space or slug</div>;

	const postId = slug.split("-").pop();

	return (
		<div className="lg:flex lg:flex-wrap">
			<div className="lg:w-[70%] p-5">
				<SearchArea />

				<section className="mt-5">
					Space: {space}
					<br />
					Slug: {slug}
					<br />
					Post ID: {postId}
				</section>
			</div>
			<div className="w-[30%] lg:block hidden h-[100vh] sticky top-0 p-4 border-l border-zinc-200 overflow-x-hidden overflow-y-auto">
				<SidebarContent />
			</div>
		</div>
	);
}
