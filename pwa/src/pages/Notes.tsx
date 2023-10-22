import { observer } from 'mobx-react-lite'
import { useUserspace } from '../hooks/use-store'

export const Notes = observer(() => {
  const { loading, userspace } = useUserspace()

  if (loading) {
    return (
      <>
        <div>loading</div>
      </>
    )
  }

  if (!userspace) {
    return <div>empty</div>
  }

  return (
    <>
      <div>{JSON.stringify(userspace.libRecords, null, 2)}</div>
      <button
        className="btn"
        onClick={() => {
          userspace.newNote({ id: Date.now().toString(), content: 'sdlkfj' })
        }}
      >
        add
      </button>
    </>
  )
})
