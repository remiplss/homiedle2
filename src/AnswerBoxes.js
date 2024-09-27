import './assets/answerBoxes.css'
import { useEffect, useRef, useState } from "react";

export const AnswerBoxes = (props) => {
    const timeoutRef = useRef(null)
    let answer = props.answer[0]


    const eloOrder = [
        'Unranked',
        'Fer',
        'Bronze',
        'Silver',
        'Gold',
        'Platinium',
        'Emeraude',
        'Diamant',
        'Master',
        'GM',
        'Challenger'
      ];
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
            if (specAns === 'Anciennete') {
                let arrow
                answer[specAns][0] < finalAnswer[specAns][0] ? arrow = 'yearBefore' : arrow = 'yearAfter'
                return `makeRed ${arrow}`
            }
            if (specAns === 'Age') {
                let arrow
                answer[specAns][0] < finalAnswer[specAns][0] ? arrow = 'yearBefore' : arrow = 'yearAfter'
                return `makeRed ${arrow}`
            }
            if (specAns === 'Elo') {
                const index1 = eloOrder.indexOf(answer[specAns][0]);
                const index2 = eloOrder.indexOf(finalAnswer[specAns][0]);
                
                if (index1 < index2) {
                    return `makeRed yearBefore`
                  } else if (index1 > index2) {
                    return `makeRed yearAfter`
                  } else {
                     return 'makeGreen'
                  }
                  
        }
            //     if (finalAnswer[specAns][0] >= 99 && answer[specAns][0] >= 99) {
            //         return 'makeGreen'
            //     }f
            //     else {
            //         let arrow
                    

            //         answer[specAns][0] < finalAnswer[specAns][0] ? arrow = 'yearBefore' : arrow = 'yearAfter'
            //         return `makeRed ${arrow}`
            //     }}
                
            else return 'makeRed';

        
    }
}

useEffect(() => {
    for (let i = 0; i < timeoutRef.current.children.length; i++) {
        const delay = i * 300;
        setTimeout(() => {
            timeoutRef.current.children[i].classList.add('reveal')
        }, delay)
    }

}, [])

const displayedAnswer = (property) => {

    return (
        <td className={adjustClass(property)}>
            <div>
                {((answer[property]).length > 1 ? (answer[property]).join(', ') : answer[property])}
                {/* {property === "NombredeTO" && answer[property] >= 99 && <>+</>} */}
            </div>
        </td>
    )
}

return (
    <>

        <tr ref={timeoutRef} style={{ marginBottom: "20px" }}>

            {displayedAnswer('pseudo')}
            {displayedAnswer('Elo')}
            {displayedAnswer('Couleur')}
            {displayedAnswer('Age')}
            {displayedAnswer('Activite')}
            {displayedAnswer('Badge')}
            {displayedAnswer('Role')}
            {displayedAnswer('Anciennete')}
            {/* {displayedAnswer('Sub')} */}

        </tr>

    </>
)
}
