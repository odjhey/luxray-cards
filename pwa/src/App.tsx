import { useState } from 'react'
import './App.css'

function App() {
  return (
    <>
      <div className="h-screen w-screen">
        <FlashCard></FlashCard>
      </div>
    </>
  )
}

// TODO: content and sub and etc could be a react node
const SingleCard = (props: {
  contents: { content: string; sub: string; help: string }
  options: { showSub: boolean; showHelp: boolean }
}) => {
  const { content, sub, help } = props.contents
  const { showSub, showHelp } = props.options

  return (
    <div className="flex flex-col justify-center items-center border border-dashed border-primary h-full w-full">
      <div className="text-9xl py-4">{content}</div>
      <div className={`text-4xl ${showSub ? '' : 'hidden'}`}>{sub}</div>
      <div className={`text-xl ${showHelp ? '' : 'hidden'}`}>{help}</div>
    </div>
  )
}

const FlashCard = () => {
  const [options, setOptions] = useState<{
    showSub: boolean
    showHelp: boolean
  }>({
    showSub: false,
    showHelp: false,
  })

  return (
    <div className="flex flex-col h-full w-full border border-solid border-primary items-center">
      <div className="flex p-2">
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Show Sub</span>
            <input
              type="radio"
              name="radio-show-sub"
              className="radio radio-sm"
              checked={options.showSub}
              onChange={() => {}}
              onClick={() => {
                setOptions((prev) => ({ ...prev, showSub: !prev.showSub }))
              }}
            />
          </label>
        </div>

        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Show Help</span>
            <input
              type="radio"
              name="radio-show-help"
              className="radio radio-sm"
              checked={options.showHelp}
              onChange={() => {}}
              onClick={() => {
                setOptions((prev) => ({ ...prev, showHelp: !prev.showHelp }))
              }}
            />
          </label>
        </div>
      </div>
      <div className="h-full w-full">
        <SingleCard
          contents={{
            content: '好き',
            sub: 'すき',
            help: 'suki',
          }}
          options={{
            showSub: options.showSub,
            showHelp: options.showHelp,
          }}
        />
      </div>
      <div className="flex gap-2 p-2">
        <button className="btn btn-primary">action</button>
        <button className="btn btn-secondary">action</button>
      </div>
    </div>
  )
}

export default App
