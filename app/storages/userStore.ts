import { ApolloClient } from "@apollo/client/index";
import { create } from "zustand";
import { LoginNetworkMutation } from "~/api/__generated__/graphql";
import { CREATE_GUEST_TOKEN_QUERY } from "~/api/queries/users";

type UserStoreType = {
	user: LoginNetworkMutation["loginNetwork"]["member"] | null;
	token: string | null;
	setUser: (user: any) => void;
	loadToken: (client: ApolloClient<object>) => Promise<string | null>;
	loadUser: () => void;
	setToken: (token: string) => void;
};

export const useUserStore = create<UserStoreType>((set) => ({
	user: null,
	token: null,
	setUser: (user: any) => {
		window.localStorage.setItem("user", JSON.stringify(user));
		set({ user });
	},
	loadUser: () => {
		const storedUser = window.localStorage.getItem("user");
		if (storedUser) {
			set({ user: JSON.parse(storedUser) });
		}
	},
	loadToken: async (client: ApolloClient<object>) => {
		const storedToken = window.localStorage.getItem("token");
		if (storedToken) {
			set({ token: storedToken });
			return storedToken;
		}

		try {
			const { data } = await client.query({
				query: CREATE_GUEST_TOKEN_QUERY,
				variables: {
					networkDomain: import.meta.env.VITE_NETWORK_DOMAIN,
				},
			});

			const accessToken = data.tokens.accessToken;
			window.localStorage.setItem("token", accessToken);
			set({ token: accessToken });
			return accessToken;
		} catch (error) {
			console.error("Failed to create guest token:", error);
			return null;
		}
	},
	setToken: (token: string) => {
		window.localStorage.setItem("token", token);
		set({ token });
	},
}));
