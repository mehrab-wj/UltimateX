import { Plus } from "lucide-react";
import React from "react";

const UserCard: React.FC<{
	user: {
		imgSrc: string;
		name: string;
		id: number;
	};
}> = ({ user }) => {
	const handleToggleFollow = () => {
		console.log("follow");
	};

	return (
		<div className="flex justify-between items-center border-b border-gray-200 py-4">
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

			<div>
				<button type="button" className="border border-gray-200 rounded-3xl text-[13px] inline-flex items-center gap-1 px-2 py-1" onClick={handleToggleFollow}>
					<Plus className="w-[15px] h-[15px]" /> Follow
				</button>
			</div>
		</div>
	);
};

export default UserCard;
