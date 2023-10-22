import { observer } from 'mobx-react-lite'
import { useUi } from '../hooks/use-ui'

export const Notes = observer(() => {
  const { loading, ui } = useUi()

  if (loading) {
    return (
      <>
        <div>loading</div>
      </>
    )
  }

  if (!ui) {
    return <div>empty</div>
  }

  return (
    <>
      <div>{JSON.stringify(ui.activeLibRecord, null, 2)}</div>
      <div>{JSON.stringify(ui.getScores(), null, 2)}</div>
      <button
        className="btn"
        onClick={() => {
          ui.startView()
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
            ui.scores?.addScore({
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
