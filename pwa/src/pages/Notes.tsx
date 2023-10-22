import { observer } from 'mobx-react-lite'
import { useUi } from '../hooks/use-ui'
import dayjs from 'dayjs'

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

  const { title, sub, notes } = ui.getActive()

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full h-full">
        <div className="flex flex-col justify-center items-center">
          <div className="text-8xl">{title}</div>
          <div className="text-2xl">{sub}</div>
          <div className="text-lg">{notes}</div>
        </div>

        <div className="flex flex-col gap-1 p-2">
          <div className="flex justify-between">
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
                ui.startView()
              }}
            >
              start
            </button>
          </div>
          <div className="flex gap-1">
            {([1, 2, 3, 4] as const).map((v) => (
              <button
                key={`${v}-score`}
                className="btn"
                onClick={() => {
                  if (ui.activeLibRecord) {
                    ui.scores?.addScore({
                      libRecordId: ui.activeLibRecord.id,
                      score: v,
                    })
                  }
                }}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        <div className="max-h-0.5">
          {ui.getScores()?.map((v) => (
            <div key={v.date.toISOString()}>
              {dayjs(v.date).format('YYYY MMM DD')} - {v.score}
            </div>
          ))}
        </div>
      </div>
    </>
  )
})
