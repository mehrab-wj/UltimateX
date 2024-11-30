import React from "react";
import { Link } from "react-router";
import { Bookmark, BookmarkCheck, Calendar, TimerIcon } from "lucide-react";

interface PostCardProps {
	title: string;
	description: string;
	user: {
		imgSrc: string;
		name: string;
	};
	category: {
		title: string;
		url: string;
	};
	href: string;
	date: string;
	readTime: string;
	save: boolean;
}
const PostCard: React.FC<PostCardProps> = ({
	title,
	description,
	user = {
		imgSrc: "",
		name: "",
	},
	category = {
		title: "",
		url: "",
	},
	href = "/",
	date = "2024-01-01",
	readTime = "10 min",
	save = false,
}) => {
	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "2-digit",
		});
	};

	return (
		<article className="text-black relative overflow-hidden flex flex-wrap items-center border-t border-gray-200 py-4 ">
			<div className="w-full sm:w-[30%]">
				<img
					src="/img/jungle.jpg"
					alt="jungle"
					className=" w-full rounded-lg"
				/>
			</div>
			<div className="p-2 flex flex-col justify-between grow w-full sm:w-[70%]">
				<div className="flex gap-2 mt-auto items-center">
					<img
						className="w-[15px] h-[15px] rounded-full"
						src={user.imgSrc}
						alt="profile"
					/>
					<div className="inline-block text-[11px]">
						<span className="">{user.name}</span>
						<span className="inline-block mx-1 text-[14px] relative top-[-2px]">
							.
						</span>
						<Link className="z-30 relative" to={category.url}>
							{category.title}
						</Link>
					</div>
				</div>
				<strong className="my-1 text-[13px] text-zinc-800">
					{title}
				</strong>
				<p className="text-[11px] text-zinc-500">{description}</p>
				<div className="flex items-center gap-2 justify-between mt-2">
					<div className="flex items-center gap-2">
						<span className="flex items-center gap-1 text-[10px]">
							<Calendar className="w-[12px] h-[12px]" />{" "}
							{formatDate(date)}
						</span>
						<span className="flex items-center gap-1 text-[10px]">
							<TimerIcon className="w-[12px] h-[12px]" />{" "}
							{readTime}
						</span>
					</div>

					<div>
						<button type="button">
							{save ? (
								<BookmarkCheck className="w-[15px] h-[15px] text-zinc-500" />
							) : (
								<Bookmark className="w-[15px] h-[15px] text-zinc-500" />
							)}
						</button>
					</div>
				</div>
			</div>
			<Link to={href} className="absolute inset-0 z-20" />
		</article>
	);
};

export default PostCard;
