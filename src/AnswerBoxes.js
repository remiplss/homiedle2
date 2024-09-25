import './assets/answerBoxes.css'
import {useEffect, useRef} from "react";

export const AnswerBoxes = (props) => {
    const timeoutRef = useRef(null)
    let answer = props.answer[0]

    
    let finalAnswer = props.finalAnswer

    // const champName = answer.pseudo.join('').replace(/[.'" ]/g, '')
    const adjustClass = (specAns) => {

        const commonElements = answer[specAns].filter((el) => finalAnswer[specAns].includes(el));
        const areEqual = answer[specAns].length === finalAnswer[specAns].length && commonElements.length === finalAnswer[specAns].length
        if (areEqual) {
            return 'makeGreen'
        } else if (commonElements.length > 0) {
            return 'makeYellow';
        } else {
            if(specAns === 'Anciennete'){
                let arrow
                answer[specAns][0] < finalAnswer[specAns][0] ? arrow = 'yearBefore' : arrow = 'yearAfter'
                return `makeRed ${arrow}`
            }
            if(specAns === 'Age'){
                let arrow
                answer[specAns][0] < finalAnswer[specAns][0] ? arrow = 'yearBefore' : arrow = 'yearAfter'
                return `makeRed ${arrow}`
            }
            if(specAns === 'NombredeTO'){
                let arrow
                answer[specAns][0] < finalAnswer[specAns][0] ? arrow = 'yearBefore' : arrow = 'yearAfter'
                return `makeRed ${arrow}`
            }
            else return 'makeRed';
        }
    }

    useEffect(() => {
        for (let i = 0; i < timeoutRef.current.children.length; i++){
            const delay = i * 300;
            setTimeout(() => {
                timeoutRef.current.children[i].classList.add('reveal')
            },delay)
        }
    },[])

    const displayedAnswer = (property) => {

        return (
            <td className={adjustClass(property)}>
                <div>
                {(answer[property]).length > 1 ? (answer[property]).join(', ') : answer[property]}
                </div>
            </td>
        )
    }

    return(
        <>
            <table>
                <tbody>
                    <tr>
                        <th>Pseudo</th>
                        <th>Peak Elo</th>
                        <th>Golémique</th>
                        <th>Age</th>
                        <th>Nombre de TO</th>
                        <th>Rôle (viewer, modo, VIP)</th>
                        <th>Préférence (pipi, caca, prout, vomit, sperme) </th>
                        <th>Ancienneté</th>
                    </tr>
                    <tr ref={timeoutRef}>
                        
                        {displayedAnswer('pseudo')}
                        {displayedAnswer('Elo')}
                        {displayedAnswer('Golemique')}
                        {displayedAnswer('Age')}
                        {displayedAnswer('NombredeTO')}
                        {displayedAnswer('Role')}
                        {displayedAnswer('Preference')}
                        {displayedAnswer('Anciennete')}
                    </tr>
                </tbody>
            </table>
        </>
    )
}
