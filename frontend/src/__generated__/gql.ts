/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query Me {\n    me {\n      id\n      name\n      email\n      image\n    }\n  }\n\n": types.MeDocument,
    "\nquery Subfolder($id: ID!) {\n  directory(id: $id) {\n    ...FileTree_Directory\n  }\n}\n": types.SubfolderDocument,
    "\nfragment FileTree_File on File {\n  id\n  name\n  isPBASIC\n  writable\n}\nfragment FileTree_Directory on Directory {\n  id\n  name\n  files {\n    ...FileTree_File\n  }\n  directories {\n    id\n    name\n  }\n}\n": types.FileTree_FileFragmentDoc,
    "\nquery BaseDirectory {\n  baseDirectory {\n    ...FileTree_Directory\n  }\n}\n": types.BaseDirectoryDocument,
    "\nmutation CreateDirectory($name: String!, $parent: ID!) {\n  createDirectory(name: $name, parentDirectory: $parent) {\n    id\n    name\n    files {\n      ...FileTree_File\n    }\n    directories {\n      id\n      name\n      files {\n        id\n        name\n      }\n      directories {\n        id\n        name\n      }\n    }\n  }\n}": types.CreateDirectoryDocument,
    "\nmutation CreateFile($name: String!, $contents: String!, $parent: String!) {\n  createFile(args: {name: $name, contents: $contents, parent: $parent}) {\n    ...FileTree_File\n  }\n}\n": types.CreateFileDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Me {\n    me {\n      id\n      name\n      email\n      image\n    }\n  }\n\n"): (typeof documents)["\n  query Me {\n    me {\n      id\n      name\n      email\n      image\n    }\n  }\n\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery Subfolder($id: ID!) {\n  directory(id: $id) {\n    ...FileTree_Directory\n  }\n}\n"): (typeof documents)["\nquery Subfolder($id: ID!) {\n  directory(id: $id) {\n    ...FileTree_Directory\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nfragment FileTree_File on File {\n  id\n  name\n  isPBASIC\n  writable\n}\nfragment FileTree_Directory on Directory {\n  id\n  name\n  files {\n    ...FileTree_File\n  }\n  directories {\n    id\n    name\n  }\n}\n"): (typeof documents)["\nfragment FileTree_File on File {\n  id\n  name\n  isPBASIC\n  writable\n}\nfragment FileTree_Directory on Directory {\n  id\n  name\n  files {\n    ...FileTree_File\n  }\n  directories {\n    id\n    name\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery BaseDirectory {\n  baseDirectory {\n    ...FileTree_Directory\n  }\n}\n"): (typeof documents)["\nquery BaseDirectory {\n  baseDirectory {\n    ...FileTree_Directory\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation CreateDirectory($name: String!, $parent: ID!) {\n  createDirectory(name: $name, parentDirectory: $parent) {\n    id\n    name\n    files {\n      ...FileTree_File\n    }\n    directories {\n      id\n      name\n      files {\n        id\n        name\n      }\n      directories {\n        id\n        name\n      }\n    }\n  }\n}"): (typeof documents)["\nmutation CreateDirectory($name: String!, $parent: ID!) {\n  createDirectory(name: $name, parentDirectory: $parent) {\n    id\n    name\n    files {\n      ...FileTree_File\n    }\n    directories {\n      id\n      name\n      files {\n        id\n        name\n      }\n      directories {\n        id\n        name\n      }\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation CreateFile($name: String!, $contents: String!, $parent: String!) {\n  createFile(args: {name: $name, contents: $contents, parent: $parent}) {\n    ...FileTree_File\n  }\n}\n"): (typeof documents)["\nmutation CreateFile($name: String!, $contents: String!, $parent: String!) {\n  createFile(args: {name: $name, contents: $contents, parent: $parent}) {\n    ...FileTree_File\n  }\n}\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;