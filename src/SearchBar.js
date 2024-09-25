import React, {useRef, useState, useEffect} from 'react';
import './assets/searchBar.css';


const SearchBar = ({getAnswer, passClass, data, setData, count, setCount}) => {
    // const [data, setData] = useState([]);
    const [finalData, setFinalData] = useState([]);
    const [value, setValue] = useState('')
    const [suggestions, setSuggestions] = useState([])
    // const options = dataObjects.map(el => el.pseudo);
    const [options, setOptions] = useState([]);
    const usedValues = useRef([])

    useEffect(() => {
        fetch('https://script.google.com/macros/s/AKfycbyBy39HPGTQJvFIBUIpCapgv3ZYpdxqS6yqA-PxAlXiCZYG1e2zVvfTVsfu5Vzy1Nxg/exec?path=Sheet1&action=read') // Replace with your actual endpoint URL
          .then(response => response.json())
          .then(data => setData(data.data))
          .catch(error => console.error('Error fetching data:', error));

        //   const extractedPseudos = data.map(item => item["pseudo"]);

      }, []);

      useEffect(() => {
        const extractedPseudos = data.map(item => [item["pseudo"]]);

        setOptions(extractedPseudos)

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


    const getSuggestions = (inputValue) => {
        const inputValueLowerCase = inputValue.trim().toLowerCase();
        return options.filter(option =>
            !usedValues.current.includes(option[0]) &&
            option[0].split("'").join('').toLowerCase().startsWith(inputValueLowerCase)
        );
    };
    const handleInputChange = (event) => {
        const inputValue = event.target.value
        setValue(inputValue)
        setSuggestions(getSuggestions(inputValue))
    }
    const handleSuggestionClick = (suggestion) => {
        console.log(suggestion)
        setValue(suggestion)
        setSuggestions([])
    }
    const handleCompareClick = () => {
        
setCount(count+1)
        let userAnswer
        if(!options.find(el => el[0] == value) && suggestions.length < 1){
            return
        }
        else if(!options.find(el => el[0] == value) && suggestions.length > 0){
            userAnswer = finalData.filter(el => el.pseudo == suggestions[0])
            usedValues.current.push(suggestions[0].join(''))
        }
        else{
            userAnswer = finalData.filter(el => el.pseudo == value)
            usedValues.current.push(value)
        }
        getAnswer(userAnswer)
        setSuggestions([])
        setValue('')
    }
    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            if(value){
            setValue(String(suggestions[0]))
            // setSuggestions([])
            // handleCompareClick()
            }


        }
    }

    return(
        <div>
            <div className={`searchBar + ${passClass}`}>
            <input
                type="text"
                value={value}
                onChange={handleInputChange}
                onKeyDown={(e) => { 
                    handleKeyPress(e)
                }}    
             placeholder="Taper le pseudo du homie..."
            />
                <button onClick={handleCompareClick}>➤</button>
                <ul>
                    {suggestions.map((suggestion, index) => (
                        value !== '' &&
                        <li key={index} onClick={() => handleSuggestionClick(suggestion[0])}>
                            {suggestion}
                        </li>
                    ))}
                </ul>
            </div>

        </div>
 )
};

export default SearchBar;
