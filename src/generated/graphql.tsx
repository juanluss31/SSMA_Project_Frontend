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
  counter: Scalars['Float'];
};

export type LoginModel = {
  __typename?: 'LoginModel';
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getAllUsers: Array<UserModel>;
  getUser: UserModel;
  login: LoginModel;
  validateToken: UserModel;
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

export type LoginQueryVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginQuery = (
  { __typename?: 'Query' }
  & { login: (
    { __typename?: 'LoginModel' }
    & Pick<LoginModel, 'accessToken' | 'refreshToken'>
  ) }
);

export type ValidateTokenQueryVariables = Exact<{ [key: string]: never; }>;


export type ValidateTokenQuery = (
  { __typename?: 'Query' }
  & { validateToken: (
    { __typename?: 'UserModel' }
    & Pick<UserModel, 'id' | 'username' | 'password' | 'firstname' | 'lastname' | 'counter'>
  ) }
);


export const LoginDocument = gql`
    query login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    accessToken
    refreshToken
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
export const ValidateTokenDocument = gql`
    query validateToken {
  validateToken {
    id
    username
    password
    firstname
    lastname
    counter
  }
}
    `;

/**
 * __useValidateTokenQuery__
 *
 * To run a query within a React component, call `useValidateTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useValidateTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useValidateTokenQuery({
 *   variables: {
 *   },
 * });
 */
export function useValidateTokenQuery(baseOptions?: Apollo.QueryHookOptions<ValidateTokenQuery, ValidateTokenQueryVariables>) {
        return Apollo.useQuery<ValidateTokenQuery, ValidateTokenQueryVariables>(ValidateTokenDocument, baseOptions);
      }
export function useValidateTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ValidateTokenQuery, ValidateTokenQueryVariables>) {
          return Apollo.useLazyQuery<ValidateTokenQuery, ValidateTokenQueryVariables>(ValidateTokenDocument, baseOptions);
        }
export type ValidateTokenQueryHookResult = ReturnType<typeof useValidateTokenQuery>;
export type ValidateTokenLazyQueryHookResult = ReturnType<typeof useValidateTokenLazyQuery>;
export type ValidateTokenQueryResult = Apollo.QueryResult<ValidateTokenQuery, ValidateTokenQueryVariables>;