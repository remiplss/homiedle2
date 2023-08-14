import './assets/answerBoxes.css'
import {useEffect, useRef} from "react";
export const AnswerBoxes = (props) => {
    const timeoutRef = useRef(null)
    let answer = props.answer[0]
    let finalAnswer = props.finalAnswer
    const champName = answer.champion.join('').replace(/[.'" ]/g, '')
    const adjustClass = (specAns) => {
        const commonElements = answer[specAns].filter((el) => finalAnswer[specAns].includes(el));
        const areEqual = answer[specAns].length === finalAnswer[specAns].length && commonElements.length === finalAnswer[specAns].length
        if (areEqual) {
            return 'makeGreen'
        } else if (commonElements.length > 0) {
            return 'makeYellow';
        } else {
            return 'makeRed';
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
                {(answer[property]).length > 1 ? (answer[property]).join(', ') : answer[property]}
            </td>
        )
    }

    return(
        <>
            <table>
                <tbody>
                    <tr>
                        <th>Champion</th>
                        <th>Gender</th>
                        <th>Position</th>
                        <th>Species</th>
                        <th>Resource</th>
                        <th>Range type</th>
                        <th>Regions</th>
                        <th>Release year</th>
                    </tr>
                    <tr ref={timeoutRef}>
                        <td className='champImg'> {/*ADD IMG PROPERTY TO EACH OBJECT AND SEARCH WITH IT */}
                            <img src={`https://ddragon.leagueoflegends.com/cdn/13.15.1/img/champion/${champName}.png`} alt=""/>
                        </td>
                        {displayedAnswer('gender')}
                        {displayedAnswer('position')}
                        {displayedAnswer('species')}
                        {displayedAnswer('resource')}
                        {displayedAnswer('rangeType')}
                        {displayedAnswer('regions')}
                        {displayedAnswer('releaseYear')}
                    </tr>
                </tbody>
            </table>
        </>
    )
}
