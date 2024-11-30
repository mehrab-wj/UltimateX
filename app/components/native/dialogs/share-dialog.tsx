import { Copy, Facebook, Linkedin, Mail, Twitter } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "~/components/ui/dialog";

export default function ShareDialog({ url }: { url: string }) {
	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Share</DialogTitle>
				<DialogDescription>
					<div className="relative mt-3 ">
						<input
							type="text"
							className="w-full rounded-lg p-3 border bg-white border-gray-200 focus:outline-none focus:ring-0 focus:border-primary/50"
							readOnly
							value={url}
						/>
						<button className="bg-white hover:bg-gray-50 rounded-lg p-2 absolute right-2 top-1/2 -translate-y-1/2">
							<Copy className="w-4 h-4" />
						</button>
					</div>
					<div className="flex items-center justify-center gap-2 mt-4">
						<Button
							className="w-full py-3 border border-gray-200"
							variant="outline"
						>
							<Facebook className="w-6 h-6" />
						</Button>
						<Button
							className="w-full py-3 border border-gray-200"
							variant="outline"
						>
							<Twitter className="w-6 h-6" />
						</Button>
						<Button
							className="w-full py-3 border border-gray-200"
							variant="outline"
						>
							<Linkedin className="w-6 h-6" />
						</Button>
						<Button
							className="w-full py-3 border border-gray-200"
							variant="outline"
						>
							<Mail className="w-6 h-6" />
						</Button>
					</div>
				</DialogDescription>
			</DialogHeader>
		</DialogContent>
	);
}
