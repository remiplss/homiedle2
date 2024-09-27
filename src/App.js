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
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [indice, setIndice] = useState(false);


    const toggleIndice = () => {
        setIndice(!indice); // Toggle between true and false
      };

    const togglePopupVisibility = () => {
        setIsPopupVisible(!isPopupVisible); // Toggle between true and false
      };

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
            Couleur: [item.Couleur],
            Age: [String(item.Age)],
            Activite: [item.Activite],
            Badge: [item.Badge],
            Role: [item.Role],
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
    
    const listItems = ['Iron', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Gold', 'Platinum', 'Diamond', 'Gold', 'Platinum', 'Diamond', 'Gold', 'Platinum', 'Diamond', 'Gold', 'Platinum', 'Diamond'];
    return (
        <div className="App">
            {finalData.length === 0 ?
                (<div className='loading'><FadeLoader
                    color={"#000000"}
                    size={150}/>

                   </div>):
        (<div>
                    <h1>Homiedle</h1>

{answer.current && count >= 3 && (
  <div className='indice'>
    <div>Indice: La première lettre du pseudo est:</div> 
    {indice === false 
      ? <div onClick={toggleIndice}>Cliquer pour voir</div> 
      : <div>{JSON.stringify([answer.current.pseudo])[3]}</div>}
  </div>
)}
                    <button className="initAgain" onClick={togglePopupVisibility}>
        {isPopupVisible ? 'Close' : 'Liste Homies'}
      </button>

      {/* Step 3: Conditionally render the popup and overlay */}
      {isPopupVisible && (
        <>
          {/* Overlay for dimming the background */}
          <div className="popup-overlay" onClick={togglePopupVisibility}></div>
          
          {/* Popup box */}
          <div className="popup-box">
            <ul>
              {finalData.map((item, index) => (
                <li key={index}>{item.pseudo}</li>
              ))}
            </ul>
            <button className="initAgain" onClick={togglePopupVisibility} >Close</button>
          </div>
        </>
      )}
                    {!win && <SearchBar passClass={winSpin} getAnswer={getAnswer} data={data} setData={setData} count={count} setCount={setCount}/>}
                    {win && <button className='initAgain' onClick={initReset}>Rejouer!</button>}
                    <div className={`tableContainer ${userAnswer !== '' ? 'scrollable' : ''}`}>
                    <table>
            <tbody >
                <tr className='titre'>
                    <th>Pseudo</th>
                    <th>Peak Elo</th>
                    <th>Couleur Pseudo</th>
                    <th>Date de naissance</th>
                    <th>Activité (chomeur, étudiant, travail)</th>
                    <th>Badge (viewer, modo, VIP)</th>
                    <th>Rôle LOL </th>
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
