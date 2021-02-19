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
  password: Scalars['String'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
};

export type LoginModel = {
  __typename?: 'LoginModel';
  username: Scalars['String'];
  password: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getAllUsers: Array<UserModel>;
  getUser: UserModel;
  login: LoginModel;
};


export type QueryGetUserArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type QueryLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: UserModel;
  deleteUser: UserModel;
};


export type MutationCreateUserArgs = {
  lastname: Scalars['String'];
  firstname: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationDeleteUserArgs = {
  username: Scalars['String'];
};

export type CreateUserMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
}>;


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { createUser: (
    { __typename?: 'UserModel' }
    & Pick<UserModel, 'id' | 'username' | 'password' | 'firstname' | 'lastname'>
  ) }
);

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUsersQuery = (
  { __typename?: 'Query' }
  & { getAllUsers: Array<(
    { __typename?: 'UserModel' }
    & Pick<UserModel, 'id' | 'username' | 'password' | 'firstname' | 'lastname'>
  )> }
);

export type LoginQueryVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginQuery = (
  { __typename?: 'Query' }
  & { login: (
    { __typename?: 'LoginModel' }
    & Pick<LoginModel, 'username' | 'password'>
  ) }
);


export const CreateUserDocument = gql`
    mutation createUser($username: String!, $password: String!, $firstname: String!, $lastname: String!) {
  createUser(
    username: $username
    password: $password
    firstname: $firstname
    lastname: $lastname
  ) {
    id
    username
    password
    firstname
    lastname
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *      firstname: // value for 'firstname'
 *      lastname: // value for 'lastname'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, baseOptions);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const GetAllUsersDocument = gql`
    query getAllUsers {
  getAllUsers {
    id
    username
    password
    firstname
    lastname
  }
}
    `;

/**
 * __useGetAllUsersQuery__
 *
 * To run a query within a React component, call `useGetAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
        return Apollo.useQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, baseOptions);
      }
export function useGetAllUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
          return Apollo.useLazyQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, baseOptions);
        }
export type GetAllUsersQueryHookResult = ReturnType<typeof useGetAllUsersQuery>;
export type GetAllUsersLazyQueryHookResult = ReturnType<typeof useGetAllUsersLazyQuery>;
export type GetAllUsersQueryResult = Apollo.QueryResult<GetAllUsersQuery, GetAllUsersQueryVariables>;
export const LoginDocument = gql`
    query login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    username
    password
  }
}
    `;

/**
 * __useLoginQuery__
 *
 * To run a query within a React component, call `useLoginQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoginQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoginQuery({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginQuery(baseOptions: Apollo.QueryHookOptions<LoginQuery, LoginQueryVariables>) {
        return Apollo.useQuery<LoginQuery, LoginQueryVariables>(LoginDocument, baseOptions);
      }
export function useLoginLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoginQuery, LoginQueryVariables>) {
          return Apollo.useLazyQuery<LoginQuery, LoginQueryVariables>(LoginDocument, baseOptions);
        }
export type LoginQueryHookResult = ReturnType<typeof useLoginQuery>;
export type LoginLazyQueryHookResult = ReturnType<typeof useLoginLazyQuery>;
export type LoginQueryResult = Apollo.QueryResult<LoginQuery, LoginQueryVariables>;