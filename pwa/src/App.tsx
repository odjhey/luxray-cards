import { PropsWithChildren, useState } from 'react'
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

const CardEntry = (props: PropsWithChildren) => {
  return (
    <div className="flex justify-center items-center border border-dashed border-secondary h-full w-full">
      {props.children}
    </div>
  )
}

const DisplayText = (props: PropsWithChildren<{ show: boolean }>) => {
  const [show, setShow] = useState(props.show)

  return (
    <div className="flex w-full justify-between p-4">
      <div className={`flex justify-center items-center w-full`}>
        <div className={`text-5xl ${show ? '' : 'hidden'}`}>
          {props.children}
        </div>
      </div>
      <button
        className="btn"
        type="button"
        onClick={() => {
          setShow((v) => !v)
        }}
      >
        action
      </button>
    </div>
  )
}

const FlashCard = () => {
  return (
    <div className="flex flex-col h-full w-full border border-solid border-primary justify-evenly items-center">
      <CardEntry>
        <DisplayText show={true}>好き</DisplayText>
      </CardEntry>
      <CardEntry>
        <DisplayText show={false}>すき</DisplayText>
      </CardEntry>
      <CardEntry>
        <DisplayText show={false}>suki</DisplayText>
      </CardEntry>
    </div>
  )
}

export default App
