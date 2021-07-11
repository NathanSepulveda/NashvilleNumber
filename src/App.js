/** @jsxImportSource @emotion/react */
import tw, { css, styled } from "twin.macro";
import React, { useState, useEffect, useRef } from "react";
import { createPopper } from "@popperjs/core";
import "./App.css";
import { MusicKeys } from "./Keys";

const ChordBox = tw.div`w-12 h-12 bg-gray-400 rounded-lg flex justify-center items-center cursor-pointer `;

const KeyBox = tw.div`w-14 h-12 bg-gray-400 rounded-lg flex justify-center items-center cursor-pointer hover:bg-green-300 `;

const SettingsBox = tw.div`w-32 h-12 bg-gray-400 rounded-lg flex justify-center items-center cursor-pointer  `;

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

const SettingsModal = (props) => {
  return (
    <>
      <div tw="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div tw="relative w-full my-6 mx-auto max-w-sm lg:max-w-2xl">
          {/*content*/}
          <div tw="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div tw="flex items-center   p-5 border-b border-solid border-gray-500 rounded-t">
              <h3 tw="text-3xl font-semibold text-black">Settings</h3>
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
            <div tw="relative p-4 flex-auto text-black">
              <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                  Switch up the settings!
              </p>
              
  
              <div tw="text-black grid  grid-cols-6 gap-2">
                {MusicKeys.map((k, i) => (
                  <KeyBox
                    style={{
                      backgroundColor:
                        i === props.currentKeyIndex && "rgba(16, 185, 129,1)",
                    }}
                    onClick={() => props.setCurrentKeyIndex(i)}
                  >
                    {k.key}
                  </KeyBox>
                ))}
              </div>
              <div tw="text-black flex gap-4 my-4">
                {/* {Object.keys(GameModes).map((gm) => (
                  <SettingsBox onClick={() => props.setGameMode(GameModes[gm])}>
                    {gm}
                  </SettingsBox>
                ))} */}
                <SettingsBox
                  style={{
                    backgroundColor:
                      props.gameMode === GameModes.TRAINING && "green",
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
                      props.numberMode === NumberModes.ROMAN && "green",
                  }}
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
              {/* <Dropdown color="white" /> */}
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

function App() {
  const [currentItem, setCurrentItem] = useState(getRandomInt());
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [currentKeyIndex, setCurrentKeyIndex] = useState(4);
  const [showModal, setShowModal] = useState(false);
  const [uniqueArray, setUniqueArray] = useState(randomUniqueNum(8, 8));
  const [gameMode, setGameMode] = useState(GameModes.KEY);
  const [numberMode, setNumberMode] = useState(NumberModes.ROMAN);

  const [selectedIdx, setSelectedIdx] = useState(null);
  const [questionCorrect, setQuestionCorrect] = useState(null);

  useEffect(() => {
    setCurrentItem(uniqueArray[0]);
  }, []);

  const handleSelection = (idx) => {
    setSelectedIdx(idx);
    if (idx === currentItem) {
      // alert("correct");
      setScore((prev) => prev + 1);
      setQuestionCorrect(true);
    } else {
      // alert("incorrect");
      setQuestionCorrect(false);
    }
    setTotalQuestions((prev) => prev + 1);
    // console.log(uniqueArray.indexOf(currentItem), uniqueArray)
    // setCurrentItem(getRandomInt());
  };

  const handleAnimationEnd = () => {
    setCurrentItem(getRandomInt());
    setQuestionCorrect(null);
    setSelectedIdx(null);
  };

  const handleReset = () => {
    setTotalQuestions(0);
    setScore(0);
  };

  return (
    <div tw="flex flex-col h-screen bg-Softblack items-center px-3 py-3 text-white">
      <h1 tw="text-2xl my-2">Nashville Number System Quiz</h1>
      <div tw="text-xl w-full lg:max-w-2xl my-4 flex justify-between">
        <div>
          <div>Key: {MusicKeys[currentKeyIndex].key}</div>
          <div>
            Score: {score}/{totalQuestions}
          </div>
        </div>

        <div>
          <div onClick={() => setShowModal(true)}>Settings</div>
          <div onClick={handleReset}>Reset</div>
        </div>
      </div>

      <div tw="my-2 flex">
        <div
          tw="text-blue-500 text-7xl w-60 bg-gray-300 h-96 rounded-xl flex justify-center items-center transform z-10 rotate-12 border border-black"
          css={css({ transform: "rotate(10deg)" })}
        ></div>
        <div tw="text-blue-500 text-7xl w-60 bg-gray-300 h-96 rounded-xl flex justify-center items-center transform rotate-3 z-20 absolute border border-black">
          {MusicKeys[currentKeyIndex].chords[currentItem].name}
        </div>

        <div
          tw="text-blue-500 text-7xl w-60  h-96 rounded-xl flex justify-center items-center transform rotate-1 shadow-2xl z-40 absolute border-2 border-black bg-gray-300 "
          className={
            questionCorrect
              ? "card-correct"
              : questionCorrect === false
              ? "card-incorrect"
              : ""
          }
        >
          <div tw="absolute top-4 left-2 text-lg text-black">
            Key: {MusicKeys[currentKeyIndex].key}
          </div>
          {gameMode === GameModes.KEY
            ? MusicKeys[currentKeyIndex].chords[currentItem].name
            : numberMode === NumberModes.ARABIC
            ? MusicKeys[currentKeyIndex].chords[currentItem].role
            : MusicKeys[currentKeyIndex].chords[currentItem].numeral}
        </div>

        <div
          tw="text-blue-500 text-7xl w-60 bg-gray-300 h-96 rounded-xl z-30 flex justify-center items-center transform absolute border border-black"
          css={css({ transform: "rotate(-2deg)" })}
        >
          {MusicKeys[currentKeyIndex].chords[currentItem].name}
        </div>
      </div>
      {/* <span tw="flex h-3 w-3"> */}
        {/* <span tw="animate-ping absolute inline-flex h-80 w-80 rounded-full bg-purple-400 opacity-75"></span>
  <span tw="animate-ping absolute inline-flex h-40 w-40 rounded-full bg-purple-600 opacity-20 top-20 right-60 z-0"></span> */}
        {/* <span tw="animate-ping relative inline-flex h-80 w-80 rounded-full bg-purple-200 opacity-75"></span> */}
        {/* <span tw="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span> */}
      {/* </span> */}
      {/* // onClick={() => handleSelection(idx)}   */}
      <div tw="flex absolute bottom-10">
        {MusicKeys[currentKeyIndex].chords.map((chord, idx) => (
          <ChordBox
            className={
              selectedIdx === idx && idx === currentItem
                ? "fade-correct"
                : selectedIdx === idx && idx !== currentItem
                ? "fade-wrong"
                : ""
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
