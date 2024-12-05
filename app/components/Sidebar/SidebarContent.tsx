import LatestUsers from "~/features/User/LatestUsers";
import WeeklyPicks from "~/features/Post/WeeklyPicks";

export default function SidebarContent() {
	return (
		<>
			<WeeklyPicks />

			<LatestUsers />
		</>
	);
}
