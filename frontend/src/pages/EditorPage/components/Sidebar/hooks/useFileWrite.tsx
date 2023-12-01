import { useMutation } from "@apollo/client"
import { gql } from "../../../../../__generated__"

const FileWriteMutation = gql(`
mutation FileWrite($id: ID!, $contents: String!) {
  updateFile(id: $id, args: { contents: $contents}) {
    id
  }
}
`)

const useFileWrite = () => {
  const [fileWrite] = useMutation(FileWriteMutation)

  const handleFileWrite = async (id: string, contents: string) => {
    await fileWrite({
      variables: {
        id,
        contents,
      },
      update(cache, { data }) {
        if (!data?.updateFile) {
          return
        }
        cache.modify({
          id: cache.identify(data?.updateFile),
          fields: {
            contents() {
              return contents
            },
          },
        })
      }

    })
  }
  return handleFileWrite

}

export default useFileWrite
