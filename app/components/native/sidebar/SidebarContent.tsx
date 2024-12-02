import SmallPostCard from "../../posts/Custom/SmallPostCard";
import LatestUsers from "../users/latest-users";
import WeeklyPicks from "./WeeklyPicks";

export default function SidebarContent() {
	return (
		<>
			<WeeklyPicks />

			<LatestUsers />
		</>
	);
}
