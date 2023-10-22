import { observer } from 'mobx-react-lite'
import { useUserspace } from '../hooks/use-store'
import { useUi } from '../hooks/use-ui'

export const Notes = observer(() => {
  const { loading, userspace } = useUserspace()
  const uiState = useUi()

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

  if (!uiState.ui) {
    return <div>empty</div>
  }

  const ui = uiState.ui

  return (
    <>
      <div>{JSON.stringify(ui.activeLibRecord, null, 2)}</div>
      <div>{JSON.stringify(ui.getScores(), null, 2)}</div>
      <button
        className="btn"
        onClick={() => {
          userspace.startView()
        }}
      >
        start
      </button>
      <button
        className="btn"
        onClick={() => {
          ui.next()
        }}
      >
        next
      </button>
      <button
        className="btn"
        onClick={() => {
          if (ui.activeLibRecord) {
            userspace.addScore({
              libRecordId: ui.activeLibRecord.id,
              score: 1,
            })
          }
        }}
      >
        addscore
      </button>
    </>
  )
})
