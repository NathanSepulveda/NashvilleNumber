/** @jsxImportSource @emotion/react */
import tw, {css} from "twin.macro";
import React, { useState, useEffect, useRef } from "react";
import { createPopper } from "@popperjs/core";

const ChordBox = tw.div`w-12 h-12 bg-blue-300 rounded-lg flex justify-center items-center cursor-pointer`;


function randomUniqueNum(range, outputCount) {

  let arr = []
  for (let i = 0; i <= range; i++) {
    arr.push(i)
  }

  let result = [];

  for (let i = 1; i <= outputCount; i++) {
    const random = Math.floor(Math.random() * (range - i));
    result.push(arr[random]);
    arr[random] = arr[range - i];
  }

  return result;
}



const Dropdown = ({ color }) => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start"
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  // bg colors
  let bgColor;
  color === "white"
    ? (bgColor = "bg-blueGray-700")
    : (bgColor = "bg-" + color + "-500");
  return (
    <>
      <div tw="flex flex-wrap">
        <div tw="w-full sm:w-6/12 md:w-4/12 px-4">
          <div tw="relative inline-flex align-middle w-full">
            <button
              tw={
                "text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none bg-red-100 focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 "

              }
              type="button"
              ref={btnDropdownRef}
              onClick={() => {
                dropdownPopoverShow
                  ? closeDropdownPopover()
                  : openDropdownPopover();
              }}
            >
              {color === "white" ? "White Dropdown" : color + " Dropdown"}
            </button>
            <div
              ref={popoverDropdownRef}

              css={[tw`text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1 bg-white `, dropdownPopoverShow ? tw`block` :tw`hidden`]} 
              style={{ minWidth: "12rem" }}
            >
              <a
                href="#pablo"
                tw=
                  "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-white"
                
                onClick={e => e.preventDefault()}
              >
                Action
              </a>
              <a
                href="#pablo"
                tw=
                  "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-white"
                
                onClick={e => e.preventDefault()}
              >
                Another action
              </a>
              <a
                href="#pablo"
                tw=
                  "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-white"
                onClick={e => e.preventDefault()}
              >
                Something else here
              </a>
              <div tw="h-0 my-2 border border-solid border-t-0 border-blue-800 opacity-25" />
              <a
                href="#pablo"
                tw=
                  "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-white"
                onClick={e => e.preventDefault()}
              >
                Seprated link
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const MusicKeys = [
  {
    key: "Cmaj",
    chords: [
      { role: "1", name: "C", numeral: "I" },
      { role: "2m", name: "Dm", numeral: "ii" },
      { role: "3m", name: "Em", numeral: "iii" },
      { role: "4", name: "F", numeral: "IV" },
      { role: "5", name: "G", numeral: "V" },
      { role: "6m", name: "Am", numeral: "vi" },
      { role: "7dim", name: "Bdim", numeral: "viiº" },
    ],
  },
  {
    key: "Gmaj",
    chords: [
      { role: "1", name: "G", numeral: "I" },
      { role: "2m", name: "Am", numeral: "ii" },
      { role: "3m", name: "Bm", numeral: "iii" },
      { role: "4", name: "C", numeral: "IV" },
      { role: "5", name: "D", numeral: "V" },
      { role: "6m", name: "Em", numeral: "vi" },
      { role: "7dim", name: "F#dim", numeral: "viiº" },
    ],
  },
  {
    key: "Dmaj",
    chords: [
      { role: "1", name: "D", numeral: "I" },
      { role: "2m", name: "Em", numeral: "ii" },
      { role: "3m", name: "F#m", numeral: "iii" },
      { role: "4", name: "G", numeral: "IV" },
      { role: "5", name: "A", numeral: "V" },
      { role: "6m", name: "Bm", numeral: "vi" },
      { role: "7dim", name: "C#dim", numeral: "viiº" },
    ],
  },
];

function getRandomInt() {
  return Math.floor(Math.random() * 7);
}


const SettingsModal = props => {
  return (
    
      <>
        <div
          tw="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        >
          <div tw="relative w-auto my-6 mx-auto max-w-2xl">
            {/*content*/}
            <div tw="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div tw="flex items-start justify-between p-5 border-b border-solid border-gray-500 rounded-t">
                <h3 tw="text-3xl font-semibold text-black">
                  Settings
                </h3>
                <button
                  tw="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => props.setShowModal(false)}
                >
                  <span tw="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              {/*body*/}
              <div tw="relative p-6 flex-auto">
              <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                    I always felt like I could do anything. That’s the main
                    thing people are controlled by! Thoughts- their perception
                    of themselves! They're slowed down by their perception of
                    themselves. If you're taught you can’t do anything, you
                    won’t do anything. I was taught I could do everything.
                  </p>
              <div tw='text-black'>
                {Object.keys(GameModes).map(gm => <div onClick={() => props.setGameMode(GameModes[gm])} >{gm}</div>)}
              </div>
              <Dropdown color="white" />
              </div>
              {/*footer*/}
              <div tw="flex items-center justify-end p-6 border-t border-solid border-gray-200 rounded-b">
                <button
                  tw="text-red-500 bg-opacity-60 font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => props.setShowModal(false)}
                >
                  Close
                </button>
                <button
                  tw="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => props.setShowModal(false)}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
        <div tw="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>

  )
}

const GameModes = {
  TRAINING: "TRAINING",
  KEY: "KEY"
}

function App() {
  const [currentItem, setCurrentItem] = useState(getRandomInt());
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [currentKeyIndex, setCurrentKeyIndex] = useState(2)
  const [showModal, setShowModal] = useState(false)
  const [uniqueArray, setUniqueArray] = useState(randomUniqueNum(8, 8))
  const [gameMode, setGameMode] = useState(GameModes.NUMBER)


  useEffect(() => {
    setCurrentItem(uniqueArray[0])
  }, [])

  const handleSelection = (idx) => {
    if (idx === currentItem) {
      // alert("correct");
      setScore((prev) => prev + 1);
    } else {
      // alert("incorrect");
    }
    setTotalQuestions((prev) => prev + 1);
    // console.log(uniqueArray.indexOf(currentItem), uniqueArray)
    setCurrentItem(getRandomInt());
  };

  return (

    <div tw="flex flex-col h-screen bg-Softblack items-center px-3 py-3 text-white">
      <h1 tw="text-2xl my-2">Nashville Number System Quiz</h1>
      <div tw='text-xl w-full my-4'>  
        <div >Key: {MusicKeys[currentKeyIndex].key}</div>
        <div >
          Score: {score}/{totalQuestions}
        </div>
        <div onClick={() => setShowModal(true)} >Settings</div>
      </div>

      <div tw="my-8 flex">
        <div tw="text-blue-500 text-7xl w-60 bg-white h-96 rounded-xl flex justify-center items-center transform rotate-12 border border-black"
        css={css({ transform: 'rotate(10deg)' })}>

        </div>
        <div tw="text-blue-500 text-7xl w-60 bg-white h-96 rounded-xl flex justify-center items-center transform rotate-3 z-10 absolute border border-black">
          {MusicKeys[currentKeyIndex].chords[currentItem].name}
        </div>
        {gameMode == GameModes.KEY ?         <div tw="text-blue-500 text-7xl w-60 bg-white h-96 rounded-xl flex justify-center items-center transform rotate-1 shadow-2xl z-40 absolute border border-black bg-gray-200 ">
          {MusicKeys[currentKeyIndex].chords[currentItem].name}
        </div> :         <div tw="text-blue-500 text-7xl w-60 bg-white h-96 rounded-xl flex justify-center items-center transform rotate-1 shadow-2xl z-40 absolute border border-black bg-gray-200 ">
          {MusicKeys[currentKeyIndex].chords[currentItem].role}
        </div>}

        <div tw="text-blue-500 text-7xl w-60 bg-white h-96 rounded-xl flex justify-center items-center transform absolute border border-black"
        css={css({ transform: 'rotate(-2deg)' })}
        >
          {MusicKeys[currentKeyIndex].chords[currentItem].name}
        </div>
      </div>

      <div tw="flex absolute bottom-10">
        {MusicKeys[currentKeyIndex].chords.map((chord, idx) => (
          
          <ChordBox onClick={() => handleSelection(idx)} tw="mx-1">
            {gameMode == GameModes.KEY ? chord.role : chord.name}
          </ChordBox>
        ))}
      </div>
      {showModal ? (<SettingsModal setShowModal={setShowModal} setGameMode={setGameMode}/>) : null}
    </div>
    // {showModal ? (<SettingsModal setShowModal={setShowModal}/>) : null}

  );
}

export default App;
