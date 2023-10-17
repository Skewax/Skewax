/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type Directory = {
  __typename?: 'Directory';
  createdAt: Scalars['DateTime']['output'];
  directories: Array<Directory>;
  files: Array<File>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type File = {
  __typename?: 'File';
  contents: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  isPBASIC: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  writable: Scalars['Boolean']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createDirectory: Directory;
  createFile: File;
  deleteDirectory: Directory;
  deleteFile: File;
  moveDirectory: Directory;
  moveFile: File;
  renameDirectory: Directory;
  renameFile: File;
  updateFile: File;
};


export type MutationCreateDirectoryArgs = {
  name: Scalars['String']['input'];
  parentDirectory: Scalars['ID']['input'];
};


export type MutationCreateFileArgs = {
  contents: Scalars['String']['input'];
  name: Scalars['String']['input'];
};


export type MutationDeleteDirectoryArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteFileArgs = {
  id: Scalars['ID']['input'];
};


export type MutationMoveDirectoryArgs = {
  directoryId: Scalars['ID']['input'];
  id: Scalars['ID']['input'];
};


export type MutationMoveFileArgs = {
  directoryId: Scalars['ID']['input'];
  id: Scalars['ID']['input'];
};


export type MutationRenameDirectoryArgs = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};


export type MutationRenameFileArgs = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};


export type MutationUpdateFileArgs = {
  contents: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  baseDirectory: Directory;
  directory?: Maybe<Directory>;
  file?: Maybe<File>;
  me: User;
};


export type QueryDirectoryArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFileArgs = {
  id: Scalars['ID']['input'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  image: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type TestQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type TestQueryQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, email: string } };


export const TestQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TestQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<TestQueryQuery, TestQueryQueryVariables>;