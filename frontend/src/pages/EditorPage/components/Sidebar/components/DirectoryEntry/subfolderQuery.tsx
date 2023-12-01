import { gql } from "../../../../../../__generated__/gql"

const subfolderQuery = gql(`
query Subfolder($id: ID!) {
  directory(id: $id) {
    ...FileTree_Directory
  }
}
`)

export default subfolderQuery
