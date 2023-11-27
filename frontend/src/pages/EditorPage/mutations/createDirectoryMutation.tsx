import { gql } from "../../../__generated__/gql"

const createDirectoryMutation = gql(`
mutation CreateDirectory($name: String!, $parent: ID!) {
  createDirectory(name: $name, parentDirectory: $parent) {
    id
    name
    files {
      ...FileTree_File
    }
    directories {
      ...FileTree_Directory
    }
  }
}
`)
export default createDirectoryMutation
