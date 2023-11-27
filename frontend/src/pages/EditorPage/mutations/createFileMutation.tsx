import { gql } from "../../../__generated__/gql"

const createFileMutation = gql(`
mutation CreateFile($name: String!, $parent: ID!) {
  createFile(args: {name: $name, parentDirectory: $parent, contents: ""}) {
    id
    name
    contents
    isPBASIC
    writable
  }
}
`)

export default createFileMutation
