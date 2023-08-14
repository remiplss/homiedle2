import './App.css';
import {dataObjects} from "./data/dataObjects";
import {AnswerBoxes} from "./AnswerBoxes";
import SearchBar from "./SearchBar";
import React, {useEffect, useMemo, useRef, useState} from "react";

function App() {
    const [userAnswer, setUserAnswer] = useState('')
    const answer = useRef(dataObjects[Math.floor(Math.random() * dataObjects.length)])
    const [winSpin, setWinSpin] = useState('')
    const tries = useRef([])
    const [win, setWin] = useState(false)
    const initReset = () => {
        setTimeout(() => {
            setUserAnswer('');
            setWinSpin('');
            setWin(false);
            tries.current = [];
            answer.current = dataObjects[Math.floor(Math.random() * dataObjects.length)];
        },300)
    }
    const getAnswer = (ans) => {
        setUserAnswer(ans)
    }
    const displayAnswer = (ans) => {
        if(ans !== '') tries.current.push(ans);
        return tries.current.map((el, index) => (
               <AnswerBoxes key={index} finalAnswer={answer.current} answer={el} />
           )).reverse();
    };
    const ansBox = useMemo(() => {
        if(JSON.stringify(userAnswer) === JSON.stringify([answer.current])) setTimeout(() => {
            setWinSpin('initWin')
            setTimeout(() => {
                setWin(true)
            },1400)

        },2500)
            return displayAnswer(userAnswer);
    }, [userAnswer]);


  return (
    <div className="App">
        {!win && <SearchBar passClass={winSpin} getAnswer={getAnswer} />}
        {win && <button className='initAgain' onClick={initReset}>Play again!</button>}
        <div className={`tableContainer ${userAnswer !== '' ? 'scrollable' : ''}`}>
            {ansBox}
        </div>
    </div>
  );
}

export default App;
