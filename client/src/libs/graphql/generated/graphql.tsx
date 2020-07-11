import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: 'Mutation';
  addTodo: Todo;
  deleteTodo: Todo;
};


export type MutationAddTodoArgs = {
  content: Scalars['String'];
};


export type MutationDeleteTodoArgs = {
  id: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  viewer: User;
  todos?: Maybe<Array<Todo>>;
};

export type Todo = {
  __typename?: 'Todo';
  id: Scalars['Int'];
  content: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  name: Scalars['String'];
};

export type AddTodoMutationVariables = Exact<{
  content: Scalars['String'];
}>;


export type AddTodoMutation = (
  { __typename?: 'Mutation' }
  & { addTodo: (
    { __typename?: 'Todo' }
    & Pick<Todo, 'id' | 'content'>
  ) }
);

export type GetTodoQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTodoQuery = (
  { __typename?: 'Query' }
  & { todos?: Maybe<Array<(
    { __typename?: 'Todo' }
    & Pick<Todo, 'id' | 'content'>
  )>> }
);


export const AddTodoDocument = gql`
    mutation addTodo($content: String!) {
  addTodo(content: $content) {
    id
    content
  }
}
    `;
export type AddTodoMutationFn = ApolloReactCommon.MutationFunction<AddTodoMutation, AddTodoMutationVariables>;

/**
 * __useAddTodoMutation__
 *
 * To run a mutation, you first call `useAddTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTodoMutation, { data, loading, error }] = useAddTodoMutation({
 *   variables: {
 *      content: // value for 'content'
 *   },
 * });
 */
export function useAddTodoMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddTodoMutation, AddTodoMutationVariables>) {
        return ApolloReactHooks.useMutation<AddTodoMutation, AddTodoMutationVariables>(AddTodoDocument, baseOptions);
      }
export type AddTodoMutationHookResult = ReturnType<typeof useAddTodoMutation>;
export type AddTodoMutationResult = ApolloReactCommon.MutationResult<AddTodoMutation>;
export type AddTodoMutationOptions = ApolloReactCommon.BaseMutationOptions<AddTodoMutation, AddTodoMutationVariables>;
export const GetTodoDocument = gql`
    query getTodo {
  todos {
    id
    content
  }
}
    `;

/**
 * __useGetTodoQuery__
 *
 * To run a query within a React component, call `useGetTodoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTodoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTodoQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTodoQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetTodoQuery, GetTodoQueryVariables>) {
        return ApolloReactHooks.useQuery<GetTodoQuery, GetTodoQueryVariables>(GetTodoDocument, baseOptions);
      }
export function useGetTodoLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetTodoQuery, GetTodoQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetTodoQuery, GetTodoQueryVariables>(GetTodoDocument, baseOptions);
        }
export type GetTodoQueryHookResult = ReturnType<typeof useGetTodoQuery>;
export type GetTodoLazyQueryHookResult = ReturnType<typeof useGetTodoLazyQuery>;
export type GetTodoQueryResult = ApolloReactCommon.QueryResult<GetTodoQuery, GetTodoQueryVariables>;