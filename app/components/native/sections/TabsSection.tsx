import { FC } from "react";
import { Tabs, TabsList, TabsTrigger } from "../../ui/tabs";
import { cn } from "~/lib/utils";

interface TabsSectionProps {
	children: React.ReactNode;
	className?: string;
	defaultValue: string;
	tabsList: {
		title: string;
		value: string;
	}[];
}

const TabsSection: FC<TabsSectionProps> = ({
	children,
	className = "",
	defaultValue = "",
	tabsList = [
		{
			title: "",
			value: "",
		},
	],
}) => {
	return (
		<Tabs defaultValue={defaultValue} className={cn("w-full", className)}>
			<TabsList className="grid w-full grid-cols-2">
				{tabsList.map((tab) => (
					<TabsTrigger key={tab.value} value={tab.value}>
						{tab.title}
					</TabsTrigger>
				))}
			</TabsList>
			<div className="pt-5">{children}</div>
		</Tabs>
	);
};
export default TabsSection;
