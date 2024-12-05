import { gql } from "~/api/__generated__/gql";

export const LOGIN_NETWORK_MUTATION = gql(/* GraphQL */ `
	mutation LoginNetwork($usernameOrEmail: String!, $password: String!) {
		loginNetwork(
			input: { usernameOrEmail: $usernameOrEmail, password: $password }
		) {
			accessToken
			role {
				name
				scopes
			}
			member {
				id
				name
                email
				profilePicture {
					... on Image {
						__typename
						id
						url
						width
						height
						dominantColorHex
						dpi
						cropHeight
						cropWidth
						cropX
						cropY
						cropZoom
						urls {
							__typename
							full
							large
							medium
							small
							thumb
						}
					}
					... on File {
						id
						name
						url
					}
				}
			}
		}
	}
`);
