import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

import './App.css'

const tmpData: {
  kanji: string
  furigana: string
  romaji: string
  en: string
}[] = [
  {
    kanji: '人',
    furigana: 'ひと',
    romaji: 'hito',
    en: 'person',
  },
  {
    kanji: '大',
    furigana: 'だい',
    romaji: 'dai',
    en: 'big',
  },
  {
    kanji: '年',
    furigana: 'ねん',
    romaji: 'nen',
    en: 'year',
  },
  {
    kanji: '日',
    furigana: 'ひ',
    romaji: 'hi',
    en: 'day',
  },
  {
    kanji: '中',
    furigana: 'ちゅう',
    romaji: 'chuu',
    en: 'middle',
  },
  {
    kanji: '時',
    furigana: 'じ',
    romaji: 'ji',
    en: 'time/hour',
  },
  {
    kanji: '上',
    furigana: 'うえ',
    romaji: 'ue',
    en: 'up/above',
  },
  {
    kanji: '下',
    furigana: 'した',
    romaji: 'shita',
    en: 'down/below',
  },
  {
    kanji: '見',
    furigana: 'みる',
    romaji: 'miru',
    en: 'see',
  },
  {
    kanji: '口',
    furigana: 'くち',
    romaji: 'kuchi',
    en: 'mouth',
  },
  {
    kanji: '山',
    furigana: 'やま',
    romaji: 'yama',
    en: 'mountain',
  },
  {
    kanji: '出',
    furigana: 'でる',
    romaji: 'deru',
    en: 'exit',
  },
  {
    kanji: '手',
    furigana: 'て',
    romaji: 'te',
    en: 'hand',
  },
  {
    kanji: '目',
    furigana: 'め',
    romaji: 'me',
    en: 'eye',
  },
  {
    kanji: '田',
    furigana: 'た',
    romaji: 'ta',
    en: 'rice field',
  },
  {
    kanji: '前',
    furigana: 'まえ',
    romaji: 'mae',
    en: 'before',
  },
  {
    kanji: '生',
    furigana: 'うむ',
    romaji: 'umu',
    en: 'birth/life',
  },
  {
    kanji: '子',
    furigana: 'こ',
    romaji: 'ko',
    en: 'child',
  },
  {
    kanji: '女',
    furigana: 'おんな',
    romaji: 'onna',
    en: 'woman',
  },
  {
    kanji: '男',
    furigana: 'おとこ',
    romaji: 'otoko',
    en: 'man',
  },
]

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
        <Swiper className="h-full w-full">
          {tmpData.map((v) => (
            <SwiperSlide key={v.kanji}>
              <SingleCard
                contents={{
                  content: v.kanji,
                  sub: v.furigana,
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

export default App
