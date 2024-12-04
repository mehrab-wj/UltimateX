import {
	Calendar,
	Home,
	Inbox,
	LogOut,
	NotebookIcon,
	Search,
	Settings,
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
import AuthenticationDialog from "./authentication-dialog/AuthenticationDialog";

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

export function AppSidebar() {
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
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
