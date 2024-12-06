import {
	Calendar,
	GithubIcon,
	Home,
	Inbox,
	NotebookIcon,
	Video,
} from "lucide-react";
import { Link, NavLink } from "react-router";

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "~/components/ui/sidebar";

import { useUserStore } from "~/storages/userStore";
import AuthenticationDialog from "~/features/User/AuthenticationDialog/AuthenticationDialog";

const items = [
	{
		title: "Home",
		url: "/",
		icon: Home,
	},
	{
		title: "Posts",
		url: "/posts",
		icon: NotebookIcon,
	},
	{
		title: "Discussion",
		url: "/discussion",
		icon: Inbox,
	},
	{
		title: "Events",
		url: "/events",
		icon: Calendar,
	},
];

export default function AppSidebar() {
	const { user } = useUserStore();

	return (
		<Sidebar className="lg:px-3">
			<SidebarContent className="bg-white">
				<SidebarGroup>
					<SidebarGroupLabel className="text-2xl font-bold">
						Ultimate<span className="text-primary">X</span>
					</SidebarGroupLabel>
					{user ? (
						<div className="flex gap-3 mt-5 border border-gray-200 p-2 rounded-xl relative overflow-hidden">
							<img
								className="w-[40px] h-[40px] rounded-full"
								src={
									user.profilePicture?.__typename === "Image"
										? user.profilePicture.url
										: ""
								}
								alt="profile"
							/>
							<div className="inline-block">
								<b className="text-[13px]">{user.name}</b>
								<span className="text-[10px] block">
									{user.email}
								</span>
							</div>
							<Link
								to="/profile"
								className="absolute inset-0 z-10"
							/>
						</div>
					) : (
						<AuthenticationDialog />
					)}

					<SidebarGroupContent className="mt-5 pt-3 border-t border-gray-200">
						<SidebarMenu>
							{items.map((item, i) => (
								<SidebarMenuItem key={i}>
									<SidebarMenuButton className="" asChild>
										<NavLink to={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</NavLink>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}

							<SidebarMenuItem>
								<SidebarMenuButton className="" asChild>
									<NavLink to="/presentation">
										<Video />
										<div className="w-full flex items-center justify-between">
											<span>Presentation</span>

											{window.localStorage.getItem(
												"presentation-viewed"
											) === "false" && (
												<span className="w-2 h-2 rounded-full bg-primary/50 animate-pulse"></span>
											)}
										</div>
									</NavLink>
								</SidebarMenuButton>
							</SidebarMenuItem>

							<SidebarMenuItem>
								<SidebarMenuButton className="" asChild>
									<NavLink
										to="https://github.com/mehrab-wj/UltimateX"
										target="_blank"
									>
										<GithubIcon />
										<span>Github</span>
									</NavLink>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
