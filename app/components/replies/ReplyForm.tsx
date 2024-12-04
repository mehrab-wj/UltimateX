import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { useToast } from "~/hooks/use-toast";
import { useUserStore } from "~/storages/userStore";
import { useMutation } from "@apollo/client/index";
import { ADD_REPLY_MUTATION } from "~/queries/mutations/createReply";
import { Post, PostMappingTypeEnum } from "~/__generated__/graphql";
import { Input } from "../ui/input";

interface ReplyFormProps {
	post: Post;
	parentId?: string; // Optional - for nested replies
	onReplySubmitted?: (reply: Post) => void;
	placeholder?: string;
}

// Add schema definition
const replySchema = z.object({
	content: z.string().min(1, "Reply cannot be empty"),
});

type ReplyFormData = z.infer<typeof replySchema>;

export function ReplyForm({
	post,
	onReplySubmitted,
	placeholder = "Write a reply...",
}: ReplyFormProps) {
	const { toast } = useToast();
	const { user } = useUserStore();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<ReplyFormData>({
		resolver: zodResolver(replySchema),
	});

	const [addReply, { loading }] = useMutation(ADD_REPLY_MUTATION, {
		onError: (error) => {
			toast({
				description: error.message,
				variant: "destructive",
			});
		},
		onCompleted: (data) => {
			reset();
			console.log(data.createReply);
			onReplySubmitted?.(data.createReply as Post);
		},
	});

	const onSubmit = async (data: ReplyFormData) => {
		if (!user) {
			toast({
				title: "Please login to reply",
			});
			return;
		}

		addReply({
			variables: {
				postId: post.id,
				input: {
					postTypeId:
						post.postType?.validReplyTypes?.[0]?.id ?? post.id,
					mappingFields: [
						{
							key: "content",
							type: PostMappingTypeEnum.Text,
							value: JSON.stringify(data.content),
						},
					],
					publish: true,
				},
			},
		});
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
			<div>
				<Input
					type="text"
					{...register("content")}
					placeholder={placeholder}
					className="w-full p-3 rounded-md border"
					disabled={loading}
				/>
				{errors.content && (
					<p className="text-red-500 text-sm mt-1">
						{errors.content.message}
					</p>
				)}
			</div>
			<div className="flex justify-end">
				<Button type="submit" disabled={loading} className="px-4 py-2">
					{loading ? "....." : "Reply"}
				</Button>
			</div>
		</form>
	);
}
