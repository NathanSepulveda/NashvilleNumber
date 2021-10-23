/** @jsxImportSource @emotion/react */
import tw, { css } from "twin.macro";
import { useState, useEffect } from "react";
import "./App.css";
import { MusicKeys } from "./Keys";
import LogRocket from 'logrocket';

import { keyframes } from 'styled-components'
const breatheAnimation = keyframes`
 0% { opacity: 0.8;}
 50% { opacity: 0.3; }
 100% {  opacity: 0.8; }
`


const ChordBox = tw.div`rounded-lg flex justify-center items-center cursor-pointer `;

const KeyBox = tw.div`w-14 h-12 bg-gray-400 rounded-lg flex justify-center items-center cursor-pointer hover:bg-green-300 `;

const FlashCard = tw.div`text-Softblack text-7xl  rounded-xl flex justify-center items-center `


const SettingsBox = tw.div`w-36 h-12 bg-gray-400 rounded-lg flex justify-center items-center cursor-pointer md:hover:bg-green-300 `;







function randomUniqueNum(range, outputCount) {
  let arr = [];
  for (let i = 0; i <= range; i++) {
    arr.push(i);
  }

  let result = [];

  for (let i = 1; i <= outputCount; i++) {
    const random = Math.floor(Math.random() * (range - i));
    result.push(arr[random]);
    arr[random] = arr[range - i];
  }

  return result;
}

function getRandomInt() {
  return Math.floor(Math.random() * 7);
}


const ScoreModal = (props) => {
  return (
    <>
      <div tw="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div tw="relative w-full my-6 mx-auto max-w-sm lg:max-w-xl">
          {/*content*/}
          <div tw="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div tw="flex items-center   p-5 border-b border-solid border-gray-500 rounded-t">
              <h3 className="settingsHeader" tw="text-3xl font-semibold text-black">High Score</h3>
            </div>
            Hey good job your score was __
            <div>
              hi
            </div>
            {/*footer*/}
            <div tw="flex items-center justify-end py-4 border-t border-solid border-gray-200 rounded-b">
              <button
                tw="text-green-500 bg-opacity-60 font-bold uppercase px-4 py-1 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => props.setTimerState(TimerStates.INACTIVE)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div tw="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

const SettingsModal = (props) => {
  return (
    <>
      <div tw="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div tw="relative w-full my-6 mx-auto max-w-sm lg:max-w-xl">
          {/*content*/}
          <div tw="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div tw="flex items-center   p-5 border-b border-solid border-gray-500 rounded-t">
              <h3 className="settingsHeader" tw="text-3xl font-semibold text-black">Settings</h3>
            </div>
            {/*body*/}
            <div tw="relative p-4 text-black justify-items-center">
              <p tw="my-2 text-lg leading-relaxed">
                Change the key:
              </p>

              <div tw="text-black grid  grid-cols-6 gap-2 justify-items-center">
                {MusicKeys.map((k, i) => (
                  <KeyBox
                    style={{
                      backgroundColor:
                        i === props.currentKeyIndex && "rgba(16, 185, 129,1)",
                      color: i === props.currentKeyIndex && "white",
                    }}
                    // selected={(i === props.currentKeyIndex)}
                    onClick={() => props.setCurrentKeyIndex(i)}
                  >
                    {k.key}
                  </KeyBox>
                ))}
              </div>
              <div tw="text-black flex   mt-6  ">
                <SettingsBox
                  style={{
                    backgroundColor:
                      props.gameMode === GameModes.TRAINING &&
                      "rgba(16, 185, 129,1)",
                      color: props.gameMode === GameModes.TRAINING && "white"
                  }}
                  onClick={() =>
                    props.setGameMode((prev) =>
                      prev === GameModes.TRAINING
                        ? GameModes.KEY
                        : GameModes.TRAINING
                    )
                  }
                >
                  Easy Mode
                </SettingsBox>
                <SettingsBox
                  style={{
                    backgroundColor:
                      props.numberMode === NumberModes.ROMAN &&
                      "rgba(16, 185, 129,1)",
                      color: props.numberMode === NumberModes.ROMAN && "white"
                  }}
                  tw='mx-2 '
                  onClick={() =>
                    props.setNumberMode((prev) =>
                      prev === NumberModes.ROMAN
                        ? NumberModes.ARABIC
                        : NumberModes.ROMAN
                    )
                  }
                >
                  Roman Numerals
                </SettingsBox>
              </div>

            </div>
            {/*footer*/}
            <div tw="flex items-center justify-end py-4 border-t border-solid border-gray-200 rounded-b">
              <button
                tw="text-green-500 bg-opacity-60 font-bold uppercase px-4 py-1 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => props.setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div tw="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

const GameModes = {
  TRAINING: "TRAINING",
  KEY: "KEY",
};

const NumberModes = {
  ARABIC: "ARABIC",
  ROMAN: "ROMAN",
};

const TimerStates = {
  INACTIVE: "INACTIVE",
  ACTIVE: "ACTIVE",
  FINISHED: "FINISHED"
}



const Timer = (props) => {
  const {initialMinute = 0,initialSeconds = 0} = props;
  const [ minutes, setMinutes ] = useState(1);
  const [seconds, setSeconds ] =  useState(25);
  useEffect(()=>{
    if (props.timerState === TimerStates.ACTIVE) {
      let myInterval = setInterval(() => {
        if (seconds > 0) {
            setSeconds(seconds - 1);
        }
        if (seconds === 1) {
            if (minutes === 0) {
                clearInterval(myInterval)
                props.setTimerState(TimerStates.FINISHED)
            } else {
                setMinutes(minutes - 1);
                setSeconds(59);
            }
        } 
    }, 1000)
    return ()=> {
        clearInterval(myInterval);

        // props.setTimerState(TimerStates.FINISHED)
      };
    }

  });

  return (
      <div onClick={() => props.setTimerState(TimerStates.ACTIVE)}>
      { props.timerState === TimerStates.FINISHED
          ? <div>yo</div>
          : <h1> {minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</h1> 
      }
      </div>
  )
}




function App() {
  const [currentItem, setCurrentItem] = useState(getRandomInt());
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [currentKeyIndex, setCurrentKeyIndex] = useState(4);
  const [showModal, setShowModal] = useState(false);
  const [uniqueArray, setUniqueArray] = useState(randomUniqueNum(8, 8));
  const [gameMode, setGameMode] = useState(GameModes.KEY);
  const [numberMode, setNumberMode] = useState(NumberModes.ARABIC);

  const [selectedIdx, setSelectedIdx] = useState(null);
  const [questionCorrect, setQuestionCorrect] = useState(null);
  const [timerState, setTimerState] = useState(TimerStates.INACTIVE)

  // const [cardHeight, setCardHeight] = useState(120)

  useEffect(() => {
    setCurrentItem(uniqueArray[0]);
    LogRocket.init('lrd9dg/nashflash');


  }, []);




  const handleSelection = (idx) => {

    if (selectedIdx) {
      return
    }

    setSelectedIdx(idx);
    if (idx === currentItem) {
      setScore((prev) => prev + 1);
      setQuestionCorrect(true);
    } else {
      setQuestionCorrect(false);
    }
    setTotalQuestions((prev) => prev + 1);
    // console.log(uniqueArray.indexOf(currentItem), uniqueArray)
    // setCurrentItem(getRandomInt());
  };

  const handleAnimationEnd = () => {
    let newItem = getRandomInt()
    setCurrentItem(prev => prev === newItem ? getRandomInt() : newItem);
    setQuestionCorrect(null);
    setSelectedIdx(null);
  };

  const handleReset = () => {
    setTotalQuestions(0);
    setCurrentItem(getRandomInt());
    setScore(0);
  };

  // const TimerDisplay = () => {
  //   if (timerState === TimerStates.INACTIVE) {
  //     return (<button tw='underline' onClick={() => setTimerState(TimerStates.ACTIVE)}>Start Timed Mode</button>)
  //   } else if (timerState === TimerStates.ACTIVE) {
  //     return <Timer initialMinute={1} initialSeconds={30} setTimerState={setTimerState} timerState={timerState}/>
      
  //   } else {
  //     return "🤠"
  //   }
  // }


  return (
    <div tw="flex flex-col h-screen  items-center px-3  text-white">
      <h1 className='neonText'  tw="text-xl md:text-2xl my-2 py-3">Nashville Number System Quiz</h1>
      <div tw="text-xl w-full lg:max-w-3xl my-4 flex justify-between">
        <div>
          <div>Key: {MusicKeys[currentKeyIndex].key}</div>
          <div>
            Score: {score}/{totalQuestions}
          </div>
        </div>

        <div tw='text-right'>
          <div tw="cursor-pointer" onClick={() => setShowModal(true)}>
            Settings
          </div>
          <div tw="cursor-pointer underline" onClick={handleReset}>
            Reset
          </div>
          {/* <TimerDisplay tw='cursor-pointer underline'/> */}
          {/* <Timer initialMinute={1} initialSeconds={30} setTimerState={setTimerState} timerState={timerState}/> */}

        </div>
      </div>

      <div tw="mt-2 flex " className='card-cont cardText'>
        
        <FlashCard
          tw="transform z-10 rotate-12"
          className="flash-card"
          css={css({ transform: "rotate(10deg)" })}
        ></FlashCard>
        <FlashCard tw=" transform rotate-3 z-20 absolute">

        </FlashCard>

        <FlashCard
          tw="transform rotate-1  z-40 absolute "
          className={
            questionCorrect
              ? "card-correct flash-card"
              : questionCorrect === false
              ? "card-incorrect flash-card"
              : "flash-card"
          }
        >
          <div tw="absolute top-6 right-6 text-lg text-black" >
            Key: {MusicKeys[currentKeyIndex].key}
          </div>
          {gameMode === GameModes.KEY
            ? MusicKeys[currentKeyIndex].chords[currentItem].name
            : numberMode === NumberModes.ARABIC
            ? MusicKeys[currentKeyIndex].chords[currentItem].role
            : MusicKeys[currentKeyIndex].chords[currentItem].numeral}
        </FlashCard>

        <FlashCard
          tw="transform absolute"
          className="flash-card"

          css={css({ transform: "rotate(-2deg)" })}
        >
          {MusicKeys[currentKeyIndex].chords[currentItem].name}
        </FlashCard>
        
      </div>
      <div tw="flex absolute bottom-10">
        {MusicKeys[currentKeyIndex].chords.map((chord, idx) => (
          <ChordBox
            className={
              
              (selectedIdx === idx && idx === currentItem
                ? "fade-correct chord-box"
                : selectedIdx === idx && idx !== currentItem
                ? "fade-wrong chord-box"
                : "box chord-box")
            }
            key={idx}
            onClick={() => handleSelection(idx)}
            tw="mx-1 "
            onAnimationEnd={handleAnimationEnd}
          >
            {gameMode === GameModes.TRAINING
              ? chord.name
              : numberMode === NumberModes.ARABIC
              ? chord.role
              : chord.numeral}
          </ChordBox>
        ))}
      </div>
      {
        timerState === TimerStates.FINISHED && <ScoreModal setTimerState={setTimerState}></ScoreModal>
      }

      {showModal ? (
        <SettingsModal
          setShowModal={setShowModal}
          setGameMode={setGameMode}
          gameMode={gameMode}
          setNumberMode={setNumberMode}
          numberMode={numberMode}
          setCurrentKeyIndex={setCurrentKeyIndex}
          currentKeyIndex={currentKeyIndex}
        />
      ) : null}
    </div>
  );
}

export default App;
