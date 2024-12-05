import { Copy, Facebook, Linkedin, Mail, Twitter } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "~/components/ui/dialog";
import { useToast } from "~/hooks/use-toast";

export default function ShareDialog({ url }: { url: string }) {
	const { toast } = useToast();

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(url);
			toast({
				title: "Copied!",
				description: "Link copied to clipboard",
			});
		} catch (err) {
			toast({
				title: "Failed to copy",
				description: "Please try again",
				variant: "destructive",
			});
		}
	};

	const handleShare = async (platform: 'facebook' | 'twitter' | 'linkedin' | 'email') => {
		const text = "Check this out!"; // You can customize this message
		const encodedUrl = encodeURIComponent(url);
		
		const shareUrls = {
			facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
			twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodeURIComponent(text)}`,
			linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
			email: `mailto:?subject=${encodeURIComponent(text)}&body=${encodedUrl}`
		};

		// Try to use the Web Share API first (mobile-friendly)
		if (platform !== 'email' && navigator.share) {
			try {
				await navigator.share({
					title: text,
					text: text,
					url: url,
				});
				return;
			} catch (error) {
				console.log("Web Share API failed, falling back to URL sharing");
			}
		}

		if (platform === 'email') {
			window.location.href = shareUrls[platform];
			return;
		}
	};

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
						<button 
							onClick={handleCopy}
							className="bg-white hover:bg-gray-50 rounded-lg p-2 absolute right-2 top-1/2 -translate-y-1/2"
						>
							<Copy className="w-4 h-4" />
						</button>
					</div>
					<div className="flex items-center justify-center gap-2 mt-4">
						<Button
							onClick={() => handleShare('facebook')}
							className="w-full py-3 border border-gray-200"
							variant="outline"
						>
							<Facebook className="w-6 h-6" />
						</Button>
						<Button
							onClick={() => handleShare('twitter')}
							className="w-full py-3 border border-gray-200"
							variant="outline"
						>
							<Twitter className="w-6 h-6" />
						</Button>
						<Button
							onClick={() => handleShare('linkedin')}
							className="w-full py-3 border border-gray-200"
							variant="outline"
						>
							<Linkedin className="w-6 h-6" />
						</Button>
						<Button
							onClick={() => handleShare('email')}
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
