import React from "react";
import { Link } from "react-router";

const EventCard: React.FC<{
	trending: string;
	title: string;
	description: string;
	thumbnail: string;
	user: {
		imgSrc: string;
		name: string;
	};
	location: string | null;
	href: string;
}> = ({
	trending,
	title,
	description,
	thumbnail,
	user = {
		imgSrc: "",
		name: "",
	},
	location = null,
	href = "/",
}) => {
	return (
		<article className="h-[300px] text-white relative rounded-xl overflow-hidden group">
			<img
				src={thumbnail}
				alt="jungle"
				className="h-full w-full object-cover absolute inset-0 brightness-[0.4] group-hover:brightness-[0.2] transition-all duration-300"
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
						{location && (
							<>
								<span className="inline-block mx-1 text-[14px] relative top-[-2px]">
									.
								</span>
								<span>{location}</span>
							</>
						)}
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

export default EventCard;
