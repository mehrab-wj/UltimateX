import { ApolloClient } from "@apollo/client/index";
import { create } from "zustand";
import { CREATE_GUEST_TOKEN_QUERY } from "~/queries/users";

type UserStoreType = {
	user: any;
	setUser: (user: any) => void;
	getToken: (client: ApolloClient<object>) => Promise<string | null>;
};

export const useUserStore = create<UserStoreType>((set) => ({
	user: null,
	setUser: (user: any) => set({ user }),
	getToken: async (client: ApolloClient<object>) => {
		const token = window.localStorage.getItem("token");

		if (!token) {
			const data = await client.query({
				query: CREATE_GUEST_TOKEN_QUERY,
				variables: {
					networkDomain: import.meta.env.VITE_NETWORK_DOMAIN,
				},
			});
			window.localStorage.setItem("token", data.data.tokens.accessToken);

			return data.data.tokens.accessToken;
		}

		return token ? token : null;
	},
}));
