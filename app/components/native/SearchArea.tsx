import { Search } from "lucide-react";
import { Input } from "../ui/input";

export default function SearchArea() {
	return (
		<div className="w-full relative">
			<Input
				placeholder="Search News"
				className="shadow-none rounded-full !text-[12px] pl-9"
				id="search"
			/>
			<label htmlFor="search">
				<Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-[15px] h-[15px]" />
			</label>
		</div>
	);
}
