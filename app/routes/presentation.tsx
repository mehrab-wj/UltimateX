import type { Route } from "./+types/presentation";
import LatestUsers from "~/features/User/LatestUsers";
import WeeklyPicks from "~/features/Post/WeeklyPicks";
import SearchArea from "~/components/native/SearchArea";
import { useEffect } from "react";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "UltimateX - Video Presentation" },
		{
			name: "description",
			content: "Why You should hire me!",
		},
	];
}

export default function PresentationPage() {
	useEffect(() => {
		window.localStorage.setItem("presentation-viewed", "true");
	}, []);

	return (
		<>
			<div className="lg:flex lg:flex-wrap">
				<div className="lg:w-[70%] p-5">
					<SearchArea />

					<section className="mt-5 flex flex-col items-center text-center gap-5">
						<div>
							<h1 className="text-2xl font-bold">
								Why I'm the Ideal Front-End Engineer for
								BetterMode!
							</h1>
							<p className="text-zinc-600 mt-1">
								Here's a short video presentation about the
								assignment you asked, and why I believe I'm the
								best fit for your company and how I can bring
								value as a front-end engineer at BetterMode!
							</p>
						</div>

						<div
							className="relative w-full rounded-lg overflow-hidden"
							style={{ paddingTop: "56.25%" }}
						>
							<iframe
								src="https://player.vimeo.com/video/1036568189?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
								allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
								style={{
									position: "absolute",
									top: 0,
									left: 0,
									width: "100%",
									height: "100%",
								}}
								title="BetterMode Presentation"
							></iframe>
						</div>
					</section>
				</div>
				<div className="w-[30%] lg:block hidden h-[100vh] sticky top-0 p-4 border-l border-zinc-200 overflow-x-hidden overflow-y-auto">
					<WeeklyPicks />
					<LatestUsers />
				</div>
			</div>
		</>
	);
}
