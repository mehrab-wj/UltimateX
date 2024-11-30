import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import { Link } from "react-router";

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

export function AppSidebar() {
	// Menu items.
	const items = [
		{
			title: "Home",
			url: "#",
			icon: Home,
		},
		{
			title: "Inbox",
			url: "#",
			icon: Inbox,
		},
		{
			title: "Calendar",
			url: "#",
			icon: Calendar,
		},
		{
			title: "Search",
			url: "#",
			icon: Search,
		},
		{
			title: "Settings",
			url: "#",
			icon: Settings,
		},
	];

	return (
		<Sidebar className="lg:px-3">
			<SidebarContent className="bg-white">
				<SidebarGroup>
					<SidebarGroupLabel className="text-2xl font-bold">
						Ultimate<span className="text-primary">X</span>
					</SidebarGroupLabel>
					<div className="flex gap-3 mt-5 border border-gray-200 p-2 rounded-xl relative overflow-hidden">
						<img
							className="w-[40px] h-[40px] rounded-full"
							src="/img/profile.png"
							alt="profile"
						/>
						<div className="inline-block">
							<b className="text-[13px]">Mehrab H.</b>
							<span className="text-[10px] block">
								thisismehrab@gmail.com
							</span>
						</div>
                        <Link to="/profile" className="absolute inset-0 z-10" />
					</div>
					<SidebarGroupContent className="mt-5 pt-3 border-t border-gray-200">
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton className="" asChild>
										<a href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</a>
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
