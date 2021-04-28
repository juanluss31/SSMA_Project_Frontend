import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CompanyModel = {
  __typename?: 'CompanyModel';
  /** Identifier */
  id: Scalars['Float'];
  /** Company name */
  name: Scalars['String'];
  /** Company address */
  address: Scalars['String'];
  /** Company postal code */
  postalCode: Scalars['String'];
  /** Contact phone */
  phone: Scalars['String'];
  users: UserModel;
};

export type CounterModel = {
  __typename?: 'CounterModel';
  /** Identifier */
  id: Scalars['Float'];
  /** Username */
  username: Scalars['String'];
  /** Software Version */
  currentVersion: Scalars['String'];
  /** Associated company */
  company: CompanyModel;
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

export type Mutation = {
  __typename?: 'Mutation';
  register: LoginResponse;
  login: LoginResponse;
  logout: LogoutResponse;
  update: UserModel;
  delete: CompanyModel;
  createCompany: CompanyModel;
  updateCompany: CompanyModel;
  createCounter: RegisterCounterResponse;
};


export type MutationRegisterArgs = {
  companyId: Scalars['Float'];
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


export type MutationUpdateArgs = {
  newLastname?: Maybe<Scalars['String']>;
  newFirstname?: Maybe<Scalars['String']>;
  newEmail?: Maybe<Scalars['String']>;
  newUsername?: Maybe<Scalars['String']>;
  username: Scalars['String'];
};


export type MutationDeleteArgs = {
  id: Scalars['Float'];
};


export type MutationCreateCompanyArgs = {
  phone: Scalars['String'];
  postalCode: Scalars['String'];
  address: Scalars['String'];
  name: Scalars['String'];
};


export type MutationUpdateCompanyArgs = {
  newPhone?: Maybe<Scalars['String']>;
  newPostalCode?: Maybe<Scalars['String']>;
  newAddress?: Maybe<Scalars['String']>;
  newName?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};


export type MutationCreateCounterArgs = {
  companyId: Scalars['Float'];
  currentVersion: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  findAll: Array<UserModel>;
  me?: Maybe<UserModel>;
  findAllCompanies: Array<CompanyModel>;
  findCompany: CompanyModel;
  findCompanyByName: CompanyModel;
  findAllCounters: Array<CounterModel>;
};


export type QueryFindCompanyArgs = {
  id: Scalars['Float'];
};


export type QueryFindCompanyByNameArgs = {
  name: Scalars['String'];
};

export type RegisterCounterResponse = {
  __typename?: 'RegisterCounterResponse';
  counter: CounterModel;
};

export enum Role {
  BaseUser = 'BaseUser',
  Admin = 'Admin'
}

export type UserModel = {
  __typename?: 'UserModel';
  /** Identifier */
  id: Scalars['Float'];
  /** Username */
  username: Scalars['String'];
  /** Email */
  email: Scalars['String'];
  /** Roles */
  roles: Array<Role>;
  /** Name */
  firstname: Scalars['String'];
  /** Lastname */
  lastname: Scalars['String'];
  /** Associated company */
  company: CompanyModel;
};

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'UserModel' }
    & Pick<UserModel, 'id' | 'username' | 'email' | 'firstname' | 'lastname'>
    & { company: (
      { __typename?: 'CompanyModel' }
      & Pick<CompanyModel, 'id' | 'name' | 'address' | 'postalCode' | 'phone'>
    ) }
  )> }
);

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  companyId: Scalars['Float'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'accessToken'>
    & { user: (
      { __typename?: 'UserModel' }
      & Pick<UserModel, 'id' | 'username' | 'email' | 'firstname' | 'lastname'>
      & { company: (
        { __typename?: 'CompanyModel' }
        & Pick<CompanyModel, 'id' | 'name' | 'address' | 'postalCode' | 'phone'>
      ) }
    ) }
  ) }
);

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'accessToken'>
    & { user: (
      { __typename?: 'UserModel' }
      & Pick<UserModel, 'id' | 'username' | 'email' | 'firstname' | 'lastname' | 'roles'>
      & { company: (
        { __typename?: 'CompanyModel' }
        & Pick<CompanyModel, 'id' | 'name' | 'address' | 'postalCode' | 'phone'>
      ) }
    ) }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & { logout: (
    { __typename?: 'LogoutResponse' }
    & Pick<LogoutResponse, 'username'>
  ) }
);

export type FindAllQueryVariables = Exact<{ [key: string]: never; }>;


export type FindAllQuery = (
  { __typename?: 'Query' }
  & { findAll: Array<(
    { __typename?: 'UserModel' }
    & Pick<UserModel, 'id' | 'username' | 'email' | 'firstname' | 'lastname'>
  )> }
);


export const MeDocument = gql`
    query me {
  me {
    id
    username
    email
    firstname
    lastname
    company {
      id
      name
      address
      postalCode
      phone
    }
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const RegisterDocument = gql`
    mutation register($username: String!, $email: String!, $password: String!, $firstname: String!, $lastname: String!, $companyId: Float!) {
  register(
    username: $username
    email: $email
    password: $password
    firstname: $firstname
    lastname: $lastname
    companyId: $companyId
  ) {
    user {
      id
      username
      email
      firstname
      lastname
      company {
        id
        name
        address
        postalCode
        phone
      }
    }
    accessToken
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

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
 *      companyId: // value for 'companyId'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const LoginDocument = gql`
    mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    user {
      id
      username
      email
      firstname
      lastname
      company {
        id
        name
        address
        postalCode
        phone
      }
      roles
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
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
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
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const FindAllDocument = gql`
    query findAll {
  findAll {
    id
    username
    email
    firstname
    lastname
  }
}
    `;

/**
 * __useFindAllQuery__
 *
 * To run a query within a React component, call `useFindAllQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindAllQuery(baseOptions?: Apollo.QueryHookOptions<FindAllQuery, FindAllQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindAllQuery, FindAllQueryVariables>(FindAllDocument, options);
      }
export function useFindAllLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAllQuery, FindAllQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindAllQuery, FindAllQueryVariables>(FindAllDocument, options);
        }
export type FindAllQueryHookResult = ReturnType<typeof useFindAllQuery>;
export type FindAllLazyQueryHookResult = ReturnType<typeof useFindAllLazyQuery>;
export type FindAllQueryResult = Apollo.QueryResult<FindAllQuery, FindAllQueryVariables>;