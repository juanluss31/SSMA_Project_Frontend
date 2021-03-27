import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string;
	String: string;
	Boolean: boolean;
	Int: number;
	Float: number;
};

export type UserModel = {
	__typename?: 'UserModel';
	id: Scalars['Float'];
	username: Scalars['String'];
	email: Scalars['String'];
	firstname: Scalars['String'];
	lastname: Scalars['String'];
	tokenVersion: Scalars['Float'];
};

export type LoginResponse = {
	__typename?: 'LoginResponse';
	accessToken: Scalars['String'];
	user: UserModel;
};

export type LogoutResponse = {
	__typename?: 'LogoutResponse';
	username: Scalars['String'];
};

export type Query = {
	__typename?: 'Query';
	findAll: Array<UserModel>;
};

export type Mutation = {
	__typename?: 'Mutation';
	register: LoginResponse;
	login: LoginResponse;
	logout: LogoutResponse;
	delete: UserModel;
};

export type MutationRegisterArgs = {
	lastname: Scalars['String'];
	firstname: Scalars['String'];
	password: Scalars['String'];
	email: Scalars['String'];
	username: Scalars['String'];
};

export type MutationLoginArgs = {
	password: Scalars['String'];
	username: Scalars['String'];
};

export type MutationDeleteArgs = {
	userId: Scalars['String'];
};

export type RegisterMutationVariables = Exact<{
	username: Scalars['String'];
	email: Scalars['String'];
	password: Scalars['String'];
	firstname: Scalars['String'];
	lastname: Scalars['String'];
}>;

export type RegisterMutation = { __typename?: 'Mutation' } & {
	register: { __typename?: 'LoginResponse' } & Pick<LoginResponse, 'accessToken'> & {
			user: { __typename?: 'UserModel' } & Pick<
				UserModel,
				'id' | 'username' | 'email' | 'firstname' | 'lastname'
			>;
		};
};

export type LoginMutationVariables = Exact<{
	username: Scalars['String'];
	password: Scalars['String'];
}>;

export type LoginMutation = { __typename?: 'Mutation' } & {
	login: { __typename?: 'LoginResponse' } & Pick<LoginResponse, 'accessToken'> & {
			user: { __typename?: 'UserModel' } & Pick<
				UserModel,
				'id' | 'username' | 'email' | 'firstname' | 'lastname'
			>;
		};
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: 'Mutation' } & {
	logout: { __typename?: 'LogoutResponse' } & Pick<LogoutResponse, 'username'>;
};

export const RegisterDocument = gql`
	mutation register(
		$username: String!
		$email: String!
		$password: String!
		$firstname: String!
		$lastname: String!
	) {
		register(
			username: $username
			email: $email
			password: $password
			firstname: $firstname
			lastname: $lastname
		) {
			user {
				id
				username
				email
				firstname
				lastname
			}
			accessToken
		}
	}
`;
export type RegisterMutationFn = Apollo.MutationFunction<
	RegisterMutation,
	RegisterMutationVariables
>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      username: // value for 'username'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      firstname: // value for 'firstname'
 *      lastname: // value for 'lastname'
 *   },
 * });
 */
export function useRegisterMutation(
	baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>
) {
	return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(
		RegisterDocument,
		baseOptions
	);
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<
	RegisterMutation,
	RegisterMutationVariables
>;
export const LoginDocument = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			user {
				id
				username
				email
				firstname
				lastname
			}
			accessToken
		}
	}
`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(
	baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>
) {
	return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
	LoginMutation,
	LoginMutationVariables
>;
export const LogoutDocument = gql`
	mutation logout {
		logout {
			username
		}
	}
`;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(
	baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>
) {
	return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<
	LogoutMutation,
	LogoutMutationVariables
>;
