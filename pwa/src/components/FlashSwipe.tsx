import { useState } from 'react'
import { tmpData } from '../data/kanji'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/effect-cube'

import { EffectCube } from 'swiper/modules'

// TODO: content and sub and etc could be a react node
const SingleCard = (props: {
  contents: { content: string; sub: string; help: string }
  options: { showSub: boolean; showHelp: boolean }
}) => {
  const { content, sub, help } = props.contents
  const { showSub, showHelp } = props.options

  const [pressSettings, setPressSettings] = useState({
    showHelp: false,
    showSub: false,
  })

  return (
    <div className="flex flex-col border border-dashed border-primary h-full w-full p-1">
      <div className="flex flex-col justify-center items-center h-full w-full">
        <div className="text-9xl py-4">{content}</div>
        <div
          className={`text-4xl ${
            showSub || pressSettings.showSub ? '' : 'invisible'
          }`}
        >
          {sub}
        </div>
        <div
          className={`text-xl ${
            showHelp || pressSettings.showHelp ? '' : 'invisible'
          }`}
        >
          {help}
        </div>
      </div>

      <div className="flex gap-1">
        {/* TODO: convert to press down and press release */}
        <button
          type="button"
          className="btn"
          onClick={() => {
            setPressSettings((prev) => ({ ...prev, showSub: !prev.showSub }))
          }}
        >
          kana
        </button>
        <button
          type="button"
          className="btn"
          onClick={() => {
            setPressSettings((prev) => ({ ...prev, showHelp: !prev.showHelp }))
          }}
        >
          en
        </button>
      </div>
    </div>
  )
}

export const FlashCard = () => {
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
        <Swiper
          className="h-full w-full"
          effect="cube"
          cubeEffect={{
            shadow: false,
            slideShadows: false,
          }}
          modules={[EffectCube]}
        >
          {tmpData.map((v) => (
            <SwiperSlide key={v.kanji}>
              <SingleCard
                contents={{
                  content: v.kanji,
                  sub: v.furigana.on,
                  help: `${v.romaji} - ${v.en}`,
                }}
                options={{
                  showSub: options.showSub,
                  showHelp: options.showHelp,
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="flex gap-2 p-2">
        <button className="btn btn-primary">action</button>
        <button className="btn btn-secondary">action</button>
      </div>
    </div>
  )
}
