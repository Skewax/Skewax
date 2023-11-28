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

export type FileCreate = {
  contents: Scalars['String']['input'];
  name: Scalars['String']['input'];
  parentDirectory: Scalars['ID']['input'];
};

export type FileUpdate = {
  contents?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
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
  updateFile: File;
};


export type MutationCreateDirectoryArgs = {
  name: Scalars['String']['input'];
  parentDirectory: Scalars['ID']['input'];
};


export type MutationCreateFileArgs = {
  args: FileCreate;
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


export type MutationUpdateFileArgs = {
  args: FileUpdate;
  id: Scalars['ID']['input'];
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

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, name: string, email: string, image: string } };

export type RenameDirectoryMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
}>;


export type RenameDirectoryMutation = { __typename?: 'Mutation', renameDirectory: { __typename?: 'Directory', id: string, name: string } };

export type SubfolderQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type SubfolderQuery = { __typename?: 'Query', directory?: { __typename?: 'Directory', id: string, name: string, files: Array<{ __typename?: 'File', id: string, name: string, isPBASIC: boolean, writable: boolean }>, directories: Array<{ __typename?: 'Directory', id: string, name: string }> } | null };

export type GetFileContentsQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetFileContentsQuery = { __typename?: 'Query', file?: { __typename?: 'File', id: string, contents: string } | null };

export type RenameFileMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
}>;


export type RenameFileMutation = { __typename?: 'Mutation', updateFile: { __typename?: 'File', id: string, name: string, isPBASIC: boolean, writable: boolean } };

export type FileTree_FileFragment = { __typename?: 'File', id: string, name: string, isPBASIC: boolean, writable: boolean };

export type FileTree_DirectoryFragment = { __typename?: 'Directory', id: string, name: string, files: Array<{ __typename?: 'File', id: string, name: string, isPBASIC: boolean, writable: boolean }>, directories: Array<{ __typename?: 'Directory', id: string, name: string }> };

export type BaseDirectoryQueryVariables = Exact<{ [key: string]: never; }>;


export type BaseDirectoryQuery = { __typename?: 'Query', baseDirectory: { __typename?: 'Directory', id: string, name: string, files: Array<{ __typename?: 'File', id: string, name: string, isPBASIC: boolean, writable: boolean }>, directories: Array<{ __typename?: 'Directory', id: string, name: string }> } };

export type FileWriteMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  contents: Scalars['String']['input'];
}>;


export type FileWriteMutation = { __typename?: 'Mutation', updateFile: { __typename?: 'File', id: string } };

export type CreateDirectoryMutationVariables = Exact<{
  name: Scalars['String']['input'];
  parent: Scalars['ID']['input'];
}>;


export type CreateDirectoryMutation = { __typename?: 'Mutation', createDirectory: { __typename?: 'Directory', id: string, name: string, files: Array<{ __typename?: 'File', id: string, name: string, isPBASIC: boolean, writable: boolean }>, directories: Array<{ __typename?: 'Directory', id: string, name: string, files: Array<{ __typename?: 'File', id: string, name: string, isPBASIC: boolean, writable: boolean }>, directories: Array<{ __typename?: 'Directory', id: string, name: string }> }> } };

export type CreateFileMutationVariables = Exact<{
  name: Scalars['String']['input'];
  parent: Scalars['ID']['input'];
}>;


export type CreateFileMutation = { __typename?: 'Mutation', createFile: { __typename?: 'File', id: string, name: string, contents: string, isPBASIC: boolean, writable: boolean } };

export const FileTree_FileFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FileTree_File"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"File"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isPBASIC"}},{"kind":"Field","name":{"kind":"Name","value":"writable"}}]}}]} as unknown as DocumentNode<FileTree_FileFragment, unknown>;
export const FileTree_DirectoryFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FileTree_Directory"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Directory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"files"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FileTree_File"}}]}},{"kind":"Field","name":{"kind":"Name","value":"directories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FileTree_File"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"File"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isPBASIC"}},{"kind":"Field","name":{"kind":"Name","value":"writable"}}]}}]} as unknown as DocumentNode<FileTree_DirectoryFragment, unknown>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const RenameDirectoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RenameDirectory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"renameDirectory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<RenameDirectoryMutation, RenameDirectoryMutationVariables>;
export const SubfolderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Subfolder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"directory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FileTree_Directory"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FileTree_File"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"File"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isPBASIC"}},{"kind":"Field","name":{"kind":"Name","value":"writable"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FileTree_Directory"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Directory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"files"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FileTree_File"}}]}},{"kind":"Field","name":{"kind":"Name","value":"directories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<SubfolderQuery, SubfolderQueryVariables>;
export const GetFileContentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFileContents"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"file"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"contents"}}]}}]}}]} as unknown as DocumentNode<GetFileContentsQuery, GetFileContentsQueryVariables>;
export const RenameFileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RenameFile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateFile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"args"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FileTree_File"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FileTree_File"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"File"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isPBASIC"}},{"kind":"Field","name":{"kind":"Name","value":"writable"}}]}}]} as unknown as DocumentNode<RenameFileMutation, RenameFileMutationVariables>;
export const BaseDirectoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"BaseDirectory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"baseDirectory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FileTree_Directory"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FileTree_File"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"File"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isPBASIC"}},{"kind":"Field","name":{"kind":"Name","value":"writable"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FileTree_Directory"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Directory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"files"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FileTree_File"}}]}},{"kind":"Field","name":{"kind":"Name","value":"directories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<BaseDirectoryQuery, BaseDirectoryQueryVariables>;
export const FileWriteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"FileWrite"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"contents"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateFile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"args"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"contents"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contents"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<FileWriteMutation, FileWriteMutationVariables>;
export const CreateDirectoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateDirectory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"parent"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createDirectory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"parentDirectory"},"value":{"kind":"Variable","name":{"kind":"Name","value":"parent"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"files"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FileTree_File"}}]}},{"kind":"Field","name":{"kind":"Name","value":"directories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FileTree_Directory"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FileTree_File"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"File"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isPBASIC"}},{"kind":"Field","name":{"kind":"Name","value":"writable"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FileTree_Directory"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Directory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"files"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FileTree_File"}}]}},{"kind":"Field","name":{"kind":"Name","value":"directories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateDirectoryMutation, CreateDirectoryMutationVariables>;
export const CreateFileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateFile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"parent"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createFile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"args"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"parentDirectory"},"value":{"kind":"Variable","name":{"kind":"Name","value":"parent"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"contents"},"value":{"kind":"StringValue","value":"","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"contents"}},{"kind":"Field","name":{"kind":"Name","value":"isPBASIC"}},{"kind":"Field","name":{"kind":"Name","value":"writable"}}]}}]}}]} as unknown as DocumentNode<CreateFileMutation, CreateFileMutationVariables>;