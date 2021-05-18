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
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
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
};

export type CounterModel = {
  __typename?: 'CounterModel';
  /** Identifier */
  id: Scalars['Float'];
  /** Username */
  username: Scalars['String'];
  /** Software Version */
  currentVersion: Scalars['String'];
  /** Maximun capacity */
  capacity: Scalars['Float'];
  /** Associated company */
  company?: Maybe<CompanyModel>;
};

export type CountersLastStatistics = {
  __typename?: 'CountersLastStatistics';
  id: Scalars['Float'];
  statistics: StatisticsModel;
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
  register: UserModel;
  registerAdmin: LoginResponse;
  login: LoginResponse;
  logout: LogoutResponse;
  update: UserModel;
  delete: UserModel;
  createCompany: CompanyModel;
  updateCompany: CompanyModel;
  deleteCompany: CompanyModel;
  createCounter: RegisterCounterResponse;
};


export type MutationRegisterArgs = {
  companyName: Scalars['String'];
  lastname: Scalars['String'];
  firstname: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
  username: Scalars['String'];
};


export type MutationRegisterAdminArgs = {
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
  userId: Scalars['Float'];
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


export type MutationDeleteCompanyArgs = {
  id: Scalars['Float'];
};


export type MutationCreateCounterArgs = {
  companyId: Scalars['Float'];
  capacity: Scalars['Float'];
  currentVersion: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  findAll: Array<UserModel>;
  findCompanyUsers: Array<UserModel>;
  me?: Maybe<UserModel>;
  findAllCompanies: Array<CompanyModel>;
  findCompany: CompanyModel;
  findCompanyByName: CompanyModel;
  findAllCounters: Array<CounterModel>;
  findAllCompanyCounters: Array<CounterModel>;
  findLatest: StatisticsModel;
  findAllStatistics: Array<StatisticsModel>;
  findStatisticsFromCounters: Array<CountersLastStatistics>;
  findGraphicsStatistics: Array<Array<StatisticsModel>>;
};


export type QueryFindCompanyUsersArgs = {
  companyId: Scalars['Float'];
};


export type QueryFindCompanyArgs = {
  id: Scalars['Float'];
};


export type QueryFindCompanyByNameArgs = {
  name: Scalars['String'];
};


export type QueryFindAllCompanyCountersArgs = {
  companyId: Scalars['Float'];
};


export type QueryFindLatestArgs = {
  counterId: Scalars['Float'];
};


export type QueryFindStatisticsFromCountersArgs = {
  countersIds: Array<Scalars['Float']>;
};


export type QueryFindGraphicsStatisticsArgs = {
  countersIds: Array<Scalars['Float']>;
};

export type RegisterCounterResponse = {
  __typename?: 'RegisterCounterResponse';
  counter: CounterModel;
};

export enum Role {
  BaseUser = 'BaseUser',
  Admin = 'Admin'
}

export type StatisticsModel = {
  __typename?: 'StatisticsModel';
  /** Identifier */
  id: Scalars['Float'];
  /** When data was received */
  datetime: Scalars['DateTime'];
  /** Number of people entering */
  entering: Scalars['Float'];
  /** Number of people exiting */
  exiting: Scalars['Float'];
  /** Associated counter */
  counter: CounterModel;
};

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
  company?: Maybe<CompanyModel>;
};

export type FindAllCompanyCountersQueryVariables = Exact<{
  companyId: Scalars['Float'];
}>;


export type FindAllCompanyCountersQuery = (
  { __typename?: 'Query' }
  & { findAllCompanyCounters: Array<(
    { __typename?: 'CounterModel' }
    & Pick<CounterModel, 'id' | 'username' | 'currentVersion' | 'capacity'>
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'UserModel' }
    & Pick<UserModel, 'id' | 'username' | 'email' | 'firstname' | 'lastname'>
    & { company?: Maybe<(
      { __typename?: 'CompanyModel' }
      & Pick<CompanyModel, 'id' | 'name' | 'address' | 'postalCode' | 'phone'>
    )> }
  )> }
);

export type FindStatisticsFromCountersQueryVariables = Exact<{
  countersIds: Array<Scalars['Float']> | Scalars['Float'];
}>;


export type FindStatisticsFromCountersQuery = (
  { __typename?: 'Query' }
  & { findStatisticsFromCounters: Array<(
    { __typename?: 'CountersLastStatistics' }
    & Pick<CountersLastStatistics, 'id'>
    & { statistics: (
      { __typename?: 'StatisticsModel' }
      & Pick<StatisticsModel, 'id' | 'datetime' | 'entering' | 'exiting'>
    ) }
  )> }
);

export type FindGraphicsStatisticsQueryVariables = Exact<{
  countersIds: Array<Scalars['Float']> | Scalars['Float'];
}>;


export type FindGraphicsStatisticsQuery = (
  { __typename?: 'Query' }
  & { findGraphicsStatistics: Array<Array<(
    { __typename?: 'StatisticsModel' }
    & Pick<StatisticsModel, 'id' | 'datetime' | 'entering' | 'exiting'>
    & { counter: (
      { __typename?: 'CounterModel' }
      & Pick<CounterModel, 'id' | 'username' | 'currentVersion' | 'capacity'>
    ) }
  )>> }
);

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  companyName: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserModel' }
    & Pick<UserModel, 'id' | 'username'>
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
      & { company?: Maybe<(
        { __typename?: 'CompanyModel' }
        & Pick<CompanyModel, 'id' | 'name' | 'address' | 'postalCode' | 'phone'>
      )> }
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

export type FindCompanyUsersQueryVariables = Exact<{
  companyId: Scalars['Float'];
}>;


export type FindCompanyUsersQuery = (
  { __typename?: 'Query' }
  & { findCompanyUsers: Array<(
    { __typename?: 'UserModel' }
    & Pick<UserModel, 'id' | 'username' | 'email' | 'firstname' | 'lastname' | 'roles'>
    & { company?: Maybe<(
      { __typename?: 'CompanyModel' }
      & Pick<CompanyModel, 'id' | 'name' | 'address' | 'postalCode' | 'phone'>
    )> }
  )> }
);

export type UpdateUserMutationVariables = Exact<{
  username: Scalars['String'];
  newUsername?: Maybe<Scalars['String']>;
  newEmail?: Maybe<Scalars['String']>;
  newFirstname?: Maybe<Scalars['String']>;
  newLastname?: Maybe<Scalars['String']>;
}>;


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & { update: (
    { __typename?: 'UserModel' }
    & Pick<UserModel, 'id' | 'username' | 'email' | 'firstname' | 'lastname'>
  ) }
);

export type DeleteUserMutationVariables = Exact<{
  userId: Scalars['Float'];
}>;


export type DeleteUserMutation = (
  { __typename?: 'Mutation' }
  & { delete: (
    { __typename?: 'UserModel' }
    & Pick<UserModel, 'id' | 'username'>
  ) }
);


export const FindAllCompanyCountersDocument = gql`
    query findAllCompanyCounters($companyId: Float!) {
  findAllCompanyCounters(companyId: $companyId) {
    id
    username
    currentVersion
    capacity
  }
}
    `;

/**
 * __useFindAllCompanyCountersQuery__
 *
 * To run a query within a React component, call `useFindAllCompanyCountersQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllCompanyCountersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllCompanyCountersQuery({
 *   variables: {
 *      companyId: // value for 'companyId'
 *   },
 * });
 */
export function useFindAllCompanyCountersQuery(baseOptions: Apollo.QueryHookOptions<FindAllCompanyCountersQuery, FindAllCompanyCountersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindAllCompanyCountersQuery, FindAllCompanyCountersQueryVariables>(FindAllCompanyCountersDocument, options);
      }
export function useFindAllCompanyCountersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAllCompanyCountersQuery, FindAllCompanyCountersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindAllCompanyCountersQuery, FindAllCompanyCountersQueryVariables>(FindAllCompanyCountersDocument, options);
        }
export type FindAllCompanyCountersQueryHookResult = ReturnType<typeof useFindAllCompanyCountersQuery>;
export type FindAllCompanyCountersLazyQueryHookResult = ReturnType<typeof useFindAllCompanyCountersLazyQuery>;
export type FindAllCompanyCountersQueryResult = Apollo.QueryResult<FindAllCompanyCountersQuery, FindAllCompanyCountersQueryVariables>;
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
export const FindStatisticsFromCountersDocument = gql`
    query findStatisticsFromCounters($countersIds: [Float!]!) {
  findStatisticsFromCounters(countersIds: $countersIds) {
    id
    statistics {
      id
      datetime
      entering
      exiting
    }
  }
}
    `;

/**
 * __useFindStatisticsFromCountersQuery__
 *
 * To run a query within a React component, call `useFindStatisticsFromCountersQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindStatisticsFromCountersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindStatisticsFromCountersQuery({
 *   variables: {
 *      countersIds: // value for 'countersIds'
 *   },
 * });
 */
export function useFindStatisticsFromCountersQuery(baseOptions: Apollo.QueryHookOptions<FindStatisticsFromCountersQuery, FindStatisticsFromCountersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindStatisticsFromCountersQuery, FindStatisticsFromCountersQueryVariables>(FindStatisticsFromCountersDocument, options);
      }
export function useFindStatisticsFromCountersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindStatisticsFromCountersQuery, FindStatisticsFromCountersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindStatisticsFromCountersQuery, FindStatisticsFromCountersQueryVariables>(FindStatisticsFromCountersDocument, options);
        }
export type FindStatisticsFromCountersQueryHookResult = ReturnType<typeof useFindStatisticsFromCountersQuery>;
export type FindStatisticsFromCountersLazyQueryHookResult = ReturnType<typeof useFindStatisticsFromCountersLazyQuery>;
export type FindStatisticsFromCountersQueryResult = Apollo.QueryResult<FindStatisticsFromCountersQuery, FindStatisticsFromCountersQueryVariables>;
export const FindGraphicsStatisticsDocument = gql`
    query findGraphicsStatistics($countersIds: [Float!]!) {
  findGraphicsStatistics(countersIds: $countersIds) {
    id
    datetime
    entering
    exiting
    counter {
      id
      username
      currentVersion
      capacity
    }
  }
}
    `;

/**
 * __useFindGraphicsStatisticsQuery__
 *
 * To run a query within a React component, call `useFindGraphicsStatisticsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindGraphicsStatisticsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindGraphicsStatisticsQuery({
 *   variables: {
 *      countersIds: // value for 'countersIds'
 *   },
 * });
 */
export function useFindGraphicsStatisticsQuery(baseOptions: Apollo.QueryHookOptions<FindGraphicsStatisticsQuery, FindGraphicsStatisticsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindGraphicsStatisticsQuery, FindGraphicsStatisticsQueryVariables>(FindGraphicsStatisticsDocument, options);
      }
export function useFindGraphicsStatisticsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindGraphicsStatisticsQuery, FindGraphicsStatisticsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindGraphicsStatisticsQuery, FindGraphicsStatisticsQueryVariables>(FindGraphicsStatisticsDocument, options);
        }
export type FindGraphicsStatisticsQueryHookResult = ReturnType<typeof useFindGraphicsStatisticsQuery>;
export type FindGraphicsStatisticsLazyQueryHookResult = ReturnType<typeof useFindGraphicsStatisticsLazyQuery>;
export type FindGraphicsStatisticsQueryResult = Apollo.QueryResult<FindGraphicsStatisticsQuery, FindGraphicsStatisticsQueryVariables>;
export const RegisterDocument = gql`
    mutation register($username: String!, $email: String!, $password: String!, $firstname: String!, $lastname: String!, $companyName: String!) {
  register(
    username: $username
    email: $email
    password: $password
    firstname: $firstname
    lastname: $lastname
    companyName: $companyName
  ) {
    id
    username
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
 *      companyName: // value for 'companyName'
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
export const FindCompanyUsersDocument = gql`
    query findCompanyUsers($companyId: Float!) {
  findCompanyUsers(companyId: $companyId) {
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
}
    `;

/**
 * __useFindCompanyUsersQuery__
 *
 * To run a query within a React component, call `useFindCompanyUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindCompanyUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindCompanyUsersQuery({
 *   variables: {
 *      companyId: // value for 'companyId'
 *   },
 * });
 */
export function useFindCompanyUsersQuery(baseOptions: Apollo.QueryHookOptions<FindCompanyUsersQuery, FindCompanyUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindCompanyUsersQuery, FindCompanyUsersQueryVariables>(FindCompanyUsersDocument, options);
      }
export function useFindCompanyUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindCompanyUsersQuery, FindCompanyUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindCompanyUsersQuery, FindCompanyUsersQueryVariables>(FindCompanyUsersDocument, options);
        }
export type FindCompanyUsersQueryHookResult = ReturnType<typeof useFindCompanyUsersQuery>;
export type FindCompanyUsersLazyQueryHookResult = ReturnType<typeof useFindCompanyUsersLazyQuery>;
export type FindCompanyUsersQueryResult = Apollo.QueryResult<FindCompanyUsersQuery, FindCompanyUsersQueryVariables>;
export const UpdateUserDocument = gql`
    mutation updateUser($username: String!, $newUsername: String, $newEmail: String, $newFirstname: String, $newLastname: String) {
  update(
    username: $username
    newUsername: $newUsername
    newEmail: $newEmail
    newFirstname: $newFirstname
    newLastname: $newLastname
  ) {
    id
    username
    email
    firstname
    lastname
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      username: // value for 'username'
 *      newUsername: // value for 'newUsername'
 *      newEmail: // value for 'newEmail'
 *      newFirstname: // value for 'newFirstname'
 *      newLastname: // value for 'newLastname'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const DeleteUserDocument = gql`
    mutation deleteUser($userId: Float!) {
  delete(userId: $userId) {
    id
    username
  }
}
    `;
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;