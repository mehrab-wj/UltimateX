import { Bell, Plus, Search, User } from "lucide-react";
import React from "react";

const UserCard: React.FC<{
	user: {
		imgSrc: string;
		name: string;
		id: number | string;
	};
}> = ({ user }) => {
	return (
		<div className="flex justify-between items-center border-b border-gray-200 cursor-pointer py-4">
			<div className="flex gap-2 mt-auto items-center">
				<img
					className="w-[30px] h-[30px] rounded-full"
					src={user.imgSrc}
					alt="profile"
				/>
				<div className="inline-block text-[14px]">
					<span className="">{user.name}</span>
				</div>
			</div>
		</div>
	);
};

export default UserCard;
