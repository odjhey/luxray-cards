import { observer } from 'mobx-react-lite'
import { useUi } from '../hooks/use-ui'
import { useState } from 'react'

export const Notes = observer(() => {
  const { loading, ui } = useUi()
  const [showOptions, setShowOptions] = useState<{
    showSub: boolean
    showNotes: boolean
  }>({ showNotes: false, showSub: false })

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
      <div className="flex flex-col justify-center items-center w-full h-full p-2 gap-1">
        <div className="flex flex-col justify-center items-center border border-dashed border-primary w-full h-full gap-2">
          <div className="flex gap-1">
            {ui
              .getScores()
              ?.slice(0, 5)
              .map((v) => (
                <div
                  key={v.date.toISOString()}
                  className="badge-sm badge badge-ghost gap-1"
                >
                  {v.score}
                </div>
              ))}
          </div>
          <div className="text-8xl">{title}</div>
          <div className={`text-2xl ${showOptions.showSub ? '' : 'invisible'}`}>
            {sub}
          </div>
          <div
            className={`text-lg ${showOptions.showNotes ? '' : 'invisible'}`}
          >
            {notes}
          </div>
        </div>

        <div className="flex flex-row gap-1 p-2 border border-solid border-secondary w-full h-full">
          <div className="flex justify-end flex-col gap-1">
            {([1, 2, 3, 4] as const).map((v) => (
              <button
                key={`${v}-score`}
                className="btn btn-lg"
                onClick={() => {
                  if (ui.activeLibRecord) {
                    ui.scores?.addScore({
                      libRecordId: ui.activeLibRecord.id,
                      score: v,
                    })
                    ui.next()
                  }
                }}
              >
                {v}
              </button>
            ))}

            <button
              className="btn btn-lg btn-secondary"
              onClick={() => {
                ui.next()
              }}
            >
              next
            </button>
          </div>
          <div className="flex flex-col justify-end gap-1">
            <button
              className="btn btn-lg"
              onClick={() => {
                setShowOptions({
                  ...showOptions,
                  showSub: !showOptions.showSub,
                })
              }}
            >
              furi
            </button>
            <button
              className="btn btn-lg"
              onClick={() => {
                setShowOptions({
                  ...showOptions,
                  showNotes: !showOptions.showNotes,
                })
              }}
            >
              en
            </button>
            <div className="divider"></div>
            <button
              className="btn"
              onClick={() => {
                ui.prev()
              }}
            >
              prev
            </button>
            <button
              className="btn"
              onClick={() => {
                ui.shuffle()
              }}
            >
              shuffle
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

          <div className="flex flex-col justify-end items-center gap-1">
            {ui.scoreFilters.map((v, i) => (
              <div key={i}>
                {v.score}x{v.count}
              </div>
            ))}
            <button
              className="btn btn-md"
              onClick={() => {
                ui.addFilter({ count: 4, score: 4 })
              }}
            >
              4 x 4
            </button>
            <button
              className="btn btn-md"
              onClick={() => {
                ui.clearFilters()
              }}
            >
              clear
            </button>
            <button
              className="btn btn-md"
              onClick={() => {
                ui.applyFilters()
              }}
            >
              apply
            </button>
          </div>
          <div className="flex flex-col justify-start gap-1">
            {ui.displayableStats().count}
          </div>
        </div>
      </div>
    </>
  )
})
