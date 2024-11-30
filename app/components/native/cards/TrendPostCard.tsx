import React from "react";
import { Link } from "react-router";

interface TrendPostCardProps {
	trending: string;
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
}
const TrendPostCard: React.FC<TrendPostCardProps> = ({
	trending,
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
}) => {
	return (
		<article className="h-[300px] text-white relative rounded-xl overflow-hidden">
			<img
				src="/img/jungle.jpg"
				alt="jungle"
				className="h-full w-full object-cover absolute inset-0 brightness-[0.45]"
			/>
			<div className="relative p-4 z-10 flex flex-col justify-between h-full">
				<span className="bg-white text-black px-2 py-1 rounded-full font-bold text-[11px] inline-block w-max">
					{trending}
				</span>
				<div className="flex gap-2 mt-auto">
					<img
						className="w-[20px] h-[20px] rounded-full"
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
				<strong className="my-1 text-[14px] text-zinc-100">
					{title}
				</strong>
				<p className="text-[11px] text-zinc-200">{description}</p>
				<Link to={href} className="absolute inset-0 z-20" />
			</div>
		</article>
	);
};

export default TrendPostCard;
