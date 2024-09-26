import './App.css';
import { AnswerBoxes } from "./AnswerBoxes";
import SearchBar from "./SearchBar";
import React, { useEffect, useMemo, useRef, useState  } from "react";
import FadeLoader from "react-spinners/ClipLoader";


function App() {
    const [data, setData] = useState([]);
    const [finalData, setFinalData] = useState([]);
    const [userAnswer, setUserAnswer] = useState('')
    const answer = useRef(finalData[Math.floor(Math.random() * finalData.length)])
    const [winSpin, setWinSpin] = useState('')
    const tries = useRef([])
    const [win, setWin] = useState(false)
    const [init, setInit] = useState(true);
    const [count, setCount] = useState(0);



console.log(finalData.length)
    useEffect(() => {
        fetch('https://script.google.com/macros/s/AKfycbyBy39HPGTQJvFIBUIpCapgv3ZYpdxqS6yqA-PxAlXiCZYG1e2zVvfTVsfu5Vzy1Nxg/exec?path=Sheet1&action=read') // Replace with your actual endpoint URL
            .then(response => response.json())
            .then(data => setData(data.data))
            .catch(error => console.error('Error fetching data:', error));

    }, []);

    useEffect(() => {
        // Map over the original data and convert each value into an array
        const newData = data.map(item => ({
            pseudo: [item.pseudo],
            Elo: [item.Elo],
            Golemique: [item.Golemique],
            Age: [String(item.Age)],
            NombredeTO: [String(item.NombredeTO)],
            Role: [item.Role],
            Preference: [item.Preference],
            Anciennete: [String(item.Anciennete)],
        }));

        // Update the state with the transformed data
        setFinalData(newData);
    }, [data]);

    useEffect(() => {
        if (finalData) {

            // When finalData is loaded, set the ref
            answer.current = finalData[Math.floor(Math.random() * finalData.length)];
        }
    }, [data]);

    const initReset = () => {
        setTimeout(() => {
            setUserAnswer('');
            setWinSpin('');
            setWin(false);
            tries.current = [];
            answer.current = finalData[Math.floor(Math.random() * finalData.length)];
            setCount(0)
        }, 1000)
    }
    const getAnswer = (ans) => {
        console.log(ans)
        setUserAnswer(ans)
        setInit(false)

    }
    const displayAnswer = (ans) => {
        if (ans !== '') tries.current.push(ans);
        return tries.current.map((el, index) => (
         <> 
            <AnswerBoxes key={index} finalAnswer={answer.current} answer={el} />
            
            </> 

        )).reverse();

    };
    const ansBox = useMemo(() => {
        if (JSON.stringify(userAnswer) === JSON.stringify([answer.current])) setTimeout(() => {
            setWinSpin('initWin')
            setTimeout(() => {
                setWin(true)
            }, 1400)

        }, 2500)
       

        return displayAnswer(userAnswer);
    }, [userAnswer]);
    console.log(answer.current)
    return (
        <div className="App">
            {finalData.length === 0 ?
                (<div className='loading'><FadeLoader
                    color={"#000000"}
                    size={150}/>

                   </div>):
        (<div>
                    <h1>Homiedle</h1>
                    {count >= 3 && <p>Indice: La premère lettre du pseudo est: {JSON.stringify([answer.current.pseudo])[3]}</p>}
                    {!win && <SearchBar passClass={winSpin} getAnswer={getAnswer} data={data} setData={setData} count={count} setCount={setCount}/>}
                    {win && <button className='initAgain' onClick={initReset}>Rejouer!</button>}
                    <div className={`tableContainer ${userAnswer !== '' ? 'scrollable' : ''}`}>
                    <table>
            <tbody >
                <tr className='titre'>
                    <th>Pseudo</th>
                    <th>Peak Elo</th>
                    <th>Golémique</th>
                    <th>Age</th>
                    <th>Nombre de TO</th>
                    <th>Rôle (viewer, modo, VIP)</th>
                    <th>Préférence (pipi, caca, prout, vomit, sperme) </th>
                    <th>Ancienneté</th>
                </tr>
                        {ansBox}

                        </tbody>
            </table>

                    </div>
                </div>)}
        </div>
    );
}

export default App;
